import { NextApiRequest, NextApiResponse } from 'next';
import { client } from '@libs/server/clients';
import withHandler, { ResponseType } from '@libs/server/withHandler';
// iron-session
import { withApiSession } from '@libs/server/withSession';

async function handler(
  req: NextApiRequest, 
  res: NextApiResponse<ResponseType>
) {
      const { id } = req.query
      const { user }  = req.session

      // fev DB 에서 상품id 와 유저id가 일치하는 레코드가 있는지 find
      const find = await client.wondering.findFirst({
        where: {
          postId: +id,
          userId: user?.id,
        }
      })
      
      // 일치하는 레코드가 있으면 삭제
      if (find) {
        await client.wondering.delete({
          where: {
            id: find.id
          } 
        })

      // 일치하는 레코드가 없으면 추가
      } else {
        await client.wondering.create({
          data: {
            post:{
              connect:{
                id: +id
              }
            },
            user: {
              connect:{
                id: user?.id
              }
            }
          }
        })
      }
      
      
      return res.status(200).json({ 
        ok: true
      });
      
  }

  export default withApiSession(withHandler({ methods: ["POST"], fn: handler }));
