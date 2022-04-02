import { NextApiRequest, NextApiResponse } from 'next';

export interface ResponseType{
  ok: boolean;
  [key: string]: any;
}

type method = "GET" | "POST" | "DELETE";

interface ConfigType{
  methods: method[]; 
  fn: (req: NextApiRequest, res: NextApiResponse) => void, // void.. 이 함수는 아무것도 반환하지 않아;
  isPrivate?: boolean;
}

export default function withHandler( {
  methods, 
  fn, 
  isPrivate = true
}: ConfigType ) {

  // 맞춤형 함수를 리턴함.
  return async function (req: NextApiRequest, res: NextApiResponse) : Promise<any> {

    // 만약, API 요청("GET","POST","DELETE")이 메소드 값과 맞지 않다면,
    if (req.method && !methods.includes(req.method as any)) {
      return res.status(405).end();
    }

    // 만약, isPrivate 이고 session.user 가 없다면 (로그인 하지 않았다면)
    if (isPrivate && !req.session.user) {
      return res.status(401).json({ ok: false, error: 'plase login..' });
    }

    // handler 함수를 실행
    try{
      await fn(req, res); // handler 코드를 대치함..
    }catch (err) {
      console.log(err);
      return res.status(500).json({ error: err })
    }
  }
  
}
