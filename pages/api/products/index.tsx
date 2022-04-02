import { NextApiRequest, NextApiResponse } from 'next';
import { client } from '@libs/server/clients';
import withHandler, { ResponseType } from '@libs/server/withHandler';
// iron-session
import { withApiSession } from '@libs/server/withSession';

async function handler(
  req: NextApiRequest, 
  res: NextApiResponse<ResponseType>
) {
    console.log(req.session);
    
    if ( req.method === "GET" ) {

        // Product 리스트 호출, *관계된 favs count 포함
        const product = await client.product.findMany({
          include:{
            _count:{   // product 가 연결된 fav의 count
              select:{
                favs: true
              }
            }
          }
        })

        if (product) return res.status(200).json({ 
          ok: true,
          product
        });

    }

    if ( req.method === "POST" ) {
        const {
          body: { name, price, desc, productImgId },
          session: { user }
        } = req;

        console.log(name, price, desc, productImgId);
        
    
        const product = await client.product.create({
          data: {
            image: productImgId,
            name: name,
            price: +price,
            description: desc,
            user: {
              connect: {
                id: user?.id
              }
            }
          }
        })

        if (!product) return res.status(404).end();
      
        return res.status(200).json({ 
          ok: true,
          product
        });

    }
    

    // (if err) foundToken === undefined 이면 404에러코드

    
  }

  export default withApiSession(withHandler({ methods: ["GET", "POST"], fn: handler }));
