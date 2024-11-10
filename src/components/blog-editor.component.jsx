import { Link, useNavigate } from "react-router-dom";
import logo from "../imgs/logo.png";
import AnimationWrapper from "../common/page-animation";
import defaultBanner from "./../imgs/blog-banner.png";
import { useContext } from "react";
import { EditorContext } from "../pages/editor.pages";
import { useEffect } from "react";
import EditorJS from '@editorjs/editorjs'
import {tools} from './tools.component'
import toast from "react-hot-toast";
import { UserContext } from "../App";
import axios from "axios";
const BlogEditor = () => {
  let navigate = useNavigate();
  let { blog, blog: { title, banner, content, tags, des }, setBlog, textEditor, setTextEditor, setEditorState} = useContext(EditorContext);
  let {userAuth: {token}} = useContext(UserContext)
  //console.log(blog);
  useEffect(() => {
    if(!textEditor.isReady){
      setTextEditor(
        new EditorJS({
          holder: "textEditor",
          data: content,
          tools : tools,
          placeholder: "Let's write an awesome story"
      })) 
    }

}, [])

  const handleUploadBanner = async (e) => {
    console.log(e.target.files[0]);
    let banner = e.target.files[0];
    let imageUrl = '';
    try {
      const formData = new FormData();
        formData.append('banner', banner);

        const uploadRes = await axios.post(import.meta.env.VITE_API + '/upload-image', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      
        imageUrl = uploadRes.data.url;
        console.log(imageUrl);  
        setBlog({...blog, banner : imageUrl})
    } catch (error) {
      console.log(error);
    }
     
  };


  const handleTitleKeyDown = (e) => {
    if (e.keyCode == 13) {  // enter key
      e.preventDefault();
      
    }
  };
  
  const handleTitleChange = (e) => {
    // Handle change logic
    let input = e.target;
    input.style.height = 'auto';
    input.style.height = input.scrollHeight + "px"
    setBlog({...blog, title : input.value})
  };
  
  const handleError = (e) =>{
    let img = e.target
    img.src = defaultBanner;

  }
  const handlePublishEvent = () => {
     if (!banner.length) {
      return toast.error("Upload a blog banner");
    }  
  
    if (!title.length) {
      return toast.error("Write blog title to continue");
    }
  
    if (textEditor.isReady) {
      textEditor.save().then((data) => {
        
        if(data.blocks.length){
          setBlog({...blog, content : data})
          setEditorState("publish")
        }else{
          return toast.error("write something in your blog to publish it")
        }
      }).catch(err => console.log(err))
    }
  };
  const handleSaveDraft = (e) => {
    if(e.target.className.includes("disable")){
      return
    }
    if (!title.length) {
      return toast.error("Write blog title before saving it as a draft");
    }
    
    let loadingToast = toast.loading("Saving Draft...");
    
    e.target.classList.add("disable");

    if (textEditor.isReady) {
      textEditor.save().then((content) => {
        let blogObj = {
          title, 
          banner, 
          des, 
          content, 
          tags, 
          draft: true
        };
        axios.post(import.meta.env.VITE_API + "/create-blog", blogObj, {
          headers: {
            'authorization': `Bearer ${token}`
          }
        }).then(()=>{
          e.target.classList.remove('disabled')
          toast.dismiss(loadingToast)
          toast.success("Saved 👍")
          setTimeout(()=>{
            navigate('/')
          },500)
        }).catch(({response})=>{
          e.target.classList.remove('disabled')
          toast.dismiss(loadingToast)
          return toast.error(response.data.message)
        }) 

      }).catch(err => console.log(err))
    }
  }

  return (
    <>
      <nav className="navbar">
        <Link to="/">
          <img src={logo} className="flex-none w-10" />
        </Link>
        <p className="max-md:hidden text-black line-clamp-1 w-full">
          {title.length ? title : "New Blog"}
          </p>
        <div className="flex gap-4 ml-auto">
          <button className="btn-dark py-2" onClick={handlePublishEvent}>Publish</button>
          <button className="btn-light py-2" onClick={handleSaveDraft}>Save Draft</button>
        </div>
      </nav>

      <AnimationWrapper>
        <section>
          <div className="mx-auto max-w-[900px] w-full">
            <div className="relative aspect-video hover:opacity-80 bg-white border-4 border-grey">
              <label htmlFor="uploadBanner">
                <img 
                 src={defaultBanner} 
                 onError={handleError}
                 className="z-20"
                />
                <input
                  id="uploadBanner"
                  type="file"
                  accept=".png, .jpg, .jpeg"
                  hidden
                  onChange={handleUploadBanner}
                />
              </label>
            </div>
            <textarea
             defaultValue={title}
              placeholder="Blog Title"
              className="text-4xl font-medium w-full h-20 outline-none resize-none mt-10 leading-tight placeholder:opacity-40"
              onKeyDown={handleTitleKeyDown}
              onChange={handleTitleChange}
            />
            <hr className="w-full opacity-10 my-5"/>
            <div id="textEditor" className="font-gelasio"> 

            </div>
          </div>
        </section>
      </AnimationWrapper>
    </>
  );
};

export default BlogEditor;
