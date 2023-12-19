import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from '../../../axios'
import { useSelector } from 'react-redux'
import { PageLoader } from '../../components'
import ShowAttractionDetails from './ShowAttractionDetails'
import ShowTransferDetails from './ShowTransferDetails'

function ViewSigleDetails() {

    const params = useParams()
    const { token } = useSelector((state)=> state.agents)
    
    const [orderDetails, setOrderDetails] = useState()
    const [orderAttractionDetails, setOrderAttractionDetails] = useState({})
    const [orderTransferDetails, setOrderTransferDetails] = useState({})
    const [isLoading, setIsLoading] = useState(false)

    const fetchSingleOrderDetails = async ()=>{
        try {
            setIsLoading(true)
            const res = await axios.get(`/b2b/orders/single/${params.id}`, {
                headers: {Authorization: `Bearer ${token}`}
            })
            setOrderDetails(res?.data)
            if(res?.data?.attractionOrder) {
                setOrderAttractionDetails(res?.data?.attractionOrder)
            }
            if(res?.data?.transferOrder){
                setOrderTransferDetails(res?.data?.transferOrder)
            }
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
            console.log(error);
        }
    }

    useEffect(()=>{
        fetchSingleOrderDetails()
    }, [])

    console.log(orderAttractionDetails, 'attraction details');
    console.log(orderTransferDetails, "transfers");

  return (
    <div>
      <div className='py-10 px-20'>
        {
            isLoading ? (
                <div className='py-20'>
                    <PageLoader />
                </div>
            ) : (
              <div>
                <div className='py-20 px-20 bg-white shadow-xl w-full h-auto'>
                    {
                        orderAttractionDetails?.activities?.length > 0 && (
                            <>
                               <div>
                                <h1 className='text-lg font-bold'>Attraction</h1>
                            </div>
                               <div className='p-5'>
                              {
                            orderAttractionDetails?.activities?.map((ele)=>{
                                return (
                                    <div className='pt-4'>
                                        <ShowAttractionDetails ele={ele}/>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            </>
                         
                        )
                    }
                 
                 {
                    orderTransferDetails?.journey?.length && (
                        <>
                        <div>
                            <h1 className='text-lg font-bold'>Transfer</h1>
                        </div>
                        <div className='p-5'>
                            {
                                orderTransferDetails?.journey?.map((ele, index)=> {
                                    return (
                                        <div key={index} className='pt-4'>
                                            <ShowTransferDetails ele={ele} />
                                        </div>
                                    )
                                })
                            }
                        </div>
                        </>
                    )
                 }
                </div>
              </div>
            )
        }
      </div>
    </div>
  )
}

export default ViewSigleDetails
