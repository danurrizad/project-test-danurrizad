import React from 'react'
import Header from '../components/Header'

const Contact = () => {
  return (
    <>
    <div className="min-h-[60vh] bg-[url('/img/background.jpg')] z-0 flex justify-center items-center w-full ">
        <div className='flex-col justify-center items-center text-white'>
            <h1 className='text-[41px] text-center'>Contact</h1>
            <h2 className='text-[19px]'></h2>
        </div>
        <div class="absolute bottom-[40vh] right-0 
            border-l-[100vw] border-l-transparent
            border-b-[15vh] border-b-white
            border-r-[0px] border-r-transparent">
        </div>
    </div>
    </>
  )
}

export default Contact