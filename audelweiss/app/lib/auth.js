// app/lib/auth.js
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export function generateToken(user) {
    return jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
        expiresIn: "7d",
    });
}

export function verifyToken(token) {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        return null;
    }
}
