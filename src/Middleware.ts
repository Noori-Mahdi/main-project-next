import jwt from 'jsonwebtoken';

const SECRET_KEY = 'your-secret-key';

export function decodeToken(token: string): { id: string } | null {
  try {
    const payload = jwt.verify(token, SECRET_KEY);
    return payload as { id: string }; 
  } catch (error) {
    console.error('Invalid token:', error);
    return null;
  }
}
