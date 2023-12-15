import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from "../../../../axios";
import { handleSelectedVisaId, setVisaQuotationDisabled, setVisaNationalityId } from '../../../../redux/slices/quotationSlice';
import { AiOutlineSearch } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";


function VisaQuotationEdit({setQuotationEdit}) {

    const {  selectedVisaId, selectedVisaNationality } = useSelector((state) => state.quotation);
    // const {_id} = selectedVisa

    console.log(selectedVisaId);
  
    const { token } = useSelector(state => state.agents)

    const dispatch = useDispatch()
    const [ visa, setVisa ] = useState([])
    const [ loading, setLoding ] = useState(false)
    const [searchedVisa, setSearchedVisa] = useState([])
    const [filteredData, setFilteredData] = useState([])
    const [search, setSearch] = useState()
    const [isDropdown, setIsDropdown] = useState(false)


    const fetchVisaData = async (_id)=>{
        try{
            dispatch(setVisaNationalityId(_id))
            setLoding(true)
            const res = await axios.get(`/b2b/quotations/inital/visa-type/${_id}`, { headers: { Authorization: `Bearer ${token}`}} )  
            setVisa(res.data || [])
            setLoding(false)

        }catch (err) {
            setLoding(false)
            console.log(err);
        }
    }


    const fetchSearchedVisa = async () => {
        try {
          const res = await axios.get(`/b2b/quotations/inital/nationality`, {headers: {Authorization: `Bearer${token}`}})
          // console.log(res.data);
          setSearchedVisa(res.data)
        } catch (err) {
          console.log(err);
        }
      }

    useEffect(()=>{
        fetchSearchedVisa() 
    }, [])

    const handleVisaSelection = (id, visaName, processTime, processFormat, validity, validityFormat)=>{
        dispatch(handleSelectedVisaId({id, visaName, processTime, processFormat, validity, validityFormat}))
    }

    useEffect(()=>{
        const keyword = new RegExp(search, "i")
        const filter = searchedVisa?.filter((nationality)=>
        Object.values(nationality).some(
          (val) => typeof val === "string" && val.match(keyword)
        ))
        setFilteredData(filter)
      }, [search, visa])
    
      useEffect(()=>{
        if(filteredData?.length){
          setIsDropdown(true)
        }
      },[search])

      useEffect(()=>{
        if(selectedVisaNationality){
          fetchVisaData(selectedVisaNationality)
        }
      }, [selectedVisaNationality])
    

  return (
   <div className='max-w-screen-lg mx-auto'>
        <div>
            <div className='pb-5'>
                <h3 className='text-md tracking-wide text-center text-stone-600 font-bold'> Do your clients need Visa, please chose nationality and proceed </h3>
            </div>
        </div>
        <div className="grid md:flex md:gap-20 gap-1 justify-center">
        <div className="pt-5">
          <h1 className="text-lg font-bold text-gray-400">Search Nationality</h1>
        </div>
      <div className="">
      <div className="md:mt-2 relative">
          <input
            className="outline-none md:w-[500px] w-80 border-2  shadow-md border-stone-100 border-opacity-70 rounded-md h-14 pl-10   text-sm font-[800] text-stone-800 placeholder:text-stone-400"
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            placeholder="Search Nationality"
          />
          {/* <div className="absolute top-0 left-0 bottom-0">
            <p className="text-3xl p-3 mt-1 text-stone-400">
              <AiOutlineSearch />
            </p>
          </div> */}
        </div>
        <div>
          {
            isDropdown ? (
              <div className="w-80 h-auto max-h-40 border shadow-xl bg-slate-50 overflow-y-scroll absolute md:left-62 lg:top-96 " >
              {
                filteredData?.map((ele)=>{
                  return(
                    <>
                     <p 
                     onClick={()=>{
                      fetchVisaData(ele?._id)
                      setSearch(ele?.nationality)
                    }}
                     className="hover:bg-slate-200 p-2 border-b">{ele?.nationality}</p>
                    </>
                  )
                })
              }
           
            </div>
            ) : ""
          }
         
        </div>
      </div>
  
      </div>
       {
        !loading ? (
            <div className='grid md:grid-cols-3 gap-2 justify-center pt-20'>

            {visa?.map((ele)=>{
                return (
                    <div
                    onClick={() =>{
                        handleVisaSelection(ele.visaId, ele.visaName, ele.processingTime, ele.processingTimeFormat, ele?.validity, ele?.validityTimeFormat )
                        setQuotationEdit({
                            arrivalAirportEdit: false,
                            departureAirportEdit: false,
                            travelDateEdit: false,
                            travelPartnerEdit: false,
                            hotelEnquiryEdit: false,
                            hotelListEdit: false,
                            suggestHotelEdit: false,
                            suggestDetailCollectionEdit: false,
                            hotelDetailCollectionEdit: false,
                            transferHotelsEdit: false,
                            excursionListEdit: false,
                            excursionSupplimetListEdit: false,
                            visaQuotationsEdit: false,
                            createQuotationEdit: true,
                          });
                    }}
                    className={`${selectedVisaId.id === ele._id || selectedVisaId ? ' bg-green-100 hover:-translate-y-1 cursor-pointer transition-all duration-300 rounded-md border-2  border-green-500 border-opacity-20 shadow-round w-full py-8  flex flex-col items-center' : "bg-white hover:-translate-y-1 cursor-pointer transition-all duration-300 rounded-md border-[1px] border-gray-100 border-opacity-20 shadow-round w-full py-8  flex flex-col items-center"}`}>
          
                <div className="w-64  p-6">
                <div className="text-center">
                    <img src="https://www.careinsurance.com/kitextproxy/cms-careinsurance-com/upload_master/surveys/upload/4ee74d4de3947863f0c79f85702840a7.png" alt="Visa Logo" class="w-32 mx-auto"/>
                </div>
                <div className="mt-6">
                    <h3 className="text-xl font-semibold text-center">{ele?.visa?.name}</h3>
                    <p className="text-gray-600 text-center text-lg font-medium">{ele?.visaName} </p>
                    <p className="text-gray-600 text-center text-sm">Processing Time : {ele?.processingTime} {ele?.processingTimeFormat}</p>
                    <p className="text-gray-600 text-center text-sm">Visa Validity : {ele?.validity} {ele?.validityTimeFormat}</p>
                </div>
                </div>
            
              </div>
                )
            })}
        </div>
        ) : (
            <div className="grid md:flex gap-5 justify-center hover:-translate-y-1 transition-all duration-300 pt-20">
          {
            [1,2,3].map((ele)=>(
          <div class="bg-white max-w-md rounded overflow-hidden shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer p-5">
            <div className="p-5">
              <div className="text-gray-700 ">
                <div className="">
                  <h1 className="h-4 w-52 bg-grayColor mt-3 rounded animate-pulse"></h1>
                </div>
              </div>
              <div>
                <h3 className="h-4 w-52 bg-grayColor mt-3 rounded animate-pulse"></h3>
              </div>
              <div>
                <h1 className="h-4 w-52 bg-grayColor mt-3 rounded animate-pulse"></h1>
              </div>
            </div>
          </div>
            ))
          }
        </div>
        )
       }
             <div className='flex justify-end items-end md:mt-10 md:mb-10 pt-28 mr-8 lg:mr-0'>
                 <button className='bg-orange-600 rounded text-[14px] font-[600] text-white shadow-sm w-[150px] py-2 ' 
            onClick={() => {
            dispatch(setVisaQuotationDisabled(true))
            setQuotationEdit({
              arrivalAirportEdit: false,
              departureAirportEdit: false,
              travelDateEdit: false,
              travelPartnerEdit: false,
              hotelEnquiryEdit: false,
              hotelListEdit: false,
              suggestHotelEdit: false,
              suggestDetailCollectionEdit: false,
              hotelDetailCollectionEdit: false,
              transferHotelsEdit: false,
              excursionListEdit: false, 
              excursionSupplimetListEdit: false,
              visaQuotationsEdit: false,
              createQuotationEdit: true
            })
          }} >Not Required</button>
             </div>
 
         </div>
  )
}

export default VisaQuotationEdit
