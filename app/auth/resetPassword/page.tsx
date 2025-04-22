import { buttonVariants } from "@/components/ui/button";
import { Frown } from "lucide-react";
import React from "react"
import { validateToken } from "./action";
import { redirect } from "next/navigation";
import Link from "next/link";
import ResetPasswordForm from "./reset-password-form";

export default async function ResetPasswordPage(props: { searchParams: Promise<{ token: string }> }) {
  const searchParams = await props.searchParams;
  const token = searchParams?.token;
  let response;
  try {
    response = await validateToken(token);
  } catch {
    return (
      <div className="flex flex-col items-center justify-center p-4">
        <Frown className="h-24 w-24 text-red-500 mb-4" />
        <p className="text-sm mb-4 text-center">
          El servidor no está disponible en este momento. Por favor, inténtalo nuevamente más tarde.
        </p>
        <Link href="/auth/login" className={`${buttonVariants({ variant: 'default' })} mt-2 w-full`}>Volver al inicio de sesión</Link>
      </div>
    );
  }

  if (!token) {
    redirect("/auth/login");
  }

  if (response.status !== 200) {
    return (
      <div className="flex flex-col items-center justify-center p-4">
        <Frown className="h-24 w-24 text-red-500 mb-4" />
        <p className="text-sm mb-4 text-center">
          {response.message}
        </p>
        <Link href="/auth/login" className={`${buttonVariants({ variant: 'default' })} mt-2 w-full`}>Volver al inicio de sesión</Link>
      </div>
    );
  }

  return <ResetPasswordForm token={token} />;
}
