import React, { useState, useEffect } from 'react'
import axios from '../../../axios'
import { useSelector } from 'react-redux'
import { config } from '../../../constants'
import { GoClock } from "react-icons/go";
import { useNavigate } from 'react-router-dom';


function ToursHomePage() {

    const { token } = useSelector((state)=> state.agents)

    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState(false)
    const [attractions, setAttractions] = useState([])
    const [filters, setFilters] = useState({
        limit: 20,
        skip: 0,
        totalAttractions: 0,
    })


    const fetchAllAttractions = async () => {
        try {
            setIsLoading(true)
            const res = await axios.get(`/b2b/resellers/client/attraction/all?skip=${filters.skip}&limit=${filters.limit}`, {
                headers: {Authorization: `Bearer ${token}`}
            })
            setAttractions(res?.data?.attractions)
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
            console.log(error);
        }
    }

    useEffect(()=> {
        fetchAllAttractions()
    }, [])


  return (
    <div className='pt-2'>
        <div className='p-10 flex justify-center bg-white w-full h-full'>
            {
                !isLoading ? (
                    <div>
                        {
                            attractions?.data?.length > 0 ? (
                                <>
                                            <div className='grid md:grid-cols-5 sm:grid-cols-2 gap-3'>
                                                {
                                                    attractions?.data?.map((ele, index)=> {
                                                        return (
                                                            <div key={ele?._id} className='bg-white shadow-md rounded-xl w-full h-[450px] cursor-pointer'
                                                            onClick={()=>{
                                                                navigate(`/attractions/details/${ele?._id}`);
                                                            }}
                                                            >
                                                            <div className='w-full h-52 rounded-t-3xl'>
                                                                <img className='w-full h-full object-cover rounded-t-3xl' src={config?.SERVER_URL + ele?.images[0]} alt="" />
                                                            </div>
                                                            <div className='p-4'>
                                                                <div className=' flex justify-center h-14'>
                                                                    <h1 className='text-md font-extralight text-center max-w-2xl'>{ele?.title}</h1>
                                                                </div>
                                                                <div className='flex gap-2 pt-2'>
                                                                    <div className=''>
                                                                        <h1 className='bg-BEColor p-1 rounded-lg text-white w-16 text-center font-semibold text-sm'>{ele?.bookingType}</h1>
                                                                    </div>
                                                                    <div>
                                                                        <h1 className=' bg-orange-400 rounded-lg  p-1 text-white text-center font-semibold text-sm'>{ele?.category?.categoryName}</h1>
                                                                    </div>
                                                                </div>
                                                                <div className='pt-1'>
                                                                    <h1 className='text-xs font-light text-gray-300'>Starting From</h1>
                                                                </div>
                                                                <div className='pt-2'>
                                                                    <h1 className='font-bold text-lg'>{ele?.activity?.lowPrice} AEd</h1>
                                                                </div>
                                                                <div className='pt-2'>
                                                                    <div className='flex justify-between'>
                                                                        <div>
                                                                        <h1 className='text-xs font-light text-gray-300'>*price varies</h1>
                                                                        </div>
                                                                        <div className='flex gap-1'>
                                                                            <div className=''>
                                                                                <h1 className='text-lg text-blue-400'><GoClock /></h1>
                                                                            </div>
                                                                            <div>
                                                                              <h1 className='text-sm'>Duration {ele?.duration} {ele?.durationType}</h1>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        )
                                                    })
                                                }
                                      </div>
                                </>
                            ) : ""
                        }
                        
                    </div>
                ) : (
                    <div className='grid md:grid-cols-4 sm:grid-cols-2 gap-3'>
                        {
                            [1,2,3,4,5,6,7,8,9]?.map((ele)=>(
                                <div className='bg-white shadow-md rounded-xl w-full h-[450px]'>
                                <div className='w-full h-52 rounded-t-3xl'>
                                    <div className='w-full h-full bg-gray-100 animate-pulse'></div>
                                </div>
                                <div className='p-4'>
                                    <div className=' flex justify-center'>
                                        <div>
                                          <h1 className='text-xl font-extralight text-center w-60 h-3 bg-gray-100 animate-pulse'></h1>
                                        <div className='pt-2'>
                                          <h1 className='text-xl font-extralight text-center w-60 h-3 bg-gray-100 animate-pulse'></h1>
                                        </div>
                                        </div>
                                    </div>
                                    <div className='flex gap-2 pt-2'>
                                        <div className=''>
                                            <h1 className='bg-gray-100 w-20 h-4 p-1 rounded-lg text-white  text-center font-semibold text-sm'></h1>
                                        </div>
                                        <div>
                                            <h1 className=' bg-gray-100 rounded-lg h-4 w-32 text-white text-center font-semibold text-sm'></h1>
                                        </div>
                                    </div>
                                    <div className='pt-1'>
                                        <h1 className='text-xs font-light text-gray-300 h-2 animate-pulse bg-gray-100 w-24'></h1>
                                    </div>
                                    <div className='pt-2'>
                                        <h1 className='font-bold text-lg bg-gray-100 w-28 animate-pulse h-2'></h1>
                                    </div>
                                    <div className='pt-2'>
                                        <div className='flex justify-between'>
                                            <div>
                                            <h1 className='text-xs font-light text-gray-300 animate-pulse bg-gray-100 w-28 h-3'></h1>
                                            </div>
                                            <div className='flex gap-1'>
                                                <h1 className='bg-gray-100 w-20 h-4 animate-pulse'></h1>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            ))
                        }
                     
                    </div>
                )
            }
          
        </div>
    </div>
  )
}

export default ToursHomePage
