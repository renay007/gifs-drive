import { User } from "@prisma/client";
import { hash, compare } from "bcrypt";
import jwt from "jsonwebtoken";

const encryptPassword = async (password: string) => {
  return await hash(password, 10);
};

const isValidPassword = async (password: string, hash: string) => {
  return await compare(password, hash);
};

const generateToken = (user: User) => {
  const token = jwt.sign(
    {
      sub: user.user_id,
      aud: process.env.AUDIENCE,
      iss: process.env.ISSUER,
    },
    process.env.JWT_SECRET || ""
  );
  return token;
};

export { encryptPassword, isValidPassword, generateToken };
