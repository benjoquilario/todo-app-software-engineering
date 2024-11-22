import * as z from 'zod';

export const credentialsValidators = z.object({
  email: z.string().email({
    message: 'Invalid email format',
  }),
  password: z.string().min(4, {
    message: 'Password is required',
  }),
});

export const createUserValidators = credentialsValidators
  .extend({
    firstName: z.string().min(2, {
      message: 'First name is required',
    }),
    lastName: z.string().min(2, {
      message: 'Last name is required',
    }),
    confirmPassword: z.string().min(4, {
      message: 'Password must be at least 4 characters long',
    }),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: 'custom',
        message: 'Passwords do not match',
      });
    }
  });
