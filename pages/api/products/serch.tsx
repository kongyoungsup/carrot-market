import { NextApiRequest, NextApiResponse } from 'next';
import { client } from '@libs/server/clients';
import withHandler, { ResponseType } from '@libs/server/withHandler';
// iron-session
import { withApiSession } from '@libs/server/withSession';

async function handler(
  req: NextApiRequest, 
  res: NextApiResponse<ResponseType>
) {
    const { keyword }: any = req.query;
    
    const terms = keyword?.split(" ").map( (word: any) => (
      { 
        name: {
          contains: word,
        }  
      }
    ) );
    
    const product = await client.product.findMany({
      where:{
        OR: terms
      },
      include:{
        _count:{   // product 가 연결된 fav의 count
          select:{
            favs: true
          }
        }
      }
    })

    
    if (!product) return res.status(200).json({ 
      ok: false
    });

    if (product) return res.status(200).json({ 
      ok: true,
      product,
    });
  }

  export default withApiSession(withHandler({ methods: ["GET"], fn: handler }));
