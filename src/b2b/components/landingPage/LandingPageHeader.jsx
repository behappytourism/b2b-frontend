import React from 'react'
import { config } from '../../../constants'
import { useNavigate } from 'react-router-dom';


function LandingPageHeader() {
    const navigate = useNavigate()

  return (
    <div>
            <div className='flex justify-between p-4 bg-slate-50'>
            <div className='h-10 md:h-12 pl-20'>
                <img className='h-full object-cover' src={config.COMPANY_LOGO} alt="" />
            </div>
            <div className='flex gap-16 pr-20 '>
                <div className=' '>
                <button className='text-sm font-lg font-demo  font-bold w-10 h-10 rounded-full hover:bg-sky-100 p-2 hover:text-sky-400 transition duration-300'>Destinations</button>
                </div>
                <div className='ml-4'>
                <button className='text-sm font-lg font-demo  font-bold w-10 h-10 rounded-full hover:bg-sky-100 p-2 hover:text-sky-400 transition duration-300'>English</button>
                </div>
            <div className=''>
                <button className='text-sm font-lg font-demo  font-bold w-10 h-10 rounded-full hover:bg-sky-100 p-2 hover:text-sky-400 transition duration-300' onClick={()=> navigate("/contactusb2b")}>Contact </button>
                </div>
                <div className='pt-1'>
                <button className='border w-32 h-9 text-sm bg-sky-400 text-white rounded hover:bg-sky-500 ' onClick={()=> navigate("/register")}>Register Here</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default LandingPageHeader
