import cookies from "js-cookie"

const name = "token"

export const signIn = (authToken: string) => {
  cookies.set(name, authToken, {
    expires: 1,
    secure: true,
  })
}

export const signOut = () => {
  cookies.remove(name, {
    secure: true,
  })
}

export const isAuthenticated = () => {
  const availableToken = cookies.get(name)
  if (!availableToken) return false
  return true
}
