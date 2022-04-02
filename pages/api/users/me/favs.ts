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
    
    const favs = await client.fav.findMany({
      where: {
        userId: user?.id
      },
      include:{
        product: {
          include:{
            _count:{
              select:{
                favs: true
              }
            }
          }
        }
      }
    })
    
    if (!favs) return res.status(404).end();
    // if (!profile) return res.status(404).end();
    
    return res.status(200).json({
      ok: true,
      favs,
    });

  }


  export default withApiSession(withHandler({ methods: ["GET",'POST'], fn: handler }));
