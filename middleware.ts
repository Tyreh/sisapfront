import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";

export async function middleware(request: NextRequest) {
    if (request.nextUrl.pathname === '/') {
        return NextResponse.next();
    }
    const refreshToken = request.cookies.get("refreshToken")?.value;
    const accessToken = request.cookies.get("accessToken")?.value;

    if (refreshToken || request.nextUrl.pathname.startsWith('/auth')) {
        try {
            await fetch(`${process.env.API_URL}/auth/checkApiStatus`);
        } catch {
            const response = NextResponse.next();
            response.cookies.set({
                name: 'accessToken',
                value: '',
                path: '/',
                maxAge: 0,
            });
            response.cookies.set({
                name: 'refreshToken',
                value: '',
                path: '/',
                maxAge: 0,
            });

            return response;
        }
    }

    if (!refreshToken && !request.nextUrl.pathname.startsWith('/auth')) {
        return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    if (refreshToken && request.nextUrl.pathname.startsWith('/auth')) {
        const response = NextResponse.next();

        response.cookies.set({
            name: 'accessToken',
            value: '',
            path: '/',
            maxAge: 0,
        });
        response.cookies.set({
            name: 'refreshToken',
            value: '',
            path: '/',
            maxAge: 0,
        });

        return response;
    }

    if (!accessToken && refreshToken) {
        let refreshRes: any = await fetch(`${process.env.API_URL}/auth/refreshToken`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ refreshToken: refreshToken }),
            credentials: 'include',
        });

        refreshRes = await refreshRes.json();
        const decoded: { exp: number } = jwtDecode(refreshRes.data.accessToken);
        const expiresInSeconds = decoded.exp - Math.floor(Date.now() / 1000);

        const response = NextResponse.next();
        response.cookies.set({
            name: 'accessToken',
            value: refreshRes.data.accessToken,
            path: '/',
            httpOnly: true, // opcional
            secure: process.env.NODE_ENV === 'production', // importante en producción
            maxAge: expiresInSeconds
        })
        return response;
    }
    return NextResponse.next();

}

export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"]
};
