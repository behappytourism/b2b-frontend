import React, { useState } from 'react'
import { BsCart2 } from "react-icons/bs";
import { MdOutlinePayment } from "react-icons/md";
import { FaPrint } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IoPersonAdd } from "react-icons/io5";

import AttractionCartDetails from './AttractionCartDetails';

function Cartpage() {

    const { countries } = useSelector((state) => state.home);

    const { agentExcursionCart } = useSelector(state => state.agentExcursions)

    console.log(agentExcursionCart);

  return (
    <div className='bg-BeGray w-full h-screen'>
        <div className='flex justify-center items-center p-8 '>
            <div className=''>
            <div className='mb-2'>
                <h1 className='text-xl font-semibold'>Cart Details</h1>
            </div>
                <div className='flex justify-between bg-white shadow-sm p-5 w-full rounded-lg '>
                    <div className='flex justify-evenly'>
                            <div className='border rounded-lg w-28 p-4 flex justify-center items-center'>
                                <div>
                                    <div className='flex justify-center'>
                                    <h1 className='text-xl text-center'><BsCart2 /></h1>
                                    </div>
                                    <h1 className='text-xs text-center font-light'>Add To Cart</h1>
                                </div>
                            </div>
                            <div className='pt-10'>
                            <div className='border-t w-32 '></div>
                            </div>
                            <div className='border rounded-lg w-28 p-4 flex justify-center items-center'>
                                <div>
                                    <div className='flex justify-center'>
                                    <h1 className='text-xl text-center'><MdOutlinePayment /></h1>
                                    </div>
                                    <h1 className='text-xs text-center font-light'>Payment</h1>
                                </div>
                            </div>
                            <div className='pt-10'>
                            <div className='border-t w-32 '></div>
                            </div>
                            <div className='border rounded-lg w-28 p-4 flex justify-center items-center'>
                                <div>
                                    <div className='flex justify-center'>
                                    <h1 className='text-xl text-center'><FaPrint /></h1>
                                    </div>
                                    <h1 className='text-xs text-center font-light'>Add To Cart</h1>
                                </div>
                            </div>
                    </div>
                    <div>
                        <h1 className='text-sm font-semibold'>Currently, you have 4 item(s) in your cart</h1>
                        <div className='flex justify-end pt-2'>
                            <button className='text-end text-md text-orange-600'>CONTINUE SHOPPING</button>
                        </div>
                    </div>
                </div>
                <div className='pt-5'>
                    <div className='flex justify-center gap-3 w-[1300px]'>
                        <div className='bg-white w-full h-auto rounded-lg p-5 flex-col flex gap-4 shadow-sm'>
                            <div className='flex gap-2'>
                                <h1 className='text-orange-500 text-xl'><IoPersonAdd /></h1>
                                <h1 className='text-lg font-bold'>Lead Passenger Details</h1>
                            </div>
                            <div className='flex  gap-3'>
                                    <div>
                                        <select name="" id="" className='w-28 bg-slate-100 h-10 outline-none rounded p-2'>
                                            <option value="mr">Mr</option>
                                            <option value="mrs">Mrs</option>
                                            <option value="ms">Ms</option>
                                        </select>
                                    </div>
                                    <div className='grid md:grid-cols-2 gap-2 w-full'>
                                        <div>
                                            <input type="text" name="" id="" className='w-full bg-slate-100 h-10 outline-none rounded p-2 placeholder:text-sm placeholder:text-gray-300' placeholder='Full Name*' />
                                        </div>
                                        <div>
                                            <input type="text" name="" id="" className='w-full bg-slate-100 h-10 outline-none rounded p-2 placeholder:text-sm placeholder:text-gray-300' placeholder='Last Name*' />
                                        </div>

                                    </div>
                            </div>
                            <div className='flex  gap-3'>
                                <div>
                                    <input type="text" name="" id="" className='w-full bg-slate-100 h-10 outline-none rounded p-2 placeholder:text-sm placeholder:text-gray-300' placeholder='Email Address*' />
                                </div>
                                <div>
                                <select name="" id="" className='w-60 bg-slate-100 h-10 outline-none rounded p-2'>
                                    {
                                        countries?.map((ele)=>(
                                            <option key={ele?._id} value={ele?._id}>{ele?.countryName}</option>
                                        ))
                                    }
                                 </select>
                                </div>
                                <div className='flex gap-2'>
                                    <div>
                                        <select name="" id="" className='w-20 bg-slate-100 h-10 outline-none rounded p-2' >
                                            <option value=""></option>
                                        </select>
                                    </div>
                                    <div>
                                        <input type="text" className='w-full bg-slate-100 h-10 outline-none rounded p-2'/>
                                    </div>
                                </div>
                            </div>
                                <div> 
                                    <textarea name="" id="" cols="30" rows="10" className='w-full h-24 bg-slate-100 outline-none p-2 placeholder:text-sm placeholder:text-gray-300' placeholder='Special Request' ></textarea>
                                <div className='flex gap-2'>
                                    <div >
                                        <input type="checkbox" className='outline-none h-4 w-4' />
                                    </div>
                                    <div>
                                        <h1 className='text-sm font-medium'>Update booking information in your account</h1>
                                    </div>
                                </div>
                                </div>
                        </div>
                        
                        {
                            agentExcursionCart?.length > 0 ? (
                            <div className='w-[800px] h-16'>
                                {
                                    agentExcursionCart?.map((ele)=>(
                                        <AttractionCartDetails ele={ele} />
                                    ))
                                }
                            </div>
                            ) : ""
                        }
                        
                    </div>
                </div>
            </div>
        </div>
    </div>

  )
}

export default Cartpage
