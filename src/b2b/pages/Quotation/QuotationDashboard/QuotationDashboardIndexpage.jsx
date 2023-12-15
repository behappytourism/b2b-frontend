import React, {useEffect, useState } from 'react'
import QuotationNavigator from '../../../components/Quotation/Navigator/QuotationNavigator'
import ExtendedQtnList from './ExtendedQtnList'
import axios from "../../../../axios";
import { useDispatch, useSelector } from 'react-redux'; 
import QuotationListTable from './QuotationListTable';
import { setCreateQuotationData } from '../../../../redux/slices/quotationListSlice';

function QuotationDashboardIndexpage() {

  const { token } = useSelector(state => state.agents)
 
  const dispatch = useDispatch()

  const [ amentMents, setAmentMets ] = useState()
  const [ loading, setLoading ] = useState(false)
  const [quotationNumber, setQuotationNumber] = useState()

  const fetchData = async ()=>{
    try{
      setLoading(true)
      let res = await axios.get(`/b2b/quotations/all?quotationNumber=${quotationNumber || ""}`,{
        headers: { authorization: `Bearer ${token}` },
      }) 
      setAmentMets(res?.data || "")
      setLoading(false)
    }catch(err) { 
      console.log(err);
      setLoading(false) 
    }
  }


  useEffect(()=>{
    fetchData()
  }, [quotationNumber])

  return (
    <div className='h-auto'>
        <QuotationNavigator />
        <div className='p-2 lg:py-6 max-w-screen-xl mx-auto'>
            <div>
              <div className='sm:grid grid-cols-12 gap-4'>
                  <div className=' sm:block filter__section col-span-3'>
                      <div className='w-full  rounded-xl  p-2'>
                      <div>
                          <div className="relative w-full max-w-lg md:max-w-lg h-36 bg-white shadow-lg p-5 rounded-lg">
                              <div className="  space-y-6">
                                <div className="">
                                  <p className="text-textColor text-lg text-center font-[800] tracking-wide ">
                                    Search Quotation
                                  </p> 
                                </div>
                              
                                <div className='border rounded p-1'>
                                    <input type="text"
                                    className='w-full border-0 placeholder-text-[5px] outline-none placeholder:p-3 placeholder:text-sm placeholder:text-gray-300'
                                    name='quotationNumber'
                                    placeholder='Quotation Number'
                                    value={quotationNumber}
                                    onChange={
                                      (e)=>{setQuotationNumber(e.target.value)}
                                    }
                                    />
                                </div>
                                {/* <div className='w-full'>
                                    <button type='submit' className='rounded border text-xs font-[400] text-stone-500 hover:bg-stone-100  w-full h-8'
                                    >
                                        Search Your Quotation
                                    </button>
                                </div> */}
                              </div>
                            </div>
                        </div>
                      </div>
                  </div>  

                  <div  className="list__section col-span-9 space-y-">
                      <div>
                        {loading  ? ( 
                          <>
                        {
                          [1,2,3].map((ele)=>(
                            <div>
                            <div className="sm:flex gap-2 w-full  border-b p-4 cursor-pointer transition-all duration-300 animate-pulse shadow-lg " 
                               > 
                          
                               <div className="flex justify-between w-full transition-all duration-300 animate-pulse">
                                 <div className="left__section text-darktext space-y-2 ml-3">
                                   <div className="flex flex-wrap items-center gap-1">
                                     <h3 className="h-4 w-52 bg-grayColor mt-3 rounded animate-pulse">
                                       {""} 
                                     </h3>
                                   </div>
                                 
                                   <div className="space-y-2">
                                     <p className="h-4 w-52 bg-grayColor mt-3 rounded animate-pulse">
                                     </p>
                                   </div>
                                 </div>
                                 <div>
                                     <p className='h-4 w-52 bg-grayColor mt-3 rounded animate-pulse'>
                                        
                                     </p>
                                 </div>
                                   <div>
                                   <p className='h-4 w-52 bg-grayColor mt-3 rounded animate-pulse'></p>
                                   </div>
                               </div>
                             </div> 
                           </div>
                          ))
                        }
                            </>
                        ) :  (
                          <div>
                              <div className="flex justify-between py-2">
                          <div  className="text-[#393939] space-y-1">
                              <h2 className='font-[800] text-xl tracking-wide'>QUOTATION LIST</h2>
                              <p className='text-text text-[12px]'>Total Quotations : {amentMents?.totalQuotations}</p>
                          {/* <ExtendedQtnList data={{amentMents}} /> */}
                          <QuotationListTable data={{amentMents}} />
                          </div>
                        </div>
                          </div>
                        ) }
                      
                      </div>
                  </div>
              </div>
            </div>
        </div>
    </div>
  )
}

export default QuotationDashboardIndexpage