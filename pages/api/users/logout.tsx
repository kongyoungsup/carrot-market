import { NextApiRequest, NextApiResponse } from 'next';
import { client } from '@libs/server/clients';
import withHandler, { ResponseType } from '@libs/server/withHandler';
// iron-session
import { withApiSession } from '@libs/server/withSession';

async function handler(
  req: NextApiRequest, 
  res: NextApiResponse<ResponseType>
) {
    await req.session.destroy();


    return res.status(200).json({
      ok: true,
    });
  }

  export default withApiSession(withHandler({ methods: ["POST"], fn: handler, isPrivate: false }));
