import { NextApiRequest, NextApiResponse } from 'next';
import { client } from '@libs/server/clients';
import withHandler, { ResponseType } from '@libs/server/withHandler';
// iron-session
import { withApiSession } from '@libs/server/withSession';

async function handler(
  req: NextApiRequest, 
  res: NextApiResponse<ResponseType>
) {
    const { query } = req
    const { chat } = req.body
    const { user } = req.session



    if (req.method === "POST") {

      const { msg, id } = req.body
      
      const creatMsg = await client.chat.create({
        data:{
          Message: msg,
          chatroom:{
            connect:{
              id: +id
            }
          },
          user:{
            connect:{
              id: user?.id
            }
          }
        }
      })

      if (!creatMsg) return res.status(404).json({ 
        ok: false
      });
  
      return res.status(200).json({ 
        ok: true,
        creatMsg
      });
    }

    if (req.method === "GET") {
      const chatMsg = await client.chatRoom.findFirst({
        where:{
          productId: +query.id
        },
        include: {
          product: true,
          chats: {
            select:{
              Message: true,
              userId: true,
              user:{
                select:{
                  avator: true
                }
              }
            }
          }
        }
      })
  
      console.log(chatMsg);
      
  
      if (!chatMsg) return res.status(404).json({ 
        ok: false
      });
  
      if (chatMsg) return res.status(200).json({ 
        ok: true,
        chatMsg
      });
    }
    

    
  }

  export default withApiSession(withHandler({ methods: ['POST',"GET"], fn: handler }));
