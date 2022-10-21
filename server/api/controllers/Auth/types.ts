import { Prisma } from '@prisma/client';

const signupData = Prisma.validator<Prisma.UserArgs>()({
  select: { first_name: true, last_name: true, email: true }
});

const signinData = Prisma.validator<Prisma.UserArgs>()({
  select: { email: true }
});

export type SignupInput = Prisma.UserGetPayload<typeof signupData> & { password: string };
export type SigninInput = Prisma.UserGetPayload<typeof signinData> & { password: string };