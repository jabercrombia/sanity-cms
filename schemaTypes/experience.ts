import { Rule } from 'sanity'

export default {
  name: 'experience',
  title: 'Experience',
  type: 'document',
  fields: [
    {
      name: 'company',
      title: 'Company',
      type: 'string',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'jobTitle',
      title: 'Job Title',
      type: 'string',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'startDate',
      title: 'Start Date',
      type: 'date',
      options: { dateFormat: 'YYYY-MM-DD' },
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'endDate',
      title: 'End Date',
      type: 'date',
      options: { dateFormat: 'YYYY-MM-DD' },
      description: 'Leave blank if this is your current role.',
    },
    {
      name: 'jobDescription',
      title: 'Job Description',
      type: 'text',
      rows: 6,
      description: 'Supports markdown. Displayed on the home page. Falls back to Summary if blank.',
    },
    {
      name: 'logo',
      title: 'Company Logo',
      type: 'image',
      options: { hotspot: false },
      description: 'Upload a dark or black logo — the site renders it white via CSS invert.',
    },
  ],
  orderings: [
    {
      title: 'Start Date, Newest First',
      name: 'startDateDesc',
      by: [{ field: 'startDate', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'company',
      subtitle: 'jobTitle',
      media: 'logo',
    },
  },
}
