
import type { NextRequest ,NextFetchEvent } from 'next/server'
import { NextResponse } from 'next/server'

// page 폴더 아래에 모든 페이지에서 실행

export function middleware(req: NextRequest, ev:NextFetchEvent) {

  // const api_url = req.nextUrl.clone()
  // api_url.pathname = '/api'

  // const enter_url = req.nextUrl.clone()
  // enter_url.pathname = '/enter'

  // if ( !req.url.includes('/api') ) { // API는 withhandler 에서 보호하고 있어서, 제외
  //   if ( !req.url.includes('/enter') && !req.cookies.carrotSession ) {
  //     return NextResponse.redirect(enter_url)
  //   }
  // }

}
