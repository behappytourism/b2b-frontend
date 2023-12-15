import React, {useState, useEffect} from 'react'
import { addExcursion, setSelectedIds, setFilteredExcursion } from '../../../../redux/slices/quotationSlice'
import { useDispatch, useSelector } from 'react-redux'

function ExcEditSelectButton({
    selectedExcursionType,
    ele, 
    selectedData, 
    setSelectedData,
    handleAddExcursions
    }) {
    const dispatch = useDispatch()
  const [ selectButtonHide, setSelectButtonHide ] = useState(false)

  const { selectedExcursionIds } = useSelector(
    (state) => state.quotation
  );

  const handleShowDatas = (data) => {
    let sltData = [...selectedData, data]
    setSelectedData([...selectedData, data])
    dispatch(addExcursion(sltData))
    dispatch(setSelectedIds(ele))
    setSelectButtonHide(true)
    
  }

  useEffect(()=>{
    if(!selectedData?.length){
      setSelectButtonHide(false)
    }
  }, [selectedData])

  return (
    <div>
    <>
      {!selectedExcursionIds.some((id) => id?._id === ele?._id) ? (
        <div>
          <button
            onClick={() => {
              dispatch(
                setFilteredExcursion({
                  id: ele._id,
                  name: "isSelected",
                  value: true
                })
              );
              dispatch(
                setFilteredExcursion({
                  id: ele._id,
                  name: "selectedExcursionId",
                  value: ele._id
                })
              );
              handleShowDatas(ele)
              handleAddExcursions()
            }}
            className="bg-gradient-to-l from-blue-500 to-red-600 hover:from-red-600 hover:to-blue-400 rounded text-[14px] font-[600] text-white shadow-sm w-[150px] py-2"
          >
            Select
          </button>
        </div>
      ) : (
        <div>
          <h1 className="text-green-600">Selected!!</h1>
        </div>
      )}
    </>
  </div>
  )
}

export default ExcEditSelectButton
