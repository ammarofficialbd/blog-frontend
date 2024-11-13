import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import InPageNavigation from '../components/inpage-navigation.component';
import AnimationWrapper from '../common/page-animation';
import LoadMoreDataBtn from '../components/load-more.component';
import NoDataMessage from '../components/nodata.component';
import BlogPostCard from '../components/blog-post.component';
import Loader from '../components/loader.component';
import { filterPagintaionData } from '../common/filter-pagination-data';
import axios from 'axios';
import { UserContext } from '../App';
import UserCard from '../components/usercard.component';

export const SearchPage = () => {
    let { query } = useParams();
    const {isDark} = useContext(UserContext)
    const [latestBlogs, setLatestBlogs] = useState(null)
    const [users, setUsers] = useState(null)
    const serchBlogs = ({page = 1 , create_new_arr = false}) => {
        axios.post(import.meta.env.VITE_API + "/search-blogs", { query, page })
        .then(async ({ data }) => {
  
          let formatedData = await filterPagintaionData({
            state: latestBlogs,
            data: data,
            page: page,
            countRoute: '/search-blogs-count',
            data_to_send: {query},
            create_new_arr
          })
          setLatestBlogs(formatedData)
        //  console.log(formatedData);
        })
        .catch((error) => console.error(error));
    }

    const fetchUsers = () => {
        axios.post(import.meta.env.VITE_API + "/search-users", {query})
        .then(({data}) => {
         setUsers(data)
         console.log(data);
        })
        .catch((error) => console.error(error));
    }


    useEffect(() => {
        resetState();
        serchBlogs({page: 1, create_new_arr: true});
        fetchUsers();
    }, [query])

    /**
     * Resets the state of the search page back to its initial state.
     * This function is called whenever the query parameter of the URL changes.
     * It sets the latestBlogs state to null, effectively removing all the blogs
     * from the page and triggering a new search with the new query parameter.
     */
    const resetState = () => {
        setUsers(null)
        setLatestBlogs(null)
    }

    const UserCardWrapper = () => {
        return(
            <>
                {
                    users === null ? <Loader /> : users.length ? users.map((user, i) => {
                        return(

                            <AnimationWrapper transition={{ duration: 1, delay: i * .1 }} key={i}> 
                            <UserCard user={user}/>
                            </AnimationWrapper>
                        )
                        }) : <NoDataMessage message="No users found" isDark={isDark} />
                }
            </>
        )
    }
    return (
        <>
            <section className='h-cover flex justify-center gap-10'>
                <div className="w-full">
                    <InPageNavigation routes={[`search Result from "${query}"`, "Acount Matched"]} defaultHidden={["Acount Matched"]} defaultActiveIndex={0}>

                        <>
                            {

                                latestBlogs === null ? <Loader /> :
                                    latestBlogs.results.length ?
                                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                                            {
                                                latestBlogs.results.map((blog, i) => {
                                                    return (


                                                        <AnimationWrapper transition={{ duration: 1, delay: i * .1 }} key={i}>

                                                            <BlogPostCard content={blog} author={blog.author.personal_info} isDark={isDark} />

                                                        </AnimationWrapper>


                                                    )
                                                })
                                            }
                                        </div>
                                        : <NoDataMessage message="No blogs found" isDark={isDark} />
                            }

                            <LoadMoreDataBtn state={latestBlogs} fetchDataFunc={serchBlogs} isDark={isDark} />
                        </>

                        <UserCardWrapper/>

                    </InPageNavigation>
                </div>

                <div className='min-w-[40%] lg:min-w-[30%] max-w-min border-l border-l-gray/30 pl-8 pt-3 max-md:hidden'> 
                    <h1 className="text-xl font-medium mb-8">Usr Related to Search <i className='fi fi-rr-user'> </i></h1>
                </div>
            </section>
        </>

    )
}



