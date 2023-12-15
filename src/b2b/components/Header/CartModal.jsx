import React, { useEffect, useState } from 'react'
import { BsDash, BsPersonFill } from 'react-icons/bs'
import { IoMdCart } from 'react-icons/io'
import { FaBaby, FaChild } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import priceConversion from '../../../utils/PriceConversion'
import { removeFromCart } from '../../../redux/slices/agentExcursionSlice'
import { setAlertSuccess } from '../../../redux/slices/homeSlice'
import { deleteSelectedTransferInCart } from '../../../redux/slices/transferSlice'

function CartModal({ setCart }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [price, setPrice] = useState(0)
  const [carts, setCarts] = useState({
    attraction: true,
    transfer: false
  })

  const { agentExcursionCart } = useSelector(state => state.agentExcursions)
  const { selectedCurrency } = useSelector(state => state.home)
  const { agentTransferCart } = useSelector((state)=> state.transfer)

  useEffect(() => {
    const sum = agentExcursionCart?.reduce((acc, data) => {
      return Number(acc) + Number(data?.price)
    }, 0)
    setPrice(sum)
  }, [agentExcursionCart])


  const handleDeleteVehicle = (vehicle, index)=>{
    dispatch(deleteSelectedTransferInCart({data:vehicle, index:index}))
}

    const calculateTotalTransferPrice = () =>{
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

              }
          }       
          
      }

      return sum
    }

  return (
    <div className="absolute z-20  right-0 bg-[#EFF5F5] rounded-xl w-[330px] sm:w-[400px]  max-h-[70vh] overflow-y-auto"  >
      <div className=" p-2">
        <div className='border rounded-lg overflow-hidden'>
          <div className='flex justify-start items-center h-12 bg-[#D6E4E5]'>
            <h1 className='pl-3 text-darktext  text-xl'><IoMdCart /></h1>
            <h1 className='px-2 text-darktext  font-[800] tracking-wide text-xl'> My Cart</h1>
          </div>
          <div className='bg-gray-200 p-1'>
              <div className='flex gap-3'>
                <div className={`${carts.attraction ? "border-BEColor border-b-2" : ""}`}>
                 <button onClick={()=>{
                  setCarts({
                    attraction: true,
                    transfer: false
                  })
                 }} className='text-white'>Attraction</button>
                </div>
                <div className={`${carts.transfer ? "border-BEColor border-b-2" : ""}`}>
                  <button 
                  onClick={()=>{
                    setCarts({
                      attraction: false,
                      transfer: true
                    })
                   }}
                  className='text-white'>Transfer</button>
                </div>
              </div>
          </div>
          <div>
        
            {
              carts.attraction && (
                <>
                    {agentExcursionCart?.length <= 0 && (
                      <div className='flex justify-center py-10'>
                        <p className='text-sm text-text'>Your Cart is empty.....</p>
                      </div>
                     )}
                  {agentExcursionCart?.map((item, index) => (
            <div className="  hover:bg-gray-100 p-2  border-b  overflow-hidden" key={index}>
              <div className='flex justify-end'>
                <button className='text-main text-xl bg-gray-200 rounded-full'
                  onClick={() => {
                    dispatch(removeFromCart(item?._id))
                    dispatch(
                      setAlertSuccess({
                        status: true,
                        title: "Removed from Cart!",
                        text: "The selected item successfully removed from cart",
                      })
                    );
                  }}
                >
                  <BsDash />
                </button>
              </div>

              <div className='flex space-x-2'>
                {/* <div className='min-w-[50px] h-[50px] overflow-hidden rounded-[.3rem]'>
                  <img src="https://s.yimg.com/ny/api/res/1.2/S88wB9srlG3g52WgoGbnHw--/YXBwaWQ9aGlnaGxhbmRlcjt3PTk2MA--/https://s.yimg.com/os/creatr-uploaded-images/2021-12/73fab4e0-6c01-11ec-8f6f-7fead6a7c3f2" alt='name' className='w-full h-full object-cover ' />
                </div> */}
                <div className=''>
                  <p className='text-[14px] capitalize whitespace-normal leading-tight text-darktext'>{item?.name}</p>
                  <p className='text-text text-xs'>Date: {item?.date}</p>
                </div>
              </div>

              <div className='text-sm flex  items-center space-x-2 mt-1'>
                {item?.adult > 0 && (
                  <div className='gap-1 flex bg-gray-200 text-gray-600 py-1 px-1 rounded-md items-center'>
                    <span className=''>{item?.adult}</span>
                    <span className=''><BsPersonFill /> </span>
                    <span className=''>{priceConversion(item?.adultPrice, selectedCurrency, true)}</span>
                  </div>
                )}
                {item?.child > 0 && (
                  <div className='gap-1 flex bg-gray-200 text-gray-600 py-1 px-1 rounded-md items-center'>
                    <span className=''>{item?.child} </span>
                    <span className=''><FaChild /></span>
                    <span className=''>{priceConversion(item?.childPrice, selectedCurrency, true)} </span>
                  </div>
                )}
                {item?.infant > 0 && (
                  <div className='gap-1 flex bg-gray-200 text-gray-600 py-1 px-1 rounded-md items-center'>
                    <span className=''>{item?.infant}</span>
                    <span className=''><FaBaby /> </span>
                    <span className=''>{priceConversion(item?.infantPrice, selectedCurrency, true)}</span>
                  </div>
                )}
              </div>

              <div className='flex justify-end'>
                <p className='text-[15px] font-[600] text-start whitespace-nowrap capitalize text-darktext'>{priceConversion(item?.price, selectedCurrency, true)}</p>
              </div>
            </div>
          ))}
             <div className='flex justify-between m-1'>
            <span className='flex space-x-1 items-center text-darktext'>
              <p className='text-[13px] tracking-tight'>Grand Total:</p>
              <p className='text-lg  font-semibold'>{priceConversion(price, selectedCurrency, true)}</p>
            </span>
              <button className='h-[35px] w-[150px] rounded-md bg-orange-500 text-white text-[14px]'
              onClick={() => {
                navigate('/attractions/payment')
                setCart(false)
              }}
              >
                Book Now
              </button>
          </div>
                </>
              )
            }

            {
              carts.transfer && (
                <>
                {agentTransferCart?.length <= 0 && (
                  <div className='flex justify-center py-10'>
                    <p className='text-sm text-text'>Your Cart is empty.....</p>
                  </div>
                 )}
              {agentTransferCart?.map((item, index) => (
         <div className="  hover:bg-gray-100 p-2  border-b  overflow-hidden" key={index}>
          
          <div className='flex justify-end'>
            <button className='text-main text-xl bg-gray-200 rounded-full'
              onClick={() => {
                handleDeleteVehicle(item, index)
                dispatch(
                  setAlertSuccess({
                    status: true,
                    title: "Removed from Cart!",
                    text: "The selected item successfully removed from cart",
                  })
                );
              }}
            >
              <BsDash />
            </button>
          </div>

          {
            item?.journys?.map((ele)=>{
              return (

                  <div>
                    <div>
                      <h1 className='text-sm text-orange-500'>{ele?.transferType}</h1>
                    </div>
                    <div className='flex gap-3'>
                        <div>
                          <h1 className='text-xs'>{ele?.pickupLocationName}</h1>
                          <div className='flex gap-2'>
                              <h1 className='text-xs'>{ele?.pickupDate}</h1>
                              <h1 className='text-xs'>{ele?.pickupTime}</h1>
                          </div>
                        </div>
                        <div>
                          <h1 className='text-xs font-bold'>To</h1>
                        </div>
                        <div>
                          <h1 className='text-xs'>{ele?.dropOffLocationName}</h1>
                          <div className='flex gap-2'>
                          <h1 className='text-xs'>{ele?.returnDate}</h1>
                          <h1 className='text-xs'>{ele?.returnTime}</h1>
                          </div>
                        </div>
                    </div>
                    <div className='flex justify-end'>
                      {
                        ele?.selectedVehicleTypes?.length ? (
                          <div>
                            {
                              ele?.transferType === 'oneway' ? (
                                <>
                                   {
                                   ele?.selectedVehicleTypes?.map((pr, nn)=>{
                                          let sum = 0
                                           for(let i = 0; i < ele?.selectedVehicleTypes?.length; i++){
                                               sum += ele?.selectedVehicleTypes[i].price
                                                }
                                              return (
                                                <div className='flex justify-end'>
                                             {
                                                   nn === 0 && (
                                                 <h1 className='text-lg font-semibold '>{sum}.00 AED</h1>
                                               )
                                            }
                                        </div>
                                    )
                                  })
                                }
                                </>
                              ) : ele?.transferType === 'return' ? (
                                <>
                                  {
                                      ele?.selectedVehicleTypes.map((pr, nn)=>{
                                       let sum = 0;
                                        for(let i = 0; i < ele?.selectedVehicleTypes.length; i++){
                                        sum += ele?.selectedVehicleTypes[i].price
                                       }
                                           if(ele?.selectedReturnVehicleTypes.length){
                                        for(let j = 0; j < ele?.selectedReturnVehicleTypes.length; j++){
                                        sum += ele?.selectedReturnVehicleTypes[j].price
                                         }
                                             }
                                                 return (
                                                     <div className='flex justify-end'>
                                                     {
                                                 nn === 0 && (
                                                 <h1 className='text-lg font-semibold'>{sum}.00 AED</h1>
                                                   ) 
                                                  }
                                             </div>
                                         )
                                      })
                                   }
                                </>
                              ) : ""
                            }
                             
                          </div>
                        ) : (
                          <div>

                          </div>
                        )
                      }
                    </div>
                  </div>
              )
            })
          }

        
        </div>
      ))}
         <div className='flex justify-between m-1'>
        <span className='flex space-x-1 items-center text-darktext'>
          <p className='text-[13px] tracking-tight'>Grand Total:</p>
          <p className='text-lg  font-semibold'>{calculateTotalTransferPrice()}.00 AED</p>
        </span>
          <button className='h-[35px] w-[150px] rounded-md bg-orange-500 text-white text-[14px]'
          onClick={() => {
            navigate('/transfer/details')
            setCart(false)
          }}
          >
            Book Now
          </button>
      </div>
            </>
              )
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartModal