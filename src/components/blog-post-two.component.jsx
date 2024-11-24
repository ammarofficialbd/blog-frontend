import React from 'react'
import { Link } from 'react-router-dom';

const BlogCard = ({ content, author , i}) => {
    let { publishedAt, tags, title, banner, des, activity: { total_likes }, blog_id: id } = content;
  //  console.log(des ,tags, banner);
    const { fullname, profile_img, username } = author;
    let date = new Date(publishedAt);

    let formattedDate = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(date);
    return (
        <Link to={`/blog/${id}`} key={i} className='flex gap-8 items-center border-b border-grey pb-5 mb-4'> 
         <article className='w-full'>
            <div className="flex gap-2 items-center mb-7">
                <img src={profile_img} className="w-6 h-6 rounded-full" />
                <p className="line-clamp-1">{fullname} @{username}</p>
                <p className="min-w-fit">{formattedDate}</p>
            </div>
            <h1 className="blog-title">{title}</h1>
            <p className="my-3 text-xl font-gelasio leading-7 max-sm:hidden line-clamp-2">
                {des}
            </p>
            <div className='flex gap-4 mt-7'>
                <span className="btn-light py-1 px-4">{tags[0]}</span>
                <span className='ml-3 flex items-center gap-2 text-dark-grey'>
                    <i className="fi fi-rr-heart text-xl"></i>
                    {total_likes}
                </span>
            </div>
        </article>

        <div className='h-28 aspect-square bg-grey'> 
            <img src={banner} alt={title} className='w-full h-full object-cover aspect-square'/>
        </div>
        </Link>
       
    )
}

export default BlogCard