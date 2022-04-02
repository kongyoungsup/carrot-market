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
      const { user } = req.session;
      
      const postDetail = await client.post.findUnique({
          where:{
            id: +id.toString()
          },
          include:{
            // user: true
            user: {
              select:{
                id: true,
                name: true,
                avator: true,
              }
            },
            answers: {
              include:{
                user: {
                  select:{
                    id: true,
                    name: true,
                    avator: true
                  }
                }
              }
            },
            _count:{
              select:{
                answers:true,
                wonderings:true
              }
            },
          },
          
      });

      const wonderCheck = Boolean(await client.wondering.findFirst({
        where: {
          postId: +id,
          userId: user?.id,
        }
      }))
      

      return res.status(200).json({ 
        ok: true,
        postDetail,
        wonderCheck
      });
      
  }

  export default withApiSession(withHandler({ methods: ["GET"], fn: handler }));
