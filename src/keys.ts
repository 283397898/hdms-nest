import { readFileSync } from 'fs';

export const publicKey = readFileSync('key/rsa/rsa_public_key.pem');
export const privateKey = readFileSync('key/rsa/rsa_private_key.pem');
