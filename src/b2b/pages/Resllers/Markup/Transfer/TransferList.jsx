import React, { useEffect, useState } from 'react'
import { PageLoader, Pagination } from '../../../../components'
import { useSelector } from 'react-redux';
import axios from '../../../../../axios'
import TransfersTable from './TransfersTable';


function TransferList({subAgentId}) {
  
  
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [transfers, setTransfers] = useState([])

  const [filters, setFilters] = useState({
        skip:0,
        limit:10,
        totalTransfer: 0
      })

     const { token } = useSelector((state) => state.agents);

     const fetchTransfers = async ()=>{
        try {
            setIsLoading(true)
            const res = await axios.get(`/b2b/transfer/sub-agent/markup/get-all-transfer?limit=${filters.limit}&skip=${filters.skip}&search=${search || ""}`, {
                headers: { Authorization: `Bearer ${token}`}
            })
            setTransfers(res?.data?.transfers)
            setFilters(({
                totalTransfer: res?.data?.totalTransfer,
                skip: res?.data?.skip,
                limit: res?.data?.limit
            }))
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
            console.log(error);
        }
     }

     useEffect(()=>{
        fetchTransfers()
     }, [search, filters.skip])


     


  return (
    <div>
      {
        isLoading ? (
            <div className='w-full h-32 bg-white flex justify-center'>
                <PageLoader/>
            </div>
        ) : (
            <div>
                {
                    transfers?.map((ele)=>(
                        <TransfersTable ele={ele} subAgentId={subAgentId} />
                    ))
                }

                <div>
                   <Pagination
                              limit={filters?.limit}
                              skip={filters?.skip}
                              total={filters?.totalTransfer}
                              incOrDecSkip={(number) =>
                                setFilters((prev) => {
                                  return {
                                    ...prev,
                                    skip: prev.skip + number,
                                  };
                                })
                              }
                              updateSkip={(skip) =>
                                setFilters((prev) => {
                                  return { ...prev, skip };
                                })
                              }
                            />
                </div>
            </div>
        )
      }
    </div>
  )
}

export default TransferList
