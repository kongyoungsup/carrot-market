import { User } from '@prisma/client';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useSWR from 'swr'

interface TypeUser {
  ok: boolean;
  profile: User
}

export default function useUser() {
  
  const { data, error } = useSWR<TypeUser>('/api/users/me');
  const router = useRouter();

  useEffect(() => {
    if ( data && !data.ok ) {
      router.replace("/enter");
      return
    }
  }, [data, router]);
  
  return { 
    user: data?.profile, 
    isLoding: !data && !error 
  };

}


//////// legacy Type

// export default function useUser() {

//   const [user, setUser] = useState();
//   const router = useRouter();
  
//   useEffect(() => {

//     fetch('/api/users/me')
//       .then( (response) => response.json() )
//       .then( (data) => {
//         if (!data.ok) {
//           return router.replace('/enter');  // replace(브라우져 히스토리를 남기지 않음), push(브라우져 히스토리를 남김)
//         }
//         setUser(data.profile);
//        })
//   }, [router]);

//   return user;
// }