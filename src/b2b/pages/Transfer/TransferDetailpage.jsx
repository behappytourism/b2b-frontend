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
import ConfirmOtpModal from './ConfirmOtpModal';
import { setAlertError } from '../../../redux/slices/homeSlice';
import { BtnLoader } from '../../components';

function TransferDetailpage() {

    const { agentTransferCart } = useSelector((state)=> state.transfer)
    const { countries } = useSelector((state) => state.home);
    const { token } = useSelector((state)=> state.agents)


    const dispatch = useDispatch()

    const navigate = useNavigate()

    const [totalPrice, setTotalPrice] = useState(0)
    const [details, setDetails] = useState({
        name:'',
        email:"",
        phoneNumber:"",
        country:"",
        paymentMethod:"wallet",
        journeys:[]
    })
    const [orderId, setOrderId] = useState('')
    const [isModal, setIsModal] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    
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

                    setTotalPrice(sum)
                }
            }       
            
        }
    }, [ agentTransferCart,totalPrice])

    useEffect(()=>{
        if(agentTransferCart?.length < 1){
            navigate("/transfer")
            dispatch(clearSearchTransferTrips())

        }
    }, [agentTransferCart])

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
    useEffect(()=>{
        let transfers = {

        }
        if(details.name && details.email && details.phoneNumber && details.country && details.paymentMethod){
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
        details.journeys = data
    }, [details.name && details.email && details.phoneNumber && details.country && details.paymentMethod ])


    const [countryName, setCountryName] = useState('')
    useEffect(()=>{
        countries.map((ele)=>{
            if(ele?._id === details.country){
                setCountryName(ele?.countryName)
            }
        })
    }, [details.country])


    // handle create a transfer order
    const handleCreateTransferBooking = async () =>{
        try {
            setIsLoading(true)
            const res = await axios.post(`/b2b/transfer/order/create`, details, {
                headers: { Authorization: `Bearer ${ token }`}
            })

            setOrderId(res.data.transferOrderId)
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
        }
    } 

  return (
    <div>
        <div className='grid  md:flex gap-5 justify-center md:p-10'>
            <div className='relative'>
            <div className='border p-4 bg-BeGray'>
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
                                                    <div className='p-8'>
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
                  
                 </div>
                 
            <div className=''>
            <div className=''>
                        <div className='border p-5'>
                            {/* <form onSubmit={handleCreateTransferBooking}> */}
                            <div>
                                <h1 className='text-lg font-bold'>Add Details</h1>
                            </div>
                                <div className='grid md:grid-cols-2 gap-2 pt-3'>
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
                                    <div>
                                        <div className='text-sm'>
                                            <label >Phone Number</label>
                                        </div>
                                        <div>
                                            <input
                                            name='phoneNumber'
                                            value={details.phoneNumber}
                                            onChange={handleDetailsChanges}
                                            type="phone" className='outline-none bg-slate-100 w-full h-10 rounded p-2 placeholder:text-gray-300 placeholder:text-sm' placeholder='Phone number' />
                                        </div>
                                    </div>
                                    <div>
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
                                  
                                </div>
                                {/* <div className='flex justify-end pt-5'>
                                    <button className='w-32 bg-orange-500 h-10 text-white font-bold rounded '>Submit</button>
                                </div> */}
                            {/* </form> */}
                        </div>
                     </div>
                    <div className='pt-3'>
                        <div className='border w-full h-auto relative bg-white p-6'>
                            <div className=''>
                                <div className='flex gap-1 justify-center mb-2'>
                                    <h1 className='text-green-500 text-3xl'><IoIosCheckmarkCircleOutline /></h1>
                                <h1 className='text-lg text-center font-bold'>Confirm Trip</h1>   
                                </div>
                            </div>
                            <div className='border w-full h-28 flex justify-center items-center'>
                                <div className=''>
                                    <h1 className='text-lg flex justify-center'><LiaSaveSolid /></h1>
                                    <h1 className='text-xs text-gray-400 text-center'>Total price</h1>
                                    <h1 className='text-green-400 font-bold text-3xl'>{totalPrice}.00 AED</h1>
                                </div>
                            </div>

                            <div className='pt-2'>
                                <div className='border w-full h-auto p-4'>
                                    <div className=''>
                                        <div className=' w-full h-10'>
                                        <div>
                                    <div className='text-xl font-bold'>
                                            <label >Payment Method</label>
                                        </div>
                                        <div className='flex   p-2 gap-3'>
                                        <div className='flex gap-1'>
                                            <label className='text-lg font-semibold '>Wallet</label>
                                            <div className='pt-1'>
                                             <input checked={details.paymentMethod === 'wallet'} className='w-4 h-4 ' onChange={handleDetailsChanges} value={"wallet"} name='paymentMethod' type="radio" />
                                            </div>
                                        </div>
                                        <div className='flex gap-1'>
                                            <label className='text-lg font-semibold'>Online Payment</label>
                                            <div className='pt-1'>
                                                 <input checked={details.paymentMethod === "ccavenue"} className='w-4 h-4 ' onChange={handleDetailsChanges} value={'ccavenue'} name='paymentMethod' type="radio" />
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                        </div>
                                    </div>
                                <div className='flex justify-end items-end pt-3'>
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
                            {/* <div className='pt-4 '>
                                {
                                    details.name && details.email && details.phoneNumber && details.country &&  details.paymentMethod && (
                                        <div className='border p-2'>
                                            <div className='flex justify-between'>
                                                <div>
                                                    <h1 className='text-sm'>Name :</h1>
                                                </div>
                                                <div className='text-sm'>
                                                    {details?.name}
                                                </div>
                                            </div>
                                            <div className='flex justify-between'>
                                                <div className='text-sm'>
                                                    <h1>Email :</h1>
                                                </div>
                                                <div className='text-sm'>
                                                    {details?.email}
                                                </div>
                                            </div>
                                            <div className='flex justify-between'>
                                                <div className='text-sm'>
                                                    <h1>Phone Number :</h1>
                                                </div>
                                                <div className='text-sm'>
                                                    {details?.phoneNumber}
                                                </div>
                                            </div>
                                            <div className='flex justify-between'>
                                                <div className='text-sm'>
                                                    <h1>Country :</h1>
                                                </div>
                                                <div className='text-sm'>
                                                    {countryName}
                                                </div>
                                            </div>
                                            <div className='flex justify-between'>
                                                <div className='text-sm'>
                                                    <h1>Payment Method :</h1>
                                                </div>
                                                <div className='text-sm'>
                                                    {details.paymentMethod}
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }

                            </div> */}
                           
                        </div>

                    </div>
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

export default TransferDetailpage
