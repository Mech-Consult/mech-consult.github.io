import Link from 'next/link'
import { BLOG_POSTS } from '@/lib/static-data'
import BlogPostContent from './BlogPostContent'

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }))
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = BLOG_POSTS.find(p => p.slug === params.slug)

  if (!post) return (
    <div className="min-h-screen flex items-center justify-center flex-col gap-4">
      <p className="text-gray-400 text-lg">Post not found</p>
      <Link href="/blog" className="text-accent hover:text-blue-400">Back to Blog</Link>
    </div>
  )

  return (
    <div>
      {/* Hero */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary">
        <div className="container max-w-4xl">
          <Link href="/blog" className="text-accent hover:text-blue-400 transition text-sm mb-4 inline-block">&larr; Back to Blog</Link>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs bg-accent/20 text-accent px-3 py-1 rounded-full">{post.category}</span>
            <span className="text-sm text-gray-400">{new Date(post.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">{post.title}</h1>
          <p className="text-xl text-gray-300">{post.excerpt}</p>
          <p className="text-gray-400 mt-4">By {post.authorName}</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 bg-primary">
        <div className="container max-w-4xl">
          <BlogPostContent content={post.content} />

          {/* Tags */}
          <div className="mt-12 pt-8 border-t border-gray-700">
            <p className="text-sm text-gray-400 mb-3">Tags:</p>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  href="/blog"
                  className="text-sm bg-secondary text-gray-300 px-3 py-1 rounded-full hover:bg-accent/20 hover:text-accent transition"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-12 bg-secondary rounded-xl p-8 border border-gray-700 text-center">
            <h3 className="text-2xl font-bold text-white mb-3">Interested in working together?</h3>
            <p className="text-gray-400 mb-6">Let&apos;s discuss your project and explore solutions.</p>
            <Link href="/contact" className="btn-primary inline-block">Get in Touch</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
