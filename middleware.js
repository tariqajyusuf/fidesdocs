import { NextResponse, NextRequest } from 'next/server'

//absolute url to be fixed upon deployment 
export async function middleware(req, ev) {
    const { pathname, origin } = req.nextUrl
    if (pathname == `${origin}/about`) {
        return NextResponse.redirect('http://localhost:3000/fides/overview')
    }
    return NextResponse.next()
}
