import { NextApiRequest, NextApiResponse } from 'next';
import { client } from '@libs/server/clients';
import withHandler, { ResponseType } from '@libs/server/withHandler';

// iron-session
import { withApiSession } from '@libs/server/withSession';

async function handler(
  req: NextApiRequest, 
  res: NextApiResponse<ResponseType>
) { 
  
    const cfResponse = await (await fetch(`https://api.cloudflare.com/client/v4/accounts/${process.env.CF_ACCOUNT_ID}/images/v2/direct_upload`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.CF_IMG_TOKEN}`,
        }
      }
    )).json()

    return res.status(200).json({
      ok: true,
      result: cfResponse.result
    });

  }

  export default withApiSession(withHandler({ methods: ['GET'], fn: handler }));
