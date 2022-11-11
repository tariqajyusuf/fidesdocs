import { NextResponse, NextRequest } from 'next/server'

//absolute url to be fixed upon deployment 
/*export async function middleware(req, ev) {
    const { pathname } = req.nextUrl
    if (pathname == '/') {
        return NextResponse.redirect('http://localhost:3000/fides/overview')
    }
    return NextResponse.next()
}
*/