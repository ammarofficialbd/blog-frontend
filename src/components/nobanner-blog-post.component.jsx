import { Link } from "react-router-dom";

const MinimalBlogPost = ({ content, index , isDark}) => {

 //   console.log(content);

    let { title,banner, blog_id: id, author: { personal_info: { fullname, username, profile_img }}, publishedAt } = content;



    const getDay = (date) => {
        let d = new Date(date)
        let formattedDate = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(d);
        return formattedDate
    }
    return (
        <Link to={`/blog/${id}`} className="flex gap-5 mb-8">
           
                  <img
                    src={banner}
                    alt={`${fullname}'s avatar`}
                    className="w-24 h-24 rounded-full mr-3"
                  />
            
            <div>
                <div className="flex gap-2 items-center mb-7">
                    <img src={profile_img} className="w-6 h-6 rounded-full" />
                    <p className={`line-clamp-1 ${isDark ? "text-white" : "text-black"}`}>{fullname} @{username}</p>
                    <p className={`min-w-fit ${isDark ? "text-white" : "text-black"}`}>{getDay(publishedAt)}</p>
                </div>
                <h1 className={`blog-title ${isDark ? "text-white" : "text-black"}`}>{title}</h1>
            </div>
        </Link>
    )
}
export default MinimalBlogPost;