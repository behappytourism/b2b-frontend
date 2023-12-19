// import React, { useState } from 'react'
import { BsCart2 } from "react-icons/bs";
import { MdOutlinePayment } from "react-icons/md";
import { FaPrint } from "react-icons/fa6";
import { FaBaby, FaChild } from 'react-icons/fa'
import { BsDash, BsPersonFill } from 'react-icons/bs'
import React, { useState, useEffect } from 'react'
import { FaArrowRight } from "react-icons/fa6";
import { IoTimeOutline } from "react-icons/io5";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { CiCalendarDate } from "react-icons/ci";
import { LiaSaveSolid } from "react-icons/lia";
import { useSelector, useDispatch } from 'react-redux';
import { TiDelete } from "react-icons/ti";
import { deleteSelectedTransferInCart, clearSearchTransferTrips } from '../../../redux/slices/transferSlice';
import { useNavigate } from 'react-router-dom';
import axios from '../../../axios'
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import { config } from '../../../constants';
import { setAlertError, setAlertSuccess } from '../../../redux/slices/homeSlice';
import { BtnLoader } from '../../components';
import ConfirmOtpModal from '../Transfer/ConfirmOtpModal';
import { removeFromCart } from "../../../redux/slices/agentExcursionSlice";
import priceConversion from "../../../utils/PriceConversion";

function Cartpage() {

    // const { countries } = useSelector((state) => state.home);

    
    // console.log(agentExcursionCart);
    
    const { selectedCurrency } = useSelector(state => state.home)
    const { agentExcursionCart } = useSelector(state => state.agentExcursions)
    const { agentTransferCart } = useSelector((state)=> state.transfer)
    const { countries } = useSelector((state) => state.home);
    const { token } = useSelector((state)=> state.agents)


    const dispatch = useDispatch()

    const navigate = useNavigate()

    const [totalPrice, setTotalPrice] = useState(0)

    const [details, setDetails] = useState({
        name: '',
        email: "",
        phoneNumber: "",
        country: "",
        paymentMethod: "wallet",
        countryCode:"",
        agentReferenceNumber:"",
        selectedJourneys: [],
        selectedActivities: []
    })
    const [orderId, setOrderId] = useState('')
    const [isModal, setIsModal] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [price, setPrice] = useState(0) 

    useEffect(() => {
        const sum = agentExcursionCart?.reduce((acc, data) => {
          return Number(acc) + Number(data?.price)
        }, 0)
        setPrice(sum)
      }, [agentExcursionCart])
    
    useEffect(()=>{
        let sum = 0
        if(agentTransferCart?.length){
            for(let i = 0; i < agentTransferCart?.length; i++){
                for(let j = 0; j < agentTransferCart[i].journys.length; j++){
                    if(agentTransferCart[i].journys[j].selectedVehicleTypes.length){
                        for(let k = 0; k < agentTransferCart[i].journys[j].selectedVehicleTypes.length; k++){
                            sum += agentTransferCart[i].journys[j].selectedVehicleTypes[k].price
                        }
                    }

                    if(agentTransferCart[i].journys[j].selectedReturnVehicleTypes.length){
                        for(let k = 0; k < agentTransferCart[i].journys[j].selectedReturnVehicleTypes.length; k++){
                            sum += agentTransferCart[i].journys[j].selectedReturnVehicleTypes[k].price
                        }
                    }

                    if(price) {
                        sum = sum + price
                        setTotalPrice(sum)
                    } else {
                        setTotalPrice(sum)

                    }
                }
            }       
            
        }

        if(!agentTransferCart.length && agentExcursionCart.length ) {
            sum += price
            setTotalPrice(sum)
        }
    }, [ agentTransferCart,totalPrice, price, agentExcursionCart])

   

    // useEffect(()=>{
    //     if(agentTransferCart?.length < 1){
    //         navigate("/transfer")
    //         dispatch(clearSearchTransferTrips())

    //     }
    // }, [agentTransferCart])

    useEffect(()=>{
        return() => {
            dispatch(clearSearchTransferTrips())
        }
    }, [])


    const handleDeleteVehicle = (vehicle, index)=>{
        dispatch(deleteSelectedTransferInCart({data:vehicle, index:index}))
    }

    const handleDetailsChanges = (e)=>{
        const { name, value } = e.target
        setDetails(({
            ...details,
            [name]:value
        }))

    }

    let data = []
    let activityData = []
    useEffect(()=>{
        let transfers = {}
        if(details.name && details.email && details.phoneNumber && details.country && details.paymentMethod){
        if(agentTransferCart.length){
            agentTransferCart.map((ele)=>{
              ele?.journys.map((item)=>{
                   transfers = {
                      dropOffLocation: item?.dropOffLocation,
                      transferType: item?.transferType,
                      pickupLocation: item?.pickupLocation,
                      pickupSuggestionType: item?.pickupSuggestionType,
                      dropOffSuggestionType: item?.dropOffSuggestionType,
                      noOfAdults: item?.noOfAdults,
                      noOfChildrens: item?.noOfChildrens,
                      pickupDate: item?.pickupDate,
                      pickupTime: item?.pickupTime,
                      returnDate: item?.returnDate,
                      returnTime: item?.returnTime,
                      selectedVehicleTypes: [],
                      selectedReturnVehicleTypes: []
                   }
                   if(item?.selectedVehicleTypes.length){
                      let vehicle = {}
                     for(let i = 0; i < item?.selectedVehicleTypes?.length; i++){
                      vehicle = {
                          vehicle: item?.selectedVehicleTypes[i].vehicle,
                          count: item?.selectedVehicleTypes[i].count,
                      }
                      transfers.selectedVehicleTypes.push(vehicle)
                     }
                   }
  
                   if(item?.selectedReturnVehicleTypes.length){
                      let vehicle = {}
                     for(let i = 0; i < item?.selectedReturnVehicleTypes?.length; i++){
                      vehicle = {
                          vehicle: item?.selectedReturnVehicleTypes[i].vehicle,
                          count: item?.selectedReturnVehicleTypes[i].count,
                      }
                      transfers.selectedReturnVehicleTypes.push(vehicle)
                     }
                   }
                  data.push(transfers)
              })
            })
        }

        let activities = {}
        if(agentExcursionCart?.length){
            agentExcursionCart.map((item)=>{
                activities = {
                    activity: item?._id,
                    date: item?.date,
                    adultsCount: item?.adult,
                    childrenCount: item?.child,
                    infantCount: item?.infant,
                    hoursCount: item?.hourCount ? item?.hourCount : "",
                    transferType: item?.transfer,
                    slot: item?.selectedTimeSlot,
                    isPromoAdded: item?.isPromoAdded,
                }

                activityData.push(activities)
            })
        }

        }
        details.selectedJourneys = data
        details.selectedActivities = activityData
    }, [details.name && details.email && details.phoneNumber && details.country && details.paymentMethod ])


    const [countryCode, setCountryCode] = useState('')
    useEffect(()=>{
        countries.map((ele)=>{
            if(ele?._id === details.country){
                setCountryCode(ele?.phonecode)
                details.countryCode = ele?.isocode
            }
        })
    }, [details.country])


    // handle create a transfer order
    const handleCreateTransferBooking = async () =>{
        try {
            setIsLoading(true)
            const res = await axios.post(`/b2b/orders/create`, details, {
                headers: { Authorization: `Bearer ${token}`}
            })

            setOrderId(res.data.orderId)
            if(details.paymentMethod === 'wallet'){
                setIsModal(true)

            }

            if(details.paymentMethod === 'ccavenue'){
                const winUrl = URL.createObjectURL(
                    new Blob([res.data], { type: "text/html"})
                )

                window.location.replace(winUrl)
            }

            setIsLoading(false)
        } catch (error) {
            dispatch(setAlertError({
               status: true,
               title: error?.response?.data?.error,
               text: error?.message 
            }))
            setIsLoading(false)
            console.log(error, "error response");
        }
    } 


    const singleAttractionTotalCost = (items) =>{
        let sum = 0
        if(items.adultPrice && items.adult ){
            sum += items?.adultPrice * items.adult
        } 
        if(items?.childPrice && items.child){
            sum += items?.childPrice * items?.child
        }
        if(items?.infantPrice && items?.infant) {
            sum += items?.infantPrice * items?.infant
        }
        return sum
    }


    const [cartCount, setCartCount] = useState(0)
    useEffect(()=>{
        let count = 0
        if(agentExcursionCart.length ){
            count += agentExcursionCart.length
        }

        if(agentTransferCart.length){
            count += agentTransferCart.length
        }

        setCartCount(count)
    }, [agentExcursionCart, agentTransferCart])

  return (
   

    <div className="">
        <div className="p-5 flex justify-center ">
            <div className='flex justify-between bg-white shadow-sm p-5 w-[1200px] rounded-lg '>
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
                                        <h1 className='text-xs text-center font-light'>Print </h1>
                                    </div>
                                </div>
                        </div>
                        <div>
                            <h1 className='text-sm font-semibold'>Currently, you have {cartCount} item(s) in your cart</h1>
                            <div className='flex justify-end pt-2'>
                                <button onClick={()=> navigate('/')} className='text-end text-md text-orange-600'>CONTINUE SHOPPING</button>
                            </div>
                        </div>
                    </div>

        </div>
    <div className='grid  md:flex gap-5 justify-center p-10 '>
        <div className=''>
            {
                agentExcursionCart?.length > 0 || agentTransferCart?.length > 0 && (
                    <div>
                        <h1 className="text-lg font-bold">Cart Details</h1>
                    </div>
                )
            }

              {/* selected excursions  */}
              <div className="pt-3">
                {
                    agentExcursionCart?.length > 0 ? (
                        <div>
                            <div>
                                <h1 className="font-semibold text-xl">Attraction</h1>
                            </div>
                            {
                                agentExcursionCart?.map((item, index)=>{
                                    return (
                                        <div key={index} className="pt-2">
                                            <div className="border">
                                                    <div className="flex justify-end ">
                                                        <h1 className="text-xl text-red-500 cursor-pointer"
                                                        onClick={()=>{
                                                            dispatch(removeFromCart(item?._id))
                                                            dispatch(setAlertSuccess({
                                                                status: true,
                                                                title: "Removed from Cart!",
                                                                text: "The selected item successfully removed from cart"
                                                            }))
                                                        }}
                                                        ><TiDelete /></h1>
                                                    </div>
                                                <div className="w-[800px] h-40 p-5">
                                                    <div className="flex justify-between">
                                                        <div className="">
                                                            <div>
                                                                <h1 className="text-md font-semibold">{item?.name}</h1>
                                                                <p className="pt-1 text-sm font-light">Date : {item?.date}</p>
                                                            </div>
                                                            <div className="flex gap-2">
                                                            {item?.adult > 0 && (
                                                                <div className='gap-1 flex  text-gray-600 py-1 px-1 rounded-md items-center'>
                                                                    <span className=''>{item?.adult}</span>
                                                                    <span className=''><BsPersonFill /> </span>
                                                                    <span className=''>{priceConversion(item?.adultPrice, selectedCurrency, true)}</span>
                                                                </div>
                                                                )}
                                                                {item?.child > 0 && (
                                                                    <div className='gap-1 flex  text-gray-600 py-1 px-1 rounded-md items-center'>
                                                                        <span className=''>{item?.child} </span>
                                                                        <span className=''><FaChild /></span>
                                                                        <span className=''>{priceConversion(item?.childPrice, selectedCurrency, true)} </span>
                                                                    </div>
                                                                    )}
                                                                {item?.infant > 0 && (
                                                                    <div className='gap-1 flex  text-gray-600 py-1 px-1 rounded-md items-center'>
                                                                        <span className=''>{item?.infant}</span>
                                                                        <span className=''><FaBaby /> </span>
                                                                        <span className=''>{priceConversion(item?.infantPrice, selectedCurrency, true)}</span>
                                                                    </div>
                                                                    )}    
                                                            </div>
                                                        </div>
                                                    </div>
                                                        <div className="flex justify-end">
                                                            <p className='text-xl font-semibold text-green-500 '>{singleAttractionTotalCost(item).toFixed(2)}AED</p>
                                                        </div>
                                                </div>

                                            </div>

                                        </div>
                                    )
                                })
                            }
                        </div>
                    ) : ""
                }
            </div>
            {
                agentTransferCart?.length > 0 ? (
                    <div className='  bg-BeGray'>
                        <div>
                            <h1 className="font-semibold text-xl">Transfer</h1>
                        </div>
                    {
                        agentTransferCart?.map((ele, index)=>(
                            <div key={index} className='mb-2 flex gap-2 pt-2'>
                            {
                                ele?.journys.map((item, i)=>{
                                    return (
                                        <div key={i} className=' w-[800px] border bg-white'>
                                            <div className='flex justify-end '>
                                                <button 
                                                onClick={()=>handleDeleteVehicle(ele, index)}
                                                className='text-red-500 text-xl'><TiDelete /></button>
                                            </div>
                                            <div className='p-5'>
                                            <div className='flex justify-between p-2 items-center'>
                                                <div>
                                                    <h1 className='text-sm font-bold'>{item?.pickupLocationName}</h1>
                                                </div>
                                                <div>
                                                    <h1 className='text-sm font-bold'>{item?.dropOffLocationName}</h1>
                                                </div>
                                            </div>
                                            <div className='flex justify-between items-center gap-2'>
                                                    <div className='flex items-center'>
                                                        <div className='w-2 h-2 rounded-full border-2 border-orange-500'></div>
                                                    </div>
                                                    <div className='border-b flex-grow relative'>
                                                        {
                                                            item?.transferType === "oneway" ? (
                                                                <div className='absolute top-1/2 transform -translate-y-1/2 right-80'>
                                                                    <FaArrowRight />
                                                                </div>

                                                            ) : item?.transferType === "return" ? (
                                                                <div className='absolute top-1/2 transform -translate-y-1/2 right-80'>
                                                               <FaArrowRightArrowLeft />
                                                            </div>
                                                            ) : ""
                                                        }
                                                    </div>
                                                    <div className='flex items-center'>
                                                        <div className='w-2 h-2 rounded-full border-2 border-orange-500'></div>
                                                    </div>
                                                </div>
                    
                                            <div className='flex gap-2 pt-2'>
                                                <div className='flex gap-1'>
                                                    <div>
                                                        <h1><CiCalendarDate /></h1>
                                                    </div>
                                                    {
                                                        item?.transferType === "oneway" ? (
                                                            <div>
                                                                <h1 className='text-xs'>{item?.pickupDate}</h1>
                                                            </div>

                                                        ) : item?.transferType === 'return' ? (
                                                            <div className='flex justify-between gap-3'>
                                                                <h1 className='text-xs'>Date: {item?.pickupDate}</h1>
                                                                <h1 className='text-xs'>Return: {item?.returnDate}</h1>
                                                            </div>
                                                        ):""
                                                    }
                                                    <div>
                                                        <h1><IoTimeOutline /></h1>
                                                    </div>
                                                    {
                                                        item?.transferType === "oneway" ? (
                                                            <div>
                                                                <h1 className='text-xs'>{item?.pickupTime}</h1>
                                                            </div>

                                                        ) : item?.transferType === 'return' ? (
                                                            <div className='flex justify-between gap-3'>
                                                                <h1 className='text-xs'>PickupTime: {item?.pickupTime}</h1>
                                                                <h1 className='text-xs'>Return: {item?.returnTime}</h1>
                                                            </div>
                                                        ):""
                                                    }
                                                </div>
                                                <div className='flex gap-1'>
                                                    <div>
                                                        <h1><IoTimeOutline /></h1>
                                                    </div>
                                                    <div>
                                                        <h1 className='text-xs'>Maximum waiting time: 60 minutes</h1>
                                                    </div>
                                                </div>
                                            </div>
                                             <div className='pt-3'>
                                                 <div>
                                                    <h1 className='text-sm font-bold '>Vehicle's</h1>
                                                 </div>
                                                 {
                                                    item?.transferType === 'oneway' ? (
                                                        <div>
                                                            <div className='flex gap-4 pt-1 '>
                                                                {
                                                                    item?.selectedVehicleTypes?.map((vehicle)=>{
                                                                        return(
                                                                                <div key={vehicle?._id} className=' border p-2  w-32'>
                                                                                    <h1 className='text-sm text-center'>{vehicle?.vehicleName}</h1>
                                                                                    <h1 className='text-sm text-center'>Count : {vehicle?.count}</h1>
                                                                                </div>
                                                                        )
                                                                    })
                                                                }

                                                            </div>
                                                            {
                                                                item?.selectedVehicleTypes?.map((pr, nn)=>{
                                                                    let sum = 0
                                                                    for(let i = 0; i < item?.selectedVehicleTypes.length; i++){
                                                                        sum += item?.selectedVehicleTypes[i].price
                                                                    }
                                                                    return (
                                                                        <div className='flex justify-end'>
                                                                            {
                                                                                nn === 0 && (
                                                                                    <h1 className='text-xl font-semibold text-green-500'>{sum}.00 AED</h1>
                                                                                )
                                                                            }
                                                                        </div>
                                                                    )
                                                                })
                                                            }

                                                        </div>
                                                    ) : item?.transferType === 'return' ? (
                                                        <div>
                                                            <div className='flex gap-4'>
                                                                {
                                                                    item?.selectedVehicleTypes?.map((vehicle, ind)=>{
                                                                        return(
                                                                            <div key={ind} className=''>
                                                                                <div className='border p-2 w-32 '>
                                                                                <h1 className='text-sm text-center'>{vehicle?.vehicleName}</h1>
                                                                                <h1 className='text-sm text-center'>Count : {vehicle?.count}</h1>
                                                                                </div>
                                                                            </div>
                                                                        )
                                                                    })
                                                                }
                                                            </div>
                                                            <div className='pt-4'>
                                                                <div>
                                                                    <h1 className='font-bold text-sm'>Return Vehicles</h1>
                                                                </div>
                                                                <div className='flex gap-4'>
                                                                {
                                                                    item?.selectedReturnVehicleTypes?.map((revehicle, ii)=>{
                                                                        return(
                                                                                <div key={ii} className='border p-2 w-32'>
                                                                                       <h1 className='text-sm text-center'>{revehicle?.vehicleName}</h1>
                                                                                       <h1 className='text-sm text-center'>Count : {revehicle?.count}</h1>
                                                                                </div>
                                                                        )
                                                                    })
                                                                }
                                                                </div>
                                                            </div>
                                                            {
                                                                item?.selectedVehicleTypes.map((pr, nn)=>{
                                                                    let sum = 0;
                                                                    for(let i = 0; i < item?.selectedVehicleTypes.length; i++){
                                                                        sum += item?.selectedVehicleTypes[i].price
                                                                    }
                                                                    if(item?.selectedReturnVehicleTypes.length){
                                                                        for(let j = 0; j < item?.selectedReturnVehicleTypes.length; j++){
                                                                            sum += item?.selectedReturnVehicleTypes[j].price
                                                                        }
                                                                    }
                                                                    return (
                                                                        <div className='flex justify-end'>
                                                                            {
                                                                               nn === 0 && (
                                                                                   <h1 className='text-xl font-semibold text-green-500'>{sum}.00 AED</h1>
                                                                               ) 
                                                                            }
                                                                        </div>
                                                                    )
                                                                })
                                                            }
                                                        </div>
                                                    ) : ""
                                                 }
                                             </div>
                                        </div>
                                        </div>

                                    )
                                })
                            }
                        </div>
                        ))
                    }
             </div>

                ) : ""
            }

          
              
             </div>

            {
                agentExcursionCart.length < 1 && agentTransferCart.length < 1 ? (
                    (
                        <div className="pt-20">
                            <div className="w-52 h-52">
                                <img src="https://assets.materialup.com/uploads/16e7d0ed-140b-4f86-9b7e-d9d1c04edb2b/preview.png" alt="" />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold">Your Cart is empty...</h1>
                            </div>
                        </div>
                    )
                ) : ""
            }
             <div>

             </div>
             
        <div className=''>
            {
                agentTransferCart?.length > 0 || agentExcursionCart?.length >  0 ? (
                    <>
                         <div className='pt-9'>
                    <div className='bg-white shadow-sm p-5 w-[500px]'>
                        {/* <form onSubmit={handleCreateTransferBooking}> */}
                        <div>
                            <h1 className='text-lg font-bold'>Add Details</h1>
                        </div>
                            <div className='grid md:grid-cols-2 gap-2 pt-3'>
                            <div>
                                    <div className='text-sm'>
                                        <label >Agent Reference Number</label>
                                    </div>
                                    <div>
                                        <input
                                        name='agentReferenceNumber'
                                        value={details.agentReferenceNumber}
                                        onChange={handleDetailsChanges}
                                        type="text" className='outline-none bg-slate-100 w-full h-10 rounded p-2 placeholder:text-gray-300 placeholder:text-sm' placeholder='Agent Reference' />
                                    </div>
                                </div>
                                <div>
                                    <div className='text-sm'>
                                        <label >Name</label>
                                    </div>
                                    <div>
                                        <input
                                        name='name'
                                        value={details.name}
                                        onChange={handleDetailsChanges}
                                        type="text" className='outline-none bg-slate-100 w-full h-10 rounded p-2 placeholder:text-gray-300 placeholder:text-sm' placeholder='Full name' />
                                    </div>
                                </div>
                                <div>
                                    <div className='text-sm'>
                                        <label >Email</label>
                                    </div>
                                    <div>
                                        <input
                                        value={details.email}
                                        name='email'
                                        onChange={handleDetailsChanges}
                                        type="text" className='outline-none bg-slate-100 w-full h-10 rounded p-2 placeholder:text-gray-300 placeholder:text-sm' placeholder='example@gmail.com' />
                                    </div>
                                </div>
                               
                                <div className="">
                                    <div className='text-sm'>
                                        <label >Country</label>
                                    </div>
                                    <div>
                                    <select
                                    onChange={handleDetailsChanges}
                                    name="country" className='outline-none bg-slate-100 w-full h-10 rounded p-2 ' id="">
                                        {
                                            countries?.map((ele)=>(
                                                <option value={ele?._id}>{ele?.countryName}</option>
                                            ))
                                        }
                                    </select>
                                    </div>
                                </div>

                                <div className="flex gap-1">
                                         <div>
                                            <div>
                                                <label className="text-sm" htmlFor="">Code</label>
                                            </div>
                                            <div>
                                                <input className="outline-none bg-slate-100 w-14 h-10 rounded p-2 placeholder:text-gray-300 placeholder:text-sm" type="text" value={countryCode ? countryCode : ""} disabled placeholder="Code" />
                                            </div>
                                        </div>
                                    <div>
                                            <label className="text-sm" >Phone Number</label>
                                            <input
                                            name='phoneNumber'
                                            value={details.phoneNumber}
                                            onChange={handleDetailsChanges}
                                            type="phone" className='outline-none bg-slate-100 w-full h-10 rounded p-2 placeholder:text-gray-300 placeholder:text-sm' placeholder='Phone number' />
                                    </div>
                                       
                                </div>
                              
                            </div>
                            {/* <div className='flex justify-end pt-5'>
                                <button className='w-32 bg-orange-500 h-10 text-white font-bold rounded '>Submit</button>
                            </div> */}
                        {/* </form> */}
                    </div>
                 </div>
                 <div className='pt-3'>
                    <div className='shadow-sm w-full h-96 relative bg-white '>
                        <div className=''>
                            <div className='flex gap-1 justify-center items-center mb-2 bg-BEColor h-12'>
                                <h1 className='text-green-900 text-3xl'><IoIosCheckmarkCircleOutline /></h1>
                                 <h1 className='text-lg text-center font-bold'>Confirm Order</h1>   
                            </div>
                        </div>
                        <div className=' w-full h-28 flex justify-center items-center'>
                            <div className=''>
                                <h1 className='text-lg flex justify-center'><LiaSaveSolid /></h1>
                                <h1 className='text-xs text-gray-400 text-center'>Total price</h1>
                                <h1 className='text-green-400 font-bold text-3xl'>{totalPrice.toFixed(2)} AED</h1>
                            </div>
                        </div>

                        <div className='pt-2'>
                            <div className=' w-full h-auto p-4'>
                                <div className=" flex justify-center place-items-center">
                                <div className=''>
                                    <div className=' w-full h-10'>
                                <div className='text-xl font-bold'>
                                        <label >Payment Method</label>
                                    </div>
                                    <div className='flex p-2 gap-3'>
                                    <div className='flex gap-1'>
                                        <label className='text-lg font-semibold '>Wallet</label>
                                        <div className='pt-1'>
                                         <input checked={details.paymentMethod === 'wallet'} className='w-4 h-4 ' onChange={handleDetailsChanges} value={"wallet"} name='paymentMethod' type="radio" />
                                        </div>
                                    </div>
                                    <div className='flex gap-1'>
                                        <label className='text-lg font-semibold'>CCAvenue</label>
                                        <div className='pt-1'>
                                             <input checked={details.paymentMethod === "ccavenue"} className='w-4 h-4 ' onChange={handleDetailsChanges} value={'ccavenue'} name='paymentMethod' type="radio" />
                                        </div>
                                    </div>
                                    </div>
                                    </div>
                                </div>
                                </div>
                               
                            <div className='flex justify-end items-end pt-9'>
                            {
                                details.name && details.email && details.phoneNumber && details.country && details.paymentMethod && (
                                    <div className='pt-8'>
                                        {
                                            !isLoading ? (

                                                <button onClick={()=>handleCreateTransferBooking()} className='bg-orange-500 text-white w-44 h-10 rounded text-lg font-medium'>Pay Now</button>
                                            ) : (
                                                <button className='bg-orange-500 text-white w-60 h-10 rounded text-lg font-medium'><BtnLoader/></button>
                                            )
                                        }
                                    </div>

                                )
                            }
                        </div>
                            </div>

                        </div>
                    </div>
                </div>
                    </>
                ) : ""
            }
       
               
            </div>

    </div>
    {
        isModal && (
            <div>
                <ConfirmOtpModal details={details} orderId={orderId} setIsModal={setIsModal}/>
            </div>
        )
    }
</div>

  )
}

export default Cartpage
