import React from 'react'
import { RiShareForward2Fill } from 'react-icons/ri'
import { IoLocationOutline } from 'react-icons/io5'
import { useSelector } from 'react-redux'

function MapSection() {
    const { agentExcursion } = useSelector(state => state.agentExcursions)
    return (
        <>
            <a href={agentExcursion?.mapLink} target="_blank" rel="noopener noreferrer">
                    <div className=' text-xl text-darktext font-bold tracking-wider'>
                        Destination
                    </div>
                <div className='space-y-2 cursor-pointer h-24 lg:h-52 flex justify-center items-center '>
                    <div className='flex'>
                        <div className='text-green-600 text-2xl'><IoLocationOutline /> </div>
                        <div className=''>
                            <div className='flex space-x-2 text-green-600 font-medium tracking-wide '>
                                <span className=''>{agentExcursion?.title}</span>
                                <span className=''><RiShareForward2Fill /> </span>
                            </div>
                        <div className='text-darktext text-xs'>(view on Google Map)</div>
                        </div>
                    </div>
                </div>
            </a>
        </>
    )
}

export default MapSection