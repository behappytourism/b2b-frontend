import React, { useState } from 'react'
import { BsFileRichtext } from 'react-icons/bs'
import { useSelector } from 'react-redux'
import DocumentSampleCopy from '../../components/Visa/DocumentSampleCopy'

function VisaDocumentSection() {
    const [sampleView, setSampleView] = useState(false)
    const { visa } = useSelector(state => state.visa)
  return (
    <div className=' '>
        <div className='text-xl font-[800] text-gray-400 mx-4 lg:mx-0'>Documents required for Dubai Visa</div>
        <div className=' text-text mx-4 lg:mx-0'>
            <ul className='space-y-5 py-3 list-disc list-inside'>
                {visa?.visa?.details?.map((item,index) => (
                <li key={index} className='text-gray-400' >{item?.body}</li>
                ))}
            </ul>
        </div>
        <div className='bg-lightblue hover:bg-blue-700 md:rounded-lg shadow-mn text-soft mt-5 cursor-pointer'
        onClick={() => setSampleView(true)}
        >
            <div className='flex p-7 gap-7 items-center'>
                <span className='text-5xl'><BsFileRichtext /></span>
                <span className='text-xl sm:text-2xl'>
                    <div className='font-[700]'>View Sample Visa Copy</div>
                    <div className='text-base sm:text-lg font-light'>For the better understanding click here!!</div>
                </span>
            </div>
        </div>
        {sampleView && (
            <DocumentSampleCopy setSampleView={setSampleView} />
        )}
    </div>
  )
}

export default VisaDocumentSection