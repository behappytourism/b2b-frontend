import React, { useState } from 'react'
import { FaRegEdit } from "react-icons/fa";
import priceConversion from '../../../utils/PriceConversion';
import { useSelector } from 'react-redux';
import ClientTransferMarkupModal from './ClientTransferMarkupModal';


function TransferListTable({key, index, vehicle, transferId, setShowVehicles}) {

    const { selectedCurrency } = useSelector((state) => state.home);
    const [markup, setMarkup] = useState(false);
    const [markupData, setMarkupData] = useState(vehicle ? vehicle : "")

    

    const renderMarkupValue = (data) => {

        const markupValue = data?.markup
        const markupType = data?.markupType

        switch (markupType) {
            case "flat" :
                return markupValue > 0 ? priceConversion(markupData?.markup, selectedCurrency, true ) : "N/A"
            case "percentage" :
                return markupValue > 0 ? `${markupData?.markup} %` : "N/A"
            default: 
                return "N/A"
        }
    }

  return (
    <tr>
    <td className="p-3">{index + 1}</td>
    <td className="p-3 max-w-xs">{vehicle?.vehicleName}</td>

    <td className="p-3">
      <span className="flex space-x-2">
        <p className="">
        {renderMarkupValue(markupData)}
        </p>
        <p
          className="underline text-lightblue text-lg cursor-pointer"
          onClick={() => {
            setMarkup(true);
          }}
        >
          <FaRegEdit />
        </p>
      </span>
    </td>
    {markup && (
      <ClientTransferMarkupModal
        setMarkup={setMarkup}
        setMarkupData={setMarkupData}
        markupData={markupData}
        vehicle={vehicle}
        transferId={transferId}
        setShowVehicles={setShowVehicles}
      />
    )}
  </tr>
  )
}

export default TransferListTable
