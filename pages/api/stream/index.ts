import { NextApiRequest, NextApiResponse } from 'next';
import { client } from '@libs/server/clients';
import withHandler, { ResponseType } from '@libs/server/withHandler';
// iron-session
import { withApiSession } from '@libs/server/withSession';

async function handler(
  req: NextApiRequest, 
  res: NextApiResponse<ResponseType>
) {
    
    if ( req.method === "GET" ) {
        const { page, pageLimit } = req.query;
        // console.log(query);
        const pageCount = +page 
        console.log(page, pageLimit);
        
         
        const streamList = await client.stream.findMany({
          take: +pageLimit, 
          skip: +pageLimit * +pageCount
        })

        // 아이템 갯수
        const streamCount = await client.stream.count()

        if (!streamList) return res.status(404).json({ 
          ok: false
        });

        if (streamList) return res.status(200).json({ 
          ok: true,
          streamList,
          streamCount
        });
    }

    if ( req.method === "POST" ) {
        const {
          body: { name, price, description },
          session: { user }
        } = req;
        
        const stream = await client.stream.create({
          data:{
            name,
            price,
            description,
            user:{
              connect:{
                id: user?.id
              }
            }
          }
        })

        if (!stream) return res.status(404).json({ 
          ok: false
        });

        if (stream) return res.status(200).json({ 
          ok: true,
          streamId: stream.id
        });

    }
    
    
  }

  export default withApiSession(withHandler({ methods: ["GET", "POST"], fn: handler }));
