import type { CollectionConfig } from 'payload'
import slugify from 'slugify'

export const PricingPackages: CollectionConfig = {
  slug: 'pricing-packages',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
    create: ({ req }) => req.user?.role === 'admin',
    update: ({ req }) => req.user?.role === 'admin',
    delete: ({ req }) => req.user?.role === 'admin',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Pricing Package Title',
      required: true,
      localized: true,
    },
    {
      name: 'slug',
      type: 'text',
      label: 'Slug',
      unique: true,
      hooks: {
        beforeChange: [
          async ({ data }) => {
            if (data?.title) {
              return slugify(data.title, { lower: true, strict: true })
            }
          },
        ],
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Pricing Package Description',
      required: false,
      localized: true,
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'pricing-categories',
      label: 'Pricing Category',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'price',
      type: 'number',
      label: 'Price',
    },
    {
      name: 'includes',
      type: 'array',
      label: 'Includes',
      fields: [
        {
          name: 'feature',
          type: 'text',
          label: 'Feature',
        },
      ],
    },
    {
      name: 'button_text',
      type: 'text',
      label: 'Button Text',
      required: false,
      localized: true,
    },
  ],
}
