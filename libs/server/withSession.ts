import { withIronSessionApiRoute } from "iron-session/next";

declare module "iron-session" {
  interface IronSessionData {
    user?: {
      id: number;
    }
  }
}

const sessionState = {
  cookieName: "carrotSession",
  password: process.env.IRON_PASSWORD!,
}

export function withApiSession(fn:any) {
  return withIronSessionApiRoute(fn, sessionState);
}