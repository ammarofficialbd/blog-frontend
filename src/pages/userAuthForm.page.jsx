import { Link,Navigate} from "react-router-dom";
import InputBox from "../components/input.component";
import googleIcon from '../imgs/google.png'
import AnimationWrapper from "../common/page-animation";
import { useContext, useRef } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { UserContext } from "../App";
import { storeInSession } from "../common/session";
import { authWithGoogle } from "../common/firebase";


const UserAuthForm = ({ type }) => {

 const authform = useRef()

 let {userAuth: {token}, setUserAuth} = useContext(UserContext)

 console.log(token, "token");

 const userAuthThroughServer = (serverRoute, formdata) =>{
  axios.post(import.meta.env.VITE_API + serverRoute, formdata)
  .then(({data})=>{
     toast.success('Sign in Successfully')
     storeInSession("user", JSON.stringify(data))
     setUserAuth(data)
     console.log(data, "data");
  }).catch(({response}) => {
    console.log(response);
    toast.error(response.data.error)
  })
 }
    const handleSubmit = (e) =>{
        e.preventDefault()
        let serverRoute = type === "sign-in" ? "/signin" : "/signup";
        let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
        //formdaata
        let form = new FormData(authform.current)
        
       const formData = Object.create(null)

        for(let [key, value] of form.entries()){
            formData[key] = value
        }
       // console.log(formData);
       let {fullname, email, password} = formData

       if(fullname){
        if(fullname.length < 3){
            return toast.error("Fullname must be at least 3 letters long")
          }
       }
      
      if(!email.length){
       return toast.error("Enter Wrong Email")
      }
      if(!emailRegex.test(email)){
        return toast.error("Email is Invalid")
      }
      if(password && !passwordRegex.test(password)){
       return toast.error("Password Should be 6 to 20 characters long")
      }
      userAuthThroughServer(serverRoute, formData) 

    }

    const handleGoogleAuth = (e)=>{
        e.preventDefault();
        authWithGoogle()
        .then((user) => {
            let serverRoute = '/google-auth'
            let formData = {
                access_token : user.accessToken
            }
            userAuthThroughServer(serverRoute, formData)
        })
        .catch(err => {
        toast.error('Trouble login through Google')
        return console.log(err);
        })
    }

    return (
        token ? <Navigate to='/'/> :
        <AnimationWrapper> 
   <section className="h-cover flex items-center justify-center">
            <form className="w-[80%] max-w-[400px]" ref={authform}>
                <h1 className="text-4xl font-gelasio capitalize text-center mb-24">
                    {type === "sign-in" ? "Welcome back" : "Join us today"}
                </h1>

                {
                type !== "sign-in" ? (
                    <InputBox
                        name="fullname"
                        type="text"
                        placeholder="Full Name"
                        icon="fi-rr-user"
                    />

                ) : ''
                }
                
                <InputBox
                    name="email"
                    type="email"
                    placeholder="Email"
                    icon="fi-rr-envelope"
                />
                <InputBox
                    name="password"
                    type={"password"}
                    placeholder="Password"
                    icon={"fi-rr-key"}
                />

                <button className="btn-dark center mt-14" type="submit" onClick={handleSubmit}>
                    {type.replace("-", " ")}
                </button>
                <div className="relative w-full flex items-center gap-2 my-10 opacity-10 uppercase text-black font-bold "> 
                    <hr className="w-1/2 border-black"/>
                    <p> or </p>
                    <hr className="w-1/2 border-black"/>

                </div>
                <button className="btn-dark flex items-center justify-center gap-4 w-[] center" onClick={handleGoogleAuth}> 
                    <img src={googleIcon} className="w-5"/>
                    continue with google
                </button>

                {
                    type === 'sign-in' ?  <p className="mt-6 text-dark-grey text-xl text-center">  Don't have an account? 
                        <Link to='/signup' className="underline text-black text-xl ml-1"> Sign up here</Link>
                    </p> : <p className="mt-6 text-dark-grey text-xl text-center"> Already a member? 
                        <Link to='/signin' className="underline text-black text-xl ml-1"> Sign in here</Link>
                    </p> 
                }
            </form>
        </section>
        </AnimationWrapper>
     
    );
};


export default UserAuthForm;
