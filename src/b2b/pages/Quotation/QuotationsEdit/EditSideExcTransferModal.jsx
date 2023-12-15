import React, { useEffect, useState } from "react";
import { 
  handleSelectedExcursion, 
  handlechangeEmptyVehicleType, 
  editExcursionPrivateCount, 
  handleChangedValues,
  setFilteredExcursion,
  setVehicleTypeForSelectedExc,
  vehicleInitialCount
 } from "../../../../redux/slices/quotationSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "../../../../axios";



function EditSideExcTransferModal({ data, tp, index }) {


  const [selectType, setSelectType] = useState("TicketOnly");
  const [selectData, setSelectData] = useState({});
  const [showDetails, setShowDetails] = useState(false)
  const [showVehicle, setShowVehicle] = useState("")
  const [selectionColor, setSelectionColor] = useState("Ticket")
  const [isLoading, setIsLoading] = useState(false)
  const [vehicleCount, setVehicleCount] = useState()

  const { token } = useSelector(state => state.agents)


  const dispatch = useDispatch();
  const { noOfAdults, noOfChildren, checkInDate } = useSelector(
    (state) => state.quotation
  );
   
  let totalNoOfPax = noOfAdults + noOfChildren
  const body = {
    excursionId: data,
    noOfPax: totalNoOfPax,
    date:checkInDate
  }

  const fetchVehicleCount = async ()=>{
    try{
      setIsLoading(true)
      const res = await axios.post("/b2b/quotations/inital/excursion/transfer", body, { headers: { Authorization: `Bearer ${token}`}})
      setVehicleCount(res?.data || [])
      setIsLoading(false)
    }catch(err){
      setIsLoading(false)
      console.log(err);
    }
  }


    
  const changeType = (e, id, nm) => {
   
    if (e.target.value === "Ticket") {
      setSelectionColor(e.target.value);
      setShowDetails(false);
      dispatch(
        setFilteredExcursion({
          id: id,
          name: "selectedExcursionType",
          value: "Ticket",
        })
      );
    }
    if (e.target.value === "TicketWithTransfer") {
      dispatch(
        setFilteredExcursion({
          id: id,
          name: "selectedExcursionType",
          value: "TicketWithTransfer",
        })
      );
    }
    if (e.target.value === "Private") {
      setSelectType(e.target.value);
      dispatch(
        setFilteredExcursion({
          id: id,
          name: "selectedExcursionType",
          value: "Private",
          
        })
      );
      dispatch(
        setFilteredExcursion({
          id: id,
          name: "vehicleType",
          value: [],
          
        })
      );
    }

    const { name, value } = e.target;
    if (value === "Private") {
      const existData = selectData.excursionId;
      if (existData) {
        setSelectData((prevState) => ({
          ...prevState,
          [nm]: value,
          excursionId: id,
          vehicleType: []
        }));
        let selectedData = {
          ...selectData,
          value: value,
          vehicleType: [],
        };
        dispatch(handleSelectedExcursion(selectedData));
      } else {
        setSelectData((prevState) => ({
          ...prevState,
          [nm]: value,
          excursionId: id,
          vehicleType:[]
        }));
      }
    } else if (value === "Shared") {
      const existData = selectData.excursionId;
      setSelectType("Shared");
      dispatch(
        setFilteredExcursion({
          id: id,
          name: "selectedExcursionType",
          value: "Shared",
        })
      );
      if (existData) {
        let newValue = value;
        setSelectData((prevState) => ({
          ...prevState,
          value: newValue,
          vehicleType: [],
        }));

        let selectedData = { ...selectData, value: newValue, vehicleType: [] };
        dispatch(handlechangeEmptyVehicleType(selectedData));
        dispatch(
          setFilteredExcursion({
            id: id,
            name: "vehicleType",
            value: [],
          })
        );
      } else {
        let sltData = { ...selectData, [nm]: value, excursionId: id };
        setSelectData({ ...selectData, [nm]: value, excursionId: id });
        dispatch(handleSelectedExcursion(sltData));
      }
    } else if(value === "Ticket"){
      const existData = selectData.excursionId;
      setSelectType("Shared");
      dispatch(
        setFilteredExcursion({
          id: id,
          name: "selectedExcursionType",
          value: "Ticket",
        })
      );
      if (existData) {
        let newValue = value;
        setSelectData((prevState) => ({
          ...prevState,
          value: newValue,
          vehicleType: [],
        }));

        let selectedData = { ...selectData, value: newValue, vehicleType: [] };
        dispatch(handlechangeEmptyVehicleType(selectedData));
        dispatch(
          setFilteredExcursion({
            id: id,
            name: "vehicleType",
            value: [],
          })
        );
      } else {
        let sltData = { ...selectData, [nm]: value, excursionId: id };
        setSelectData({ ...selectData, [nm]: value, excursionId: id });
        dispatch(handleSelectedExcursion(sltData));
      }
    }
  };

  const changeSeate = (e, id) => {

    const { name, value } = e.target;
    if(selectData.value === "Private"){
      let datas = {count:value, vehicle:id, excursionId: selectData.excursionId }
      dispatch(setVehicleTypeForSelectedExc(datas))
    }
    
  };

  useEffect(()=>{
    vehicleCount?.map((ele)=>{
      if(ele?.count){
          dispatch(vehicleInitialCount({count: ele?.count, vehicle: ele?.vehicle?._id, excursionId: data})) 
      }
    })
  
  }, [vehicleCount])

  const handleShowDetails = (e)=>{
    if(e.target.value === "TicketWithTransfer"){
      setSelectionColor(e.target.value)
      setShowVehicle(e.target.value)
    }
    setShowDetails(!showDetails)
  }


  return (
    <div className="">
      {tp?.excursionType  === "ticket" && (
        <div className="w-full flex flex-wrap justify-center items-center gap-2 text-xs text-grayColor p-3">
          <div className="flex">
            {tp?.ticketOnlyPricing === true ? (
              <button
                className={`border-y border-l hover:border-blue-300 text-gray-800 font-bold py-1 px-2 md:py-2 md:px-4 text-[6px] md:text-[9px]    ${
                  tp?.selectedExcursionType === "Ticket" ? "bg-blue-100" : ""
                } `}
                type="button"
                name={"value" + index}
                value={"Ticket"}
                onClick={(e) => {
                  changeType(e, data, "value");
                }}
              >
                Ticket Only
              </button>
            ) : (
              ""
            )}

            <button
              type="button"
              className={`border hover:border-blue-300 text-gray-800 font-bold p-1 text-[8px] md:text-[10px] ${
                tp?.selectedExcursionType === "TicketWithTransfer" ? "bg-blue-100" : ""
              } `}
              name={"value"}
              value="TicketWithTransfer"
              onClick={(e) => {
                changeType(e, data, "value");
                handleShowDetails(e);
              }}
            >
              Ticket With Transfer
            </button>
          </div>
          <div className="">
            {showDetails && showVehicle !== "Ticket"  || tp?.selectedExcursionType === "Shared"  || tp?.selectedExcursionType === "Private"  ? (
              <div className="flex gap-2">
                {tp?.ticketSharedPricing === true ? (
                    <>
                    {console.log(tp?.selectedExcursionType)}
                    <input
                      type="radio"
                      checked={tp?.selectedExcursionType === "Shared"}
                      id={"radio-default-2"}
                      className={`border hover:border-blue-300 text-gray-800 font-bold py-2 px-4  `}
                      name={"value" + index}
                      value={"Shared"}
                      onClick={(e) => {
                        changeType(e, data, "value");
                      }}
                    />
                    <label className="text-[14px] text-black">Shared</label>
                  </>
                ) : (
                  ""
                )}
                {tp?.ticketVehicleType?.length > 0 ? (
                  <>
                    <input
                      type="radio"
                      checked={tp?.selectedExcursionType === 'Private'}
                      id="radio-default-1"
                      className={`border hover:border-blue-300 text-gray-800 font-bold py-2 px-4 rounded-r  `}
                      name={"value" + index}
                      value={"Private"}
                      onClick={(e) => {
                        changeType(e, data, "value");
                        fetchVehicleCount()

                      }}
                    />
                    <label className="text-[14px] text-black">Private</label>
                  </>
                ) : (
                  ""
                )}
              </div>
            ):""}


            {
              !isLoading ? (
                <>
                {selectType === "Private" && selectionColor !== "Ticket" && (
                  <div className="grid md:grid-cols-1 justify-start bg-white w-full h-280 p-3 ml-5">
                    <div>
                      {vehicleCount?.map((vcl, i) => {
                        return (
                          <div key={i} className="">
                            {
                              vcl?.count ? (
                                <div className="flex gap-6 p-1">
                                <label htmlFor="" className="text-black">
                                  {vcl?.vehicle?.name}
                                </label>
                                <div className="">
                                  <select
                                    className="border"
                                    name="count"
                                    id="count"
                                    onChange={(e) =>
                                      changeSeate(e, vcl?.vehicle?._id)
                                    }
                                  >
                                    {
                                      vcl?.count ? (
                                        <>
                                        <option value={vcl?.count} >{vcl?.count}</option>
                                        <option value={2}>2</option>
                                        <option value={3}>3</option>
                                        <option value={4}>4</option>
                                        <option value={5}>5</option>
                                        <option value={6}>6</option>
                                        <option value={7}>7</option>
                                        <option value={8}>8</option>
                                        <option value={9}>9</option>
                                        </>
                                      ):(
                                        <>
                                        {/* <option value={0}>0</option>
                                        <option value={1}>1</option>
                                        <option value={2}>2</option>
                                        <option value={3}>3</option>
                                        <option value={4}>4</option>
                                        <option value={5}>5</option>
                                        <option value={6}>6</option>
                                        <option value={7}>7</option>
                                        <option value={8}>8</option>
                                        <option value={9}>9</option> */}
                                        </>
                                      )
                                  }
                                   
                                  </select>
                                </div>
                              </div>
                              ) : ""
                            }
                          
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
                </>
              ) : (
                <>
                 {selectType === "Private" && selectionColor !== "Ticket" && (
                  <div className="grid md:grid-cols-1 justify-start bg-white w-full h-280 p-3 ml-5 animate-pulse">
                    <div>
                    <div className="h-3 w-20 bg-gray-100 rounded animate-pulse"></div>
                   <div className="mt-2 h-3 w-20 bg-gray-100 rounded animate-pulse"></div>
                     
                    </div>
                  </div>
                )}
                </>
              )
            }
            
          </div>
        </div>
      )}

      {tp?.excursionType  === "transfer" && (
        <div className="w-full flex flex-wrap justify-center items-center gap-2 text-xs text-grayColor p-3">
          <div className="flex">
            <button
              type="button"
              className={`border hover:border-blue-300 text-gray-800 font-bold py-2 px-4  ${
                selectionColor === "TicketWithTransfer" ? "bg-blue-100" : ""
              } `}
              name={"value"}
              value="TicketWithTransfer"
              onClick={(e) => {
                handleShowDetails(e);
              }}
            >
              Ticket With Transfer
            </button>
          </div>
          <div className="">
            {showDetails && selectType !== "Ticket" || tp?.selectedExcursionType === "Shared" || tp?.selectedExcursionType === "Private"  ? (
              <div className="flex gap-2">
                {tp?.transferSharedPricing === true ? (
                  <>
                    <input
                      type="radio"
                      className={`border hover:border-blue-300 text-gray-800 font-bold py-2 px-4  ${
                        selectType === "Shared" ? "bg-slate-200" : ""
                      }`}
                      name={"value" + index}
                      value="Shared"
                      checked={tp?.selectedExcursionType === "Shared"}
                      onClick={(e) => {
                        changeType(e, data, "value");
                      }}
                    />
                    <label htmlFor="" className="text-[14px] text-black">
                      Shared
                    </label>
                  </>
                ) : (
                  ""
                )}
                {tp?.transferVehicleType?.length > 0 ? (
                  <>
                    <input
                      type="radio"
                      className={`border hover:border-blue-300 text-gray-800 font-bold py-2 px-4 rounded-r  ${
                        selectType === "Private" ? "bg-slate-200" : ""
                      }`}
                      name={"value" + index}
                      value="Private"
                      checked={tp?.selectedExcursionType === "Private"}
                      onClick={(e) => {
                        changeType(e, data, "value");
                        fetchVehicleCount()
                      }}
                    />
                    <label htmlFor="" className="text-[14px] text-black">
                      Private
                    </label>
                  </>
                ) : (
                  ""
                )}
              </div>
            ):""}

            {
              !isLoading ? (
                <>
                {selectType === "Private" && selectionColor !== "Ticket" && (
                  <div className="grid md:grid-cols-1 justify-start bg-white w-full h-280 p-3 ml-5">
                    <div>
                      {vehicleCount?.map((vcl, i) => {
                        return (
                          <div key={i} className="">
                            {
                              vcl?.count ? (
                                <div className="flex gap-6 p-1">
                                <label htmlFor="" className="text-black">
                                  {vcl?.vehicle?.name}
                                </label>
                                <div className="">
                                  <select
                                    className="border"
                                    name="count"
                                    id="count"
                                    onChange={(e) =>
                                      changeSeate(e, vcl?.vehicle?._id)
                                    }
                                  >
                                    {
                                      vcl?.count ? (
                                        <>
                                        <option value={vcl?.count} >{vcl?.count}</option>
                                        <option value={2}>2</option>
                                        <option value={3}>3</option>
                                        <option value={4}>4</option>
                                        <option value={5}>5</option>
                                        <option value={6}>6</option>
                                        <option value={7}>7</option>
                                        <option value={8}>8</option>
                                        <option value={9}>9</option>
                                        </>
                                      ):(
                                        <>
                                        {/* <option value={0}>0</option>
                                        <option value={1}>1</option>
                                        <option value={2}>2</option>
                                        <option value={3}>3</option>
                                        <option value={4}>4</option>
                                        <option value={5}>5</option>
                                        <option value={6}>6</option>
                                        <option value={7}>7</option>
                                        <option value={8}>8</option>
                                        <option value={9}>9</option> */}
                                        </>
                                      )
                                  }
                                   
                                  </select>
                                </div>
                              </div>
                              ) : ""
                            }
                          
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
                </>
              ) : (
                <>
                 {selectType === "Private" && selectionColor !== "Ticket" && (
                  <div className="grid md:grid-cols-1 justify-start bg-white w-full h-280 p-3 ml-5 animate-pulse">
                    <div>
                    <div className="h-3 w-20 bg-gray-100 rounded animate-pulse"></div>
                   <div className="mt-2 h-3 w-20 bg-gray-100 rounded animate-pulse"></div>
                     
                    </div>
                  </div>
                )}
                </>
              )
            }
          </div>
        </div>
      )
      }
    </div>
  )
}

export default EditSideExcTransferModal
