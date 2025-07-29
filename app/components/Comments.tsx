'use client'

import Giscus from '@giscus/react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export default function Comments() {
  const { theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null // avoid hydration mismatch

  return (
    <Giscus
      id="comments"
      repo="vigneshwar221B/blog"
      repoId="R_kgDOPQF9Pg"
      category="General"
      categoryId="DIC_kwDOPQF9Ps4CtUCS"
      mapping="pathname"
      strict="0"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="top"
      theme={resolvedTheme === 'dark' ? 'dark' : 'light'}
      lang="en"
      loading="lazy"
    />
  )
}
