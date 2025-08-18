import type { CollectionConfig } from 'payload'
import slugify from 'slugify'

export const Products: CollectionConfig = {
  slug: 'products',
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
      label: 'Product Title',
      required: true,
      localized: true,
    },
    {
      name: 'slug',
      type: 'text',
      label: 'Slug',
      unique: true,
      required: true,
      hooks: {
        beforeChange: [
          async ({ data, req, operation }) => {
            if (data?.title) {
              let baseSlug = slugify(data.title, { lower: true, strict: true })

              // If this is a duplicate operation, make the slug unique
              if (operation === 'create' && data.slug) {
                // Check if slug already exists and append a number
                const existingDocs = await req.payload.find({
                  collection: 'products',
                  where: {
                    slug: {
                      like: baseSlug,
                    },
                  },
                })

                if (existingDocs.docs.length > 0) {
                  baseSlug = `${baseSlug}-${Date.now()}`
                }
              }

              return baseSlug
            }
            return data?.slug
          },
        ],
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Product Image',
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
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      label: 'Category',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'preview',
      type: 'upload',
      relationTo: 'media',
      label: 'Preview video',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'excerpt',
      type: 'textarea',
      label: 'Excerpt',
      required: true,
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Content',
    },
    {
      name: 'filesurl',
      type: 'array',
      label: 'Files bu url(for large files)',
      fields: [
        {
          name: 'filename',
          type: 'text',
          label: 'File name',
          required: false,
        },
        {
          name: 'fileurl',
          type: 'text',
          label: 'File URL',
          required: false,
        },
      ],
    },

    {
      name: 'deal_title',
      type: 'text',
      label: 'Deal Title',
      required: false,
      localized: true,
      admin: {
        condition: (data, siblingData, { blockData, path, user }) => {
          if (data?.category === 6) {
            return true
          }
          return false
        },
      },
    },
    {
      name: 'deal_discount',
      type: 'number',
      label: 'Deal Discount',
      required: false,
      admin: {
        condition: (data, siblingData, { blockData, path, user }) => {
          if (data?.category === 6) {
            return true
          }
          return false
        },
      },
    },
    {
      name: 'deal_old_price',
      type: 'number',
      label: 'Deal Old Price',
      required: false,
      admin: {
        condition: (data, siblingData, { blockData, path, user }) => {
          if (data?.category === 6) {
            return true
          }
          return false
        },
      },
    },
    {
      name: 'includes',
      type: 'array',
      label: 'Includes',
      localized: true,
      fields: [
        {
          name: 'model',
          type: 'text',
          label: 'Model',
          localized: true,
        },
      ],
      admin: {
        condition: (data, siblingData, { blockData, path, user }) => {
          if (data?.category === 6) {
            return true
          }
          return false
        },
      },
    },
    {
      name: 'button_text',
      type: 'text',
      label: 'Button Text',
      required: false,
      localized: true,
      admin: {
        condition: (data, siblingData, { blockData, path, user }) => {
          if (data?.category === 6) {
            return true
          }
          return false
        },
      },
    },
  ],
  hooks: {
    afterChange: [
      async ({ doc }) => {
        console.log(doc)
      },
    ],
    /*afterChange: [
      async ({ doc }) => {
        try {
          const response = await fetch('https://modulixo.com/api/revalidate', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              tags: ['products'],
            }),
          })

          if (!response.ok) {
            console.error('Cache revalidation failed:', response.statusText)
          } else {
            console.log('Cache revalidation triggered successfully.')
          }
        } catch (error) {
          console.error('Error triggering cache revalidation:', error)
        }
      },
    ],*/
  },
}
