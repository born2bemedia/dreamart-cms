import type { CollectionConfig, PayloadRequest } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: {
    forgotPassword: {
      generateEmailHTML: (args?: { token?: string }) => {
        const resetLink = `${process.env.WEB_FRONT_URL}/forgot-password?token=${args?.token}`

        return `
          <div style="font-family: sans-serif; line-height: 1.5;">
            <h2>Password Reset Request</h2>
            <p>You requested a password reset. Click the button below to reset your password.</p>
            <p><a href="${resetLink}" style="display: inline-block; background-color: white; color: black; padding: 16px 24px; text-decoration: none; border: 1px solid black;">Reset Password</a></p>
            <p>If you didn’t request this, just ignore this email.</p>
          </div>
        `
      },
    },
  },
  access: {
    /*read: function (args: { req: PayloadRequest }) {
      return args.req.user?.role === 'admin'
    },*/
    read: () => true,
    create: () => true,
    update: () => true,
  },
  fields: [
    {
      name: 'firstName',
      type: 'text',
      label: 'First Name',
      required: true,
    },
    {
      name: 'lastName',
      type: 'text',
      label: 'Last Name',
      required: true,
    },
    {
      name: 'username',
      type: 'text',
      label: 'Username',
      required: false,
    },
    {
      name: 'phone',
      type: 'text',
      label: 'Phone',
      required: false,
    },
    {
      name: 'address1',
      type: 'text',
      label: 'Address line 1',
      required: false,
    },
    {
      name: 'address2',
      type: 'textarea',
      label: 'Address line 2',
      required: false,
    },
    {
      name: 'city',
      type: 'text',
      label: 'City',
      required: false,
    },
    {
      name: 'state',
      type: 'text',
      label: 'State',
      required: false,
    },
    {
      name: 'zip',
      type: 'text',
      label: 'Zip Code',
      required: false,
    },
    {
      name: 'country',
      type: 'text',
      label: 'Country',
      required: false,
    },
    {
      name: 'role',
      type: 'select',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Customer', value: 'customer' },
      ],
      defaultValue: 'customer',
      required: true,
    },
  ],
}
