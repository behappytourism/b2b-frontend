import React, { useState } from 'react'
import axios from '../../../axios'
import { useSelector } from 'react-redux'
import TransferListTable from './TransferListTable'
import { PageLoader, Pagination} from '../../components'


function MarkupTransferList({ele}) {

    const { token } = useSelector((state)=> state.agents)
    const [showVehicles, setShowVehicles] = useState(false)
    const [vehicles, setVehicles] = useState([])
    const [vehicleLoading, setVehicleLoading] = useState(false)

    const fetchTransferVehicles = async (id) => {
        try {
            setVehicleLoading(true)
            const res = await axios.get(`/b2b/transfer/client/markup/get-all-vehicle/${id}`, {
                headers: { Authorization: `Bearer ${token}`}
            })
            setVehicles(res.data)
            setVehicleLoading(false)

        } catch (error) {
            setVehicleLoading(false)
            console.log(error);
        }
    }


  return (
    <div>
         
        <div className='border-b border-tableBorderColor'>
            <div className='flex gap-3 p-3 bg-white cursor-pointer'
            onClick={()=>{
                fetchTransferVehicles(ele?.transferId)
                setShowVehicles(!showVehicles)
            }}
            >
                 <h1 className=' '>{ele?.transferFrom}</h1>
                 <h1>To</h1>
                 <h1 className=''>{ele?.transferTo  }</h1>
            </div>
            {
                showVehicles && (
                    <div className="overflow-x-auto">
                    <table className="w-full border rounded border-gray-100 shadow">
                      <thead className="bg-stone-200 rounded">
                        <tr className="w-full">
                          <th className="p-3 text-left">Index</th>
                          <th className="p-3 text-left">Vehicle Name</th>
                          <th className="p-3 text-left">Client Markup</th>
                        </tr>
                      </thead>
                      {
                        !vehicleLoading ? (
                            <tbody>
                                {vehicles?.map((vehicle, index) => (
                                <TransferListTable
                                    key={vehicle?.vehicleId}
                                    index={index}
                                    vehicle={vehicle}
                                    transferId={ele?.transferId}
                                    setShowVehicles={setShowVehicles}
                                />
                                ))}
                            </tbody>
                        ) : (
                            
                            <div className='flex justify-center w-full h-20   '>
                                <div className='flex justify-center ml-96'>
                                    <PageLoader />
                                </div>
                             </div>
                        )
                      }
                    </table>
                  </div>
                )
            }
            <div>
            </div>
        </div>
     
    </div>
  )
}

export default MarkupTransferList
