import React, { useState } from 'react'
import LandingPageHeader from './LandingPageHeader'
import LandingPageFooter from './LandingPageFooter'
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { useSelector, useDispatch } from 'react-redux';
import axios from '../../../axios'
import BtnLoader from '../BtnLoader';
import { setAlertSuccess } from '../../../redux/slices/homeSlice';
import { CiLocationOn } from "react-icons/ci";
import { FaPhoneVolume, FaRegAddressBook  } from "react-icons/fa";
import SuccessAlert from "../Alerts/SuccessAlert";
import Header from '../Header/Header';



function ContactUsPage() {

    const { socialMedias } = useSelector((state)=> state.home)
    const { isLoggedIn } = useSelector((state)=> state.agents)
    
    const dispatch = useDispatch();

    const [data, setData] = useState({
        name: '',
        email: "",
        phone: '',
        message: ''
    })
    const [isLoading, setIsLoading] = useState(false)
    const [emailError, setEmailError] = useState('')

    const onchangeHandler = (e) => {
        const { name, value } = e.target
        
        if (name === "email") {
            if(value?.length) {
                const emailRegex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;
                if (emailRegex.test(value)) {
                   setEmailError("")
                   setData(({
                    ...data,
                    [name]: value
                   }))
                } else {
                    setEmailError( "Invalid email address" )
                }
            } else {
                setEmailError('')
            }
        }

        setData(({
            ...data,
            [name]:value
        }))
    }

    const submitHandler = async (e) => {
        try {
           e.preventDefault()
           setIsLoading(true)
            const res = await axios.post(`b2b/settings/get-in-touch`, data)
            if(res?.data){
                dispatch(setAlertSuccess({
                    status: true,
                    title: "Sended Successfully",
                    text: "Message successfully sended!"
                }))
                console.log('aaaa');
                setIsLoading(false)
           }
        } catch (error) {
            setIsLoading(false)
            console.log(error);
        }
    }

  return (
    <div>
      <div>
        {
            isLoggedIn === true ? (
                <div className='w-full'>
                    <Header />
                </div>
            ) : (
        <div className=' w-full'>
            <LandingPageHeader/>
        </div>

            )
        }
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
                        <h1 className='text-5xl text-white font-extrabold font-demo'>Contact Us</h1>
                    </div>
                </div>
               </div>
            </div>
        </div>
        <div>
            <div className='flex gap-20 justify-center pt-10'>
                <div className='pt-6'>
                    <div>
                        <h1 className='text-sky-600 font-medium text-lg uppercase'>Address</h1>
                    </div>
                 
                    <div className='max-w-xl pt-7'>
                       <div dangerouslySetInnerHTML={{ __html: socialMedias?.contactUs }} ></div>
                    </div>

                    <div className="w-full">
                  <iframe
                    width="100%"
                    height="300"
                    frameBorder="0"
                    scrolling="no"
                    marginHeight={0}
                    allowFullScreen={true}
                    marginWidth={0}
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3608.345472026234!2d55.28800837442771!3d25.25896142919806!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43535560fdfb%3A0x7a5d842347a95555!2sBE%20HAPPY%20TRAVEL%20%26%20TOURISM%20L.L.C!5e0!3m2!1sen!2sin!4v1713871454852!5m2!1sen!2sin"
                  >
                    <a href="https://www.gps.ie/">gps trackers</a>
                  </iframe>
                </div>
            </div>
                <div className=' flex justify-center '>
                    <div className='bg-white  p-6 shadow-lg rounded'>
                    {/* <img className='w-full h-full object-cover' src="https://www.yuserver.in/templates/kohost/img/tt-contact-us.svg" alt="" /> */}
                    <div className=''>
                        <h1 className='text-sky-600 font-medium text-lg uppercase'>Get In Touch</h1>
                    </div>
                    <form onSubmit={submitHandler}>
                            <div>
                                <div className='pt-10'>
                                    <input 
                                    required
                                    onChange={onchangeHandler}
                                    name='name' type="text" className='outline-none border-b w-full placeholder:p-3 placeholder:text-gray-300 placeholder:text-sm' placeholder='Name' />
                                </div>
                                <div className='pt-10'>
                                    <input 
                                    required
                                    onChange={onchangeHandler}
                                    name='email' type="text" className='outline-none border-b w-full placeholder:p-3 placeholder:text-gray-300 placeholder:text-sm' placeholder='Email' />
                                    {
                                        emailError?.length ? (
                                            <h1 className='text-red-500 text-xs'>{ emailError }</h1>
                                        ) : ""
                                    }
                                </div>
                                <div className='pt-10'>
                                    <input
                                    required
                                    onChange={onchangeHandler}
                                    name='phone' type="text" className='outline-none border-b w-full placeholder:p-3 placeholder:text-gray-300 placeholder:text-sm' placeholder='Phone Number' />
                                </div>
                                <div className='pt-10'>
                                    <textarea
                                    required
                                    onChange={onchangeHandler}
                                    name="message" className=' outline-none border-b w-full h-20 placeholder:pl-3 placeholder:text-gray-300 placeholder:text-sm' id="" cols="30" rows="10" placeholder='Message'></textarea>
                                </div>
                                <div className='pt-5'>
                                    <button className='bg-sky-400 text-white w-40 h-12 rounded-full hover:bg-sky-600'>{ isLoading ? <BtnLoader/> : "Submit Now" }</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        <div className='flex justify-center pt-20'>
            <div className='grid md:grid-cols-3 gap-6'>
                {
                    socialMedias?.addresses?.map((ele, index)=>{
                        return (
                            <div key={index} className='bg-white w-80 h-[350px] shadow-round shadow-gray-200 rounded-2xl hover:border-sky-400 hover:border'>
                                <div className=''>
                                <div className='pt-9 flex justify-center items-center'>
                                    <img src="/public/locationIcon.png" alt="" />
                                </div>
                                <div>
                                    <h1 className='text-center text-xl font-extrabold'>Our Address</h1>
                                </div>
                                <div className='pt-5 p-5'>
                                    <h1 className=' font-light text-gray-400 text-sm'>{ele?.companyName} </h1>
                                    <div className='flex gap-1  pt-2'>
                                        <h1 className=' font-light text-gray-400 text-sm pt-1'><FaRegAddressBook  /></h1>
                                        <h1 className='font-light text-gray-400 text-sm'>{ele?.address}</h1>
                                    </div>
                                    <div className='flex gap-1  pt-1'>
                                        <h1 className=' font-light text-gray-400 text-sm '><FaPhoneVolume /></h1>
                                        <h1 className='font-light text-gray-400 text-sm'>{ele?.phoneNumber}</h1>
                                    </div>
                                    <div className='flex gap-1 pt-1'>
                                        <h1 className='text-center font-light text-gray-400 text-sm'><CiLocationOn /></h1>
                                        <h1 className='text-center font-light text-gray-400 text-sm'>{ele?.location}, {ele?.country?.countryName}</h1>
                                    </div>
                                </div>
                                </div>
                            </div>
                        )
                    })
                }
              
                {/* <div className='bg-white w-80 h-72 shadow-round shadow-gray-200 rounded-2xl hover:border-sky-400 hover:border'>
                    <div>
                    <div className='pt-9 flex justify-center items-center'>
                        <img src="/public/contacticon.png" alt="" />
                    </div>
                    <div>
                        <h1 className='text-center text-xl font-extrabold'>Phone</h1>
                    </div>
                    <div className='pt-5'>
                        <h1 className='text-center font-light text-gray-400 text-sm'>{socialMedias?.phoneNumber1} </h1>
                        <h1 className='text-center font-light text-gray-400 text-sm'>{socialMedias?.phoneNumber2}</h1>
                    </div>
                    </div>
                </div> */}
                {/* <div className='bg-white w-80 h-72 shadow-round shadow-gray-200 rounded-2xl hover:border-sky-400 hover:border'>
                    <div>
                    <div className='pt-9 flex justify-center items-center'>
                        <img className='' src="/public/messageicon.png" alt="" />
                    </div>
                    <div>
                        <h1 className='text-center text-xl font-extrabold'>Social</h1>
                    </div>
                    <div className='flex gap-2 pt-3 justify-center'>
                        {
                            socialMedias?.facebookUrl?.length ? (
                                    <a href={socialMedias?.facebookUrl}>
                                        <div className=' w-10 h-10 text-lg'>
                                            <h1 className='p-[10px] bg-white  rounded-full  shadow-xl'><FaFacebook/></h1>
                                        </div>
                                    </a>
                            ) : ""
                        }
                                {
                                    socialMedias?.instagramUrl?.length ? (
                                        <a href={socialMedias?.instagramUrl}>
                                            <div className='w-10 h-10 text-lg'>
                                                <h1 className='p-[10px] bg-white  rounded-full  shadow-xl'><FaSquareInstagram/></h1>
                                            </div>
                                        </a>
                                    ) : ""
                                }
                                {
                                    socialMedias?.youtubeUrl?.length ? (
                                        <a href={socialMedias?.youtubeUrl}>
                                            <div className='w-10 h-10 text-lg'>
                                                <h1 className='p-[10px] bg-white  rounded-full  shadow-xl'><FaYoutube /></h1>
                                            </div>
                                        </a>
                                    ) : ""
                                }
                                {
                                    socialMedias?.twitterUrl?.length ? (
                                        <a href="">
                                                  <div className='w-10 h-10 text-lg'>
                                                <h1 className='p-[10px] bg-white  rounded-full  shadow-xl'><FaTwitter /></h1>
                                            </div>
                                        </a>
                                    ) : ""
                                }
                                </div>
                    </div>
                </div> */}
            </div>
        </div>

        <div>
            <div className='w-full pt-20'>
                <img className='w-full' src="https://florensija.lt/img/40a7b9c5e910296f0dc3217b441d7b29.jpg" alt="" />
            </div>
        </div>
        <div>
            <SuccessAlert/>
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
