import React, { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import {
  setSupplimentsDisabled,
  removeMorthanOneInDateSuppliment,
  setExcursionSupplimentsForNew,
  setSearchExcursionSuppliments
} from "../../../../redux/slices/quotationSlice";
import { previewImage } from "../../../../static/imagesB2B";
import ExcSupplimentsCard from "./ExcSupplimentsCard";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import SupplementsModal from "./SupplementsModal";
import CarouselBtnSuppliments from "./CarouselBtnSuppliments";
import { AiFillWarning } from "react-icons/ai";
import { config } from "../../../../constants";
import axios from "../../../../axios";
import { TbPlayerTrackNextFilled } from "react-icons/tb";


function ExcursionSupplimentsList({ setQuestions, setSteps }) {
  const [modal, setModal] = useState(false);
  const [search, setSearch] = useState();
  const [selectedData, setSelectedData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [showWarningModal, setShowWarningModal] = useState(false)
  const [excursionForFetch, setExcursionForFetch] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [searchSupp, setSearchSupp] = useState()

  const {  excSupplimentFiltered, checkInDate, checkOutDate, searchExcursionSuppliments, selectedExcSupplimentsIds } =
    useSelector((state) => state.quotation);
  const dispatch = useDispatch();
  const { token } = useSelector(state => state.agents)

  const handleShowModal = () => {
    setModal(true);
  };

  const fetchExcursionsSuppliments = async () => {
    try {
      setIsLoading(true)
      const res = await axios.get(`/b2b/quotations/inital/excursion/list?date=${checkInDate}`, {headers: {Authorization:`Bearer ${token}`}})
      setExcursionForFetch(res.data)
      dispatch(setExcursionSupplimentsForNew(res.data))
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      console.log(error);
    }
  }

  useEffect(()=>{
    if(!excSupplimentFiltered?.length){
      fetchExcursionsSuppliments()
    }
  }, [])


  const checkIn = new Date(checkInDate)
  const checkOut = new Date(checkOutDate)
  const timeDifferece = checkOut - checkIn
  const totalDays = timeDifferece / (1000 * 3600 * 24)

  useEffect(() => {
    setSteps({
      isArrivalAirport: false,
      isDepartureAirport: false,
      isTravelDate: false,
      isTravelPartner: false,
      isStay: false,
      isTransfer: false,
      isExcursion: false,
      isSuppliment: true,
      isVisa: false,
    });
  },[])

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  const selectedExcursions = excSupplimentFiltered.filter((exc)=>exc.isSelected)
  const [lastPushedData, setLastPushedData] = useState(1)

  const handleAddExcursions = ()=>{
    setLastPushedData(selectedExcursions?.length)
  }

  useEffect(()=>{
    if(totalDays < selectedExcursions?.length / 3 ){
        setShowWarningModal(true)
    }
  }, [totalDays < selectedExcursions?.length / 3 ])

  const handleRomveMoreThanDay = () =>{
    dispatch(removeMorthanOneInDateSuppliment(selectedExcursions[lastPushedData]))
  }

  const handleSearchAttractions = (e)=>{
    setSearchSupp(e.target.value)
  }

  const searchAttractions = async (e)=>{
    try {
      e.preventDefault();
      const res = await axios.get(`/b2b/quotations/inital/excursion/search?date=${checkInDate}&&text=${searchSupp}`, {headers:{Authorization: `Bearer ${token}`}})
      console.log(res.data);
      dispatch(setSearchExcursionSuppliments(res.data))
      if(!searchSupp?.length){
        dispatch(setSearchExcursionSuppliments([]))
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="max-w-screen-lg mx-auto">
      <div classsName="">
        <div className="pb-5">
          <h3 className="text-md tracking-wide text-center text-stone-600 font-bold">
            Select Suppliments ?
          </h3>
        </div>
        
        <div className=" md:flex md:gap-20 md:justify-between"> 
        <div>
        <form onSubmit={searchAttractions}>
        <div className="flex gap-2">
        <div className="mt-2 relative p-2 md:p-0 w-[423px]">
          <input
            className="outline-none w-full border-[1px] shadow-lg border-stone-300 border-opacity-70 rounded-md h-11 pl-10 text-sm font-[800] text-stone-800 placeholder:text-stone-400"
            type="text"
            value={search}
            onChange={handleSearchAttractions}
            placeholder="Find an Attraction"
          />
          <div className="absolute top-1 md:top-0 left-0 bottom-0">
            <p className="text-3xl p-2 mt-0 text-stone-400">
              <AiOutlineSearch />
            </p>
          </div>
        </div>
        <div className="pt-2">
          <button  className="border py-2 w-28 bg-gray-200/10 rounded hover:bg-black hover:text-white">Seach</button>
        </div>
        </div>
        </form>
        </div>
        <div>
          { selectedExcSupplimentsIds?.length > 0 ? (
          <div className="flex gap-3 pt-2 justify-end">
            <div className="justify-end items-end mt-1 md:ml-0">
              <button
                className="border py-2 font-medium w-[90px]  text-[14px] bg-gray-200/10 rounded hover:bg-blue-500  hover:text-white"
                onClick={handleShowModal}
              >
                Edit
              </button>
            </div>
            <div className="md:mt-1 ml-28 md:ml-0">
              <button
                onClick={() => {
                  setQuestions({
                    arrivalAirport: false,
                    departureAirport: false,
                    travelDate: false,
                    travelPartner: false,
                    hotelEnquiry: false,
                    hotelList: false,
                    suggestHotel: false,
                    suggestDetailCollection: false,
                    hotelDetailCollection: false,
                    transferHotels: false,
                    excursionList: false,
                    suplimetsOptionPage: false,
                    excursionSupplimetList: false,
                    visaQuotations: true,
                  });
                }}
                className="relative bg-gradient-to-l from-blue-600 to-red-600 hover:from-red-600 hover:to-blue-600 rounded text-[14px] font-[600] text-white shadow-sm w-[150px] py-2"
              >
              Next
              <span className="absolute top-[12px] bottom-0 left-[100px] right-0 text-md"><TbPlayerTrackNextFilled/></span>
              </button>
            </div>
              </div>
            ):(
              <div>
                <div className="flex justify-end pt-4">
              <button 
                onClick={() => {
                 dispatch(setSupplimentsDisabled(true))
                  setQuestions({
                    arrivalAirport: false,
                    departureAirport: false,
                    travelDate: false,
                    travelPartner: false,
                    hotelEnquiry: false,
                    hotelList: false,
                    suggestHotel: false,
                    suggestDetailCollection: false,
                    hotelDetailCollection: false,
                    transferHotels: false,
                    excursionList: false, 
                    suplimetsOptionPage: false,
                    excursionSupplimetList: false,
                    visaQuotations: true,
                    createQuotation: false
                  })
                }}
              className="bg-orange-600 rounded text-[14px] font-[600] text-white shadow-sm w-[150px] py-2">Skip</button>
            </div>
              </div>
            )
          }
        </div>
        </div>

        {modal && <SupplementsModal data={{ setModal }} select={selectedData} set={setSelectedData}/>}

        <div className="grid grid-cols-1 gap-3 pt-5 p-2 md:-p-0">
          {
            !searchExcursionSuppliments?.length ? (
        // <Carousel
        //   responsive={responsive}
        //   arrows={false}
        //   renderButtonGroupOutside={true} 
        //   customButtonGroup={<CarouselBtnSuppliments />} 
        //    >
        <div className="grid md:grid-cols-4 pt-5 gap-1">
          {excSupplimentFiltered?.map((ele, index) => {
            return (
              <>
              <ExcSupplimentsCard 
               ele={ele}
              selectedData={selectedData}
              index={index}
              setSelectedData={setSelectedData}
              filteredData={filteredData}
              handleAddExcursions={handleAddExcursions}
              />
              </>
            );
          })}
         

          </div>
          // </Carousel>
            ) : (
              // <Carousel
              // responsive={responsive}
              // arrows={false}
              // renderButtonGroupOutside={true} 
              // customButtonGroup={<CarouselBtnSuppliments />} 
              //  >
              <div className="grid md:grid-cols-4 pt-5 gap-1">
              {searchExcursionSuppliments?.map((ele, index) => {
                return (
                  <>
                  <ExcSupplimentsCard 
                   ele={ele}
                  selectedData={selectedData}
                  index={index}
                  setSelectedData={setSelectedData}
                  filteredData={filteredData}
                  handleAddExcursions={handleAddExcursions}
                  />
                  </>
                );
              })}
              

              </div>
              // </Carousel>
            )
          }
        </div>

        {/* {selectedExcSupplimentsIds?.length > 0 ?  (
          <div className="md:rounded-lg bg-black grid md:flex md:first-letter md:w-2/3 md:p-4 gap-6 md:ml-32 mb-20 md:mb-0 p-2 ">
          
                    <div className="md:ml-5 ml-36">

                    <img
                      src={  selectedExcSupplimentsIds[lastPushedData]?.image?.length > 0
                        ? config.SERVER_URL + selectedExcSupplimentsIds[lastPushedData]?.image[0]
                        : previewImage}
                      alt="img"
                      className="md:w-16 md:h-16 w-24 h-24 rounded-full "
                      />
                      </div>
               
            <div className="md:mt-4 ml-16 md:ml-0">
              <h1 className="text-white text-xs">
                {selectedExcSupplimentsIds[lastPushedData]?.attraction}! Great choice,
                keep adding
              </h1>
            </div>
            <div className="justify-end items-end mt-2 ml-36 md:ml-0">
              <button
                className="bg-gray-200 rounded text-[14px] font-[600] text-blue-600 shadow-sm w-[90px] py-2"
                onClick={handleShowModal}
              >
                Edit
              </button>
            </div>
            <div className="md:mt-2 ml-28 md:ml-0">
              <button
                onClick={() => {
                  setQuestions({
                    arrivalAirport: false,
                    departureAirport: false,
                    travelDate: false,
                    travelPartner: false,
                    hotelEnquiry: false,
                    hotelList: false,
                    suggestHotel: false,
                    suggestDetailCollection: false,
                    hotelDetailCollection: false,
                    transferHotels: false,
                    excursionList: false,
                    suplimetsOptionPage: false,
                    excursionSupplimetList: false,
                    visaQuotations: true,
                  });
                }}
                className="bg-gradient-to-l from-blue-600 to-red-600 hover:from-red-600 hover:to-blue-600 rounded text-[14px] font-[600] text-white shadow-sm w-[150px] py-2"
              >
              Next
              </button>
            </div>
          </div>
        ) : (
          <div className="flex justify-end pt-5">
              <button 
                onClick={() => {
                 dispatch(setSupplimentsDisabled(true))
                  setQuestions({
                    arrivalAirport: false,
                    departureAirport: false,
                    travelDate: false,
                    travelPartner: false,
                    hotelEnquiry: false,
                    hotelList: false,
                    suggestHotel: false,
                    suggestDetailCollection: false,
                    hotelDetailCollection: false,
                    transferHotels: false,
                    excursionList: false, 
                    suplimetsOptionPage: false,
                    excursionSupplimetList: false,
                    visaQuotations: true,
                    createQuotation: false
                  })
                }}
              className="bg-orange-600 rounded text-[14px] font-[600] text-white shadow-sm w-[150px] py-2">Skip</button>
            </div>
        )} */}
   <>
  {showWarningModal ? (
    <>
      <div
        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none backdrop-blur-sm transition-all "
      >
        <div className="relative w-auto my-6 mx-auto max-w-2xl p-2 md:p-0">
          {/*content*/}
          <div className=" rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className=" p-5  border-slate-200 rounded-t">
              <h3 className="text-3xl font-semibold text-center  flex justify-center">
                <span className="text-orange-400"><AiFillWarning/></span>
                Warning!!
              </h3>
            </div>
            {/*body*/}
            <div className="relative p-6 flex-auto">
              <p className="my-4 text-slate-600 text-lg leading-relaxed">
              You are exceeded the average number of excursion can be visited per day.
              </p>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-6  border-solid border-slate-200 rounded-b">
              <button
                className="text-white bg-orange-400 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => {
                  handleRomveMoreThanDay()
                  setShowWarningModal(false)
                }}
              >
                Close
              </button>
              <button
                className="bg-blue-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() =>{
                  setShowWarningModal(false)
                }}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  ) : null}
</>
        <br />
        <div className="text-gray-400 ">
          <h1>Here you can choose any attractions, either on ticket only or with transfers. You can optain for Private or Shared basis, across all Emirates. You can even use the search area to look for other options, using short word for searches</h1>
        </div>
      </div>
    </div>
  );
}

export default ExcursionSupplimentsList;
