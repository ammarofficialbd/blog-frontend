'use client'

import { useState, useEffect } from 'react'
import { Sun, Moon, MessageSquare, ThumbsUp, Bookmark, Link2 } from 'lucide-react'

export default function Component() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    // Check system preference on mount
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDark(true)
    }
  }, [])

  const toggleTheme = () => {
    setIsDark(!isDark)
  }

  const articles = [
    {
      title: 'Top 50 System Design Terminologies You Must Know',
      tags: ['cloud', 'career', 'backend'],
      readTime: '12m',
      date: 'Sep 19',
      likes: '1.1k',
      comments: 31,
      image: '/placeholder.svg?height=200&width=400'
    },
    {
      title: 'Contribute On Open-Source UI Component Library',
      tags: ['react', 'opensource', 'ui'],
      readTime: '1m',
      date: 'Oct 29',
      likes: '82',
      comments: 15,
      image: '/placeholder.svg?height=200&width=400'
    }
  ]

  return (
    <div className={`min-h-screen transition-colors duration-200 ${isDark ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Feed</h1>
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-lg ${
              isDark ? 'bg-gray-800 text-yellow-500' : 'bg-gray-200 text-gray-600'
            } hover:opacity-80 transition-opacity`}
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article, index) => (
            <article
              key={index}
              className={`rounded-lg ${
                isDark ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900'
              } shadow-lg overflow-hidden`}
            >

              <img
                src={article.image}
                alt={article.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                
                <div className="flex flex-wrap gap-2 mb-3">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`text-xs px-2 py-1 rounded ${
                        isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'
                      }`}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                <h2 className="text-xl font-bold mb-2">{article.title}</h2>
                <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
                  {article.date} • {article.readTime} read time
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                  <div className="flex items-center gap-4">
                    <button className="flex items-center gap-1 hover:opacity-80">
                      <ThumbsUp size={16} />
                      <span>{article.likes}</span>
                    </button>
                    <button className="flex items-center gap-1 hover:opacity-80">
                      <MessageSquare size={16} />
                      <span>{article.comments}</span>
                    </button>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="hover:opacity-80">
                      <Bookmark size={16} />
                    </button>
                    <button className="hover:opacity-80">
                      <Link2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}