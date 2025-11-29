const z = require("zod");

const UserSchema = z.object({
  name: z
    .string()
    .min(6, "The name must be at least 6 characters long")
    .max(32, "The name can be only of a maximun of 32 characters"),
  email: z.email(),
  phone: z.coerce.number().int().gte(1000000000).lte(9999999999),
  password: z
    .string()
    .min(6, "The password must be at least 6 characters long")
    .max(32, "The password must be a maximun 32 characters"),
});

module.exports = {
  UserSchema,
};
