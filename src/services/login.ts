import * as jwt from 'jsonwebtoken';
import * as crypto from 'crypto';
import * as bcrypt from 'bcrypt';

/**
 * config
 */
const secret = 'delivery-node';
const saltRounds = 10;

/*
 *  token
 * 3 day expires
 */
export function sign (data) {
    return jwt.sign({
        data,
    }, secret, { expiresIn: 60 * 60 * 24 * 3 });
}

/*
 * decode token
 */
export function decode (token) {
    try {
        return jwt.verify(token, secret);
    } catch (error) {
        throw error;
    }
}

/*
 * bcrypt the password
 */
export async function encrypte (password) {
    const hash = await bcrypt.hash(password, saltRounds);

    return hash;
}

/*
 * compare
 */
export async function compare (password, passwordHash) {
    const isMatch = await bcrypt.compare(password, passwordHash);

    return isMatch;
}

/* 解码前端加密 */
export async function bsDecode (str) {
    const decipher = crypto.createDecipher('aes192', 'deliveryIsen');

    let decrypted = decipher.update(str, 'hex', 'utf8');

    decrypted += decipher.final('utf8');

    return decrypted;
}