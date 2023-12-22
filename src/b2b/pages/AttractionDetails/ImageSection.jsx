import React, { useState } from 'react'
import ReactPlayer from 'react-player'
import { useSelector } from 'react-redux'
import ImagePreviewModal from './ImagePreviewModal'
import { config } from '../../../constants'


function ImageSection() {
    const [modal, setModal] = useState(false)
    const [preview, setPreview] = useState('')
    const { agentExcursion } = useSelector(state => state.agentExcursions)

    return (
        <>
            <div className=' lg:py-5'>
                {/* <div className='lg:mx-auto lg:max-w-screen-2xl'>
                    <div className='lg:grid lg:grid-cols-12 gap-1'>
                     
                        <div className='col-span-9 '>
                            <div className='w-full lg:h-full h-72  md:h-96 md:rounded-xl overflow-hidden'>
                                <ReactPlayer width={'100%'} height={'100%'} muted playing loop url={`${agentExcursion?.youtubeLink}?modestbranding=1`} />
                              
                            </div>
                        </div>
                        <div className='col-span-3 space-y-3 px-2 overflow-y-auto'>
                            <div className='hidden lg:block overflow-y-auto h-[33em] space-y-2'>
                                {agentExcursion?.images?.map((item) => (
                                    <div className='h-[22.4vh]' key={item}>
                                        <img src={config.SERVER_URL + item} alt='img'
                                            className='rounded-xl object-cover w-full h-full  hidden lg:block'
                                            onClick={() => {
                                                setModal(!modal)
                                                setPreview(config.SERVER_URL + item)
                                            }} />
                                    </div>
                                ))}
                            </div>

                        </div>
                    </div>
                </div> */}

                <div className='w-full h-[600px]'>
                    <img className='w-full h-full object-cover rounded-xl' src={config.SERVER_URL + agentExcursion?.images[0]} alt="" />
                </div>
                <div className='flex gap-3'>
                    {
                        agentExcursion?.images?.map((item)=>(
                            <div className='h-40 w-40 pt-2' key={item}>
                            <img src={config.SERVER_URL + item} alt='img'
                                className=' object-cover w-full rounded-xl h-full  hidden lg:block'
                                onClick={() => {
                                    setModal(!modal)
                                    setPreview(config.SERVER_URL + item)
                                }} />
                        </div>
                        ))
                    }
                </div>
            </div>
            {modal && (
                <ImagePreviewModal setModal={setModal} modal={modal} preview={preview} />
            )}
        </>
    )
}

export default ImageSection