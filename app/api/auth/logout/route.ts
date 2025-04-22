import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST() {
  const cookieStore = cookies();

  // Elimina la cookie del token
  (await
        // Elimina la cookie del token
        cookieStore).delete('accessToken');
        (await
            // Elimina la cookie del token
            cookieStore).delete('refreshToken');

  return NextResponse.json({ message: 'Sesión cerrada' }, { status: 200 });
}
