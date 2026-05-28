import Anthropic from '@anthropic-ai/sdk'
import { createClient } from '@sanity/client'

const LANGUAGES = [
  { id: 'es', title: 'Spanish' },
  { id: 'fr', title: 'French' },
  { id: 'it', title: 'Italian' },
]

const FIELDS_TO_TRANSLATE = ['jobDescription']

const sanity = createClient({
  projectId: 'qcwptqki',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

const ai = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

const TONE = `You are translating professional portfolio content for a senior software engineer.
Keep the tone confident, concise, and achievement-focused.
Preserve technical terms in their original form (e.g. Algolia, Contentstack, Next.js, Vercel, API).
Do not add filler phrases or soften the language.`

async function translate(text: string, targetLanguage: string): Promise<string> {
  const response = await ai.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 1024,
    system: TONE,
    messages: [
      {
        role: 'user',
        content: `Translate the following text to ${targetLanguage}. Return only the translated text, no explanation.\n\n${text}`,
      },
    ],
  })
  const block = response.content[0]
  if (block.type !== 'text') throw new Error('Unexpected response type')
  return block.text
}

async function main() {
  const allTypes = await sanity.fetch(`array::unique(*[]._type)`)
  console.log('Document types in dataset:', allTypes)

  const docs = await sanity.fetch(
    `*[_type == "experience"]`,
    {},
    { perspective: 'previewDrafts' }
  )
  console.log(`Found ${docs.length} experience document(s)`)

  for (const doc of docs) {
    console.log(`\nTranslating: ${doc.company} — ${doc.jobTitle}`)

    for (const lang of LANGUAGES) {
      const patch: Record<string, string> = {}

      for (const field of FIELDS_TO_TRANSLATE) {
        const value = doc[field]
        if (!value) continue

        console.log(`  [${lang.id}] ${field}...`)
        patch[`${field}_${lang.id}`] = await translate(value, lang.title)
      }

      if (Object.keys(patch).length > 0) {
        await sanity.patch(doc._id).set(patch).commit()
        console.log(`  [${lang.id}] saved`)
      }
    }
  }

  console.log('\nDone.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
