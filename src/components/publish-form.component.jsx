import React, { useContext, useState } from "react";
import AnimationWrapper from "../common/page-animation";
import toast, { Toaster } from "react-hot-toast";
import { EditorContext } from "../pages/editor.pages";
import Tag from "./tags.component";
import { UserContext } from "../App";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const PublishForm = () => {
  const {blog_id} = useParams()
  let navigate = useNavigate();
  let charLimit = 200;
  let tagLimit = 10;
  let {
    blog,
    blog: { banner, title, tags, des, content },
    setEditorState,
    setBlog,
  } = useContext(EditorContext);
  const { userAuth: { token } } = useContext(UserContext)
  
  const handleClodeEvent = () => {
    setEditorState("editor");
  };

  const /* `handleBlogTitleChange` is a function that is triggered when the input field for the blog
  title is changed. It retrieves the value of the input field, updates the `title` property in
  the `blog` state object with the new value, and triggers a re-render to reflect the changes
  in the UI. */
    handleBlogTitleChange = (e) => {
      let input = e.target;
      console.log(input.value);
      setBlog({ ...blog, title: input.value });
    };
  const handleBlogDesChange = (e) => {
    let input = e.target;
    console.log(input.value);
    setBlog({ ...blog, des: input.value });
  };



  const handleKeyDown = (e) => {
    if (e.keyCode === 13 || e.keyCode === 188) {
      e.preventDefault();

      let tag = e.target.value;

      if (tags.length < tagLimit) {
        if (!tags.includes(tag) && tag.length) {
          setBlog({
            ...blog,
            tags: [...tags, tag],
          });
        }
      } else {
        toast.error(`you can add max ${tagLimit} Tag`)
      }
      e.target.value = ''
    }
  };

  console.log(blog_id);

  const publishBlog = function (e) {

    e.preventDefault();
    if (e.target.className.includes('disabled')) {
      return toast.error("please wait for the previous request to complete")
    }
    if (!title.length || !des.length || !banner) {
      return toast.error("All fields are required");
    }
    if (des.length > charLimit) {
      return toast.error("Description must be greater than or equal to " + charLimit + " characters long ")
    }
    if (!tags.length) {
      return toast.error("Enter At least one tag")
    }
    let loadingToast = toast.loading("publishing......")

    e.target.classList.add('disabled')
    let blogObj = {
      title,
      banner,
      des,
      content,
      tags,
      draft: false
    }
    axios.post(import.meta.env.VITE_API + '/create-blog', {...blogObj, id: blog_id}, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then(() => {
      e.target.classList.remove('disabled')
      toast.dismiss(loadingToast)
      toast.success("published 👍")
      setTimeout(() => {
        navigate('/')
      }, 500)
    }).catch(({ response }) => {
      console.log(response);
      e.target.classList.remove('disabled')
      toast.dismiss(loadingToast)
      return toast.error(response.data.message)
    })

  }
  return (
    <AnimationWrapper>
      <section>
        <Toaster />

        <button
          className="w-12 h-12 absolute right-[4vw] z-10 top-[5%]"
          onClick={handleClodeEvent}
        >
          <i className="fi fi-br-cross"></i>
        </button>

        <div class="max-w-[550px] center">
          <p class="text-dark-grey mb-1">Preview</p>

          <div class="w-full aspect-video rounded-lg overflow-hidden bg-grey mt-4">
            <img src={banner} />
          </div>

          <h1 class="text-4xl font-medium mt-2 leading-tight line-clamp-2">
            {title}
          </h1>

          <p class="font-gelasio line-clamp-2 text-xl leading-7 mt-4">{des}</p>
        </div>

        <div class="border-grey lg:border-1 lg:pl-8">
          <p class="text-dark-grey mb-2 mt-9">Blog Title</p>
          <input
            type="text"
            placeholder="Blog Title"
            defaultValue={title}
            class="input-box pl-4"
            onChange={handleBlogTitleChange}
          />

          <p class="text-dark-grey mb-2 mt-9">
            Short description about your blog
          </p>
          <textarea
            maxLength={charLimit}
            defaultValue={des}
            class="h-40 resize-none leading-7 input-box pl-4"
            onChange={handleBlogDesChange}
          />

          <p> {charLimit - des.length} character left </p>
          <p class="text-dark-grey mb-2 mt-9">
            Topics - (Helps in searching and ranking your blog post)
          </p>

          <div class="relative input-box pl-2 py-2 pb-4">
            <input
              type="text"
              placeholder="Topic"
              class="sticky input-box bg-white top-0 left-0 pl-4 mb-3 focus:bg-white"
              onKeyDown={handleKeyDown}
            />

            {tags.map((tag, i) => (
              <Tag tag={tag} key={i} tagIndex={i} />
            ))}

          </div>
          <p className="mt-1 mb-4 text-dark-grey text-right" > {tagLimit - tags.length} TagslLeft</p>

          <button className="btn-dark px-8" onClick={publishBlog}> Publish </button>
        </div>
      </section>
    </AnimationWrapper>
  );
};

export default PublishForm;
