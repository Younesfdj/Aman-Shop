import { defineField, defineType } from "sanity";
export const client = defineType({
  name: "client",
  title: "Clients",
  type: "document",
  fields: [
    defineField({
      name: "firstName",
      title: "First name",
      type: "string",
    }),
    {
      name: "lastName",
      title: "Last name",
      type: "string",
    },
    {
        name:"orders",
        title:"Orders",
        type:"array",
        of: [
          {
            type: 'object',
            fields: [
              {
                name: 'product',
                title: 'Product',
                type: 'string',
              },
              {
                name: 'quantity',
                title: 'Quantity',
                type: 'number',
              },
            ],
          },
        ],
    },
    {
        name:"phone",
        title:'Phone',
        type:"number"
    },
    {
        name:"address",
        title:"Address",
        type:"string"
    },
    {
        name:"email",
        title:"Email",
        type:"string"
    }
  ],
});
