import React from 'react'
import LandingPageHeader from './LandingPageHeader'
import { IoIosArrowDroprightCircle } from "react-icons/io";
import LandingPageFooter from './LandingPageFooter';


function AboutUsPage() {
  return (
    <div>
        <div>
            <LandingPageHeader/>
        </div>
        <div>
            <div className='relative overflow-hidden h-96'>
               <img className='object-cover w-full h-full' src="https://img.veenaworld.com/customized-holidays/world/dubai-egypt-israel/shdz1/shdz1-bnn-1.jpg" alt="" />
               <div className='absolute top-0 left-0 right-0 bottom-0 w-full h-full bg-sky-400/90  flex justify-center items-center '>
                <div>
                <div className='w-52 h-9 bg-black/10 rounded-full '>
                    <div className='flex gap-3 justify-center items-center'>
                        <h1 className='text-white text-sm pt-2 font-medium'>Home</h1>
                        <h1 className='text-white text-lg pt-2'><IoIosArrowDroprightCircle/></h1>
                        <h1 className='text-white text-sm pt-2 font-medium'>About Us</h1>
                     </div>
                </div>
                    <div className='pt-5 '>
                        <h1 className='text-5xl text-white font-extrabold font-demo'>About Us</h1>
                    </div>
                </div>
               </div>
            </div>
        </div>
        <div>
          <h1>Contents</h1>
        </div>
        <div className='pt-5'>
          <LandingPageFooter />
        </div>
    </div>
  )
}

export default AboutUsPage