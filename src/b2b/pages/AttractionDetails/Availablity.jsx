import React, { useEffect } from 'react'
import { BsDoorClosedFill, BsDoorOpenFill } from 'react-icons/bs'
import { MdOutlineMoreTime} from 'react-icons/md'
import { RxCountdownTimer } from 'react-icons/rx'
import { useSelector } from 'react-redux'
// import hours from '../../static/images/hours.png'

function Availablity() {
  const { agentExcursion } = useSelector(state => state.agentExcursions)

  const avail = agentExcursion?.availability && agentExcursion?.availability?.filter(item => item?.isEnabled === true)


  return (
    <main className=' '>
      <div className='font-semibold text-xl tracking-wide'>
        Availability
      </div>
      <div className=''>
        <div className='col-span-10 space-y-3 py-3 text-darktext'>
          <div className=' '>
            <span className=''>
              <div className='grid sm:grid-cols-3 md:grid-cols-4 grid-cols-2 gap-4'>
                {agentExcursion?.availability?.map((item, index) => (
                  <div className=' border rounded lg:w-full h-[100px] ' key={index}>
                    <div className='py-1 '>
                      <p className='text-center font-bold uppercase ' >{item?.day}</p>
                    </div>
                    <div className='mt-2'>
                      <div className=''>
                        <div className='flex space-x-1 justify-center'>
                          <span className='text-2xl text-gray-300 '><MdOutlineMoreTime />  </span>
                          <span className=''>{item?.open} </span>
                        </div>
                        <div className='flex space-x-1 justify-center'>
                          <span className='text-xl text-gray-300'><RxCountdownTimer /> </span>
                          <span className=''>{item?.close} </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </span>
          </div>
          {/* <div className='flex space-x-2'>
            <span className=''>Off dates : </span>
            <span className=''>
              {excursion?.offDates &&
                excursion?.offDates?.length > 0 ?
                excursion?.offDates?.map((item, index) => (
                  <p className='bg-[#E6e6e6] text-center rounded w-[100px] uppercase' key={index}>{item?.fromDate + " - " + item?.toDate}</p>
                ))
                : (
                  <div className='bg-lighttrans'>No Off Dates</div>
                )}
            </span>

          </div> */}
        </div>
      </div>
    </main>
  )
}

export default Availablity

