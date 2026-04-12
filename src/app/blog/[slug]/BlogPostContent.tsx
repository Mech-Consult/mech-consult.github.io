'use client'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export default function BlogPostContent({ content }: { content: string }) {
  return (
    <article className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-p:text-gray-300 prose-a:text-accent prose-strong:text-white prose-code:text-accent prose-code:bg-secondary prose-code:px-1 prose-code:rounded prose-pre:bg-secondary prose-pre:border prose-pre:border-gray-700">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {content}
      </ReactMarkdown>
    </article>
  )
}
