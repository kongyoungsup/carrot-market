import { NextApiRequest, NextApiResponse } from 'next';
import { client } from '@libs/server/clients';
import withHandler, { ResponseType } from '@libs/server/withHandler';
// iron-session
import { withApiSession } from '@libs/server/withSession';

async function handler(
  req: NextApiRequest, 
  res: NextApiResponse<ResponseType>
) {
    
      const {
        session: { user },
        query: { id }
      } = req;
      
      const findProduct = await client.product.findFirst({
        where:{
          id: +id
        }
      })
      
      const checkChatRoom = await client.chatRoom.findFirst({
        where:{
          productId: +id
        }
      })

      if (!checkChatRoom) {
        const chatRoom = await client.chatRoom.create({
          data:{
            createBy: {
              connect:{
                id: user?.id
              }
            },
            createFor: {
              connect:{
                id: findProduct?.userId
              }
            },
            product:{
              connect:{
                id: +id
              }
            }
          }
        })

        if (!chatRoom) return res.status(404).json({ 
          ok: false
        });

        if (chatRoom) return res.status(200).json({ 
          ok: true,
          id: chatRoom.productId
        });
      }

      if (checkChatRoom) {
        return res.status(200).json({ 
          ok: true,
          id: checkChatRoom.productId
        });
      }
    
  }

  export default withApiSession(withHandler({ methods: ["POST"], fn: handler }));
