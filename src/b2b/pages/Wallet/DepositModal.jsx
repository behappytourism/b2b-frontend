import React, {useEffect, useState} from 'react'
import { BtnLoader } from '../../components'
import { GrClose } from "react-icons/gr";
import axios from "../../../axios";
import { useSelector } from 'react-redux';

function DepositModal({setIsModal}) {

    const [isLoading, setIsLoading] = useState(false)
    const [accNO, setAccNo] = useState('')
    const [ibanCode, setIbanCode] = useState('')
    const [ifscCode, setIfscCode] = useState('')
    
    const { token } = useSelector((state) => state.agents);
    const[bankDetails, setBankDetails] = useState([])
    const [data, setData] = useState({
        referenceNumber:"",
        amount:"",
        companyBankId:"",
        receipt:[]
    })

    const fetchBankDetails = async ()=>{
        try {
            const res = await axios.get(`/b2b/company/bank-info/all`, {
                headers:{Authorization: `Bearer ${token}`}
            })
            setBankDetails(res?.data)
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    }

    

    const handleChange = (e)=>{
        const {name, value} = e.target

   const bank = bankDetails.filter((elem)=>{
            if(elem._id==value) return elem
        })
  
        setIfscCode(bank[0].ifscCode)
        setIbanCode(bank[0].ibanCode)
    setAccNo(bank[0].accountNumber)


        setData(({
            ...data, 
            [name]: value,
        }))
    }  

  




    const handleRecieptChange = (e)=>{
        const file = e.target.files[0]
        setData(({
            ...data,
            receipt: file
        }))
    }
    

    const formData = new FormData()
    formData.append("referenceNumber", data.referenceNumber);
    formData.append("amount", data.amount);
    formData.append("companyBankId", data.companyBankId);
    formData.append("receipt", data.receipt)

    const submitHandler = async (e)=>{
        try {
            e.preventDefault();
            setIsLoading(true)
            const res = await axios.post(`/b2b/wallets/deposit-requests/add`, formData, {
                headers:{ Authorization: `Bearer ${token}`}
            })
            console.log(res.data);
            setIsLoading(false)
            setIsModal(false)
        } catch (error) {
            setIsLoading(false)
            console.log(error);
        }
    }

    useEffect(()=>{
        fetchBankDetails()
    }, [])

  return (
      
    

    <div className="z-50 fixed top-0 left-0 right-0 bottom-0 flex items-center w-full h-full p-4 lightglass overflow-y-auto ">
    <div className="max-w-xl w-full mx-auto bg-white rounded-xl overflow-hidden">
  
        <div className='p-4 flex justify-center w-full relative'>
        <div className='absolute  right-1  top-1'>
            <div className=' bg-gray-300 rounded-full'>
                <button className='text-xl p-3' onClick={()=> setIsModal(false)}><GrClose/></button>
            </div>
        </div>
            <h1 className='text-lg font-bold'>Deposit Request</h1>
        </div>
    <div className='p-5 bg-white'>
        <form onSubmit={submitHandler}>
            <div className="relative  w-full h-14 py-3 px-3 mb-6 border border-BEColor focus-within:border-green-500 rounded-lg">
                <span className="absolute bottom-full left-0 ml-3 -mb-1 transform translate-y-0.5 text-xs font-semibold text-gray-50 px-1 bg-BEColor">
                    Reference Number
                </span>
                <input
                    className="block w-full h-full outline-none bg-transparent text-sm text-gray-600 font-medium"
                    id="modalInput9-4"
                    type="text"
                    name="referenceNumber"
                    // value={data.accountNumber}
                    onChange={handleChange}
                    required
                />
                </div>
                <div className="relative w-full h-14 py-2 px-3 mb-6 border border-BEColor focus-within:border-green-500 rounded-lg">
                <span className="absolute bottom-full left-0 ml-3 -mb-1 transform translate-y-0.5 text-xs font-semibold text-gray-50 px-1 bg-BEColor">
                   Amount
                </span>
                <input
                    className="block w-full h-full outline-none bg-transparent text-sm text-gray-600 font-medium"
                    id="modalInput9-4"
                    type="text"
                    name="amount"
                    // value={data.bankName}
                    onChange={handleChange}
                    required
                />
                </div>

                <div className={`${accNO?'mb-12 sm:mb-8':'mb-6'} relative w-full h-14 py-2 px-3  border border-BEColor focus-within:border-green-500 rounded-lg`}>
                <span className={`absolute bottom-full left-0 ml-3 -mb-1 transform translate-y-0.5 text-xs font-semibold text-gray-50 px-1 bg-BEColor`}>
                    Company Bank
                </span>
             
                <select name="companyBankId" onChange={handleChange} id="" className='block w-full h-full outline-none bg-transparent text-sm text-gray-600 font-medium  '>
                    {
                        bankDetails?.map((ele, index)=>(
                            <>
                            
                            <option value=""hidden  ></option>
                            <option  key={index} value={ele?._id}>
                                    {ele?.bankName}{" , "}{ele?.branchAddress}
                            </option>
                            </>
                        ))
                    }
                </select>
               {accNO&& <div className='mt-2 mb-2 text-[12px] '>
              <span className='mr-3'>Acc No:{accNO}</span>   {ifscCode&&<span className=''>IfscCode:{ifscCode}</span>}{ibanCode&&<span className=''>IbanCode:{ibanCode}</span>}
                </div>}
                </div>
                   
                <div className="relative w-full h-14 py-2 px-4  mb-6 border-b border-b-BEColor focus-within:border-green-500  rounded-lg ">
                <span className=" absolute bottom-full left-0 ml-3 -mb-1 transform translate-y-0.5 text-xs font-semibold text-gray-50 px-1 bg-BEColor">
                   Reciept
                </span>

                

                <input
                    className="block w-full h-full outline-none bg-transparent text-sm text-gray-600 font-medium pt-3"
                    id="modalInput9-4"
                    type="file"
                    name="receipt"
                    // value={data.branchName}
                    onChange={handleRecieptChange}
                
                />
                </div>
            <div className='flex justify-center'>
                {
                    !isLoading ? ( 
                        <button className='w-32 h-8  rounded text-white  bg-BEColor hover-bg-BEColor'>Submit</button>

                    ) : (
                        <button className='w-32 h-8  rounded text-white bg-BEColor hover-bg-BEColor '><BtnLoader/></button>
                    )
                }
            </div>
        </form>
    </div>

       
    </div>
  </div>
   
  )
}

export default DepositModal
