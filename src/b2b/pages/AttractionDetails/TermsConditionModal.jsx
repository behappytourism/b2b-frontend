import React from 'react'
import { AiOutlineClose } from 'react-icons/ai'


function TermsConditionModal({setTermsModals, termsModals, data, headings}) {
   
    return (
       <div className='fixed  flex justify-center items-center backdrop-blur-sm top-10 md:top-0 md:bottom-0 md:top-0 md:left-0 right-1 md:right-0 z-50 w-full md:p-4 md:overflow-x-hidden overflow-y-auto'>
        <div className='relative shadow-lg max-w-1xl bg-white  max-h-full h-screen md:h-96 w-screen md:w-[700px] rounded'>
            <div className='lg:relative lg:rounded-lg  dark:bg-white p-5 h-[850px] md:h-auto  transition-all duration-300'>
            <div className="flex items-start justify-between p-4  rounded-t">
                        <button onClick={()=>setTermsModals(!termsModals)} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-300 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-300 dark:hover:text-white" data-modal-hide="defaultModal">
                            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                        </button>
                    </div>
                    <div>
                        <h1 className='text-2xl font-bold'>{headings}</h1>
                    </div>
                    <div className='pt-4'>
                        <div dangerouslySetInnerHTML={{ __html: data }}>

                        </div>
                    </div>
            </div>
        </div>
       </div>
      
    )
}

export default TermsConditionModal