import { Button } from "@/components/ui/button"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form as FormWrapper,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { isAuthenticated } from "@/lib/auth"
import { zodResolver } from "@hookform/resolvers/zod"
import { createFileRoute, Link, redirect } from "@tanstack/react-router"
import { useForm } from "react-hook-form"
import { z } from "zod"

export const Route = createFileRoute("/auth/sign-up")({
  beforeLoad: () => {
    if (isAuthenticated())
      throw redirect({
        to: "/app",
      })
  },

  component: RouteComponent,
})

const formSchema = z.object({
  username: z.string(),
  password: z.string(),
  email: z.string().email(),
})

function RouteComponent() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      email: "",
    },
  })

  const onFormSubmit = async (values: z.infer<typeof formSchema>) => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/users/sign-up`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: values.username,
          password: values.password,
          email: values.email,
        }),
      },
    )

    const data = await response.text()

    if (!response.ok) {
      alert(data)
      return
    }

    alert("Please check your inbox. and go to /auth/sign-in")
  }

  return (
    <section className="flex h-screen flex-col items-center justify-center">
      <FormWrapper {...form}>
        <h1>Sign in</h1>
        <form className="space-y-5" onSubmit={form.handleSubmit(onFormSubmit)}>
          <FormField
            name="username"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="e.g admin"
                    {...field}
                    required
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="password"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="e.g admin"
                    {...field}
                    required
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="e.g tiredOfLife@gmail.com"
                    {...field}
                    required
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Sign up</Button>
          <Link to="/auth/sign-in">Go to sign-in page</Link>
        </form>
      </FormWrapper>
    </section>
  )
}
