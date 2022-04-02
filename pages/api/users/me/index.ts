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

      const { name, email, phone, avatorId } = req.body;

      const { user } = req.session;
      
      let emailCheck = '';
      let phoneCheck = '';
      let nameCheck = '';
      let anonimusName = '이름없음' + user?.id

      if (email) {

          const alreadyExists = Boolean(await client.user.findUnique({
            where:{ 
              email
            }
          }))

          const myCheck = await client.user.findUnique({
            where:{ 
              id: user?.id
            },
            select:{
              email: true
            }
          })


          if (alreadyExists && email !== myCheck?.email) {
            emailCheck = 'already';
          } else if (alreadyExists && email === myCheck?.email) {
            emailCheck = 'same';
          }

          if (!alreadyExists) {
            await client.user.update({
              where:{
                id: user?.id
              },
              data:{
                email
              }
            })
            emailCheck = 'update';
          }
            
      }

      if (phone) {

        const alreadyExists = Boolean(await client.user.findUnique({
          where:{ 
            phone
          }
        }))

        const myCheck = await client.user.findUnique({
          where:{ 
            id: user?.id
          },
          select:{
            phone: true
          }
        })

        if (alreadyExists && phone !== myCheck?.phone) {
          phoneCheck = 'already';
        } else if (alreadyExists && phone === myCheck?.phone) {
          phoneCheck = 'same';
        }

        if (!alreadyExists) {
          await client.user.update({
            where:{
              id: user?.id
            },
            data:{
              phone
            }
          })
          
          phoneCheck = 'update';
        }

    }

      if (name) {

        const myCheck = await client.user.findUnique({
          where:{ 
            id: user?.id
          },
          select:{
            name: true
          }
        })

        if ( name === myCheck?.name) {
          nameCheck = 'same';
        }

        if (name !== myCheck?.name) {
          await client.user.update({
            where:{
              id: user?.id
            },
            data:{
              name
            }
          })


          nameCheck = 'update';
        }
      } else if ( !name ) {

        console.log(name);
        console.log(typeof(name));
        
        await client.user.update({
          where:{
            id: user?.id
          },
          data:{
            name : anonimusName
          }
        })

        nameCheck = 'update';
      }

      if (avatorId) {

        await client.user.update({
          where:{
            id: user?.id
          },
          data:{
            avator: avatorId
          }
        })
        
      }

      return res.status(200).json({
        ok: true,
        emailCheck,
        phoneCheck,
        nameCheck,
      });

    }

  }

  export default withApiSession(withHandler({ methods: ["GET", "POST"], fn: handler }));
