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
import { isAuthenticated, signIn } from "@/lib/auth"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  createFileRoute,
  Link,
  redirect,
  useNavigate,
} from "@tanstack/react-router"
import { useForm } from "react-hook-form"
import { z } from "zod"

export const Route = createFileRoute("/auth/sign-in")({
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
})

function RouteComponent() {
  const navigate = useNavigate()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  })

  const onFormSubmit = async (values: z.infer<typeof formSchema>) => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/users/sign-in`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: values.username,
          password: values.password,
        }),
      },
    )

    const data = await response.text()

    if (!response.ok) {
      alert(data)
      return
    }

    console.log(data)
    signIn(data)
    navigate({ to: "/app" })
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
          <Button type="submit">Sign in</Button>
          <Link to="/auth/sign-up">Go to sign-up page</Link>
        </form>
      </FormWrapper>
    </section>
  )
}
