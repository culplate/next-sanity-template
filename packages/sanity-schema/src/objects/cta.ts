import { defineField, defineType } from 'sanity';

export const cta = defineType({
  name: 'cta',
  title: 'Call to Action',
  type: 'object',
  fields: [
    defineField({
      name: 'text',
      title: 'Text',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'href',
      title: 'Link',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      text: 'text',
      href: 'href',
    },
    prepare({ text, href }) {
      return {
        title: text || 'Untitled CTA',
        subtitle: href,
      };
    },
  },
});
