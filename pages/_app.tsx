import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SWRConfig } from 'swr';
import useUser from '@libs/client/useUser';


const fetcher = (url: string) => fetch(url).then((res) => res.json())

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig value={{
      // refreshInterval: 3000,
      fetcher
    }}
  >
    <div className=' max-w-lg w-full mx-auto '>
      <Component {...pageProps} />
    </div>
    </SWRConfig>

  );
}

export default MyApp;


// 