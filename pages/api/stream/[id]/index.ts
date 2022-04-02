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

    const stream = await client.stream.findUnique({
      where:{
        id: +query.id
      },
      include:{
        user:{
          select:{
            id: true,
            name: true,
            avator: true
          }
        },
        messages:{
          include:{
            user: {
              select:{
                avator: true
              }
            }
          }
        }
      }
    })




    if (!stream) return res.status(404).json({ 
      ok: false
    });

    if (stream) return res.status(200).json({ 
      ok: true,
      stream
    });

    console.log(stream);
    
    
  }

  export default withApiSession(withHandler({ methods: ["GET"], fn: handler }));
