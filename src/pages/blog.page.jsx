import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import AnimationWrapper from '../common/page-animation';
import Loader from '../components/loader.component';
import { getFullDay } from '../common/date';
import BlogInteraction from '../components/blog-interaction.component';
import NoDataMessage from '../components/nodata.component';
import { UserContext } from '../App';
import BlogContent from '../components/blog-content.component';
import BlogCard from '../components/blog-post-two.component';
import CommentsContainer from '../components/comments.component';

export const blogDataStructure = {
    title : '',
    banner: '',
    content: [],
    tags: [],
    des: '',
    author :{personal_info: {}},
    publishedAt: ''
}
export const BlogContext = createContext({})
const BlogPage = () => {
let {blog_id} = useParams();
const {isDark} = useContext(UserContext)
const [blog, setBlog] = useState(blogDataStructure)
const [similarBlogs, setSimilarBlogs] = useState(blogDataStructure)
const [isLiked, setIsLiked] = useState(false)
const [loading, setLoading] = useState(true)
const [commentsWrapper, setCommentsWrapper] = useState(false)
const [totalParentsCommentLoaded, setTotalParentsCommentLoaded] = useState(0)

const { title ,
banner,
content,
tags,
author :{personal_info: {fullname, username: author_username, profile_img}}, publishedAt} = blog
    const fetchBlog = async () => {

        try {
            const {data} = await axios.post(import.meta.env.VITE_API + '/get-blogs', {blog_id})
            setBlog(data)
           // console.log(data);
            setLoading(false)
            const similarBlog = await axios.post(import.meta.env.VITE_API + '/search-blogs', {tag : data.tags[0], limit : 6, eliminated : blog_id})
            setSimilarBlogs(similarBlog.data)
          //  console.log(similarBlog.data);   
        } catch (error) {
            console.log(error);
            setLoading(false)   
        }
    }
  

    useEffect(() => {
        resetSates()
        fetchBlog()
    }, [])

    const resetSates = () => {
        setBlog(blogDataStructure)
        setSimilarBlogs(null)
        setLoading(true)
        setIsLiked(false)
        setCommentsWrapper(false)
        setTotalParentsCommentLoaded(0)
    }
  return (
    <div>
        <AnimationWrapper transition={{ duration: 0.2 }}> 
            {
                loading ? <Loader /> 
                :  
                <BlogContext.Provider value={{blog, setBlog, isLiked, setIsLiked, commentsWrapper, setCommentsWrapper, totalParentsCommentLoaded, setTotalParentsCommentLoaded}}> 

                <CommentsContainer />

                 <div className='max-w-[900px] center py-10 max-lg:px-[5vw]'> 
                
                <img src={banner} alt={title} className='aspect-video'/>

                <div className='mt-12'> 
                    <h2> {title} </h2>
                    <div className='flex max-sm:flex-col justify-between my-8'> 
                        <div className='flex gap-4 items-center '> 
                            <img src={profile_img} alt={fullname} className='w-12 h-12 rounded-full'/>
                            <p className='capitalize'> {fullname}
                                <br /> 
                                <Link to={`/user/${author_username}`} className='text-sm'> @{author_username} </Link> 
                                
                            </p>
                        </div>
                        <p className='text-dark-grey opacity-75 max-sm:mt-6 max-sm:ml-12 max-sm:pl-5'> Published On {getFullDay(publishedAt)}</p> 
                    </div>
                </div>

                <BlogInteraction/>
                <div className='my-12 font-gelasio blog-page-content'> 

                
                    { 
                    content[0].blocks.map((block, i) => {
                        return <div key={i} className='my-4 md:my-8'> 
                        <BlogContent block={block}/>
                        </div>
                    })
                    }
                </div>
                <BlogInteraction/>

                {
                    similarBlogs !== null && similarBlogs.length ? (
                        <> 
                            <h1 className='text-2xl mt-14 mb-10 font-medium'> Similar Blogs</h1>

                            {
                                similarBlogs.map((blog , i) => (
                                    
                                       <BlogCard content={blog} author={blog.author} key={i}/>
                                   
                                ))
                            }
                        </>
                    ) : <NoDataMessage message="No similar blogs found" isDark={isDark} />
                }
                </div>
                </BlogContext.Provider>
               
            }
        </AnimationWrapper>
    </div>
  )
}

export default BlogPage