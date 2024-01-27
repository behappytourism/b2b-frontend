import React, {useState} from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { config } from '../../../constants';

function ImagePreviewModal({setModal, modal, preview}) {

    const [showImg, setShowImg] = useState(preview?.length ? preview[0] : "")
    
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 z-30 modal_overlay" onClick={() => setModal(!modal)}>
    <div className={`absolute right-20  top-16 flex justify-center items-center bg-trans text-darktext h-16 w-16 rounded-full text-4xl`}
        onClick={() => setModal(!modal)}
    >
        <AiOutlineClose />
    </div>

    <div className="flex justify-center items-center w-full h-[100vh] z-50">
        <div className="h-[80vh] w-8/12 bg-[#fcfeff]  rounded-2xl overflow-hidden relative" onClick={(e) => e.stopPropagation()}>
            <img src={config.SERVER_URL + showImg} alt='preview' className='object-cover bg-no-repeat w-full h-full' />
            <div  className='absolute bottom-0 left-5 p-2 shadow-xl flex gap-2'>
            {
                preview?.map((ele, index)=>{
                    return (
                                <img 
                                key={index}
                                className='w-36 h-36 object-cover rounded'
                                onClick={()=>{
                                    setShowImg(ele)
                                }}
                                src={config.SERVER_URL + ele} alt="" />
                                )
                            })
                        }
                        </div>
        </div>
    </div >
 
</div>
  )
}

export default ImagePreviewModal