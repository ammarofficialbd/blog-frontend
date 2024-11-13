import { Link } from "react-router-dom"

const UserCard = ({user}) => {
    let { personal_info:{fullname, username, profile_img}} = user
    return(
        <>
            <Link to={`/user/${username}`} className={"flex gap-2 items-center mb-5"}> 
                <img src={profile_img} className="w-10 h-10 rounded-full" />

                <div> 
                    <h1 className="font-semibold">{fullname}</h1>
                    <p className="text-sm">@{username}</p>
                </div>
            </Link>
        </>
    )
}     

export default UserCard