import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "seu-secret-super-seguro-aqui";
const JWT_REFRESH_SECRET =
  process.env.JWT_REFRESH_SECRET || "seu-refresh-secret-aqui";

export interface JwtPayload {
  userId: string;
  email: string;
  type: string;
}

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export class JwtService {
  private static instance: JwtService;

  public static getInstance(): JwtService {
    if (!JwtService.instance) {
      JwtService.instance = new JwtService();
    }
    return JwtService.instance;
  }

  generateAccessToken(payload: JwtPayload): string {
    return jwt.sign(payload, JWT_SECRET, {
      expiresIn: "3d",
      issuer: "your-app-name",
      audience: "your-app-users",
    });
  }

  generateRefreshToken(payload: JwtPayload): string {
    return jwt.sign(payload, JWT_REFRESH_SECRET, {
      expiresIn: "7d",
      issuer: "your-app-name",
      audience: "your-app-users",
    });
  }

  generateTokenPair(payload: JwtPayload): TokenPair {
    const accessToken = this.generateAccessToken(payload);
    const refreshToken = this.generateRefreshToken(payload);

    const decoded = jwt.decode(accessToken) as { exp: number };
    const expiresIn = decoded.exp - Math.floor(Date.now() / 1000);

    return {
      accessToken,
      refreshToken,
      expiresIn,
    };
  }

  verifyAccessToken(token: string): JwtPayload {
    try {
      return jwt.verify(token, JWT_SECRET) as JwtPayload;
    } catch {
      throw new Error("Token inválido ou expirado");
    }
  }

  verifyRefreshToken(token: string): JwtPayload {
    try {
      return jwt.verify(token, JWT_REFRESH_SECRET) as JwtPayload;
    } catch {
      throw new Error("Refresh token inválido ou expirado");
    }
  }

  decodeToken(token: string): JwtPayload | null {
    try {
      return jwt.decode(token) as JwtPayload;
    } catch {
      return null;
    }
  }
}

export const jwtService = JwtService.getInstance();
