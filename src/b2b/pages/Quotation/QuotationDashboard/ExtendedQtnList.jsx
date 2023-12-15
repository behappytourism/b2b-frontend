import React from 'react'
import { ImLocation2 } from "react-icons/im";
import { useNavigate } from 'react-router-dom';



function ExtendedQtnList({data}) {
  
  const navigate = useNavigate()
 
  const handleSendNumber = (quotationNumber) =>{
    navigate("/quotation/view", {state: quotationNumber})
  }

  return (
    <>
    {data?.amentMents?.quotations?.map((ele, index)=>{
        return(
          <div className="sm:flex gap-2 w-full  border-b p-1 cursor-pointer" 
          onClick={()=>handleSendNumber(ele?.quotationNumber)} 
          > 
           <div className="w-full sm:w-[300px] lg:w-[450px] h-[95px] ">
             <img
               src="https://www.fivestaralliance.com/files/fivestaralliance.com/field/image/nodes/2009/10498/10498_0_jumeirahbeachhotel_fsa-g.jpg"
               alt="img"
               className="w-48 h-20 object-cover"
               
             />
           </div>
           <div className="flex justify-between w-full">
             <div className="left__section text-darktext space-y-2 ml-3">
               <div className="flex flex-wrap items-center gap-1">
                 <h3 className="text-[16px] font-[650] text-[#495057]">
                   {""} Quotation Number : {ele?.quotationNumber}
                 </h3>
               </div>
            
               <div className="space-y-2">
                 <p className="text-xs font-[700] text-darktext">
                 Creation Date &nbsp;&nbsp; : &nbsp; {ele?.createdAt.slice(0, 10)}
                 </p>
               </div>
         
             </div>
             <div>
                 <p className='text-[13px]'>
                     Amendments : {ele?.totalAmendments}
                 </p>
             </div>
            
           </div>
         </div>
        )
    })}
    </>
   
  )
}

export default ExtendedQtnList
