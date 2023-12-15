import React from 'react'
import LandingPageHeader from './LandingPageHeader'
import LandingPageFooter from './LandingPageFooter'
import { FaFacebook, FaSquareInstagram } from "react-icons/fa6";
import { IoLogoWhatsapp } from "react-icons/io";
import { IoIosArrowDroprightCircle } from "react-icons/io";

function ContactUsPage() {
  return (
    <div>
      <div>
        <div className=' w-full'>
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
                        <h1 className='text-white text-sm pt-2 font-medium'>Contact Us</h1>
                     </div>
                </div>
                    <div className='pt-5 '>
                        <h1 className='text-5xl text-white font-extrabold font-demo'>Contact Us & Get</h1>
                        <h1 className='text-5xl text-white font-extrabold'>Special Promo</h1>
                    </div>
                </div>
               </div>
            </div>
        </div>
        <div>
            <div className='flex gap-20 justify-center pt-10'>
                <div>
                    <div>
                        <h1 className='text-sky-600 font-medium text-lg'>Contact Us</h1>
                    </div>
                    <div className='pt-3'>
                        <h1 className='text-6xl font-extrabold'>Get In Touch</h1>
                    </div>
                    <div className='max-w-xl pt-7'>
                        <h1>Any kind of travel information don't hesitate to contact with us for imiditate customer support. We are love to hear from you</h1>
                    </div>

                    <div>
                        <div className='pt-10'>
                            <input name='name' type="text" className='outline-none border-b w-full placeholder:p-3 placeholder:text-gray-300 placeholder:text-sm' placeholder='Name' />
                        </div>
                        <div className='pt-10'>
                            <input name='email' type="text" className='outline-none border-b w-full placeholder:p-3 placeholder:text-gray-300 placeholder:text-sm' placeholder='Email' />
                        </div>
                     
                        <div className='pt-10'>
                            <textarea name="message" className=' outline-none border-b w-full h-7 placeholder:pl-3 placeholder:text-gray-300 placeholder:text-sm' id="" cols="30" rows="10" placeholder='Message'></textarea>
                        </div>
                        <div className='pt-5'>
                            <button className='bg-sky-400 text-white w-40 h-12 rounded-full hover:bg-sky-600'>Submit Now</button>
                        </div>
                    </div>
            </div>
                <div className='pt-10'>
                    <div className='w-96 h-96 '>
                    <img className='w-full h-full object-cover' src="https://www.yuserver.in/templates/kohost/img/tt-contact-us.svg" alt="" />
                    </div>
                </div>
            </div>
        </div>

        <div className='flex justify-center pt-20'>
            <div className='grid md:grid-cols-3 gap-6'>
                <div className='bg-white w-80 h-72 shadow-round shadow-gray-200 rounded-2xl hover:border-sky-400 hover:border'>
                    <div>
                    <div className='pt-9 flex justify-center items-center'>
                        <img src="/public/locationIcon.png" alt="" />
                    </div>
                    <div>
                        <h1 className='text-center text-xl font-extrabold'>Our Address</h1>
                    </div>
                    <div className='pt-5'>
                        <h1 className='text-center font-light text-gray-400 text-sm'>971-949 8th Ave </h1>
                        <h1 className='text-center font-light text-gray-400 text-sm'>Dubai, UAE</h1>
                    </div>
                    </div>
                </div>
                <div className='bg-white w-80 h-72 shadow-round shadow-gray-200 rounded-2xl hover:border-sky-400 hover:border'>
                    <div>
                    <div className='pt-9 flex justify-center items-center'>
                        <img className='' src="/public/messageicon.png" alt="" />
                    </div>
                    <div>
                        <h1 className='text-center text-xl font-extrabold'>Contact Us</h1>
                    </div>
                    <div className='flex gap-2 pt-3 justify-center'>
                                    <div className='cursor-pointer w-10 h-10 text-lg'>
                                        <h1 className='p-[10px] bg-white  rounded-full  shadow-xl'><FaFacebook/></h1>
                                    </div>
                                    <div className=' cursor-pointer w-10 h-10 text-lg'>
                                        <h1 className='p-[10px] bg-white  rounded-full  shadow-xl'><FaSquareInstagram/></h1>
                                    </div>
                                    <div className=' cursor-pointer w-10 h-10 text-lg'>
                                        <h1 className='p-[10px] bg-white  rounded-full  shadow-xl'><IoLogoWhatsapp/></h1>
                                    </div>
                                </div>
                    </div>
                </div>
                <div className='bg-white w-80 h-72 shadow-round shadow-gray-200 rounded-2xl hover:border-sky-400 hover:border'>
                    <div>
                    <div className='pt-9 flex justify-center items-center'>
                        <img src="/public/contacticon.png" alt="" />
                    </div>
                    <div>
                        <h1 className='text-center text-xl font-extrabold'>Our Address</h1>
                    </div>
                    <div className='pt-5'>
                        <h1 className='text-center font-light text-gray-400 text-sm'>971-949 8th Ave </h1>
                        <h1 className='text-center font-light text-gray-400 text-sm'>Dubai, UAE</h1>
                    </div>
                    </div>
                </div>
            </div>
        </div>

        <div>
            <div className='w-full pt-20'>
                <img className='w-full' src="https://florensija.lt/img/40a7b9c5e910296f0dc3217b441d7b29.jpg" alt="" />
            </div>
        </div>

        {/* footer */}
        <div>
            <LandingPageFooter/>
        </div>
      </div>
    </div>
  )
}

export default ContactUsPage
