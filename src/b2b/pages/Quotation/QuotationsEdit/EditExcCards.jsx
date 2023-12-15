import React from 'react'
import { previewImage } from "../../../../static/imagesB2B";
import EditTransferType from "./EditTransferType";
import ExcEditSelectButton from "./ExcEditSelectButton";
import { useSelector } from 'react-redux';
import { config } from '../../../../constants';


function EditExcCards({
  ele, 
  index,
  selectedData, 
  setSelectedData,
  handleAddExcursions
}) {

    const {selectedExcursionType, selectedExcursionIds} = useSelector((state)=>state.quotation)
  return (
    <div>
    <div
      key={ele?._id}
      className="bg-slate-50 overflow-hidden hover:-translate-y-1 transition-all duration-300 rounded-md border-[1px] border-gray-100 border-opacity-20 shadow-lg w-full h-auto  pb-8 pt-1 flex flex-col items-center"
    >
        <div
          className=" w-full min-h-0 relative"
          style={{ minHeight: "100px", maxHeight: "400px" }}
        >
          <img
            src={
              ele?.image?.length > 0
                ? config.SERVER_URL + ele?.image[0]
                : previewImage
            }
            alt={``}
            className="min-h-0 object-cover "
            style={{
              minHeight: "210px",
              maxHeight: "210px",
              maxWidth: "210px",
              minWidth: "100%",
            }}
          />
          <div className="absolute  bottom-0 bg-gradient-to-b from-transparent to-white via-white/80  overflow-hidden w-64 h-auto p-2">
          <div className="pt-2">
            <p className="text-sm font-[500] text-black max-w-sm text-center pt-10">{ele?.attraction}</p>
          </div>
            <div className="">
              <p className="text-sm text-blue-400 max-w-sm text-center">{ele?.name}</p>
            </div>

          </div>
        </div>
      <div className="p-1 text-center">
        <div className="text-xs text-grayColor">
          {
          !selectedExcursionIds.some((id) => id?._id === ele?._id) ? (
            <EditTransferType 
            data={ele?._id} 
            tp={ele} 
            index={index} />
          ) : (
            ""
          )}
        </div>
      </div>
      {ele?.selectedExcursionType === "Ticket" ||
      ele?.selectedExcursionType === "Shared" ||
      (ele?.selectedExcursionType === "Private" &&
        ele?.vehicleType?.length > 0) ? (
        <ExcEditSelectButton
          selectedExcursionType={selectedExcursionType}
          ele={ele}
          selectedData={selectedData}
          setSelectedData={setSelectedData}
          handleAddExcursions={handleAddExcursions}
        />
      ) : (
        ""
      )}
    </div>
  </div>
  )
}

export default EditExcCards
