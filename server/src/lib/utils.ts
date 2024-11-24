import { compare, hash } from 'bcryptjs';
import jwt from 'jsonwebtoken';

const SALT_ROUNDS = 10;
export async function comparePassword(password: string, hash: string) {
  return compare(password, hash);
}

export async function hashPassword(password: string) {
  return hash(password, SALT_ROUNDS);
}
//

export function verifyJwt(token: string) {
  return jwt.verify(token, process.env.JWT_SECRET!);
}
