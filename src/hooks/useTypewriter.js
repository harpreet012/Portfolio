import { useEffect, useState } from 'react'

const useTypewriter = (words, speed = 90, hold = 1200) => {
  const [index, setIndex] = useState(0)
  const [subIndex, setSubIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (!words?.length) return undefined

    const timeout = setTimeout(
      () => {
        const currentWord = words[index]

        if (!deleting && subIndex === currentWord.length) {
          setTimeout(() => setDeleting(true), hold)
          return
        }

        if (deleting && subIndex === 0) {
          setDeleting(false)
          setIndex((prev) => (prev + 1) % words.length)
          return
        }

        setSubIndex((prev) => prev + (deleting ? -1 : 1))
      },
      deleting ? speed / 2 : speed,
    )

    return () => clearTimeout(timeout)
  }, [words, index, subIndex, deleting, speed, hold])

  return words?.[index]?.slice(0, subIndex) || ''
}

export default useTypewriter
