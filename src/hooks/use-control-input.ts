import { useRef } from "react"

const useControlInput = () => {
  const inputRef = useRef<HTMLInputElement>(null)

  return inputRef
}

export default useControlInput
