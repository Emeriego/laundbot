import { Schema } from 'swagger-jsdoc';

export const UserSchema: Schema = {
  type: "object",
  properties: {
    id: { type: "string", format: "uuid" },
    firstname: { type: "string" },
    lastname: { type: "string" },
    address: { type: "string" },
    phone: { type: "string" },
    email: { type: "string", format: "email" },
    password: { type: "string" },
    createdAt: { type: "string", format: "date-time" },
    updatedAt: { type: "string", format: "date-time" },
  },
  required: ["id", "firstname", "lastname", "email", "password"],
};
