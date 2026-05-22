import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'insight',
  title: 'Insight',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      description: 'A brief summary of the article (used in listing pages).',
      rows: 3,
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          description: 'Important for SEO and accessibility.',
        },
      ],
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Systems', value: 'Systems' },
          { title: 'Operations', value: 'Operations' },
          { title: 'Commercial', value: 'Commercial' },
          { title: 'Brand', value: 'Brand' },
          { title: 'Scale', value: 'Scale' },
          { title: 'Infrastructure', value: 'Infrastructure' },
          { title: 'Leadership', value: 'Leadership' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'readingTime',
      title: 'Reading Time (Minutes)',
      type: 'number',
      description: 'Estimated reading time for the article.',
    }),
    defineField({
      name: 'publishedDate',
      title: 'Published Date',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'string',
    }),
    defineField({
      name: 'bodyContent',
      title: 'Body Content',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'featuredInsight',
      title: 'Featured Insight',
      type: 'boolean',
      description: 'Featured insights are displayed in hero sections or highlighted rows.',
      initialValue: false,
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      description: 'Overrides the main title for search engine results. Keep under 60 characters.',
      validation: (Rule) => Rule.max(60).warning('SEO Title should be under 60 characters.'),
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      description: 'Used as the meta description for search engine results. Keep under 160 characters.',
      rows: 3,
      validation: (Rule) => Rule.max(160).warning('SEO Description should be under 160 characters.'),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category',
      media: 'coverImage',
    },
    prepare(selection) {
      const { title, category, media } = selection
      return {
        title: title,
        subtitle: category ? `Category: ${category}` : 'No Category',
        media: media,
      }
    },
  },
})
