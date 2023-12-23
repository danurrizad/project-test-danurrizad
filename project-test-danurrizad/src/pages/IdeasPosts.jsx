import React from 'react'

const IdeasPosts = ({title, content}) => {
  return (
    <div className='min-h-screen px-20 py-40 flex flex-col justify-center items-center '>
        <h1 className='font-bold text-[23px] text-center pb-10'>{title}</h1>
        <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  )
}

export default IdeasPosts