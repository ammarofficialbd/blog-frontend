import Embed from "@editorjs/embed";
import List from "@editorjs/list";
import Image from "@editorjs/image";
import Header from "@editorjs/header";
import Quote from "@editorjs/quote";
import Marker from "@editorjs/marker";
import InlineCode from "@editorjs/inline-code";
import CodeTool from '@editorjs/code';
import SimpleImage from "@editorjs/simple-image";
const uploadImageUrl = (url) => {
  // Wrap everything inside a new Promise
  return new Promise((resolve, reject) => {
    // Check if the URL is a valid string
    if (typeof url !== 'string' || !url) {
      reject('Invalid URL'); // Reject if the URL is not valid
    } else {
      // Simulate successful image upload by URL
      resolve({
        success: 1,
        file: {
          url: url // Provide the passed URL
        }
      });
    }
  })
  .catch((error) => {
    console.error('Error uploading image by URL:', error);
    return {
      success: 0,
      message: error
    };
  });
};

  

const uploadImageBYFile = () =>{
  
 
}

export const tools = {
    embed: Embed,
    list: {
        class : List,
        inlineToolbar: true
    },
    image: {
        class : Image,
        config:{
            uploader: {
                uploadByUrl: uploadImageUrl,
                uploadByFile: uploadImageBYFile
            }
        }
    },
    image: SimpleImage,
    header: {
      class: Header,
      inlineToolbar : true,
      config: {
        placeholder: 'Enter a header',
        levels: [2, 3, 4],
        defaultLevel: 3
      }
    },
    quote: {
        class : Quote,
        inlineToolbar : true
    },
    marker: Marker,
    inlineCode: InlineCode,
    code: CodeTool
};
