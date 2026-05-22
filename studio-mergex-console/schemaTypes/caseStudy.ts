import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'caseStudy',
  title: 'Case Study',
  type: 'document',
  fields: [
    defineField({
      name: 'clientName',
      title: 'Client Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'clientName',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'industry',
      title: 'Industry',
      type: 'string',
      validation: (Rule) => Rule.required(),
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
        },
      ],
    }),
    defineField({
      name: 'constraint',
      title: 'Constraint',
      type: 'text',
      description: 'The primary bottleneck or challenge the founder was experiencing.',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'diagnosis',
      title: 'Diagnosis',
      type: 'text',
      description: 'The root cause constraint diagnosed by MergeX.',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'intervention',
      title: 'Intervention',
      type: 'array',
      description: 'The strategic prescription, architecture, and systems built by MergeX.',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'outcome',
      title: 'Outcome',
      type: 'text',
      description: 'The quantitative and qualitative changes that occurred post-intervention.',
      rows: 4,
    }),
    defineField({
      name: 'metrics',
      title: 'Metrics & Results',
      type: 'array',
      description: 'Key performance metrics to display as highlights.',
      of: [
        {
          type: 'object',
          name: 'metric',
          fields: [
            { name: 'value', type: 'string', title: 'Value (e.g., +40% or $2.4M)' },
            { name: 'label', type: 'string', title: 'Label (e.g., Revenue Growth or CAC Reduction)' },
          ],
        },
      ],
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery Images',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'testimonial',
      title: 'Testimonial',
      type: 'object',
      fields: [
        { name: 'quote', type: 'text', title: 'Quote' },
        { name: 'author', type: 'string', title: 'Author Name' },
        { name: 'role', type: 'string', title: 'Author Role / Company' },
      ],
    }),
    defineField({
      name: 'publishedDate',
      title: 'Published Date',
      type: 'date',
      validation: (Rule) => Rule.required(),
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
  preview: {
    select: {
      clientName: 'clientName',
      industry: 'industry',
      media: 'coverImage',
    },
    prepare(selection) {
      const { clientName, industry, media } = selection
      return {
        title: clientName,
        subtitle: industry ? `Industry: ${industry}` : 'No Industry Specified',
        media: media,
      }
    },
  },
})
