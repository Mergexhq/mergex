import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'career',
  title: 'Career Role',
  type: 'document',
  fields: [
    defineField({
      name: 'roleTitle',
      title: 'Role Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'roleTitle',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'department',
      title: 'Department',
      type: 'string',
    }),
    defineField({
      name: 'employmentType',
      title: 'Employment Type',
      type: 'string',
      options: {
        list: [
          { title: 'Full-time', value: 'Full-time' },
          { title: 'Part-time', value: 'Part-time' },
          { title: 'Contract', value: 'Contract' },
          { title: 'Internship', value: 'Internship' },
        ],
      },
      initialValue: 'Full-time',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      initialValue: 'Remote',
    }),
    defineField({
      name: 'roleOverview',
      title: 'Role Overview',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'responsibilities',
      title: 'Responsibilities',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'requirements',
      title: 'Requirements',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Open', value: 'Open' },
          { title: 'Closed', value: 'Closed' },
        ],
      },
      initialValue: 'Open',
    }),
    defineField({
      name: 'applyLink',
      title: 'Apply Link',
      type: 'url',
    }),
    defineField({
      name: 'publishedDate',
      title: 'Published Date',
      type: 'date',
    }),
  ],
  preview: {
    select: {
      title: 'roleTitle',
      department: 'department',
      status: 'status',
    },
    prepare(selection) {
      const { title, department, status } = selection
      return {
        title: title,
        subtitle: `${department || 'General'} | Status: ${status}`,
      }
    },
  },
})
