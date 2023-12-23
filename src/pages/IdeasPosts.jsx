import React from 'react'

const IdeasPosts = ({title, publishedDate, content}) => {
  return (
    <div className='min-h-screen 2xl:px-20 xl:px-20 lg:px-20 md:px-20 sm:px-6 px-6 py-40 flex flex-col justify-center items-center '>
        <h1 className='font-bold text-[32px] text-center'>{title}</h1>
        <h2 className='pb-10 pt-2'>{publishedDate}</h2>
        <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  )
}

export default IdeasPosts