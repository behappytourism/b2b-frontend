import React, {useState} from 'react'
import { FaCarSide } from "react-icons/fa";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { MdOutlineAttractions } from "react-icons/md";

function AttractionCartDetails({ele}) {

    const [showAttraction, setShowAttraction] = useState(false)



  return (
    <div className=''>
     
                <div >
                    <div key={ele?._id} className={`bg-white w-full h-full ${showAttraction ? "rounded-t-lg" : "rounded-lg"} shadow-sm cursor-pointer `} onClick={()=> setShowAttraction(!showAttraction)}>
                        <div className='flex justify-between items-center p-4' >
                            <div className='flex gap-2'>
                                <h1 className='text-orange-500 text-2xl'><MdOutlineAttractions /></h1>
                                <h1 className='font-semibold'>{ele?.name}</h1>
                            </div>
                            <div>
                                {
                                    showAttraction ? (
                                        <h1 className='text-xl'><IoIosArrowUp /></h1>
                                    ) : (
                                        <h1 className='text-xl'><IoIosArrowDown /></h1>
                                    )
                                }
                            </div>
                        </div>
                            {
                                showAttraction && (
                                <div className='pt-2 '>
                                    <div className='rounded-b-lg shadow-sm bg-white h-10 w-full transition-all duration-1000 '>

                                    </div>
                                </div>
                                )
                            }
                    </div>
                </div>

</div>
  )
}

export default AttractionCartDetails
