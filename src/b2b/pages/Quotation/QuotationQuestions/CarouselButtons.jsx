import React from 'react'

function CarouselButtons({next, previous}) {
  return (
    <div className="my-custom-button-group ">
    <button className='absolute lg:top-[600px] lg:left-40 top-[450px] font-semibold text-white text-[25px] bg-gray-200 h-10 w-10 rounded-full' onClick={() => previous()}>&lt;</button>
    <button className='absolute lg:top-[600px] lg:right-40 top-[450px] right-0  font-semibold text-white text-[25px] bg-gray-200 h-10 w-10 rounded-full' onClick={() => next()}>&gt;</button>
  </div>
  )
}

export default CarouselButtons
