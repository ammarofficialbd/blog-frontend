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

export const SearchPage = () => {
    let { query } = useParams();
    const {isDark} = useContext(UserContext)
    const [latestBlogs, setLatestBlogs] = useState(null)
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
          console.log(formatedData);
        })
        .catch((error) => console.error(error));
    }
    useEffect(() => {
        resetState();
        serchBlogs({page: 1, create_new_arr: true});
    }, [query])

    /**
     * Resets the state of the search page back to its initial state.
     * This function is called whenever the query parameter of the URL changes.
     * It sets the latestBlogs state to null, effectively removing all the blogs
     * from the page and triggering a new search with the new query parameter.
     */
    const resetState = () => {
        setLatestBlogs(null)
    }
    return (
        <>
            <section className='h-cover flex justify-center gap-10'>
                <div>
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

                    </InPageNavigation>
                </div>
            </section>
        </>

    )
}
