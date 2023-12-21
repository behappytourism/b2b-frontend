import React, { useEffect, useState} from 'react'
import { CiClock2 } from "react-icons/ci";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { config } from '../../../constants';
import { clearSearchTransferTrips, setSelectedTransferInCart, setSelectedTransfer } from '../../../redux/slices/transferSlice';
import { FaArrowRight } from "react-icons/fa6";
import { IoTimeOutline } from "react-icons/io5";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { IoRemoveCircleSharp } from "react-icons/io5";
import { setAlertSuccess } from '../../../redux/slices/homeSlice';

function TransferListPage() {


    const [showVehicleType, setShowVehicleType] = useState(true)
    const [vehicleCount, setVehicleCount] = useState(0)
    const [selectedTransfers, setSelectedTransfers] = useState({
        index: "",
        transfer: "",
        suggestionType: "",
        time: "",
        transferFrom: "",
        transferTo: "",
        price: "",
        vehicle:[],
        transferType: ""
    })
    const [selectedCount, setSelectedCount] = useState(0)
    const [selectedVehicle, setSelectedVehicle] = useState({})

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { trips, selectedTransfer } = useSelector((state)=> state.transfer)
    const handleSelecteTransfer = (e,trip, index, vehicle, element) => {
        
        const {name, value} = e.target
        dispatch(setSelectedTransfer({value, trip, index, vehicle, element}))
        console.log(vehicle);
        dispatch(setAlertSuccess({
            status: true,
            title: "Transfer Added",
            text: `${vehicle?.vehicle?.name} Vehicle addedd successfully!`
        }))
         }


    const handleAddTransferInCart = () =>{
        if(selectedTransfer.journys.length){
            dispatch(setSelectedTransferInCart(selectedTransfer))
            // navigate('/transfer/details')
            navigate('/home/cart')
        }
    }
  
    useEffect(()=>{
        if(trips?.length < 1){
            navigate('/transfer')
        }
    }, [trips?.length < 1])


    useEffect(()=>{
        return()=>{
            dispatch(clearSearchTransferTrips())
        }
    }, [])

  return (
    <div className='w-full h-full '>
      <div className=' flex justify-center gap-5 p-10 '>
        {/* Transfer list section */}
         <div>
            <div>
                <h1 className=''>Select transfer <span className='text-lg font-semibold'>OUT</span></h1>
                <h1>Among {vehicleCount } transfers found</h1>
            </div>
            <div>
               
                <div className='grid md:grid-cols-1 gap-7 '>
                    {
                        trips?.map((ele)=>(
                            <div className='border w-full'>
                            {
                                ele?.trips?.map((items, index)=>(
                                    <div key={index} className='  '>
                                        <div className=' w-full p-8  bg-BeGray'>
                                        <div className='flex justify-between p-2 items-center'>
                                            <div>
                                                <h1 className='text-sm font-bold'>{items?.transferFrom?.airportName || items?.transferFrom?.areaName }</h1>
                                            </div>
                                            <div>
                                                <h1 className='text-sm font-bold'>{items?.transferTo?.airportName || items?.transferTo?.areaName }</h1>
                                            </div>
                                        </div>
                                        <div className='flex justify-between items-center gap-2'>
                                                <div className='flex items-center'>
                                                    <div className='w-2 h-2 rounded-full border-2 border-orange-500'></div>
                                                </div>
                                                <div className='border-b flex-grow relative'>
                                                    <div className='absolute top-1/2 transform -translate-y-1/2 right-80'>
                                                        <FaArrowRight />
                                                    </div>
                                                </div>
                                                <div className='flex items-center'>
                                                    <div className='w-2 h-2 rounded-full border-2 border-orange-500'></div>
                                                </div>
                                            </div>
                
                                        <div className='flex gap-2 pt-2'>
                                            <div className='flex gap-1'>
                                                <div>
                                                    <h1><IoTimeOutline /></h1>
                                                </div>
                                                <div>
                                                    <h1 className='text-xs'>{items?.time}</h1>
                                                </div>
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
                                    </div>
                                    {/* <div className='grid md:grid-cols-1 gap-3 p-2'>
                                    {
                                            items?.vehicles?.map((vehicle, i)=>(
                                                <>
                                                <div key={i} className=' flex gap-7 bg-white w-full h-44 p-3 '>
                                                <div className='w-96 p-1 '>
                                                    <img className='w-full h-full object-cover' src={config.SERVER_URL + vehicle?.vehicle?.image} alt="" />
                                                </div>
                                                <div className='border-r'></div>
                                                <div className='flex justify-between w-full'>
                                                    <div>
                                                        <h1 className='text-lg font-semibold'>{ vehicle?.vehicle?.name}</h1>
                                                        <h1 className='text-md font-medium'>{ vehicle?.vehicle?.vehicleCategoryId?.categoryName}</h1>
                                                        <div className='flex gap-2 pt-2'>
                                                              <h1 className='text-xl'><CiClock2 /></h1>
                                                            <div>
                                                            <h1 className='text-xs font-lignt'>Maximum wait time :</h1>
                                                                <h1 className='font-bold text-sm'>60 minutes</h1>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className=''>
                                                        <div className='flex justify-end'>
                                                            <div>
                                                                <h1 className='font-semibold text-xl'>{ vehicle?.price } AED</h1>
                                                                <h1 className='font-extralight text-xs'>Total Price</h1>
                                                            </div>
                                                        </div>
                                                        <div className='pt-16 flex gap-2'>
                                                            {
                                                                selectedTransfer[index]?.vehicle?._id === vehicle?.vehicle?._id ? (
                                                                        <div className='flex gap-1'>
                                                                            <h1 className='text-green-500 text-lg pt-1 '><IoIosCheckmarkCircleOutline /></h1>
                                                                            <h1 className='text-green-500 font-semibold'>Selected!</h1>
                                                                        </div>
                                                                ) : (
                                                                    <>
                                                                       <button className='bg-orange-500 w-40 h-10 rounded-sm text-white'
                                                            onClick={()=>{
                                                                handleSelecteTransfer(items, index, vehicle, ele)
                                                            }}
                                                            >Select</button>
                                                                    </>
                                                                )
                                                            }
                                                         
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                           

                                                </>

                                            ))
                                        }
                                    </div> */}

                                    <div className='grid md:grid-cols-4 p-1 gap-1'>
                                        {
                                            items?.vehicles?.map((vehicle)=>(
                                                <>
                                                <div className='bg-white flex justify-center w-full h-auto border p-2'>
                                                    <div>
                                                        <div className='w-40 h-20 '>
                                                            <img className='w-full h-full object-cover' src={config.SERVER_URL + vehicle?.vehicle?.image} alt="" />
                                                        </div>
                                                        <div className='pt-2'>
                                                            <div className=' flex gap-1 p-1'>
                                                                <h1 className='text-sm'>{vehicle?.vehicle?.name}</h1>
                                                                <select name=""
                                                                onChange={(e)=>handleSelecteTransfer(e,items, index, vehicle, ele)}
                                                                className='border outline-none w-20' id="">
                                                                    <option value="0">0</option>
                                                                    <option value="1">1</option>
                                                                    <option value="2">2</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        {/* <div className='pt-1 flex gap-2 justify-center'>
                                                            {
                                                                selectedTransfer[index]?.vehicle?._id === vehicle?.vehicle?._id ? (
                                                                        <div className='flex gap-1'>
                                                                            <h1 className='text-green-500 text-lg pt-1 '><IoIosCheckmarkCircleOutline /></h1>
                                                                            <h1 className='text-green-500 font-semibold'>Selected!</h1>
                                                                        </div>
                                                                ) : (
                                                                    <>
                                                                       <button className='bg-orange-500 w-32 h-8 rounded font-semibold text-white'
                                                            onClick={()=>{
                                                                // handleSelecteTransfer(items, index, vehicle, ele)
                                                                handleSubmit()
                                                            }}
                                                            >Select</button>
                                                                    </>
                                                                )
                                                            }
                                                         
                                                        </div> */}
                                                    </div>
                                                </div>
                                                
                                                </>
                                            ))
                                        }
                                      
                                    </div>
                                 </div>
                                ))
                              }
                            </div>
                        ))
                    }                    
                </div>
            </div>
            <div className='pt-5'>
    {/* <div className='border rounded-lg overflow-hidden w-full p-4'>
        <div className='bg-gray-200 p-3'>
            <h1 className='font-bold text-xl'>Selected Transfers</h1>
        </div>
         {selectedTransfer?.journys?.map((transfer, index) => (
            <div key={index} className='border p-3 mb-4 relative'>
                <button
                    className='text-red-500 text-2xl absolute top-2 right-2'
                    onClick={() => handleRemoveTransfer(transfer._id)}
                >
                    <IoRemoveCircleSharp />
                </button>
                <div className='flex gap-2 mb-3'>
                    <div>
                        <h1 className='text-lg font-semibold'>
                            {transfer?.transferFrom?.areaName || transfer?.transferFrom?.airportName}
                        </h1>
                    </div>
                    <div>
                        <h1 className='text-md font-bold'>To</h1>
                    </div>
                    <div className=''>
                        <h1 className='text-lg font-semibold'>
                            {transfer?.transferTo?.areaName || transfer?.transferTo?.airportName}
                        </h1>
                    </div>
                </div>
                <div className='mb-2'>
                    <h1 className='text-xl font-bold'>Vehicles</h1>
                </div>
                <div className='flex flex-wrap gap-2'>
                    {transfer?.vehicle?.map((vehicle, index) => (
                        <div key={index} className='bg-gray-100 p-2 rounded'>
                            <h1 className='text-md font-medium'>{vehicle?.vehicle?.name}</h1>
                        </div>
                    ))}
                </div>
            </div>
        ))} 
    </div> */}
    <div className='flex justify-end mt-4'>
        <button
            className='bg-blue-500 text-white px-4 py-2 rounded-full font-bold'
            onClick={() => handleAddTransferInCart()}
        >
            Continue
        </button>
    </div>
</div>


        </div>
      </div>
    </div>
  )
}

export default TransferListPage
