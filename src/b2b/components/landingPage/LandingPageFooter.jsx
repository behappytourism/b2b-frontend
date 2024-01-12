import React from 'react'
import { FaFacebook, FaSquareInstagram } from "react-icons/fa6";
import { IoLogoWhatsapp } from "react-icons/io";
import { config } from '../../../constants'
import { useNavigate } from 'react-router-dom';


function LandingPageFooter() {

    const navigate = useNavigate()

  return (
    <div>
       <div className='pt-10 h-80 bg-white'>
                    <div className='flex justify-center'>
                        <div className='border-b mb-10'>
                        <div className='flex gap-20 pt-10 mb-5'>
                            <div>
                                <div>
                                    <img className='h-full object-fill w-[250px]' src={config.COMPANY_LOGO} alt="" />
                                </div>
                                <div className='flex gap-2 pt-3 justify-center'>
                                    <div className='    w-10 h-10 text-xl'>
                                        <h1 className='p-[11px] bg-white  rounded-full  shadow-xl'><FaFacebook/></h1>
                                    </div>
                                    <div className='    w-10 h-10 text-xl'>
                                        <h1 className='p-[11px] bg-white  rounded-full  shadow-xl'><FaSquareInstagram/></h1>
                                    </div>
                                    <div className='    w-10 h-10 text-xl'>
                                        <h1 className='p-[11px] bg-white  rounded-full  shadow-xl'><IoLogoWhatsapp/></h1>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <h1 className='text-md font-light text-slate-500'>Terms & Settings</h1>
                                </div>
                                <div className='pt-5'>
                                    <button className='text-gray-300 text-sm font-extralight hover:border-b cursor-pointer'>About Us</button>
                                </div>
                                <div className='pt-2'>
                                    <button className='text-gray-300 text-sm font-extralight hover:border-b cursor-pointer' onClick={()=>navigate('/contactusb2b')}>Contact Us</button>
                                </div>
                                <div className='pt-2'>
                                    <button className='text-gray-300 text-sm font-extralight hover:border-b cursor-pointer'>B2C Login</button>
                                </div>
                                <div className='pt-2'>
                                    <button className='text-gray-300 text-sm font-extralight hover:border-b cursor-pointer'>Knowledge Base</button>
                                </div>
                                <div className='pt-2'>
                                    <button className='text-gray-300 text-sm font-extralight hover:border-b cursor-pointer'>Privacy Policy</button>
                                </div>
                                
                            </div>
                            <div>
                                <div>
                                    <h1 className='text-md font-light text-slate-500'>Top Desitnations</h1>
                                </div>
                                <div className='pt-5'>
                                    <h1 className='text-gray-300 text-sm font-extralight hover:border-b cursor-pointer'>Dubai</h1>
                                </div>
                                <div className='pt-2'>
                                    <h1 className='text-gray-300 text-sm font-extralight hover:border-b cursor-pointer'>Abu Dhabi</h1>
                                </div>
                                <div className='pt-2'>
                                    <h1 className='text-gray-300 text-sm font-extralight hover:border-b cursor-pointer'>Ajman</h1>
                                </div>
                                <div className='pt-2'>
                                    <h1 className='text-gray-300 text-sm font-extralight hover:border-b cursor-pointer'>Fujairah</h1>
                                </div>
                                <div className='pt-2'>
                                    <h1 className='text-gray-300 text-sm font-extralight hover:border-b cursor-pointer'>Hatta</h1>
                                </div>
                                <div className='pt-2'>
                                    <h1 className='text-gray-300 text-sm font-extralight hover:border-b cursor-pointer'>Sharjah</h1>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <h1 className='text-md font-light text-slate-500 hover:border-b cursor-pointer'>Top Attractions</h1>
                                </div>
                                <div className='pt-5'>
                                    <h1 className='text-gray-300 text-sm font-extralight hover:border-b cursor-pointer'> I Fly</h1>
                                </div>
                                <div className='pt-2'>
                                    <h1 className='text-gray-300 text-sm font-extralight hover:border-b cursor-pointer'>Dinner In the Sky</h1>
                                </div>
                                <div className='pt-2'>
                                    <h1 className='text-gray-300 text-sm font-extralight hover:border-b cursor-pointer'>Gyrocopter Flight Dubai</h1>
                                </div>
                                <div className='pt-2'>
                                    <h1 className='text-gray-300 text-sm font-extralight hover:border-b cursor-pointer'>Xline Zipline Dubai</h1>
                                </div>
                                <div className='pt-2'>
                                    <h1 className='text-gray-300 text-sm font-extralight hover:border-b cursor-pointer'>Qasr Al Watan</h1>
                                </div>
                                <div className='pt-2'>
                                    <h1 className='text-gray-300 text-sm font-extralight hover:border-b cursor-pointer'>Dubai Parks & Resorts</h1>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <h1 className='text-md font-light text-slate-500'>Hotels</h1>
                                </div>
                                <div className='pt-5'>
                                    <h1 className='text-gray-300 text-sm font-extralight hover:border-b cursor-pointer'>Citymax Hotel Al Barsha</h1>
                                </div>
                                <div className='pt-2'>
                                    <h1 className='text-gray-300 text-sm font-extralight hover:border-b cursor-pointer'>Citymax Hotel Bur Dubai</h1>
                                </div>
                                <div className='pt-2'>
                                    <h1 className='text-gray-300 text-sm font-extralight hover:border-b cursor-pointer'>Grand Astoria Hotel</h1>
                                </div>
                                <div className='pt-2'>
                                    <h1 className='text-gray-300 text-sm font-extralight hover:border-b cursor-pointer'>Royal Falcon Hotel</h1>
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                   
                </div>
    </div>
  )
}

export default LandingPageFooter
