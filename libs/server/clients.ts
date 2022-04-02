import { PrismaClient } from '@prisma/client'

declare global {
  // allow global `var` declarations
  // eslint-disable-next-line no-var
  var client: PrismaClient | undefined
}

export const client = global.client || new PrismaClient();
// export const client = global.client || new PrismaClient({ log: ['query] }); // 데이터베이스 쿼리 확인

if (process.env.NODE_ENV !== 'production') global.client = client



//  npx prisma generate

// import { PrismaClient } from '@prisma/client';

// export const client = new PrismaClient();



// import { PrismaClient } from "@prisma/client";

// declare global {
//   var client: PrismaClient | undefined;
// }

// const client = global.client || new PrismaClient();

// if (process.env.NODE_ENV === "development") global.client = client;

// export default client;