import { NextApiRequest, NextApiResponse } from 'next';
import { client } from '@libs/server/clients';
import withHandler, { ResponseType } from '@libs/server/withHandler';
// iron-session
import { withApiSession } from '@libs/server/withSession';

async function handler(
  req: NextApiRequest, 
  res: NextApiResponse<ResponseType>
) {
     const { per_page, page }= req.query
     
    const product = await client.product.findMany({
      take: +per_page,
      skip: +per_page * +page,
      include:{
        _count:{  
          select:{
            favs: true
          }
        }
      }
    })

    if (product) return res.status(200).json( 
      {
        ok: true,
        product
      }
    );
    
    
  }

  export default withApiSession(withHandler({ methods: ["GET"], fn: handler }));
