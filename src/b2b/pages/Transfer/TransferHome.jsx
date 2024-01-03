import React, { useState, useRef, useEffect } from 'react'
import { SlArrowDown } from "react-icons/sl";
import { BsPeopleFill } from "react-icons/bs";
import { LuPersonStanding } from "react-icons/lu";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import TranferSuggesionLIst from './TranferSuggesionLIst';
import TransferToSuggestionList from './TransferToSuggestionList';
import { useHandleClickOutside } from '../../../hooks';
import axios from '../../../axios'
import { setSearchTransfer, setSearchedTrips } from '../../../redux/slices/transferSlice';
import { BtnLoader } from '../../components';
import { setAlertError } from '../../../redux/slices/homeSlice';
import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";
import { config } from '../../../constants';


function TransferHome() {

    const { formDatas, trips } = useSelector((state)=> state.transfer)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [showArraiDate, setShowArraiDate] = useState(false)
    const [showDeptDate, setShowDeptDate] = useState(false)
    const [showPassengers, setShowPassengers] = useState(false)
    const [searchLoader, setSearchLoader] = useState(false)

    // from suggetion states
    const [locality, setLocality] = useState('')
    const [suggestions, setSuggestions] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [value, setValue] = useState('')
    const [searchQuery, setSearchQuery] = useState({})
    const [datalist, setDatalist] = useState(false)
    const [choosedLocation, setChoosedLocation] = useState('')

    
    // To suggestion states
    const [toLocality, setToLocality] = useState('')
    const [toSuggestions, setToSuggestions] = useState([])
    const [isToLoading, setIsToLoading] = useState(false)
    const [toValue, setToValue] = useState('')
    const [ToSearchQuery, setToSearchQuery] = useState({})
    const [ToDatalist, setToDatalist] = useState(false)
    const [ToChoosedLocation, setToChoosedLocation] = useState('')



    const dropDownWrappedRef = useRef()
    useHandleClickOutside(dropDownWrappedRef, ()=> setDatalist(false))
   

    const dropDownToWrappedRef = useRef()
    useHandleClickOutside(dropDownToWrappedRef, ()=> setToDatalist(false))


    const { token } = useSelector((state)=> state.agents)

    
    const handleTripChange = (e)=>{
        const { name, value } = e.target
        dispatch(setSearchTransfer({value:value, name:name}))
    }


  
    // handle pickup time slotes 
    const [pickupTime, setPickupTime] = useState('')
    const [pickupHour, setPickupHour] = useState("")
    const [pickupMint, setPickupMint] = useState("00")

    const [returnTime, setReturnTime] = useState('')
    const [returnHr, setReturnHr] = useState("")
    const [returnMin, setReturnMin] = useState("00")

    const handleTripTimes = (e)=>{
        const { name, value } = e.target
        if(name === 'pickupHr'){
            setPickupHour(value)
        }
        if(name === 'pickupMin'){
            setPickupMint(value)
        }

        if(name === 'returnHr'){
            setReturnHr(value)
        }

        if(name === 'returnMin'){
            setReturnMin(value)
        }
    }
    

    useEffect(()=>{
        if(pickupHour && pickupMint){
           dispatch(setSearchTransfer({value:`${pickupHour}:${pickupMint}`, name:'pickupTime'}))
           setPickupTime(`${pickupHour}:${pickupMint}`)
        }

        if(returnHr && returnMin){
            dispatch(setSearchTransfer({value:`${returnHr}:${returnMin}`, name:'returnTime'}))
            setReturnTime(`${returnHr}:${returnMin}`)
        }

    }, [pickupHour, pickupMint, returnHr, returnMin])
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

    // localStorage.clear()
    
    const handleSubmint = async (e)=>{
        try {
            setSearchLoader(true)
            const res = await axios.post(`b2b/transfer/search`, formDatas, {
                headers: { Authorization: `Bearer ${token}`}
            })
            dispatch(setSearchedTrips(res?.data))
            setSearchLoader(false)

            navigate('/transfer/list')
            
        } catch (error) {
            console.log(error);
            setSearchLoader(false)
            dispatch(
                setAlertError({
                  status: true,
                  title:  error?.response?.data?.error,
                  text: error.message,
                })
              );
        }
    }

    const getSearchSuggetions = async (value) =>{
        try {
            setIsLoading(true)
            const response = await axios.get(`b2b/transfer/search/suggestions?search=${value}`, {
                headers:{Authorization: `Bearer ${token}`}
            })

            setSuggestions(response?.data)
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
        }
    }

    const getSearchToSuggetions = async (value) =>{
        try {
            setIsToLoading(true)
            const response = await axios.get(`b2b/transfer/search/suggestions?search=${value}`, {
                headers:{Authorization: `Bearer ${token}`}
            })

            setToSuggestions(response?.data)
            setIsToLoading(false)
        } catch (error) {
            setIsToLoading(false)
        }
    }

    useEffect(()=>{
        if(value.length ){
            getSearchSuggetions(value)
        }
    }, [value])

    useEffect(()=>{
        if(toValue.length){
            getSearchToSuggetions(toValue)
        }
    }, [toValue])

    const handleFocus = (e) => {
        setDatalist(true)
        setLocality("")
    }

    const handleToFocus = ()=>{
        setToDatalist(true)
        setToLocality("")
    }

    useEffect(() => {
        !locality && setValue("");
      }, [locality]);
    
   const [banners, setBanners] = useState([])   
   const fetchTransferBanners = async () => {
    try {
        const res = await axios.get(`/b2b/transfer/banners`, {
            headers: { Authorization: `Bearer ${token}`}
        })
        setBanners(res?.data)
    } catch (error) {
        console.log(error);
    }
   }

   useEffect(()=>{
        fetchTransferBanners()
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
  
    <div className='h-[800px]'>
        <div className='w-full h-[590px] relative'>
        <div className="grid md:grid-cols-1 ">
        <Carousel 
        responsive={responsive}
        infinite={true}
        autoPlay={true}
        duration={9000}
        >
          {
            banners.map((ele)=>(
            <div className="w-full h-96 relative">
                  <img className="w-full h-full object-fill" src={config.SERVER_URL + ele?.image} alt="" />
                  <div className="absolute top-10 bottom-0 right-0 left-40 ">
                    <div className='bg-black/50 rounded w-[550px] p-3'>
                        <h1 className="font-bold text-white text-5xl">{ele?.title}</h1>
                        <h1 className="text-white font-light text-lg max-w-3xl">{ele?.body}</h1>
                    </div>
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
      </div>
            <div className='absolute top-10 bottom-0 right-0 left-0 h-full w-full'> </div>
        <div className='absolute left-16 right-10 bottom-0 top-60 '>
            <div className='bg-black/60 w-full  rounded-xl h-auto md:h-[300px]'>
                <div className=' p-10'>
                        {/* <form onSubmit={handleSubmint}> */}
                        <div className='flex gap-3 '>
                                <div className='flex'>
                                <input defaultChecked={formDatas.transferType === 'oneway'} id="oneway" type="radio" value="oneway" name="transferType" className="w-5 h-5" onChange={handleTripChange}/>
                                    <label for="oneway" className="ms-1 text-md text-white">One Way</label>
                                </div>
                                <div className='flex'>
                                <input defaultChecked={formDatas.transferType === 'return'} id="rounded" type="radio" value="return" name="transferType" className="w-5 h-5 " onChange={handleTripChange}/>
                                    <label for="rounded" className="ms-1 text-md text-white">Round Trip</label>
                                </div>
                            </div>
                            <div className='grid md:grid-cols-2 gap-4 pt-3'>
                                    <div>
                                        <div className='ml-2 text-white'>
                                        <label htmlFor="">From</label>
                                        </div>
                                        <div>
                                        <input 
                                        type="text" 
                                        value={value ? value :  ""}
                                        onFocus={handleFocus}
                                        onChange={(e) => setValue(e.target.value)}
                                        className='border outline-none w-full h-12 rounded p-3 placeholder:text-gray-300 placeholder:text-sm bg-slate-100' placeholder='Pickup (Airport, train, hotel)' />

                                        <TranferSuggesionLIst
                                        locality={locality}
                                        setLocality={setLocality}
                                        datalist={datalist}
                                        setDatalist={setDatalist}
                                        suggestions={suggestions}
                                        value={value}
                                        setValue={setValue}
                                        isLoading={isLoading}
                                        setSearchQuery={setSearchQuery}
                                        searchQuery={searchQuery}
                                        />
                                        </div>
                                    </div>
                                    <div>
                                        <div className='ml-2 text-white'>
                                            <label htmlFor="">To</label>
                                        </div>
                                        <div>
                                            <input 
                                                type="text" 
                                                value={toValue ? toValue : ""}
                                                onFocus={handleToFocus}
                                                onChange={(e) => setToValue(e.target.value)} 
                                            className='border outline-none w-full h-12 rounded p-3 placeholder:text-gray-300 bg-slate-100 placeholder:text-sm' placeholder='Pickup (Airport, train, hotel)' />
                                            <TransferToSuggestionList
                                               toLocality={toLocality}
                                               setToLocality={setToLocality}
                                               ToDatalist={ToDatalist}
                                               setToDatalist={setToDatalist}
                                               toSuggestions={toSuggestions}
                                               toValue={toValue}
                                               setToValue={setToValue}
                                               isToLoading={isToLoading}
                                               setToSearchQuery={setToSearchQuery}
                                               ToSearchQuery={ToSearchQuery}
                                        />
                                        </div>
                                    </div>
                            </div>
                            <div className='grid md:grid-cols-2 gap-5 pt-4'>
                                <div className='grid md:flex gap-2'>
                                <div>
                                    <div className='ml-2 text-white'>
                                        <label htmlFor="">Date and time of arrival</label>
                                    </div>
                                    <div className='flex pt-1 relative'>
                                         <div>
                                             <input type="date" 
                                             value={formDatas.pickupDate ? formDatas.pickupDate : ""}
                                                onChange={(e)=>{
                                                    dispatch(setSearchTransfer({value: e.target.value, name:"pickupDate"}))
                                                }}
                                             className='rounded-l p-3 h-12 w-28 md:w-40 text-gray-300 bg-slate-100 outline-none'/>
                                        </div>
                                            <div className='bg-slate-100 rounded-r border-l h-12 w-28 md:w-40 '>
                                                <div className='p-3 flex justify-between cursor-pointer'
                                                              onClick={()=>{
                                                                setShowArraiDate(!showArraiDate)
                                                            }}
                                                >
                                                    <h1 className='text-gray-300 text-sm '>{pickupTime ? pickupTime : "Time"}</h1>
                                                    <h1 className='text-black text-sm pt-1  '><SlArrowDown /></h1>
                                                </div>
                                                {
                                                    showArraiDate && (
                                                        <div className='bg-white  w-full h-40 shadow-lg shadow-gray-300 rounded-b-xl absolute right-0 left-0 top-14 bottom-0'>
                                                        <div className='flex gap-2 justify-center pt-3 '>
                                                            <div className=' '>
                                                                <select name="pickupHr"
                                                                onChange={handleTripTimes}
                                                                value={pickupHour ? pickupHour : ""}
                                                                id="" className='outline-none border h-12 w-36 p-2'>
                                                                    <option value="00">0</option>
                                                                    <option value="01">1</option>
                                                                    <option value="02">2</option>
                                                                    <option value="03">3</option>
                                                                    <option value="04">4</option>
                                                                    <option value="05">5</option>
                                                                    <option value="06">6</option>
                                                                    <option value="07">7</option>
                                                                    <option value="08">8</option>
                                                                    <option value="09">9</option>
                                                                    <option value="10">10</option>
                                                                    <option value="11">11</option>
                                                                    <option value="12">12</option>
                                                                    <option value="13">13</option>
                                                                    <option value="14">14</option>
                                                                    <option value="15">15</option>
                                                                    <option value="16">16</option>
                                                                    <option value="17">17</option>
                                                                    <option value="18">18</option>
                                                                    <option value="19">19</option>
                                                                    <option value="20">20</option>
                                                                    <option value="21">21</option>
                                                                    <option value="22">22</option>
                                                                    <option value="23">23</option>
                                                                    <option value="24">24</option>
                                                                </select>
                                                            </div>
                                                            <div className=''>
                                                                <select name="pickupMin"
                                                                onChange={handleTripTimes}
                                                                value={pickupMint ? pickupMint : " "}
                                                                id="" className='outline-none border h-12 w-36 p-2'>
                                                                    <option value="00">00</option>
                                                                    <option value="05">5</option>
                                                                    <option value="10">10</option>
                                                                    <option value="15">15</option>
                                                                    <option value="20">20</option>
                                                                    <option value="25">25</option>
                                                                    <option value="30">30</option>
                                                                    <option value="35">35</option>
                                                                    <option value="40">40</option>
                                                                    <option value="45">45</option>
                                                                    <option value="50">50</option>
                                                                    <option value="55">55</option>
                                                                </select>
                                                            </div>
    
                                                        </div>
                                                            <div className='flex justify-center pt-5'>
                                                                <button className='bg-BEColor text-white h-10 w-44 rounded '
                                                                onClick={()=>{
                                                                    setShowArraiDate(false)
                                                                }}
                                                                >Accept</button>
                                                            </div>
                                                      
                                                    </div>
                                                    )
                                                }
                                             
                                            </div>
                                    </div>
                                </div>

                            {
                                formDatas?.transferType === "return" ? (
                                    <div>
                                    <div className='ml-2 text-white'>
                                        <label htmlFor="">Date and time of departure</label>
                                    </div>
                                    <div className='flex pt-1 relative'>
                                        <div>
                                        <input type="date" 
                                            value={formDatas.returnDate ? formDatas.returnDate : ""}
                                            name='returnDate'
                                            onChange={(e)=>{
                                            dispatch(setSearchTransfer({value: e.target.value, name:"returnDate"}))
                                        }}
                                     
                                        className='rounded-l p-3 h-12 w-28 md:w-40 text-gray-300 bg-slate-100 outline-none'/>
                                        </div>
                                            <div className='bg-slate-100 rounded-r border-l h-12 w-28 md:w-40'
                                         
                                            >
                                               <div className='p-3 flex justify-between cursor-pointer'
                                                  onClick={()=>{
                                                    setShowDeptDate(!showDeptDate)
                                                }}
                                               >
                                                    <h1 className='text-gray-300 text-sm '>{returnTime ? returnTime : "Time"}</h1>
                                                    <h1 className='text-black text-sm pt-1  '><SlArrowDown /></h1>
                                                </div>
                                                {
                                                    showDeptDate && (
                                                        <div className='bg-white  w-full h-40 shadow-lg shadow-gray-300 rounded-b-xl absolute right-0 left-0 top-14 bottom-0'>
                                                        <div className='flex gap-2 justify-center pt-3 '>
                                                            <div className=' '>
                                                                <select name="returnHr"
                                                                value={returnHr ? returnHr : ""}
                                                                onChange={handleTripTimes}
                                                                id="" className='outline-none border h-12 w-36 p-2'>
                                                                <option value="00">0</option>
                                                                    <option value="01">1</option>
                                                                    <option value="02">2</option>
                                                                    <option value="03">3</option>
                                                                    <option value="04">4</option>
                                                                    <option value="05">5</option>
                                                                    <option value="06">6</option>
                                                                    <option value="07">7</option>
                                                                    <option value="08">8</option>
                                                                    <option value="09">9</option>
                                                                    <option value="10">10</option>
                                                                    <option value="11">11</option>
                                                                    <option value="12">12</option>
                                                                    <option value="13">13</option>
                                                                    <option value="14">14</option>
                                                                    <option value="15">15</option>
                                                                    <option value="16">16</option>
                                                                    <option value="17">17</option>
                                                                    <option value="18">18</option>
                                                                    <option value="19">19</option>
                                                                    <option value="20">20</option>
                                                                    <option value="21">21</option>
                                                                    <option value="22">22</option>
                                                                    <option value="23">23</option>
                                                                    <option value="24">24</option>
                                                                </select>
                                                            </div>
                                                            <div className=''>
                                                                <select name="returnMin"
                                                                value={returnMin ? returnMin : ""}
                                                                onChange={handleTripTimes}
                                                                id="" className='outline-none border h-12 w-36 p-2'>
                                                                <option value="0">00</option>
                                                                    <option value="5">5</option>
                                                                    <option value="10">10</option>
                                                                    <option value="15">15</option>
                                                                    <option value="20">20</option>
                                                                    <option value="25">25</option>
                                                                    <option value="30">30</option>
                                                                    <option value="35">35</option>
                                                                    <option value="40">40</option>
                                                                    <option value="45">45</option>
                                                                    <option value="50">50</option>
                                                                    <option value="55">55</option>
                                                                </select>
                                                            </div>
    
                                                        </div>
                                                            <div className='flex justify-center pt-5'>
                                                                <button className='bg-BEColor text-white h-10 w-44 rounded '
                                                                onClick={()=>{
                                                                    setShowDeptDate(false)
                                                                }}
                                                                >Accept</button>
                                                            </div>
                                                      
                                                    </div>
                                                    )
                                                }
                                              
                                            </div>
                                    </div>
                                  </div>
                                ) : formDatas?.transferType ==="oneway" ? (
                                    <div>
                                    <div className='ml-2 text-gray-300'>
                                        <label htmlFor="">Date and time of departure</label>
                                    </div>
                                    <div className='flex pt-1 relative'>
                                        <div>
                                        <input type="date" 
                                      
                                        className='rounded-l p-3 h-12 w-28 md:w-40 text-gray-300 outline-none bg-white/20' disabled/>
                                        </div>
                                            <div className='bg-white/20 rounded-r border-l h-12 w-28 md:w-40'
                                         
                                            >
                                               <div className='p-3 flex justify-between'
                                               >
                                                    <h1 className='text-gray-300 text-sm '>Time</h1>
                                                    <h1 className='text-black text-sm pt-1  '><SlArrowDown /></h1>
                                                </div>
                                                
                                              
                                            </div>
                                    </div>
                                  </div>
                                ):""
                            }
                               
                                </div>

                                <div className='grid md:flex gap-2'>
                                    <div className=''>
                                            <div className='ml-2 '>
                                                <label htmlFor="" className='text-white '>Passengers</label>
                                            </div>
                                            <div className='bg-slate-100 md:w-80 h-12 rounded relative  '>
                                                <div className='p-3 flex justify-between gap-5 cursor-pointer'
                                                onClick={()=>{
                                                    setShowPassengers(!showPassengers)
                                                }}
                                                >
                                                    <div className='flex gap-3'>
                                                        <div className='flex gap-1'>
                                                            <h1 className='textsm text-gray-300'><BsPeopleFill /></h1>
                                                            <h1 className='text-sm text-gray-300 '>{formDatas?.noOfAdults}</h1>
                                                            <h1 className='text-sm text-gray-300 '>Adult </h1>
                                                            <h1 className='text-sm text-gray-300 '>,</h1>
                                                        </div>
                                                    <div className='flex gap-1'>
                                                        {
                                                            formDatas?.noOfChildrens && (
                                                                <>
                                                                    <h1 className='text-md text-gray-300 '><LuPersonStanding /></h1>
                                                                    <h1 className='text-sm text-gray-300 '>{formDatas?.noOfChildrens}</h1>
                                                                    <h1 className='text-sm text-gray-300 '>Children</h1>
                                                                
                                                                </>
                                                            )
                                                        }
                                                    </div>
                                                    </div>
                                                    <div>
                                                    <h1 className='text-black text-sm pt-1  '><SlArrowDown /></h1>
                                                    </div>

                                                </div>

                                                {
                                                    showPassengers && (
                                                        <div className='bg-white  w-full h-40 shadow-lg shadow-gray-300 rounded-b-xl absolute right-0 left-0 top-14 bottom-0 '>
                                                        <div className='flex gap-2 justify-center pt-3 '>
                                                                <div className=' '>
                                                                    <div>
                                                                        <label htmlFor="">Adult</label>
                                                                    </div>
                                                                    <select name="noOfAdults"
                                                                    onChange={(e)=>{
                                                                        dispatch(setSearchTransfer({value:e.target.value, name:"noOfAdults"}))
                                                                    }}
                                                                    id="" className='outline-none border h-12 w-36 p-2'>
                                                                        <option value="0">0</option>
                                                                        <option value="1">1</option>
                                                                        <option value="2">2</option>
                                                                        <option value="3">3</option>
                                                                        <option value="4">4</option>
                                                                        <option value="5">5</option>
                                                                        <option value="6">6</option>
                                                                        <option value="7">7</option>
                                                                        <option value="8">8</option>
                                                                        <option value="9">9</option>
                                                                        <option value="10">10</option>
                                                                    </select>
                                                                </div>
                                                                <div className=''>
                                                                <div>
                                                                        <label htmlFor="">Children</label>
                                                                    </div>
                                                                    <select name="noOfChildrens"
                                                                          onChange={(e)=>{
                                                                            dispatch(setSearchTransfer({value:e.target.value, name:"noOfChildrens"}))
                                                                        }}
                                                                    id="" className='outline-none border h-12 w-36 p-2'>
                                                                        <option value="0">0</option>
                                                                        <option value="1">1</option>
                                                                        <option value="2">2</option>
                                                                        <option value="3">3</option>
                                                                        <option value="4">4</option>
                                                                        <option value="5">5</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                            <div className='flex justify-center pt-5'>
                                                                    <button className='bg-BEColor text-white h-10 w-44 rounded ' 
                                                                    onClick={()=>{
                                                                        setShowPassengers(false)
                                                                    }}
                                                                    >Accept</button>
                                                             </div>
                                                        </div>
                                                    )
                                                }
                                              
                                            </div>
                                    </div>
                                    <div className='flex justify-center pt-6'>
                                        {
                                            !searchLoader ? (
                                                <button className='w-80 h-12 bg-BEColor text-white rounded font-semibold'
                                                onClick={handleSubmint}
                                                >Search Transfer</button>
                                            ) : (
                                                <button className='w-80 h-12 bg-BEColor text-white rounded font-semibold'
                                                ><BtnLoader/></button>
                                            )
                                        }
                                    </div>
                                </div>
                                
                            </div>
                    {/* </form>   */}
                </div>
            </div>
        </div>
        </div>

    </div>
  )
}

export default TransferHome
