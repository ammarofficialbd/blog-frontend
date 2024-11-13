
import axios from "axios";
import AnimationWrapper from "../common/page-animation";
import InPageNavigation from "../components/inpage-navigation.component";
import { useContext, useEffect, useState } from "react";
import Loader from "../components/loader.component";
import BlogPostCard from "../components/blog-post.component";
import MinimalBlogPost from "../components/nobanner-blog-post.component";
import { UserContext } from "../App";
import { activeTabRef } from "../components/inpage-navigation.component";
import NoDataMessage from "../components/nodata.component";
import { filterPagintaionData } from "../common/filter-pagination-data";
import LoadMoreDataBtn from "../components/load-more.component";
const HomePage = () => {
  const [latestBlogs, setLatestBlogs] = useState(null)
  const [trendingBlogs, setTrendingBlogs] = useState(null)
  let [pageState, setPageState] = useState("home")
  const { isDark } = useContext(UserContext)

  let categories = ["programming", "node", "javascript", "dotnet", "lifestyle", "food", "technology", "cosmology", "astrophysics", "react", "errors"];

  const fetchLatestBlogs = ({page = 1}) => {
    axios.post(import.meta.env.VITE_API + "/latest-blogs", { page })
      .then(async ({ data }) => {

        let formatedData = await filterPagintaionData({
          state: latestBlogs,
          data: data.result,
          page: page,
          countRoute: '/all-latest-blogs-count',
        })
        setLatestBlogs(formatedData)
        console.log(formatedData);
      })
      .catch((error) => console.error(error));
  }

  const fetchTrendingBlogs = async () => {
    try {
      const response = await axios.get(import.meta.env.VITE_API + "/trending-blogs")
      // console.log(response.data);
      setTrendingBlogs(response.data)
    } catch (error) {
      console.log(error);
    }
  }
  const loadBlogByCategory = (e) => {
    //console.log("clicked");

    let category = e.target.innerText.toLowerCase()
    //console.log(category);
    setLatestBlogs(null)
    if (pageState === category) {
      setPageState("home")
      return;
    }
    setPageState(category)
  }

  const fetchBlogsByCategory = ({page = 1}) => {
    console.log(pageState);
    axios.post(import.meta.env.VITE_API + "/search-blogs", { tag: pageState , page})
      .then(async({ data }) => {
      //  console.log(data)
      let formatedData = await filterPagintaionData({
        state: latestBlogs,
        data: data,
        page: page,
        countRoute: '/search-blogs-count',
        data_to_send: {tag: pageState}
      })
      setLatestBlogs(formatedData)
      })
      .catch((error) => console.error(error));
  }
  
  useEffect(() => {
    activeTabRef.current.click();

    if (pageState === "home") {
      fetchLatestBlogs({page: 1});
    } else {
      fetchBlogsByCategory({page: 1});
    }
    if (!trendingBlogs) fetchTrendingBlogs();

  }, [pageState]);

  console.log(latestBlogs);
  return (
    <AnimationWrapper>
      <section className={`h-cover flex justify-center gap-10 ${isDark ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
        {/* latest blogs */}
        <div className="w-full">
          <InPageNavigation routes={[pageState, "trending blogs"]} defaultHidden={["trending blogs"]} isDark={isDark}>
            <>
              <div className={`min-h-screen transition-colors duration-200`}>
                <div className="container mx-auto px-4 py-8">


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
                  
                  <LoadMoreDataBtn state = {latestBlogs} fetchDataFunc={(pageState === "home" ? fetchLatestBlogs : fetchBlogsByCategory)} isDark={isDark}/>
                </div>

              </div>
            </>

            <>
              {
                trendingBlogs === null ? <Loader /> : trendingBlogs.map((blog, i) => {
                  return (


                    <AnimationWrapper transition={{ duration: 1, delay: i * .1 }} key={i}>

                      <MinimalBlogPost content={blog} author={blog.author.personal_info} isDark={isDark} index={i} />

                    </AnimationWrapper>


                  )
                })
              }
            </>

          </InPageNavigation>
        </div>
        {/* filters and trending blogs */}
        <div className={`min-w-[30%] lg:min-w-[400px] max-w-min border-l border-grey pl-8 pt-3 max-md:hidden`}>
          <div className={`flex flex-col gap-10`}>
            <div>
              <h1 className={`text-xl font-medium mb-8 ${isDark ? "text-white" : "text-black"}`}> Stories form all interests</h1>

              <div className={`flex gap-3 flex-wrap`}>
                {
                  categories.map((category, i) => {
                    return (
                      <button key={i} className={`tag text-sm font-medium px-3 py-1 rounded-full border border-gray-300 ${isDark ? "text-white" : "text-black"} ${pageState === category ? ` ${isDark ? "!text-black bg-white" : " bg-black text-white"}` : ""}`} onClick={loadBlogByCategory}> {category} </button>
                    )
                  }
                  )}
              </div>
            </div>


            <div className={``}>
              <h2 className={`text-sm font-medium mb-8 text-gray-500 ${isDark ? "text-white" : "text-black"}`}>Trending Blogs <i className="fi fi-rr-arrow-trend-up"> </i> </h2>
              {
                trendingBlogs === null ? <Loader /> : trendingBlogs.map((blog, i) => {
                  return (


                    <AnimationWrapper transition={{ duration: 1, delay: i * .1 }} key={i}>

                      <MinimalBlogPost content={blog} author={blog.author.personal_info} isDark={isDark} index={i} />

                    </AnimationWrapper>


                  )
                })
              }

            </div>

          </div>
        </div>
      </section>
    </AnimationWrapper>
  );
};

export default HomePage;