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
| `logo` | image | | Dark/black logo — inverted to white in UI |

Default sort: **Start Date, Newest First**

## Resources

- [Sanity docs](https://www.sanity.io/docs)
- [Sanity community](https://www.sanity.io/community/join)
- [Extending with plugins](https://www.sanity.io/docs/content-studio/extending)
