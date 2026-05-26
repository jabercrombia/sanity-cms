import { defineField } from 'sanity'


export default {
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
    },
    {
      name: 'body',
      title: 'Body',
      type: 'text',
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',  // renders as a tag input UI
      },
    },
    {
        name: 'excerpt',
        title: 'Excerpt',
        type: 'text',
        rows: 3,
        validation: (Rule) => Rule.max(256),
    },
    {
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
    },
    defineField({
      name: 'language',
      type: 'string',
      readOnly: true,
      hidden: true,
    }),
  ],
}