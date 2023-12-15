import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { AiTwotoneDelete, AiFillEdit } from "react-icons/ai";
import { setGenaralDataInsurance, setBeneficiaryDataInsuracne, handleDeleteBeneficiaryData, handleEditBeneficiaryData, setClearAllDatas, handleSingleBenificiaryData } from '../../../redux/slices/insuranceSlice';
import { AiFillCheckCircle, AiOutlineDownload } from "react-icons/ai";
import { VscError } from "react-icons/vsc";
import { useNavigate } from 'react-router-dom';
import axios from "../../../axios"
import BtnLoader from '../../components/BtnLoader';
import { ContriesJson } from './Contries';
import moment from "moment/moment";


function InsuranceHomepage() {

  const countryCodes = [
    { name: "United Arab Emirates", code: "+971" },
    { name: "India", code: "+91" },
    { name: "United States", code: "+1" },
    { name: "United Kingdom", code: "+44" },
    // add more country codes here
  ];

  const currentDate = new Date().toISOString().split('T')[0];

  const [isModal, setIsModal] = useState(false)
  const [familyBeneficiary, setFamilyBeneficiary] = useState(false)
  const [beneficiary, setBeneficiary] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender:"",
    passportNumber: ""
  })

  const [editBeneficiary, setEditBeneficiary] = useState(false)
  const [error, setError] = useState(false)
  const [createError, setCreateError] = useState(false)
  const [index, setIndex] = useState()
  const [confirmationSuccess, setConfirmationSuccess] = useState(false)
  const [plans, setPlans] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [showDetails, setShowDetails] = useState([])
  const [planName, setPlanName] = useState([])
  const [IsSuccessfull, setIsSuccessfull] = useState(false)
  const [createModal, setCreateModal] = useState(false)
  const [orderId, setOrderId] = useState()
  const [isIsueLoading, setIssueLoading] = useState(false)
  const [showTotalPrice, setShowTotalPrice] = useState(false)
  const [genaralDataClear, setGenaralDataClear] = useState({
    plan:"",
    residence:"UAE",
    destination:"",
    travelFrom:"",
    travelTo:"",
    travelType:""
  })
  const [editErrorMsg, setEditErrorMsg] = useState(false)
  const [quotaitonLoading, setQuotationLoading] = useState(false)
  const [quotationCreateErr, setQuotationCreateErr] = useState()
  const [totalQuotationAmount, setTotalQuotationAmount] = useState()
  const [createErrorMsg, setCreateErrorMsg] = useState()
  const [fromDate, setFromDate] = useState(new Date())
  const [toDate, setToDate] = useState(new Date());
  const [destinationName, setDestinationName] = useState()

  const { genaralData, beneficiaryData } = useSelector((state)=>state.insurance)

  const otp = "12345"

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {token} = useSelector(state => state.agents)
  

  // date calculation
    // const travelFromDate = new Date(genaralData?.travelFrom);
    // const travelToDate = new Date(genaralData?.travelTo);
    // const durationInMilliseconds = travelToDate - travelFromDate;
    // const durationInDays = durationInMilliseconds / (1000 * 60 * 60 * 24);
    
    
    const travelFromDate = moment(genaralData.travelFrom, 'YYYY-MM-DD');
    const travelToDate = moment(genaralData.travelTo, 'YYYY-MM-DD');
    const durationInDays = travelToDate.diff(travelFromDate, 'days') + 1;
    const formattedFromDate = moment(fromDate).format("YYYY-MM-DD");

   useEffect(()=>{
     dispatch(setGenaralDataInsurance({name : "travelFrom", value : formattedFromDate}))
   }, [])
  
  
  // const formattedToDate = moment(toDate).format("YYYY-MM-DD") ; 

  const calculateDates = (e) => {
    let count = e.target.value
    count --
   let data = new Date(
    moment(genaralData?.travelFrom).add(count, "days"))
    const formattedToDate = moment(data).format("YYYY-MM-DD") ; 
    setToDate(
      formattedToDate
      );
        dispatch(setGenaralDataInsurance({name : "travelTo", value :formattedToDate }))
      }

      const handleGeneralData = (e) =>{
        setEditErrorMsg(false)
           setQuotationCreateErr("")
        setQuotationCreateErr("")
       
        let {value, name} = e.target
        
        if(name === "travelType" && value === 'FM' ){
          setFamilyBeneficiary(true)
        } else if (name === 'travelType' && value === "SG"){
          setFamilyBeneficiary(false)
        }

        if(name === "plan"){
          const filter = plans.filter(
            (item) => item._id === value
          )
          setPlanName(filter)
         
        }

        if(name === "travelTo") {
          setToDate(value)
        }
        if(name === 'destination'){
          const filterDesName = ContriesJson?.residencies?.filter(
            (item) => item.value === value
          )
            setDestinationName(filterDesName)
        }

        setGenaralDataClear(({
          ...genaralDataClear,
          [name]:value
        }))

        dispatch(setGenaralDataInsurance({name, value}))
      }

        const handleBeneficiaryData = (e) =>{
          setEditErrorMsg(false)
           setQuotationCreateErr("")
          
          let {value, name} = e.target
          let data = {
            ...beneficiary, [name]: value
          }
          setBeneficiary(data)

            if(genaralData.travelType === "SG"){
              dispatch(handleSingleBenificiaryData(data))
            }
        }

        const handleSetBeneficiaryData = async ()=>{
            fetchData()
        }

        const handleAddBeneficiary = () =>{
        
          if(beneficiary.dateOfBirth && beneficiary.firstName && beneficiary.passportNumber ) {
            dispatch(setBeneficiaryDataInsuracne(beneficiary))
            setBeneficiary(
              {
                firstName: "",
                lastName: "",
                dateOfBirth: "",
                gender:"",
                passportNumber: ""
              }
            )
         
          } else {
            setError(true)
          }

        }

        const handleDeleteBeneficiary = (index) =>{
          dispatch(handleDeleteBeneficiaryData(index))
        }
        
        const handleEditBeneficiary = (index, ele) => {
          setEditBeneficiary(true)
          setIndex(index)
      
        }

        const sendEditData = ()=>{
          if(beneficiary.dateOfBirth && beneficiary?.firstName && beneficiary.lastName && beneficiary.gender && beneficiary.passportNumber){
            dispatch(handleEditBeneficiaryData({index: index, data:beneficiary}))
         
            setEditBeneficiary(false)
          } else {
            setEditErrorMsg(true)
          }

        }

        const handleConfirm = () => {
          initiateContract()
        }

        useEffect(()=>{
          setError(false)
        },[beneficiary.dateOfBirth && beneficiary.firstName && beneficiary.passportNumber])

        const handleClearDatas = () =>{

          dispatch(setClearAllDatas())
          setBeneficiary({
            firstName: "",
            lastName: "",
            dateOfBirth: "",
            gender:"",
            passportNumber: ""
          })
          setGenaralDataClear(
            {
              plan:"",
              residence:"UAE",
              destination:"",
              travelFrom:"",
              travelTo:"",
              travelType:""
            }
          )
          setShowDetails([])
          setIsLoading(false)
          setIsSuccessfull(false)
          setIsModal(false)
          setCreateModal(false)
          setConfirmationSuccess(false)
          setShowTotalPrice(false)
          setCreateError(false)
          setCreateErrorMsg("")
        }

       const fetchAllDataPlans = async () => {
        try{
   
          const res = await axios.get(`/b2b/insurance/all`, {headers: { Authorization: `Bearer ${token}`}})
          setPlans(res.data)
        }catch(err) {
          console.log(err);
        }
       }

       useEffect(()=>{
        fetchAllDataPlans()
       }, [])

       const fetchData = async () => {
        try{
          setQuotationLoading(true)
          const res = await axios.post(`/b2b/insurance/quotation`,{
            generalData: genaralData, 
            beneficiaryData: genaralData?.travelType === "SG" ? [beneficiaryData[0]] : beneficiaryData
          }, 
          {headers: {Authorization: `Bearer ${token}`}})
          setShowDetails(res.data.details)
          setTotalQuotationAmount(Math.round(res.data.totalAmount))
          setQuotationLoading(false)
          setShowTotalPrice(true)
        }catch (err) {
          console.log(err.response.data.error);
          setQuotationCreateErr(err?.response?.data?.error)
          setQuotationLoading(false)
        }
       }

    const initiateContract =async () => {
      try{
        setIssueLoading(true)
        const res = await axios.post(`b2b/insurance/initiate-contract`, {
          generalData: genaralData,
          beneficiaryData:genaralData?.travelType === "SG" ? [beneficiaryData[0]] : beneficiaryData
        },
        {
          headers: { Authorization: `Bearer ${token}`}
        })
        setOrderId(res.data)
        setIssueLoading(false)
        setCreateModal(true)
        setIsModal(true)

      } catch(err) {
        console.log(err);
        setIssueLoading(false)
      }
    }

    const submitHandler = async (e) => {
      try{
        setIsLoading(true)
        const res = await axios.post(`/b2b/insurance/create-contract`,{
          orderId:orderId.orderId,
          otp:otp
        },{
          headers: {Authorization: `Bearer ${token}`}
        })
        setIsSuccessfull(true)
        setIsLoading(false)
        setConfirmationSuccess(true)

      } catch (err) {
        setCreateErrorMsg(err?.response?.data?.error)
        setIsLoading(false)
        setCreateError(true)
      }
    }
  
    const handlePDF =async () => {
      try{
        const response = await axios.get(`/b2b/insurance/download-contract/${orderId.orderId}`, {
          headers: { Authorization: `Bearer ${token}`},
          responseType: "arraybuffer",
        })
        const url = window.URL.createObjectURL(
          new Blob([response.data], { type: "application/pdf" })
        );
  
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${orderId.orderId}.pdf`);
        document.body.appendChild(link);
        link.click();
      }catch(err){
        console.log(err);
      }
    }

  return (
    <div className='grid lg:flex lg:justify-evenly p-1 lg:p-2'>
      <div>
        <div className='md:pt-4 p-3'>
        <div className='bg-white shadow-slate-400 max-w-[390px] md:max-w-full lg:w-full h-auto lg:h-[300px] rounded border overflow-hidden '>
        <div className=' bg-primaryColor'>
                <h1 className='text-white text-lg md:text-xl p-3'>General Information</h1>
            </div>
            <div className='pt-10 p-6'> 
                <form action="">
                    <div className='grid md:grid-cols-2'>
                        <div>
                              <label htmlFor="">Select Plan</label>
                             <div>
                                  <select value={genaralDataClear.plan} name="plan" className='w-72 h-9 outline-none border' id="" onChange={handleGeneralData}>
                                    <option value=""></option>
                                    {
                                      plans.map((ele, index)=>{
                                        return(
                                          <>
                                            <option key={index} value={ele?._id}>{ele?.name}</option>
                                          </>
                                        )
                                      })
                                    }
                         
                                  </select>
                             </div>
                          </div>
                          <div className="">
                                <div className="">
                                  <label className="label">Country of residence </label>
                                </div>
                                <div>
                                  <input 
                                  name='residence' 
                                  className='outline-none h-9 w-72 border p-3 rounded placeholder:text-gray-200 placeholder:text-sm'
                                   placeholder='UAE'
                                  type="text"
                                  value="UAE"
                                  onChange={handleGeneralData}
                                  />
                             </div>
                              </div>
                              <div className="pt-5">
                                <div className="">
                                  <label className="label">Destination</label>
                                </div>
                                <div className="">
                                  <select
                                    className="border outline-none no-spinner rounded h-9 w-72  text-md text-gray-400"
                                    name="destination"
                                    value={genaralDataClear.destination}
                                    onChange={handleGeneralData}
                                  >
                                    <option
                                      hidden
                                      className=" text-sm placeholder:text-sm "
                                    >
                                      Destination (e.g. Europe)
                                    </option>
                                    {ContriesJson?.residencies?.map((item, index) => (
                                      <option
                                        key={index}
                                        value={item?.value}
                                        className="capitalize text-black"
                                      >
                                        {item?.text?.toUpperCase()}{" "}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              </div>
                       
                            <div className='pt-5 grid md:flex gap-3'>
                              <div>
                              <label htmlFor="">From </label>
                              <div>
                                  <input 
                                  name='travelFrom' 
                                  className='outline-none h-9 w-36 border p-3 rounded placeholder:text-gray-200 placeholder:text-sm' 
                                  placeholder='' 
                                  type="date"
                                  value={ genaralDataClear.travelFrom ? genaralDataClear.travelFrom : formattedFromDate }
                                  min={currentDate}
                                  onChange={handleGeneralData}
                                  />
                             </div>
           
                             </div>
                         
                             <div>
                             <div className=''>
                     <label htmlFor="">days</label>
                         <div>
                             <input 
                             name='dateDuration' 
                             className='outline-none h-9  w-20 border p-3 rounded placeholder:text-gray-200 placeholder:text-sm' 
                             placeholder='days' 
                             type="number" 
                             value={durationInDays }
                            onChange={calculateDates}
                             />
                             </div>
                        </div>
                             </div>
                             <div>
                              <label htmlFor="">To </label>
                              <div>
                                  <input 
                                  name='travelTo' 
                                  className='outline-none h-9 w-36 border p-3 rounded placeholder:text-gray-200 placeholder:text-sm' 
                                  placeholder='' 
                                  type="date"
                                  value={toDate ? toDate : genaralDataClear.travelTo }
                                  min={currentDate}
                                  onChange={handleGeneralData}
                                  />
                             </div>
                             </div>
                         </div>
                         {/* <div className="pt-5">
                                <div className="">
                                  <label className="label">Email</label>
                                </div>
                                <div>
                                  <input 
                                  name='email' 
                                  className='outline-none h-9 w-72 border p-3 rounded placeholder:text-gray-300 placeholder:text-sm'
                                   placeholder='Email'
                                  type="text"
                                  onChange={handleGeneralData}
                                  />
                             </div>
                              </div> */}
                              {/* <div className='flex gap-1'>
                              <div className="pt-5">
                                <label  className="text-sm">
                                country Code:
                                </label>
                                <br />
                                <select
                                  id="country-code"
                                  // value={commonDetails.phoneCode}
                                  name="phoneCode"
                                  onChange={handleGeneralData}
                                  className="border rounded p-1 w-28"
                                >
                                  <option value="">Select a country code</option>
                                  {countryCodes.map((country) => (
                                    <option key={country.code} value={country.code}>
                                      {country.name} ({country.code})
                                    </option>
                                  ))}
                                </select>
                              </div>
                              <div className="pt-5">
                             
                                <div className="">
                                  <label className="label">Phone Number</label>
                                </div>
                                <div>
                                  <input 
                                  name='phoneNumber' 
                                  className='outline-none h-9 w-60 border p-3 rounded placeholder:text-gray-300 placeholder:text-sm'
                                   placeholder='Phone number  '
                                  type="text"
                                  onChange={handleGeneralData}
                                  />
                             </div>
                              </div>
                              </div> */}
                              {/* <div className="pt-5">
                                <div className="">
                                  <label className="label">Address</label>
                                </div>
                                <div>
                                  <input 
                                  name='address' 
                                  className='outline-none h-9 w-72 border p-3 rounded placeholder:text-gray-300 placeholder:text-sm'
                                   placeholder='Address'
                                  type="text"
                                  onChange={handleGeneralData}
                                  />
                             </div>
                              </div> */}
                              {/* <div className="pt-5">
                        <div className="">
                          <label className="label">Notes</label>
                        </div>
                        <div>
                          <textarea
                            name='note' 
                            className='outline-none h-20 w-80 border rounded p-2 placeholder:text-gray-300 placeholder:text-sm'
                            onChange={handleGeneralData}
                            placeholder="Enter your notes"
                          ></textarea>
                        </div>
                      </div> */}
                        </div>
                </form>
            </div>
            </div>
        </div>

        {/* Benificiary */}
        <div className=' pt-8 p-1 w-[400px] md:w-full'>
            <div className='bg-white border lg:w-full  md:max-w-full h-auto'>
            <div className=' bg-primaryColor max-w-[410px] md:max-w-full'>
                <h1 className='text-white text-xl p-3'>Beneficiary</h1>
            </div>
              <form action="" >
              <div className='flex gap-4 ml-7 '>
                <div className='pt-5 flex gap-2'>
                         <div>
                             <input name='travelType' 
                             className='outline-none  border p-3 rounded placeholder:text-gray-200 placeholder:text-sm' 
                              type="radio"
                              value={'SG'}
                              checked={genaralData.travelType === "SG"}
                              onClick={handleGeneralData}
                              />
                             </div>
                     <label htmlFor="">Single</label>
                        </div>

                        {
                          planName[0]?.name !== "Schengen" ? (
                        <div className='pt-5 flex gap-2'>
                         <div>
                             <input 
                             name='travelType' 
                             className='outline-none  border p-3 rounded placeholder:text-gray-200 placeholder:text-sm' 
                             type="radio"
                             value="FM"
                             checked={genaralData?.travelType === "FM"}
                             onClick={handleGeneralData}
                             />
                             </div>
                     <label htmlFor="">Family</label>
                        </div>
                          ) : ""
                        }
                </div>
              <div className='grid md:grid-cols-2 p-5'>
              <div className='pt-5'>
                     <label htmlFor="">First Name</label>
                         <div>
                             <input 
                             name='firstName' 
                             className='outline-none h-9  w-72 border p-3 rounded placeholder:text-gray-200 placeholder:text-sm' 
                             placeholder='First Name' 
                             type="text" 
                             value={beneficiary?.firstName}
                             onChange={handleBeneficiaryData}
                             />
                             </div>
                        </div>
                        
                        <div className='pt-5'>
                             <label htmlFor="">Last Name</label>
                              <div>
                                  <input 
                                  name='lastName' 
                                  className='outline-none h-9 w-72 border p-3 rounded placeholder:text-gray-200 placeholder:text-sm' 
                                  placeholder='Last Name' 
                                  type="text"
                                  value={beneficiary?.lastName}
                                  onChange={handleBeneficiaryData}
                                  />
                             </div>
                        </div>
                        <div className='flex gap-3'>
                        <div className='pt-5'>
                             <label htmlFor="">Date of birth </label>
                              <div>
                                  <input
                                  name='dateOfBirth' 
                                  className='outline-none h-9 w-40 border p-3 rounded placeholder:text-gray-200 placeholder:text-sm' 
                                  placeholder='Passport Number'
                                  type="date"
                                  value={beneficiary.dateOfBirth}
                                  onChange={handleBeneficiaryData}
                                  />
                             </div>
                        </div>
                        <div className="pt-5">
                                <div className="">
                                  <label className="label">Gender</label>
                                </div>
                                <div className="">
                                  <select
                                  value={beneficiary.gender}
                                    name="gender"
                                    onChange={handleBeneficiaryData}
                                    className="border outline-none no-spinner rounded h-9 w-20 text-sm text-gray-400"
                                  >
                                    <option hidden>Gender</option>
                                    <option value={"MALE"}>Male</option>
                                    <option value={"FEMALE"}>Female</option>
                                  </select>
                                </div>
                              </div>
                        </div>
                        <div className='pt-5'>
                             <label htmlFor="">Passport Number </label>
                              <div>
                                  <input 
                                  name='passportNumber' 
                                  className='outline-none h-9 w-72 border p-3 rounded placeholder:text-gray-200 placeholder:text-sm' 
                                  placeholder='Passport Number' 
                                  type="text"
                                  value={beneficiary?.passportNumber }
                                  onChange={handleBeneficiaryData}
                                  />
                             </div>
                        </div>
                     </div>
                         {
                          familyBeneficiary === true  ? (
                            <div>
                              {
                                 editBeneficiary === true ? (
                                  <>
                                  {
                                    !editErrorMsg ? (
                                    <div className='flex gap-2 justify-end mr-40 md:mr-0'>
                                      <div>
                                        <button onClick={()=>{
                                          sendEditData()
                                        }
                                        } type='button' className='bg-emerald-400 h-7 w-16 rounded text-white'>Done</button>
                                      </div>
                                      <div>
                                        <button onClick={ ()=> setEditBeneficiary(false) } type='button' className='bg-red-600 h-7 w-20 rounded mr-10 text-white'>Cancel</button>
                                      </div>
                                    </div>
                                    ) : (
                                      <div>
                                        <p className='text-red-500 text-end mr-10'>Please add fields</p>
                                      </div>
                                    )
                                  }
                                    
                                    </>
                                 ) : (
                                  <>{
                                    !error ? (
                                  <div className='pt-2 flex justify-end mr-40 md:mr-0'>
                                    <button onClick={handleAddBeneficiary} type='button' className='bg-yellow-400 h-8 w-40 rounded font-semibold mr-5'>Add Beneficiary</button>
                                  </div>

                                    ) : (
                                      <div className=' '>
                                        <p className='text-red-500 text-end mr-10'>Please add fields</p>
                                      </div>
                                    )
                                  }
                                  </>
                                 )
                              }
                                                          
                              <div className="relative overflow-x-auto shadow-md pt-3 max-w-md md:max-w-full">
                                  <table className="w-full text-sm text-left ">
                                      <thead className="text-[1-px] md:text-xs text-gray-700 uppercase bg-gray-50 ">
                                          <tr>
                                              <th scope="col" className="px-6 py-3">
                                                  First Name
                                              </th>
                                              <th scope="col" className="px-6 py-3">
                                                  Last Name
                                              </th>
                                              <th scope="col" className="px-6 py-3">
                                                  Date Of Birth
                                              </th>
                                              <th scope="col" className="px-6 py-3">
                                                  Passport Number
                                              </th>
                                              <th scope="col" className="px-6 py-3">
                                                  Actions
                                              </th>
                                          </tr>
                                      </thead>
                                      <tbody>
                                          {
                                            beneficiaryData.length ? (
                                              <>
                                                {
                                              beneficiaryData.map((ele, index)=>{
                                                return (
                                                  <tr key={index}>
                                                  <th scope="row" className="px-6 py-4 font-medium text-black">
                                                      {ele?.firstName}
                                                  </th>
                                                  <td className="px-6 py-4">
                                                      {ele?.lastName}
                                                  </td>
                                                  <td className="px-6 py-4">
                                                      {ele?.dateOfBirth}
                                                  </td>
                                                  <td className="px-6 py-4">
                                                      {ele?.passportNumber}
                                                  </td>
                                                  <td className="px-6 py-4">
                                                    <div className='flex gap-3'>
                                                    <div className='text-blue-400'>
                                                      <button onClick={()=> handleEditBeneficiary(index, ele)} className='text-lg' type='button'>
                                                        <AiFillEdit/>
                                                      </button>
                                                      </div>
                                                      <div className='text-red-500'>
                                                        <button onClick={()=>handleDeleteBeneficiary(index)} className='text-lg' type='button'>
                                                          <AiTwotoneDelete/>
                                                        </button>
                                                      </div>
                                                    </div>
                                                  </td>
                                              </tr>
                                                )
                                              })
                                            }
                                         
                                              </>
                                            ):""
                                          }
                                            
                                      </tbody>
                                  </table>
                              </div>

                            </div>

                          ) : ""
                        }
                        <div className='flex '>
                        <div className='pt-5 p-4'>
                          <button onClick={handleClearDatas} type='button' className='border rounded w-16 h-7 hover:bg-black hover:text-white'>Clear</button>
                        </div>
                   
                        <div className='pt-5 p-4'>
                        {
                        !quotationCreateErr ? (
                          <>
                          {
                          !quotaitonLoading ? (
                            <>
                      
                            <button onClick={()=>{
                              handleSetBeneficiaryData()
                            }} type='button' className='border rounded w-16 h-7 hover:bg-black hover:text-white'>Add</button>
                            </>
                          ) : (
                            <button type='button' className='border rounded w-16 h-7 hover:bg-black hover:text-white'><BtnLoader/></button>
                          )
                        }
                          </>
                        ) : (
                          <div>
                            <h1 className='text-red-500'>{quotationCreateErr}</h1>
                          </div>
                        )
                       }
                        </div>
                        </div>
                        </form>
                      </div>
                      </div>
                      <br />
                      <br />
                    </div>
                    <div className='lg:pt-4 mb-20 lg:mb-0 md:ml-44 ml-2 lg:ml-0'>
                      <div className='bg-white h-auto  md:w-[500px] w-[373px] ml-2 md:ml-0 border shadow-md'>
                          <div className=' p-2'>
                            <h1 className='text-center text-lg font-medium '>Quotation</h1>
                          </div>
                          <div className='bg-white border h-auto p-4'>
                            {
                          genaralData.destination && genaralData?.travelFrom && genaralData?.travelTo ? (
                            <div className='bg-white border h-auto  p-4'>
                            <div className='flex justify-between'>
                                  <div>
                                    <h1 className='text-sm'>Destination</h1>
                                  </div>
                                  <div>
                          <h1 className={`${genaralData?.destination === "WIUAJ" ? "text-[11px]" : "text-[13px]"}  uppercase`}>{destinationName ? destinationName[0]?.text : ""}</h1>
                        </div>
                          </div>
                          <div className='flex justify-between'>
                                <div>
                                  <h1 className='text-sm'>Inception Date</h1>
                                </div>
                                <div>
                                <h1 className='text-sm'>{genaralData?.travelFrom}</h1>
                                </div>
                          </div>
                          <div className='flex justify-between'>
                                <div>
                                  <h1 className='text-sm'>Expiry Date</h1>
                                </div>
                                <div>
                                  <h1 className='text-sm'>{genaralData?.travelTo}</h1>
                                </div>
                          </div>
                  <div className='flex justify-between'>
                        <div>
                          <h1 className='text-sm'>Plan</h1>
                        </div>
                        <div>
                          <h1 className='text-sm'>{planName[0]?.name}</h1>
                        </div>
                  </div>
                  <div className='flex justify-between'>
                        <div>
                          <h1 className='text-sm'>Duration</h1>
                        </div>
                        <div>
                          <h1 className='text-sm'>{durationInDays ? durationInDays : ""} days</h1>
                        </div>
                  </div>
                  <div className="relative overflow-x-auto shadow-md pt-3">
                          {
                            showDetails?.length ? (
                              <table className="w-full text-sm text-left ">
                              <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                                  <tr>
                                      <th scope="col" className="px-3 py-1">
                                          First Name
                                      </th>
                                      <th scope="col" className="px-3 py-1">
                                      Cons. / Cumul. Days
                                      </th>
                                      <th scope="col" className="px-3 py-1">
                                      Base Price
                                      </th>
                                      <th scope="col" className="px-3 py-1">
                                      Discount
                                      </th>
                                      <th scope="col" className="px-3 py-1">
                                      Final Price
                                      </th>
                                  </tr>
                              </thead>
                              <tbody>
                              
                                    {
                                      showDetails?.map((ele, index)=>{
                                        return (
                                        <tr key={index}>
                                        <th scope="row" className="px-6 py-4 font-medium text-black">
                                            {ele?.firstName}
                                        </th>
                                        <td className="px-3 py-1">
                                        {Math.round(ele?.consecutiveDays)}
                                        </td>
                                        <td className="px-3 py-1">
                                           {ele?.price} AED
                                        </td>
                                        <td className="px-3 py-1">
                                           {ele?.discount} %
                                        </td>
                                        <td className="px-3 py-1">
                                        {ele?.priceWithDiscount} AED
                                        </td>
                                    </tr>
                                        )
                                      })
                                    }
                                 
                              </tbody>
                          </table>
                            ) : ""
                          }
                                 
                      </div>
                </div>
                ) : ""
              }

              {
                showDetails?.length && showTotalPrice === true  ? (
                  <>
                      <div className='flex justify-between pt-4'>
              <div>
                  <button type='button' className='bg-yellow-400 h-8 w-36 rounded '>Grand Total</button>
              </div>
              <div>
                <button type='button' className='bg-yellow-400 h-8 w-32 text-sm rounded'> { totalQuotationAmount} AED</button>
              </div>
            </div>
            <div className='pt-5'>
              {
                !isIsueLoading ? (

                  <button onClick={()=> handleConfirm()} type='button' className='bg-indigo-500 hover:bg-blue-500 p-2 w-full rounded text-white'>Issue Certificate</button>
                ) : (
                  <button type='button' className='bg-indigo-500 hover:bg-blue-500 p-2 w-full rounded text-white'><BtnLoader/></button>
                )
              }
            </div>
                  </>
                ) : ""
              } 
          
          {
            isModal ? (
         <div>
          {
            !createError ? (
              <div className='pt-5'>
              <div className='bg-gray-50 h-auto w-full p-5'>
             
                {
                  !confirmationSuccess  ? (
                    <>
                       <div>
                  <h1 className='text-center text-lg font-bold'>Confirmation</h1>
                </div>
                    <div className=' pt-6 justify-center bg-emerald-200 p-4'>
                    <div className='text-center'>
                    <p className=''>{totalQuotationAmount} AED is going to be dedected</p>
                    </div>
                    <div className='flex justify-center pt-2'>
                      {
                        !isLoading ? (

                          <button type='button' 
                          onClick={()=>
                            submitHandler()
                          } className='bg-blue-500 rounded h-8 w-32 text-white'>Confirm</button>
                        ) : (
                          <button type='button' 
                           className='bg-blue-500 rounded h-8 w-32 text-white'><BtnLoader/></button>
                        )
                      }
                    </div>
                  </div>
                    </>
                  ) : (
                    <>  
                     {
                       IsSuccessfull? (
                    <div className='flex gap-1 pt-6 justify-center bg-emerald-200 p-4'>
                    <div className='text-green-500 text-4xl'>
                        <AiFillCheckCircle/>
                    </div>
                    <div className=''>
                    <p className='pt-1 text-lg'>Successfully created</p>
                    </div>
                  
                  </div>
                       ) : ""
                    }
                  </>

                  )
                }
              {
                confirmationSuccess && beneficiaryData?.length ? (
                  <div>
                      <div className='flex justify-end gap-2 pt-2'>
                        <div className='flex gap-2'>
                          <button type='button' onClick={()=> navigate("/hotel/order")} className='h-8 w-32 bg-blue-400 text-white rounded'> View Orders</button>
                        </div>
                        <div className='relative'>
                          <div className='absolute top-2 left-1 text-white text-lg cursor-pointer'>
                          <AiOutlineDownload/> 
                          </div>
                          <button onClick={handlePDF} className='h-8 w-32 bg-green-500 text-white rounded'>Download</button>
                        </div>
                      </div>
                  </div>
                ) : ""
              }
              </div>
            </div>
            ) : (
              <div className='pt-4'>
                  <div className='bg-gray-50 h-auto w-full p-5 '>
                      <div className='bg-red-200 h-20 p-5 font-bold text-lg '>
                        <div className='flex gap-2 justify-center'>
                        <div>
                          <h1>Try again</h1> 
                        </div>
                        <div className='text-3xl font-bold text-red-500'>
                        <VscError/>
                        </div>
                        </div>

                      <div>
                        <p className='text-red-500 text-center text-sm'>{createErrorMsg}</p>
                      </div>
                      </div>
                  </div>
              </div>
            )
          }
           
              </div>
           
            ) : ""
          }
         
            </div>
        </div> 

        {/* <div>
          {
            createModal ? (
              <div>
                <InsuranceConformModal setCreateModal={setCreateModal} orderId={orderId} />
              </div>
            ) : ""
          }
        </div> */}
      </div>
    </div>
  )
}

export default InsuranceHomepage
