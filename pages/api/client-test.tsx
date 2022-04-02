import { NextApiRequest, NextApiResponse } from 'next';
import { client } from '@libs/server/clients';

export default async function handler(
  req:NextApiRequest, 
  res: NextApiResponse
){

  await client.user.create({
    data: {
      email: "hi1",
      name: "sam1"
    }
  });

  res.json({
    ok111: true
  });
}