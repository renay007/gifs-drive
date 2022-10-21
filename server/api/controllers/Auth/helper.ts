import { hash, compare } from 'bcrypt';

const encryptPassword = async (password: string) => {
  return await hash(password, 10);
}

const isValidPassword = async (password: string, hash: string) => {
  return await compare(password, hash);
}

export {
  encryptPassword,
  isValidPassword
}