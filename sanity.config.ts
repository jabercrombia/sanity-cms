import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import { documentInternationalization } from '@sanity/document-internationalization'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'pandora',

  projectId: 'qcwptqki',
  dataset: 'production',

  plugins: [structureTool(), visionTool(), documentInternationalization({
      supportedLanguages: [
        { id: 'es', title: 'Spanish' },
        { id: 'fr', title: 'French' },
        { id: 'it', title: 'Italian' },
      ],
      schemaTypes: ['post'],
    }),],

  schema: {
    types: schemaTypes,
  },
})
