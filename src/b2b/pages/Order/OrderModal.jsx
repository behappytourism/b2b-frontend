import React from 'react'
import { BsPersonFill } from 'react-icons/bs'
import { IoPeopleSharp } from 'react-icons/io5'

function OrderModal() {
  return (
    <div className=' absolute bg-gray-200 w-[250px] right-0 text-darktext rounded-sm py-3 cursor-pointer z-10'>
      <div className='flex space-x-2 items-center hover:bg-gray-200 py-1 px-2 '>
        <span className=''><BsPersonFill /> </span>
        <span className='font-[500] uppercase'>My Orders</span>
      </div>
      <div className='flex items-center space-x-2 hover:bg-gray-200 py-1 px-2 '>
        <span className=''><IoPeopleSharp /> </span>
        <span className='font-[500] uppercase'>Sub-Agent Orders</span>
      </div>

    </div>
  )
}

export default OrderModal