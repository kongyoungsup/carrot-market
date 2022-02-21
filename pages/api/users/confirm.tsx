import { NextApiRequest, NextApiResponse } from 'next';
import { client } from '@libs/server/clients';
import withHandler, { ResponseType } from '@libs/server/withHandler';
// iron-session
import { withApiSession } from '@libs/server/withSession';

async function handler(
  req: NextApiRequest, 
  res: NextApiResponse<ResponseType>
) {
    // (save) 클라이언트에서 post 한 값을 token 객체에 저장
    const { token } = req.body;

    // (serch) DB Token 에서 payload == token 일치하는 레코드를 찾아서 foundToken 에 저장
    const foundToken = await client.token.findUnique({
      where: {
        payload: token
      }
    })

    // (if err) foundToken === undefined 이면 404에러코드
    if (!foundToken) return res.status(404).end();
    
    // (save session)찾은 foundToken 객체의 userId 값을  session.user.id 에 할당
    req.session.user = {
      id: foundToken.userId
    }

    // (save Token) 복호화된 토큰을 브라우저 쿠키에 저장 
    // (복호화된 토큰은 userId 를 가지고 있다.)
    await req.session.save();

    // 저장된 유저의 토큰은 삭제 한다.
    await client.token.deleteMany({
      where: {
        userId: foundToken.userId,
      }
    })

    return res.status(200).json({
      ok: true,
    });
  }

  export default withApiSession(withHandler({ method: "POST", fn: handler, isPrivate: false }));
