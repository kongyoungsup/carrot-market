import { NextApiRequest, NextApiResponse } from 'next';
import { client } from '@libs/server/clients';
import withHandler, { ResponseType } from '@libs/server/withHandler';
// iron-session
import { withApiSession } from '@libs/server/withSession';


async function handler(
  req: NextApiRequest, 
  res: NextApiResponse
) {
    if ( req.method === "GET" ) {

        // const { latitude, longitude } = req.query;
        // const parseLatitude = parseFloat(latitude.toString())
        // const parseLongitude = parseFloat(longitude.toString())
        
        const posts = await client.post.findMany({
          // where:{
          //   latitude:{
          //     gte: parseLatitude - 0.02,
          //     lte: parseLatitude + 0.02
          //   },
          //   longitude:{
          //     gte: parseLongitude - 0.02,
          //     lte: parseLongitude + 0.02
          //   }
          // },
          include:{
            user:{ 
              select:{
                id: true,
                name: true,
                email: true
                } 
            },
            _count:{
              select:{
                answers: true,
                wonderings: true
              }
            }
          }


        })

        if (!posts) return res.status(404).end();

        return res.status(200).json({ 
          ok: true,
          posts
        });
    }

    if ( req.method === "POST" ) {

        const {
          body: { desc, latitude, longitude },
          session: { user }
        } = req;

        const post = await client.post.create({
          data: { 
            question: desc,
            latitude,
            longitude,
            user: {
              connect:{
                id: user?.id
              }
            }
          }
        })

        if (!post) return res.status(404).end();
        
    
          await res.unstable_revalidate('/community')
          
          return res.status(200).json({ 
            ok: true,
            postId: post.id
          });

    }
    
  }

  export default withApiSession(withHandler({ methods: ["GET", "POST"], fn: handler }));
