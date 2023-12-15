import React from 'react'
import Lottie from 'lottie-react'
import successAnimations from './animation_success.json'


function OrderSuccessPage() {
  return (
     <div className='flex justify-center p-10'>
        <div>
           
            <div className='bg-BEColor w-full h-16 p-2'>
            <div className='mb-3 '>
                <h1 className='text-center text-3xl font-bold text-white '>You have Ordered Successfully!</h1>
            </div>
            </div>
            <div className='flex justify-between bg-white   shadow-lg w-[900px] h-[400px] p-10'>
                <div>
                    hihiuy
                </div>
                <div>
                    <Lottie animationData={successAnimations} />
                </div>
            </div>

        </div>
     </div>
  )
}

export default OrderSuccessPage
