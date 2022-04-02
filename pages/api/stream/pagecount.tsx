import { NextApiRequest, NextApiResponse } from 'next';
import { client } from '@libs/server/clients';
import withHandler, { ResponseType } from '@libs/server/withHandler';
// iron-session
import { withApiSession } from '@libs/server/withSession';

async function handler(
  req: NextApiRequest, 
  res: NextApiResponse<ResponseType>
) {
    
        // 아이템 갯수
        const streamCount = await client.stream.count()

        if (!streamCount) return res.status(404).json({ 
          ok: false
        });

        if (streamCount) return res.status(200).json({ 
          ok: true,
          streamCount
        });
    
  }

  export default withApiSession(withHandler({ methods: ["GET"], fn: handler }));
