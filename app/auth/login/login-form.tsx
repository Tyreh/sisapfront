"use client"
import FormPasswordInput from "@/components/ui/form/form-password-input";
import FormInput from "@/components/ui/form/form-input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { z } from "zod"

const formSchema = z.object({
  username: z.string({ required_error: "Este campo es obligatorio" }).min(1, "Este campo es obligatorio").max(25, "El usuario ingresado no es válido"),
  password: z.string({ required_error: "Este campo es obligatorio" }).min(1, "Este campo es obligatorio").max(30, "La contraseña ingresada no es válida")
});

interface Props {
  apiUrl: string;
}

export function LoginForm({ apiUrl }: Props) {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    try {

      const response = await fetch(`${apiUrl}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: values.username, password: values.password }),
        credentials: "include",
      });
      const data = await response.json();

      if (data.status === 200) {
        router.push("/dashboard");
      } else {
        setError(data.message);
        setLoading(false);
      }
    } catch {
      setError("El servidor no está disponible en este momento. Por favor, inténtalo nuevamente más tarde.");
      setLoading(false);
    }

  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className='grid gap-4'>
          <FormInput name="username" label="Usuario" props={{ disabled: loading, placeholder: "Nombre de usuario" }} />
          <FormPasswordInput name="password" label="Contraseña" control={form.control} props={{ disabled: loading, placeholder: "*********" }} />
          {error && <p className="text-sm mt-2 text-red-500">{error}</p>}
          <Button type="submit" loading={loading} className="mt-2">Iniciar Sesión</Button>
        </div>
      </form>
    </Form>
  );
}
