# Sanity CMS

Content Studio for managing site content. Built with Sanity.

## Getting Started

```bash
npm install
npm run dev
```

Studio runs at `http://localhost:3333`.

## Schema Types

### Post (`post`)

Blog post document.

| Field | Type | Required | Notes |
|---|---|---|---|
| `title` | string | | |
| `slug` | slug | | Auto-generated from title |
| `body` | text | | |
| `tags` | array of string | | Rendered as tag input |
| `excerpt` | text | | Max 256 characters |
| `publishedAt` | datetime | | |
| `language` | string | | Read-only, hidden — set by i18n plugin |

---

### Experience (`experience`)

Work history entries for the home page.

| Field | Type | Required | Notes |
|---|---|---|---|
| `company` | string | yes | |
| `jobTitle` | string | yes | |
| `startDate` | date | yes | Format `YYYY-MM-DD` |
| `endDate` | date | | Leave blank for current role |
| `jobDescription` | text | | Markdown supported |
| `jobDescription_es` | text | | Auto-translated — Spanish |
| `jobDescription_fr` | text | | Auto-translated — French |
| `jobDescription_it` | text | | Auto-translated — Italian |
| `logo` | image | | Dark/black logo — inverted to white in UI |

Default sort: **Start Date, Newest First**

---

## AI Translation

Translates `experience` documents into Spanish, French, and Italian using the Claude API.

### Setup

Add the following to a `.env` file at the project root:

```
ANTHROPIC_API_KEY=sk-ant-...
SANITY_API_TOKEN=sk-...
```

- **Anthropic API key** — [console.anthropic.com](https://console.anthropic.com)
- **Sanity API token** — [sanity.io/manage](https://sanity.io/manage) → your project → API → Tokens (set permission to **Editor**)

### Run

```bash
npm run translate
```

Translations are saved back to each document as `jobDescription_es`, `jobDescription_fr`, and `jobDescription_it`. Re-running the script overwrites existing translations.

### Tone

Edit the `TONE` constant in `scripts/translate-experience.ts` to adjust the translation style. The default is confident and achievement-focused, preserving technical terms as-is.

---

## Resources

- [Sanity docs](https://www.sanity.io/docs)
- [Sanity community](https://www.sanity.io/community/join)
- [Extending with plugins](https://www.sanity.io/docs/content-studio/extending)
