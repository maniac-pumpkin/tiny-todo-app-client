const pathnameToString = (pathname: string) => {
  const path = pathname.replace("/", "").toLowerCase()
  return path.charAt(0).toUpperCase() + path.slice(1)
}

export default pathnameToString
