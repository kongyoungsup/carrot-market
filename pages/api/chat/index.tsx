import { NextApiRequest, NextApiResponse } from 'next';
import { client } from '@libs/server/clients';
import withHandler, { ResponseType } from '@libs/server/withHandler';
// iron-session
import { withApiSession } from '@libs/server/withSession';

async function handler(
  req: NextApiRequest, 
  res: NextApiResponse<ResponseType>
) {

  const {user} = req.session
    const chatRoomList = await client.chatRoom.findMany({
      where:{
        OR:[
          {createById: user?.id,},
          {createForId: user?.id,}
        ]
      },
      include:{
        createFor:{
          select:{
            id: true,
            name: true,
            avator: true
          }
        },
        createBy:{
          select:{
            id: true,
            name: true,
            avator: true
          }
        },
        chats:{
          take: 1,
          orderBy: {
            createdAt: 'desc'
          },
          select:{
            Message: true,
            userId: true
          }
        }
      }
    })

    if (!chatRoomList) return res.status(404).json({ 
      ok: false
    });

    if (chatRoomList) return res.status(200).json({ 
      ok: true,
      id: chatRoomList
    });

  }

  export default withApiSession(withHandler({ methods: ['GET'], fn: handler }));
