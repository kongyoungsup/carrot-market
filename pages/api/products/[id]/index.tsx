import { NextApiRequest, NextApiResponse } from 'next';
import { client } from '@libs/server/clients';
import withHandler, { ResponseType } from '@libs/server/withHandler';
// iron-session
import { withApiSession } from '@libs/server/withSession';

async function handler(
  req: NextApiRequest, 
  res: NextApiResponse<ResponseType>
) {   
      // 상품 상세페이지
      const { id } = req.query;
      const { user }  = req.session;
      console.log(req.session);
      

      const product = await client.product.findUnique({
          where:{
            id: +id
          },
          include:{
            // user: true
            user: {
              select:{
                id: true,
                name: true,
                avator: true,
              }
            }
          }
      });

      // 추천 상품
      const terms = product?.name.split(" ").map( (word) => (
          { 
            name: {
              contains: word,
            }  
          }
      ) );
      
      const relatedProduct = await client.product.findMany({
          where:{
            OR: terms,
            AND: {
              id:{
                not: product?.id,
              }
            }
          },
          select:{
            id: true,
            name: true,
            price: true,
          }
      })

      const isLiked = Boolean(await client.fav.findFirst({
        where: {
          productId: +id,
          userId: user?.id,
        }
      })) 
      
      return res.status(200).json({ 
        ok: true,
        product,
        relatedProduct,
        isLiked
      });
      
  }

  export default withApiSession(withHandler({ methods: ["GET"], fn: handler }));
