import z from "zod";

// Example
// const userSchema = z.object({
//   userName: z.string(),
//   age: z.number(),
//   email: z.string().email(),
// });

const userSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export default userSchema;
