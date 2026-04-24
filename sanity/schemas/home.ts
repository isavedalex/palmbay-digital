import { defineType, defineField } from "sanity";

export default defineType({
  name: "home",
  title: "Home Page",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Internal title",
      type: "string",
      description: "Only used in Studio to identify the document.",
      initialValue: "Home",
    }),
    defineField({
      name: "heading",
      title: "Hero heading",
      type: "string",
      description: "The large display heading (e.g. PALM BAY DIGITAL).",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "subheading",
      title: "Hero subheading",
      type: "string",
    }),
    defineField({
      name: "body",
      title: "Hero body paragraph",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "ctaLabel",
      title: "CTA button label",
      type: "string",
      initialValue: "Work with us",
    }),
    defineField({
      name: "ctaUrl",
      title: "CTA button URL",
      type: "url",
      description: "External link (e.g. Typeform) or internal path.",
      validation: (rule) =>
        rule.uri({ allowRelative: true, scheme: ["http", "https", "mailto", "tel"] }),
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seoFields",
    }),
  ],
  preview: {
    select: { title: "title", heading: "heading" },
    prepare({ title, heading }) {
      return { title: title || "Home", subtitle: heading };
    },
  },
});
