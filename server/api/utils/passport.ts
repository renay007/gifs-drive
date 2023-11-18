import { PrismaClient } from "@prisma/client";
import passport from "passport";
import {
  Strategy as JwtStrategy,
  ExtractJwt,
  StrategyOptions,
} from "passport-jwt";

const cookieExtractor = function (req: { cookies: { [x: string]: any } }) {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["jwt"];
  }
  return token;
};

const opts: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
  issuer: process.env.ISSUER,
  audience: process.env.AUDIENCE,
};

const cookieOpts: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
  secretOrKey: process.env.JWT_SECRET,
  issuer: process.env.ISSUER,
  audience: process.env.AUDIENCE,
};

export const jwtStrategy = (prisma: PrismaClient) => {
  return new JwtStrategy(cookieOpts, async (payload, done) => {
    const { sub } = payload;
    try {
      const where = { user_id: sub };
      const user = await prisma.user.findUnique({ where });
      if (user) {
        const { hashed_password, ...rest } = user;
        return done(null, rest);
      } else {
        return done("jwtStrategy error", false);
      }
    } catch (error) {
      return done(error, false);
    }
  });
};

export const authenticate = () =>
  passport.authenticate("jwt", { session: false });
