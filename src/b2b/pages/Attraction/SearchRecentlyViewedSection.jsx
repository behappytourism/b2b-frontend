import React, { useEffect, useState } from 'react'
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'
import { Link } from 'react-router-dom';
import { config } from '../../../constants';

function SearchRecentlyViewedSection() {

  const [data, setData] = useState([])

  useEffect(() => {
    let array = JSON.parse(localStorage.getItem('recent')) || [];
    setData(array)
  }, [])
  return (
    <>
      {data.length > 0 && (
        <div className='py-10 mx-2'>
          <div className='space-y-2 lg:mx-0'>
            <div className='flex justify-between'>
              <div className='text-3xl font-semibold text-darktext mb-4 cursor-default'>Recently Viewed</div>
              {data.length > 3 && (
                <div className='hidden  lg:flex space-x-5'>
                  <button className='hover:bg-main rounded-full w-12 h-12 flex justify-center items-center hover:text-light text-xl bg-soft text-main duration-500' onClick={() => {
                    document.querySelector('.containerRV').scrollLeft -= 220
                  }}><AiOutlineLeft /></button>
                  <button className='hover:bg-main rounded-full w-12 h-12 flex justify-center items-center hover:text-light text-xl bg-soft text-main durRVion-500' onClick={() => {
                    document.querySelector('.containerRV').scrollLeft += 220
                  }}><AiOutlineRight /> </button>
                </div>
              )}
            </div>
          </div>
          <div className='py-7'>
            <div className='containerRV scroll-smooth snap-x flex gap-5 overflow-x-auto scrollbar-hide'>
              {data?.map((item, index) => (
                <div key={index} className=' snap-start'>
                  <Link to={`/attractions/details/${item._id}`}>
                    <div className='w-[24.8em] lg:w-[24.5em] space-y-4 snap-start'>
                      <div className=''>
                        <img src={config.SERVER_URL + item?.image} alt='demo'
                          className='object-cover  h-[15em] lg:[14em] w-full rounded-2xl' />
                      </div>
                      <div className='text-center space-y-3'>
                        <h3 className='text-lg text-text'>{item.title}</h3>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default SearchRecentlyViewedSection