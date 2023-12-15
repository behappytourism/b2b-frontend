import React from 'react'
import ReactPlayer from "react-player";
import VideoUrl from '../../../../static/B2BAnimations/Insta Quote.mp4'

function B2BFrontVideo() {
  return (
    <div className=''>
     <ReactPlayer
                  width={"100%"}
                  height={"700px"}
                  muted
                  playing
                  loop
                  url={VideoUrl}
                />
    </div>
  )
}


export default B2BFrontVideo
