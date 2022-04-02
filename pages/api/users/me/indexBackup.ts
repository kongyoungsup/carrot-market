import { NextApiRequest, NextApiResponse } from 'next';
import { client } from '@libs/server/clients';
import withHandler, { ResponseType } from '@libs/server/withHandler';

// iron-session
import { withApiSession } from '@libs/server/withSession';

async function handler(
  req: NextApiRequest, 
  res: NextApiResponse<ResponseType>
) {
    if ( req.method === "GET") {
        // DB User의 id 와 쿠키에 저장된 세션의 id가 일치하는 레코드를 찾는다
      const profile = await client.user.findUnique({
        where: {
          id: req.session.user?.id
        }
      })
      
      if (!profile) return res.status(404).end();
      // if (!profile) return res.status(404).end();
      
      return res.status(200).json({
        ok: true,
        profile,
      });
    }

    if ( req.method === "POST") {

      const { name, email, phone } = req.body;
      const { user } = req.session;

      console.log(name, email, phone);
      
      const emailCheck = false;
      const phoneCheck = false;

      if (email) {

          const alreadyExists = Boolean(await client.user.findUnique({
            where:{ 
              email
            }
          }))

          if (alreadyExists) {
            return res.status(200).json({
              ok: false,
              error: '존재하는 이메일 입니다.'
            });
          }

            await client.user.update({
              where:{
                id: user?.id
              },
              data:{
                email
              }
            })
            
            res.status(200).json({
              ok: true,
              message: '이메일이 업데이트 되었습니다.'
            });
        
      }

      if (phone) {

        const alreadyExists = Boolean(await client.user.findUnique({
          where:{ 
            phone
          }
        }))

        if (alreadyExists) {
          return res.status(200).json({
            ok: false,
            error: '존재하는 전화번호 입니다.'
          });
        }

        await client.user.update({
          where:{
            id: user?.id
          },
          data:{
            phone
          }
        })
        
        res.status(200).json({
          ok: true,
          message: '전화번호가 업데이트 되었습니다.'
        });
      
    }

    }

  }

  export default withApiSession(withHandler({ methods: ["GET", "POST"], fn: handler }));
