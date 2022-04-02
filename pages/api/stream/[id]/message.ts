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

    const stream = await client.message.create({
      data:{
        message: chat,
        stream:{
          connect:{
            id: +query.id
          }
        },
        user:{
          connect:{
            id: user?.id,
          }
        }
      }
    })

    console.log(stream);
    

    if (!stream) return res.status(404).json({ 
      ok: false
    });

    if (stream) return res.status(200).json({ 
      ok: true,
      stream
    });

    console.log(stream);
    
    
  }

  export default withApiSession(withHandler({ methods: ["POST"], fn: handler }));
