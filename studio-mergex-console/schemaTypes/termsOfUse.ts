import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'termsOfUse',
  title: 'Terms of Use',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      initialValue: 'Terms of Use',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'lastUpdated',
      title: 'Last Updated',
      type: 'date',
    }),
    defineField({
      name: 'content',
      title: 'Rich Content',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      validation: (Rule) => Rule.max(60).warning('SEO Title should be under 60 characters.'),
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.max(160).warning('SEO Description should be under 160 characters.'),
    }),
  ],
})
