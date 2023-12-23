import React, { useState } from 'react'
import { PageLoader } from '../../../../components'
import axios from '../../../../../axios'
import { useSelector } from 'react-redux'
import TransferTableData from './TransferTableData'


function TransfersTable({ele, subAgentId}) {

  const [showVehicles, setShowVehicles] = useState(false)
  const [vehiclesData, setVehiclesData] = useState([])
  const [isVehicleLoading, setIsVehicleLoading] = useState(false)
  const { token } = useSelector((state) => state.agents);
  
  
  const fetchTransferVehicles = async (id) => {
    try {
        setIsVehicleLoading(true)
        const res = await axios.get(`/b2b/transfer/sub-agent/markup/get-all-vehicle/${id}/${subAgentId}`, {
            headers: { Authorization: `Bearer ${token}`}
        })
        console.log(res.data);
        setIsVehicleLoading(false)
        setVehiclesData(res?.data)
    } catch (error) {
        setIsVehicleLoading(false)
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
                                <h1 className=''>{ele?.transferTo}</h1>
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
                            !isVehicleLoading ? (
                                <tbody>
                                    {vehiclesData?.map((vehicle, index) => (
                                    <TransferTableData
                                        key={vehicle?.vehicleId}
                                        index={index}
                                        vehicle={vehicle}
                                        transferId={ele?.transferId}
                                        setShowVehicles={setShowVehicles}
                                        subAgentId={subAgentId}
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
                        </div>
    </div>
  )
}

export default TransfersTable
