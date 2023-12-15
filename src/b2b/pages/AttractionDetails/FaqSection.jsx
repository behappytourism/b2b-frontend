import React from 'react'
import { useSelector } from 'react-redux'

function FaqSection() {
    const { agentExcursion } = useSelector(state => state.agentExcursions)

    if (agentExcursion?.faqs && agentExcursion?.faqs.length <= 0) return null
    return (
        <div>
            <div className='py-5'>
                <div className=' my-2 text-xl text-darktext font-bold tracking-wider px-5'>{agentExcursion?.title} FAQs</div>
                <div className='bg-light text-darktext font-light cursor-pointer rounded-2xl'>
                    {agentExcursion?.faqs?.map((item, index) => (
                        <div className='p-5 relative border-b' key={index}>
                            <input type='checkbox' className='peer absolute top-0 inset-x-0 w-full h-10 opacity-0  cursor-pointer' />
                            <div className='flex items-center space-x-3 '>
                                <span className=''>+</span>
                                <span className='text-darktext'>{item?.question}</span>
                            </div>
                            <div className={`text-gray-500  overflow-hidden  max-h-0 peer-checked:max-h-[100vh] transition-all duration-700 `}>
                                <div className='p-4'>
                                    <p className='leading-loose'>
                                        {item?.answer}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default FaqSection