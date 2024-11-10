import {MessageSquare, ThumbsUp, Bookmark, Link2 } from 'lucide-react'
import { Link } from 'react-router-dom';
const BlogPostCard = ({content, author, isDark}) =>{

    let {publishedAt, tags, title, banner , activity : {total_likes}, blog_id: id} = content;
    const {fullname, profile_img, username} = author;
    let date = new Date(publishedAt);
    
    let formattedDate = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(date);
  //  console.log(formattedDate);
    return (
      <Link to={`/blog/${id}`}>
            <article
              className={`rounded-lg ${
                isDark ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900'
              } shadow-lg overflow-hidden`}
            >
            <div className="p-4">
              <div className="flex items-center mb-4">
                  <img
                    src={profile_img}
                    alt={`${fullname}'s avatar`}
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <span className="font-semibold">{fullname}</span>
                </div>  
              <img
                src={banner}
                alt={title}
                className="w-full h-48 object-cover"
              />
          
                <div className="flex flex-wrap gap-2 mb-3 mt-2">
                  {tags.map((tag) => (
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
                <h4 className="blog-title font-bold mb-2">{title}</h4>
                <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
                  {formattedDate} • {5} read time
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                  <div className="flex items-center gap-4">
                    <button className="flex items-center gap-1 hover:opacity-80">
                      <ThumbsUp size={16} />
                      <span>{total_likes}</span>
                    </button>
                    <button className="flex items-center gap-1 hover:opacity-80">
                      <MessageSquare size={16} />
                      <span>{}</span>
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
      </Link>
        
    )
}

export default BlogPostCard;