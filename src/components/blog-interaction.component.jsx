import { useContext, useEffect } from "react";
import { BlogContext } from "../pages/blog.page";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import toast from "react-hot-toast";
import axios from "axios";
const BlogInteraction = () => {
    let { blog: { _id, blog_id, title, activity: { total_likes, total_comments }, author: {
        personal_info: { username: author_username } } }, setBlog ,isLiked, setIsLiked , commentsWrapper, setCommentsWrapper} =
        useContext(BlogContext);

        const navigate = useNavigate()

    let { userAuth:{username, token} } = useContext(UserContext)

    console.log(username);

    useEffect(() => {
        if(token){
            // make request 
            axios.post(import.meta.env.VITE_API + '/isliked-by-user', { _id }, {
                headers:{
                    'Authorization': `Bearer ${token}`
                }
            }).then((data)=>{
                console.log(data.data)
                setIsLiked(Boolean(data.data))
            })
        }
    }, [isLiked])

    const handLike = () => {
        if(token){
            // like the blog
          //  console.log("like the blog");
            setIsLiked(prev =>  !prev)

            !isLiked ? total_likes++ : total_likes--;

            setBlog(prev => ({ ...prev, activity: { ...prev.activity, total_likes } }))
            console.log(isLiked);

            axios.post(import.meta.env.VITE_API + '/like-blog', { _id, isLiked }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(({data})=>{
                console.log(data);
                toast.success(data.message)

            }).catch(({response})=>console.log(response))
        }else{
            //not loggesd In
            toast.error('Please login to like this blog')
            navigate('/signin')
        }
    }
    return (
        <>
            <hr className="border-grey my-2" />
            <div className="flex justify-between gap-6">
                <div className="flex items-center gap-3">
                    <button className={`w-10 h-10 rounded-full flex items-center justify-center bg-grey/80 ${isLiked ? "text-purple/95 bg-purple/10" : ""}`} onClick={handLike}>
                        <i className={`fi  ${isLiked ? "fi-sr-heart" : "fi-rr-heart"}`}></i>
                    </button>
                    <p className={`"text-xl  ${isLiked ? "text-purple/95" : "text-dark-grey"}`}>{total_likes}</p>



                    <button className="w-10 h-10 rounded-full flex items-center justify-center bg-grey/80"
                    onClick={ () =>setCommentsWrapper((preBool)=> !preBool)}>
                        <i className="fi fi-rr-comment-dots"></i>
                    </button>
                    <p className="text-xl text-dark-grey">{total_comments}</p>
                </div>



                <div className="flex items-center gap-6">
                    {
                        username === author_username?
                        <Link to={`/editor/${blog_id}`} className="text-xl underline"> Edit </Link> : ""
                    }
                    <Link to={`https://twitter.com/intent/tweet?text=Read ${title}&url=${location.href}`} target="_blank"> 
                    <i className="fi fi-brands-twitter text-xl hover:text-twitter"> </i> 
                    </Link>

                </div>
            </div>
            <hr className="border-grey my-2" />
        </>
    )
}
export default BlogInteraction;