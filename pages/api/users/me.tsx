import { NextApiRequest, NextApiResponse } from 'next';
import { client } from '@libs/server/clients';
import withHandler, { ResponseType } from '@libs/server/withHandler';

// iron-session
import { withApiSession } from '@libs/server/withSession';

async function handler(
  req: NextApiRequest, 
  res: NextApiResponse<ResponseType>
) {
    // DB User의 id 와 쿠키에 저장된 세션의 id가 일치하는 레코드를 찾는다
    const profile = await client.user.findUnique({
      where: {
        id: req.session.user?.id
      }
    })
    
    if (!profile) return res.status(404).end();
    // if (!profile) return res.status(404).end();
    
    return res.status(200).json({
      ok: true,
      profile,
    });

  }

  export default withApiSession(withHandler({ method: "GET", fn: handler }));
