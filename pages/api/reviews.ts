import { NextApiRequest, NextApiResponse } from 'next';
import { client } from '@libs/server/clients';
import withHandler, { ResponseType } from '@libs/server/withHandler';

// iron-session
import { withApiSession } from '@libs/server/withSession';

async function handler(
  req: NextApiRequest, 
  res: NextApiResponse<ResponseType>
) { 
    const { user } = req.session
    
    const reviews = await client.review.findMany({
      where: {
        createForId: user?.id
      },
      include: {
        createBy: {
            select: {
              id: true,
              name: true,
              avator: true
            }
        }
      }
    })
    
    if (!reviews) return res.status(404).end();
    // if (!profile) return res.status(404).end();
    
    return res.status(200).json({
      ok: true,
      reviews,
    });

  }

  export default withApiSession(withHandler({ methods: ["GET",'POST'], fn: handler }));
