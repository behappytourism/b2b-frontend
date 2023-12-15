import React from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import SearchCards from '../Cards/SearchCards'

function SearchCardModal({setSearchModal, searchModal}) {
  return (
    <div className={`fixed ${searchModal ? "bottom-0" : "-bottom-full "} bg-light rounded-t-3xl max-h-[85vh] overflow-y-auto w-full z-30 transition-all duration-500`}>
      <div className='py-10 p-7 space-y-5'>
        <div className=' flex justify-between items-center border-b border-dashed pb-3'>
          <div className=''>
            <h2 className='text-3xl text-darktext font-bold'>Search</h2>
          </div>
          <div className=' text-3xl' onClick={() => setSearchModal(false)}><AiOutlineClose /></div>
        </div>
        <SearchCards />
      </div>
    </div>
  )
}

export default SearchCardModal