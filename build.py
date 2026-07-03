#!/usr/bin/env python3
"""Build the site: template.html + data.yaml -> dist/index.html.

Validates data.yaml first and exits 1 with line-referenced, human-readable
errors, so an invalid content edit can never produce a deployable file.

Usage:  python build.py
Needs:  Python 3.10+ and PyYAML (pip install pyyaml)
"""
import json
import re
import sys
from html import escape
from pathlib import Path

try:
    import yaml
except ImportError:
    sys.exit("PyYAML is not installed — run: pip install pyyaml")

ROOT = Path(__file__).resolve().parent
DATA = ROOT / "data.yaml"
TEMPLATE = ROOT / "template.html"
OUT = ROOT / "dist" / "index.html"

LINE_KEY = "__line__"


class LineLoader(yaml.SafeLoader):
    """SafeLoader that records the source line of every mapping."""

    def construct_mapping(self, node, deep=False):
        mapping = super().construct_mapping(node, deep=deep)
        mapping[LINE_KEY] = node.start_mark.line + 1
        return mapping


def where(obj):
    if isinstance(obj, dict) and LINE_KEY in obj:
        return f"data.yaml:{obj[LINE_KEY]}"
    return "data.yaml"


def strip_lines(obj):
    if isinstance(obj, dict):
        return {k: strip_lines(v) for k, v in obj.items() if k != LINE_KEY}
    if isinstance(obj, list):
        return [strip_lines(v) for v in obj]
    return obj


def is_text(v):
    return isinstance(v, str) and v.strip() != ""


def validate(data, template):
    errs = []

    def err(obj, msg):
        errs.append(f"{where(obj)}  {msg}")

    for section in ("site", "plays", "categories", "products", "connections"):
        if section not in data:
            err(data, f"missing top-level section '{section}:'")
    if errs:
        return errs

    # ── site ──
    site = data["site"]
    for field in ("title", "brand", "footer_hint", "mobile_footer_hint"):
        if not is_text(site.get(field)):
            err(site, f"site.{field} is missing or empty")
    if not isinstance(site.get("year"), int):
        err(site, "site.year must be a number, e.g. 2026")
    if site.get("analytics_url") is not None and not isinstance(site["analytics_url"], str):
        err(site, "site.analytics_url must be text (or blank for no analytics)")

    # ── plays ──
    play_ids = set()
    for p in data["plays"]:
        pid = p.get("id")
        if not isinstance(pid, int):
            err(p, "play is missing a numeric 'id:'")
            continue
        if pid in play_ids:
            err(p, f"duplicate play id {pid}")
        play_ids.add(pid)
        for field in ("name", "short"):
            if not is_text(p.get(field)):
                err(p, f"play {pid}: '{field}:' is missing or empty")
        if f"--play-{pid}:" not in template:
            err(p, f"play {pid}: no colour --play-{pid} is defined in template.html "
                   "(adding a new play needs a developer)")

    # ── categories ──
    cat_ids = set()
    for c in data["categories"]:
        cid = c.get("id")
        if not is_text(cid):
            err(c, "category is missing an 'id:'")
            continue
        if cid in cat_ids:
            err(c, f"duplicate category id '{cid}'")
        cat_ids.add(cid)
        if not is_text(c.get("label")):
            err(c, f"category '{cid}': 'label:' is missing or empty")
        if c.get("play") not in play_ids:
            err(c, f"category '{cid}': play {c.get('play')!r} does not match any play id")

    # ── products ──
    prod_ids = set()
    for p in data["products"]:
        pid = p.get("id")
        if not is_text(pid):
            err(p, "product is missing an 'id:'")
            continue
        if pid in prod_ids:
            err(p, f"duplicate product id '{pid}'")
        prod_ids.add(pid)
        if not re.fullmatch(r"[a-z0-9_]+", pid):
            err(p, f"product id '{pid}' should be lowercase letters, numbers and _ only")
        for field in ("label", "description", "value"):
            if not is_text(p.get(field)):
                err(p, f"product '{pid}': '{field}:' is missing or empty")
        if p.get("category") not in cat_ids:
            err(p, f"product '{pid}': category {p.get('category')!r} does not match "
                   "any category id")
        plays = p.get("plays")
        if not isinstance(plays, list) or not plays:
            err(p, f"product '{pid}': 'plays:' must be a list with at least one "
                   "play id, e.g. plays: [1]")
        else:
            for x in plays:
                if x not in play_ids:
                    err(p, f"product '{pid}': plays contains {x!r}, which does not "
                           "match any play id")
        for field in ("questions", "competitors", "differentiators"):
            items = p.get(field)
            if not isinstance(items, list) or not items:
                err(p, f"product '{pid}': '{field}:' must be a list with at "
                       "least one entry")
            elif not all(is_text(x) for x in items):
                err(p, f"product '{pid}': '{field}:' has an empty entry")

    # ── connections ──
    seen_pairs = {}
    for c in data["connections"]:
        frm, to = c.get("from"), c.get("to")
        label = f"connection {frm!r} -> {to!r}"
        for end, val in (("from", frm), ("to", to)):
            if val not in prod_ids:
                err(c, f"{label}: '{end}:' is {val!r}, which does not match any "
                       "product id")
        if frm and frm == to:
            err(c, f"{label}: a product cannot connect to itself")
        if c.get("play") not in play_ids:
            err(c, f"{label}: play {c.get('play')!r} does not match any play id")
        if not is_text(c.get("why")):
            err(c, f"{label}: 'why:' is missing or empty")
        if is_text(frm) and is_text(to):
            pair = tuple(sorted((frm, to)))
            if pair in seen_pairs:
                err(c, f"{label}: duplicate — already defined at "
                       f"data.yaml:{seen_pairs[pair]}")
            else:
                seen_pairs[pair] = c.get(LINE_KEY, "?")

    return errs


def js(obj):
    """Serialise for inlining in a <script> block."""
    return json.dumps(strip_lines(obj), ensure_ascii=False, indent=1).replace("</", "<\\/")


def main():
    if not DATA.exists():
        sys.exit("data.yaml not found")
    if not TEMPLATE.exists():
        sys.exit("template.html not found")

    try:
        data = yaml.load(DATA.read_text(encoding="utf-8"), LineLoader)
    except yaml.YAMLError as e:
        print("data.yaml is not valid YAML:\n")
        print(f"  {e}")
        sys.exit(1)

    template = TEMPLATE.read_text(encoding="utf-8")
    errs = validate(data, template)
    if errs:
        print(f"data.yaml is invalid — {len(errs)} problem(s):\n")
        for e in errs:
            print(f"  ERROR  {e}")
        sys.exit(1)

    plays = {str(p["id"]): {"id": p["id"], "name": p["name"], "short": p["short"],
                            "varName": f"--play-{p['id']}"} for p in data["plays"]}
    cats = [{"id": c["id"], "label": c["label"], "playId": c["play"]}
            for c in data["categories"]]
    prods = [{"id": p["id"], "label": p["label"], "cat": p["category"],
              "plays": p["plays"], "desc": p["description"], "value": p["value"],
              "questions": p["questions"], "competitors": p["competitors"],
              "differentiators": p["differentiators"]} for p in data["products"]]
    conns = [[c["from"], c["to"], c["play"], c["why"]] for c in data["connections"]]
    site = {"title": data["site"]["title"],
            "mobileFooterHint": data["site"]["mobile_footer_hint"]}

    payload = (f"const SITE = {js(site)};\n"
               f"const PLAYS = {js(plays)};\n"
               f"const CATEGORIES = {js(cats)};\n"
               f"const PRODUCTS = {js(prods)};\n"
               f"const CONNECTIONS = {js(conns)};")

    out, n = re.subn(r"/\*DATA-BEGIN\*/.*?/\*DATA-END\*/",
                     lambda m: f"/*DATA-BEGIN*/\n{payload}\n/*DATA-END*/",
                     template, count=1, flags=re.S)
    if n != 1:
        sys.exit("template.html: /*DATA-BEGIN*/.../*DATA-END*/ markers not found")

    s = data["site"]
    analytics_url = (s.get("analytics_url") or "").strip()
    analytics_tag = (
        f'<script data-goatcounter="{escape(analytics_url, quote=True)}" '
        f'async src="//gc.zgo.at/count.js"></script>'
    ) if analytics_url else ""

    tokens = {
        "{{TITLE}}": escape(s["title"]),
        "{{BRAND}}": escape(s["brand"]),
        "{{YEAR}}": escape(str(s["year"])),
        "{{FOOTER_HINT}}": escape(s["footer_hint"]),
        "{{ANALYTICS_TAG}}": analytics_tag,
    }
    for token, val in tokens.items():
        out = out.replace(token, val)

    leftover = re.search(r"\{\{[A-Z_]+\}\}", out)
    if leftover:
        sys.exit(f"internal error: unreplaced token {leftover.group(0)} in output")

    OUT.parent.mkdir(exist_ok=True)
    OUT.write_text(out, encoding="utf-8", newline="\n")
    print(f"OK: {OUT.relative_to(ROOT)} — {len(plays)} plays, {len(cats)} categories, "
          f"{len(prods)} products, {len(conns)} connections")


if __name__ == "__main__":
    main()
