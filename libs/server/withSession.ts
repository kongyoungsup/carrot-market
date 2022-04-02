import { withIronSessionApiRoute, withIronSessionSsr } from "iron-session/next";
import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextApiHandler,
} from "next";

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

export function withApiSession(fn: any) {
  return withIronSessionApiRoute(fn, sessionState);
}

export function withSsrSession<P extends { [key: string]: unknown } = { [key: string]: unknown },>
(handler: ( context: GetServerSidePropsContext,) => GetServerSidePropsResult<P> | Promise<GetServerSidePropsResult<P> >,
) {
  return withIronSessionSsr(handler, sessionState);
}