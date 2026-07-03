# Editing the map content

Everything shown on the site — products, descriptions, discovery questions, competitors, connections, even the counts in the footer — comes from one file: **[data.yaml](data.yaml)**. You do not need to touch any HTML or code, and you cannot break the live site: every change is checked automatically before it can be published.

## How to make a change

1. Open [data.yaml](data.yaml) on GitHub and click the **pencil icon** (Edit this file).
2. Make your change (see recipes below).
3. Scroll down, click **Commit changes...**, choose **"Create a new branch and start a pull request"**, and click **Propose changes**.
4. On the pull request page, wait a minute for the **Validate content** check:
   - **Green tick** — your change is valid. Click **Merge pull request**. The live site updates in ~2 minutes.
   - **Red X** — something is wrong. Click **Details** to see the exact problem and line number (e.g. `data.yaml:363 duplicate product id 'guardium'`). Edit the file on your branch to fix it; the check re-runs automatically.

## Recipes

### Add a product

Copy an existing product block under `products:` and edit it:

```yaml
  - id: my_new_product          # unique, lowercase letters/numbers/underscores
    label: My New Product       # the name shown on the map
    category: storage           # one of the ids under "categories:"
    plays: [6]                  # one or more play ids (1-6)
    description: >-
      What the product is, in a sentence or two.
    value: >-
      The value proposition shown in the detail panel.
    questions:
      - A discovery question to ask the customer?
    competitors:
      - Competitor A
    differentiators:
      - What makes it stand out
```

Then give it at least one line on the map by adding a connection at the bottom:

```yaml
  - from: my_new_product
    to: flashsystem             # the product it connects to
    play: 6                     # picks the line colour (usually the shared play)
    why: One sentence explaining the synergy, shown in the detail panel.
```

The product counts in the footer update by themselves.

### Remove a product

Delete its block under `products:` **and every connection that mentions its id**. If you miss one, the check fails and lists the exact lines to fix.

### Edit text

Just change the text. Two things to know:

- If your text contains a **colon (`:`)**, wrap the whole text in `"double quotes"`.
- `description:` and `value:` use `>-` followed by indented lines — that's one paragraph split over several lines; keep the indentation.

### Change site text

The `site:` section at the top controls the page title, the brand name in the header and footer, the year badge, and the hint lines in the footer.

## What's checked before publishing

Duplicate ids, connections pointing at products that don't exist, products in categories that don't exist, self-connections, duplicate connections, and missing or empty required fields. If any check fails, the site simply doesn't update — the previous version stays live.

## For developers

`python build.py` (needs Python + PyYAML) validates `data.yaml` and injects it into `template.html`, writing `dist/index.html` — the exact file that gets deployed. See [DEPLOYMENT.md](DEPLOYMENT.md).
