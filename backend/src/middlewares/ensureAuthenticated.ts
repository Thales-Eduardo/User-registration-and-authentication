import { Response, Request, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import authconfig from '../config/auth';
import MsgError from '../errors/MsgError';

interface TokenPayLoad {
  iat: number;
  exp: number;
  sub: string;
}

function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new MsgError('Token JWT ausente', 401);
  }

  const [, token] = authHeader.split(' ');
  try {
    const decoded = verify(token, authconfig.jwt.secret);

    const { sub } = decoded as TokenPayLoad;

    request.user = {
      id: sub,
    };
    return next();
  } catch {
    throw new MsgError('Token JWT invalido', 401);
  }
}

export default ensureAuthenticated;
