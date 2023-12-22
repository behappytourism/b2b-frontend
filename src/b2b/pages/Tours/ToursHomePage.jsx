import React, { useState, useEffect } from 'react'
import axios from '../../../axios'
import { useSelector } from 'react-redux'
import { config } from '../../../constants'
import { GoClock } from "react-icons/go";
import { useNavigate } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import { AiOutlineArrowUp } from "react-icons/ai";
import priceConversion from '../../../utils/PriceConversion';
import AttractionCard from "../../components/Cards/AttractionCard";
import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";

function ToursHomePage() {

    const { token } = useSelector((state)=> state.agents)
    const { selectedCurrency } = useSelector((state) => state.home);


    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState(false)
    const [attractions, setAttractions] = useState([])
    const [filters, setFilters] = useState({
        limit: 20,
        skip: 0,
        totalAttractions: 0,
        filteredAttractionCount: 0,
        responseAttractionLength:0,
        hasMore: true,

    }) 


    const fetchAllAttractions = async () => {
        try {
            setIsLoading(true)
            const res = await axios.get(`/b2b/resellers/client/attraction/all?skip=${filters.skip}&limit=${filters.limit}`, {
                headers: {Authorization: `Bearer ${token}`}
            })
            // console.log(res.data, 'response data');
            // setAttractions(res?.data?.attractions)

            res?.data?.attractions 
            ? setAttractions((prev)=> [
                ...new Set([...prev, ...res?.data?.attractions?.data])
            ])
            : setAttractions([])

            setIsLoading(false)

            setFilters((prev)=>{
                return {
                    ...prev,
                    totalAttractions: res?.data?.attractions?.totalAttractions || 0,
                    hasMore: res?.data?.attractions?.totalAttractions > attractions?.length,
                }
            })

        } catch (error) {
            setIsLoading(false)
            console.log(error);
        }
    }


    useEffect(()=> {
        fetchAllAttractions()
    }, [filters.skip])

    const scrollToTop = () => {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
    }
    const [isScrollButtonVisible, setIsScrollButtonVisible] = useState(false)

    useEffect(()=> {
        window.addEventListener("scroll", ()=> {
            if(window.scrollY > 100) {
                setIsScrollButtonVisible(true)
            } else {
                setIsScrollButtonVisible(false)
            }
        })
    }, [])

    const [banners, setBanners] = useState([])
    const fetchAttractionBanners = async () => {
        try {
            const res = await axios.get(`/b2b/resellers/client/attraction/banners`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            setBanners(res.data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        fetchAttractionBanners()
    }, [])

    
      const responsive = {
        superLargeDesktop: {
          breakpoint: { max: 4000, min: 3000 },
          items: 1,
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 1,
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 1,
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1,
        },
      };
    

  return (
    <div className=''>
         <div className="grid md:grid-cols-1 relative">
            {
                banners?.length ? (
                    <Carousel 
                    responsive={responsive}
                    infinite={true}
                    autoPlay={true}
                    duration={100000}
                    >
                      {
                        banners?.map((ele)=>(
                        <div className="w-full h-96 relative">
                              <img className="w-full h-full object-fill" src={config.SERVER_URL + ele?.image} alt="" />
                              <div className="absolute top-20 bottom-0 right-1  ">
                                  <h1 className="font-bold text-white text-5xl">{ele?.title}</h1>
                                  <h1 className="text-white font-semibold max-w-xl">{ele?.body}</h1>
                                  <div className='pt-1'>
                                        {
                                            ele?.isButton === true && (
                                                <a href={ele?.buttonUrl}>
                                                   <button className='bg-white h-10 rounded-full w-32 font-bold '>{ele?.buttonText}</button>
                                               </a>
                                            )
                                        }
                                  </div>
                              </div>
                          </div>
                        ))
                      }
                        </Carousel>
                ) : (
                    <div className='w-full h-96 bg-slate-200 animate-pulse'></div>
                )
            }
      
      <div className="absolute left-0 right-0 top-52 bottom-0">
        <AttractionCard/>
      </div>
      </div>
        <div className='py-10 px-32 flex justify-center bg-white w-full h-full'>
                    <div>
                                <>
                                <InfiniteScroll
                                    dataLength={attractions || 0}
                                    next={()=> {
                                        if(!isLoading && filters.hasMore) {
                                            setFilters((prev)=> {
                                                return {...prev, skip: prev.skip + 1}
                                            })
                                        }
                                    }}
                                    hasMore={isLoading ? false : filters.hasMore}
                                    endMessage={
                                        <p style={{ textAlign: "center"}}>
                                            {
                                                !isLoading ? (
                                                    <p className="text-gray-400 text-sm font-light tracking-tight py-2">Thank you for visiting BE Happy Travel & Tourism</p>
                                                ) : ""
                                            }
                                        </p>
                                    }
                                    >
                                            <div className='grid md:grid-cols-4 sm:grid-cols-2 gap-3'>
                                                {
                                                    attractions?.map((ele, index)=> {
                                                        return (
                                                            <div key={ele?._id} className='bg-white shadow-md rounded-xl border w-full h-[450px] cursor-pointer'
                                                            onClick={()=>{
                                                                navigate(`/attractions/details/${ele?._id}`);
                                                            }}
                                                            >
                                                            <div className='relative w-full h-52 overflow-hidden'>
                                                                <img className='w-full h-full object-cover hover:scale-110 transition-all duration-500' src={config?.SERVER_URL + ele?.images[0]} alt="" />
                                                                <div className='absolute top-0 right-0 flex'>
                                                                    <div className=''>
                                                                        <h1 className='bg-orange-500 p-1  text-white w-16 text-center font-semibold text-sm'>{ele?.bookingType}</h1>
                                                                    </div>
                                                                    <div>
                                                                        <h1 className=' bg-red-500  p-1 text-white text-center font-semibold text-sm'>{ele?.category?.categoryName}</h1>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className='p-4'>
                                                                <div className=' flex justify-center h-14'>
                                                                    <h1 className='text-lg font-extralight text-center max-w-2xl'>{ele?.title}</h1>
                                                                </div>
                                                              
                                                                <div className='pt-1'>
                                                                    <h1 className='text-xs font-light text-gray-300'>Starting From</h1>
                                                                </div>
                                                                <div className="text-xl font-bold text-darktext">
                                                                    {priceConversion(
                                                                        ele?.isOffer === true
                                                                        ?  ele?.isOffer === true &&
                                                                        ele?.offerAmountType === "flat"
                                                                            ? Number( ele?.activity?.lowPrice) -
                                                                            Number( ele?.offerAmount)
                                                                            : Number( ele?.activity?.lowPrice) -
                                                                            (Number( ele?.activity?.lowPrice) *
                                                                                Number( ele?.offerAmount)) /
                                                                                100
                                                                        :  ele?.activity?.lowPrice,
                                                                        selectedCurrency,
                                                                        true
                                                                    )}
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
                                      {
                                        isLoading ? (
                                            <div className='pt-2'>
                                                <div className='grid md:grid-cols-4 sm:grid-cols-2 gap-3'>
                                                {
                                                    [1,2,3,4]?.map((ele)=>(
                                                        <div className='bg-white shadow-md  w-full h-[450px]'>
                                                        <div className='w-full h-52 '>
                                                            <div className='w-full  h-full bg-gray-100 animate-pulse'></div>
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

                                            </div>
                                        ) : ""
                                      }
                                      </InfiniteScroll>
                                </>
                    </div>
                    {
                        isScrollButtonVisible ? (
                            <div
                                onClick={()=> scrollToTop()}
                                className="cursor-pointer bg-BEColor fixed bottom-16 text-white h-10 w-10 shadow-mn rounded-full flex justify-center items-center animate-bounce right-12 text-2xl"
                            >
                                 <AiOutlineArrowUp />
                            </div>
                        ) : (
                            ""
                        )
                    }
        </div>
    </div>
  )
}

export default ToursHomePage
