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
        body: { answer },
        query,
        session: { user }
      } = req;
      
      console.log(req.body);
      
      const answerData = await client.answer.create({
        data: { 
          anwer: answer,
          user: {
            connect:{
              id: user?.id
            }
          },
          post: {
            connect:{
              id: +query.id
            }
          }
        }
      })

      if (!answerData) return res.status(404).end();
    
      return res.status(200).json({ 
        ok: true,
        answerData
      });

  }

  export default withApiSession(withHandler({ methods: ["POST"], fn: handler }));
