const z = require("zod");

const UserSchema = z.object({
  name: z
    .string()
    .min(1, "The name must be at least 1 characters long")
    .max(32, "The name can be only of a maximun of 32 characters"),
  email: z.email("email is required"),
  phone: z.coerce.number().int().gte(1000000000).lte(9999999999),
  password: z
    .string()
    .min(4, "The password must be at least 6 characters long")
    .max(32, "The password must be a maximun 32 characters"),
});

const userUpdateSchema = z.object({
  name: z.preprocess(
    (val) => (val === "" ? undefined : val),
    z
      .string()
      .min(1, "The name must be at least 1 characters long")
      .max(32, "The name can be only of a maximun of 32 characters")
      .optional()
  ),
  email: z.preprocess(
    (val) => (val === "" ? undefined : val),
    z.email().optional()
  ),
  phone: z.preprocess(
    (val) => (val === "" ? undefined : val),
    z.coerce.number().int().gte(1000000000).lte(9999999999).optional()
  ),
});

module.exports = {
  UserSchema,
  userUpdateSchema,
};
