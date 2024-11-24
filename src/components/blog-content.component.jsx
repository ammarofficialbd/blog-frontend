import React, { useEffect, useState } from 'react'
import { ClipboardCopy, MoreHorizontal } from 'lucide-react'

const Quote = ({data, caption}) => {
    return (
        <div className='bg-purple/10 p-4 pl-5 border-1-4 border-purple'> 
            <p className='text-xl leading-9 '> {data}</p>
            {caption && <p className='w-full text-purple text-base'>{caption}</p>}
        </div>
    )
}

const List = ({style, items}) => {
    return (
        <ol className={`pl-5 ${style === 'unordered' ? 'list-disc' : 'list-decimal'}`}> 
            {
                items.map((item, index) => {
                    return <li key={index} className='my-2' dangerouslySetInnerHTML={{__html: item}}></li>
                })
            }
        </ol>

    )
}

 function Code({ code, language }) {
    const [copied, setCopied] = useState(false)
    const [highlightedCode, setHighlightedCode] = useState('')
  
    const handleCopy = async () => {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  
    useEffect(() => {
      const highlight = (code) => {
        // Basic syntax highlighting
        return code
          .replace(/\b(function|class|const|let|var|if|else|for|while|return|import|export)\b/g, '<span class="text-blue" style="font-weight: bold ; color: #0077FF;">$1</span>')
          .replace(/\b(\d+)\b/g, '<span class="text-blue" style="font-weight: bold ; color: #0077FF;">$1</span>')
          // Comments
      }
  
      setHighlightedCode(highlight(code))
    }, [code])
  
   // console.log(highlightedCode);
    return (
      <div className="w-full  rounded-lg bg-zinc-900 text-zinc-100 shadow-lg">
        <div className="flex items-center justify-between px-4 py-2 border-b border-zinc-700">
          <span className="text-sm text-zinc-400">{language}</span>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 text-sm text-zinc-400 hover:text-white transition-colors"
              aria-label={copied ? "Copied to clipboard" : "Copy to clipboard"}
            >
              <ClipboardCopy className="w-4 h-4" />
              <span aria-hidden="true">{copied ? 'Copied!' : 'Copy'}</span>
            </button>
            <button className="text-zinc-400 hover:text-white transition-colors" aria-label="More options">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>
        <pre className="p-4 overflow-x-auto">
          <code 
            className="text-sm font-mono whitespace-pre-wrap break-words"
            dangerouslySetInnerHTML={{ __html: highlightedCode }}
          />
        </pre>
      </div>
    )
  }
const BlogContent = ({block}) => {
    let {type, data} = block;
    if(type === 'paragraph') return <p dangerouslySetInnerHTML={{__html: data.text}}></p>;
    if(type === 'header') {
        if(data.level === 3){ return <h3 className='text-2xl font-bold' dangerouslySetInnerHTML={{__html: data.text}}></h3>;}
        return <h2 className='text-3xl font-bold' dangerouslySetInnerHTML={{__html: data.text}}></h2>;
    }
    if(type === 'image') return <img src={data.file.url} alt={data.file.alt} className="w-full h-full object-cover rounded-lg" />
    
    if(type === 'quote') return <Quote data={data.text} caption={data.caption}/>;

    if(type === 'list') return <List style={data.style} items={data.items}/>;

    if(type === 'code') return <Code code={data.code} language='javascript'/>;
    
}

export default BlogContent