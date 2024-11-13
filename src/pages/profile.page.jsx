import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import AnimationWrapper from "../common/page-animation";
import Loader from "../components/loader.component";
import AboutUser from "../components/about.component";
import { UserContext } from "../App";
import { filterPagintaionData } from "../common/filter-pagination-data";
import InPageNavigation from "../components/inpage-navigation.component";
import BlogCard from "../components/blog-post-two.component";
import NoDataMessage from "../components/nodata.component";
import LoadMoreDataBtn from "../components/load-more.component";
import PageNotFound from "./404.page";


export const profileDataStructure = {
    personal_info: {
        fullname: '',
        username: '',
        profile_img: '',
        bio: ''
    },
    account_info: {
        total_posts: '',
        total_blogs: '',
    },
    social_links: {},
    joinedAt: ''
}
const ProfilePage = () => {

    let { id: profileId } = useParams();
    let [profile, setProfile] = useState(profileDataStructure);
    let [loading, setLoading] = useState(true);
    let [blogs, setBlogs] = useState(null);
    let [profileLoaded, setProfileLoaded] = useState("");

    let { personal_info: { fullname, username: profileUsername, profile_img, bio }, account_info: { total_posts, total_blogs }, social_links, joinedAt } = profile

    const { userAuth: { username }, isDark } = useContext(UserContext);
    console.log(username);
    const fetchUserProfile = () => {
        axios.post(import.meta.env.VITE_API + '/get-profile', { username: profileId })
            .then(({ data }) => {
                // console.log(data);
                if(data !== null) setProfile(data)
                setProfileLoaded(profileId)
                getBlogs({ user_id: data._id })
                setLoading(false);
            })
            .catch((err) => {
                console.log(err)
                setLoading(false);
            });
    }


    const getBlogs = ({ page = 1, user_id }) => {
        user_id = user_id == undefined ? blogs.user_id : user_id
        axios.post(import.meta.env.VITE_API + '/search-blogs', { author: user_id, page })
            .then(async ({ data }) => {
                console.log(data);
                let formatedData = await filterPagintaionData(
                    {
                        state: blogs,
                        data: data,
                        page: page,
                        countRoute: '/search-blogs-count',
                        data_to_send: { author: user_id }
                    }
                )
                formatedData.user_id = user_id;
                setBlogs(formatedData)
            })
            .catch((err) => {
                console.log(err)
            });

    }
    console.log(blogs);
    useEffect(() => {
        if(profileLoaded !== profileId){
            setBlogs(null)
        }
        if(blogs === null){
            resetState();
            fetchUserProfile();
        }
 
    }, [profileId, blogs])
    const resetState = () => {
        setProfile(profileDataStructure);
        setLoading(true);
        setProfileLoaded('')
    }
    return (
        <>
            <AnimationWrapper>
                {
                    loading ? <Loader /> :
                    profileUsername.length ? 
                        <section className="h-cover md:flex flex-row-reverse items-start gap-5 min-[1100px]:gap-12">
                            <div className="flex flex-col gap-5 max-md:items-center min-w-[250px]">
                                <img src={profile_img} className="w-40 h-40 rounded-full object-cover md:h-32 md:w-32 min-md:h-24 min-md:w-24" alt="profile pic" />
                                <h1 className="text-2xl font-medium"> @{profileUsername}</h1>
                                <p className="text-xl font-semibold capitalize">{fullname}</p>
                                <p> { } total posts - { } total reads </p>
                                <p className="text-sm">{joinedAt}</p>
                                <div className="flex gap-4 mt-2">
                                    {
                                        profileId === username ?
                                            <Link to={`/settings/edit-profile`} className="btn-light text-sm font-semibold text-blue-600 hover:underline rounded-md"> Edit Profile </Link> : ''
                                    }
                                </div>
                                <AboutUser className={"max-md:hidden"} bio={bio} social_links={social_links} joinedAt={joinedAt} />
                            </div>

                            <div className="max-md:mt-12 w-full">
                                <InPageNavigation routes={["Blog Published", "About"]} defaultHidden={["About"]} isDark={isDark}>
                                    <>
                                        {

                                           blogs === null ? <Loader /> :
                                                blogs.results.length ?
                                                    <>
                                                        {
                                                           blogs.results.map((blog, i) => {
                                                                return (


                                                                    <AnimationWrapper transition={{ duration: 1, delay: i * .1 }} key={i}>

                                                                        <BlogCard content={blog} author={blog.author.personal_info} />

                                                                    </AnimationWrapper>


                                                                )
                                                            })
                                                        }
                                                    </>
                                                    : <NoDataMessage message="No blogs found" isDark={isDark} />
                                        }
                                        <LoadMoreDataBtn state={blogs} fetchDataFunc={getBlogs} isDark={isDark} />
                                    </>

                                    <>
                                        <AboutUser className={""} bio={bio} social_links={social_links} joinedAt={joinedAt} />
                                    </>
                                </InPageNavigation>
                            </div>

                        </section>
                    : <PageNotFound />
                }

            </AnimationWrapper>
        </>
    )
}

export default ProfilePage