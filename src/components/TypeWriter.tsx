'use client'

import { useEffect, useState } from 'react'

interface TypeWriterProps {
  words: string[]
  className?: string
  typingSpeed?: number
  deletingSpeed?: number
  pauseDuration?: number
}

export default function TypeWriter({
  words,
  className = '',
  typingSpeed = 80,
  deletingSpeed = 50,
  pauseDuration = 2000,
}: TypeWriterProps) {
  const [text, setText] = useState('')
  const [wordIndex, setWordIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentWord = words[wordIndex]

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setText(currentWord.slice(0, text.length + 1))
        if (text.length + 1 === currentWord.length) {
          setTimeout(() => setIsDeleting(true), pauseDuration)
        }
      } else {
        setText(currentWord.slice(0, text.length - 1))
        if (text.length === 0) {
          setIsDeleting(false)
          setWordIndex((prev) => (prev + 1) % words.length)
        }
      }
    }, isDeleting ? deletingSpeed : typingSpeed)

    return () => clearTimeout(timeout)
  }, [text, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pauseDuration])

  return (
    <span className={className}>
      {text}
      <span className="animate-blink border-r-2 border-accent ml-0.5">&nbsp;</span>
    </span>
  )
}
