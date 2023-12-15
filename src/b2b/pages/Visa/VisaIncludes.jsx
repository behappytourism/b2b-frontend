import React from 'react'
import { BsFileRichtext } from 'react-icons/bs'
import { useSelector } from 'react-redux'

function VisaIncludes() {
    const { visa } = useSelector(state => state.visa)
  return (
    <div className='my-7 '>
    <div className='text-xl font-[800] text-gray-400 mx-4 lg:mx-0'>{visa?.visa?.name} Prices Includes</div>
    <div className=' text-text mx-4 lg:mx-0'>
        <ul className='space-y-5 py-3 list-disc list-inside'>
            {visa?.visa?.inclusions?.map((item,index) => (
            <li key={index} className='text-gray-400' >{item}</li>
            ))}
        </ul>
    </div>
</div>
  )
}

export default VisaIncludes