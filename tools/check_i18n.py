"""Check every i18n/<code>.js translation file against the English master in index.html.

Usage:  python tools/check_i18n.py [code ...]

Errors (exit 1): missing or extra keys, list lengths that differ from English, plural entries
missing a category the language needs, a lost {n} placeholder, HTML in a string, or an IBM
product name or competitor brand that appears in the English text but not in the translation.
Warnings: strings left identical to English (could be fine for short labels).
"""
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

# Intl.PluralRules(lang).resolvedOptions().pluralCategories, for cardinal numbers.
PLURALS = {
    'bg': ['one', 'other'], 'cs': ['one', 'few', 'many', 'other'], 'da': ['one', 'other'],
    'de': ['one', 'other'], 'es': ['one', 'many', 'other'], 'fr': ['one', 'many', 'other'],
    'hr': ['one', 'few', 'other'], 'hu': ['one', 'other'], 'pl': ['one', 'few', 'many', 'other'],
    'pt': ['one', 'many', 'other'], 'sk': ['one', 'few', 'many', 'other'],
    'sl': ['one', 'two', 'few', 'other'], 'sv': ['one', 'other'],
    'uk': ['one', 'few', 'many', 'other'], 'nl': ['one', 'other'], 'nb': ['one', 'other'],
    'et': ['one', 'other'], 'fi': ['one', 'other'],
    'ar-MA': ['zero', 'one', 'two', 'few', 'many', 'other'],
}
# A country variant (meta.base set) holds only what differs from its base language; it is
# checked after being laid over the base, with the base's plural rules.



# (path, name) pairs where the English text contains a product name as an ordinary phrase,
# so the translation need not keep it: "native watsonx.data integration" means integrating
# natively with watsonx.data, not the product called watsonx.data integration.
# Entries a pack may have that the English does not: the country's contact addresses.
PACK_ONLY = {'ui.brandContacts'}

NAME_CHECK_EXCEPTIONS = {
    ('products.db2.value', 'watsonx.data integration'),
}


def const(src, name):
    m = re.search(r'const ' + name + r' = (.*?);\n', src, re.S)
    if not m:
        sys.exit(f'index.html: const {name} not found')
    return json.loads(m.group(1))


def load_english():
    src = (ROOT / 'index.html').read_text(encoding='utf-8')
    plays = const(src, 'PLAYS')
    products = const(src, 'PRODUCTS')
    return {
        'ui': const(src, 'UI_EN'),
        'plays': {k: {'name': v['name'], 'short': v['short']} for k, v in plays.items()},
        'categories': {c['id']: c['label'] for c in const(src, 'CATEGORIES')},
        'products': {p['id']: {k: p[k] for k in ('desc', 'value', 'questions', 'differentiators')}
                     for p in products},
        'competitors': {g: g for g in const(src, 'GENERIC_COMPETITORS')},
        'connections': {f'{a}>{b}': t for a, b, _, t in const(src, 'CONNECTIONS')},
    }, products


def load_lang(path):
    text = path.read_text(encoding='utf-8')
    m = re.search(r"window\.I18N(?:\.([a-z]+)|\['([a-z]+-[A-Z]+)'\]) = (\{.*\});\s*$", text, re.S)
    if not m:
        raise ValueError("""expected "window.I18N.<code> = { ... };" or "window.I18N['xx-YY'] = { ... };\"""")
    return m.group(1) or m.group(2), json.loads(m.group(3))


def names_in(text, names):
    return [n for n in names if re.search(r'(?<![\w.])' + re.escape(n) + r'(?![\w])', text)]


def check(code, data, en, names):
    errors, warnings = [], []
    cats = PLURALS.get(code)
    if cats is None:
        return [f'unknown language code {code!r}; add it to PLURALS'], []

    meta = data.get('meta', {})
    if not meta.get('name') or not meta.get('htmlLang'):
        errors.append('meta.name and meta.htmlLang are required')

    def compare(path, e, t):
        if isinstance(e, dict) and set(e) <= {'one', 'two', 'few', 'many', 'other'} and path.startswith('ui.'):
            if not isinstance(t, dict):
                errors.append(f'{path}: expected plural object')
                return
            missing = [c for c in cats if c not in t]
            if missing:
                errors.append(f'{path}: missing plural categories {missing}')
            for c, s in t.items():
                if c not in cats:
                    errors.append(f'{path}.{c}: category not used by {code}')
                elif '{n}' not in s:
                    errors.append(f'{path}.{c}: lost the {{n}} placeholder')
                else:
                    compare_str(f'{path}.{c}', e.get(c, e['other']), s)
        elif isinstance(e, dict):
            if not isinstance(t, dict):
                errors.append(f'{path}: expected object')
                return
            for k in e.keys() - t.keys():
                errors.append(f'{path}.{k}: missing')
            for k in t.keys() - e.keys():
                if f'{path}.{k}' not in PACK_ONLY:
                    errors.append(f'{path}.{k}: not in English')
            for k in e.keys() & t.keys():
                compare(f'{path}.{k}', e[k], t[k])
        elif isinstance(e, list):
            if not isinstance(t, list) or len(t) != len(e):
                errors.append(f'{path}: expected {len(e)} items')
                return
            for i, (a, b) in enumerate(zip(e, t)):
                compare_str(f'{path}[{i}]', a, b)
        else:
            compare_str(path, e, t)

    def compare_str(path, e, t):
        if not isinstance(t, str) or not t.strip():
            errors.append(f'{path}: empty or not a string')
            return
        if re.search(r'<[a-zA-Z/]', t):
            errors.append(f'{path}: contains HTML')
        lost = [n for n in names_in(e, names) if n not in t and (path, n) not in NAME_CHECK_EXCEPTIONS]
        if lost:
            errors.append(f'{path}: name(s) changed or dropped: {lost}')
        # A name the English already implies is not an addition: a shorter name inside a
        # longer one (watsonx.data in watsonx.data integration), or a full name where the
        # English uses the short form ("Data intelligence", "Fusion HCI"; also catches the
        # Slavic conjunction "i" after IBM).
        en_names = names_in(e, names)

        def implied(n):
            tail = n.split(' ', 1)[1] if ' ' in n else n.split('.', 1)[-1]
            return any(n in m for m in en_names) or re.search(
                r'(?<!\w)' + re.escape(tail) + r'(?!\w)', e, re.I)
        # "IBM i" is skipped: in Slavic languages "IBM i ..." is usually "IBM and ...".
        added = [n for n in names_in(t, names)
                 if n not in en_names and n != 'IBM i' and not implied(n)]
        if added:
            warnings.append(f'{path}: name(s) not in the English: {added}')
        if t == e and len(e.split()) > 3:
            warnings.append(f'{path}: identical to English')

    for section in ('ui', 'plays', 'categories', 'products', 'competitors', 'connections'):
        if section not in data:
            errors.append(f'{section}: missing section')
        else:
            compare(section, en[section], data[section])
    return errors, warnings


def main():
    sys.stdout.reconfigure(encoding='utf-8')
    en, products = load_english()
    # Names that must survive translation untouched: product labels and brand competitors.
    names = {p['label'] for p in products}
    names |= {c for p in products for c in p['competitors']} - set(en['competitors'])
    names = sorted(names, key=len, reverse=True)

    files = sorted((ROOT / 'i18n').glob('*.js'))
    if len(sys.argv) > 1:
        files = [f for f in files if f.stem in sys.argv[1:]]
    failed = False
    for f in files:
        try:
            code, data = load_lang(f)
        except (ValueError, json.JSONDecodeError) as exc:
            print(f'{f.name}: cannot parse: {exc}')
            failed = True
            continue
        if code != f.stem:
            print(f'{f.name}: assigns window.I18N.{code}, expected {f.stem}')
            failed = True
        plural_code, pre = f.stem, []
        base = data.get('meta', {}).get('base')
        if base:
            pre = [f'{s}.{k}: not in the English'
                   for s, entries in data.items() if s != 'meta' and isinstance(entries, dict)
                   for k in entries if k not in en.get(s, {}) and f'{s}.{k}' not in PACK_ONLY]
            try:
                _, base_data = load_lang(ROOT / 'i18n' / f'{base}.js')
            except (OSError, ValueError, json.JSONDecodeError) as exc:
                print(f'{f.name}: cannot load base {base}: {exc}')
                failed = True
                continue
            data = {s: {**base_data.get(s, {}), **data.get(s, {})}
                    for s in set(base_data) | set(data)}
            plural_code = base
        errors, warnings = check(plural_code, data, en, names)
        errors = pre + errors
        status = 'FAIL' if errors else 'ok'
        print(f'{f.name}: {status} ({len(errors)} errors, {len(warnings)} warnings)')
        for e in errors:
            print('  error  ', e)
        for w in warnings:
            print('  warning', w)
        failed |= bool(errors)
    if not files:
        print('no i18n/*.js files found')
    sys.exit(1 if failed else 0)


if __name__ == '__main__':
    main()
