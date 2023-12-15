import React from 'react'
import { useSelector } from 'react-redux'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { config } from '../../../constants';

function CarousalMobile() {
  const { agentExcursion } = useSelector(state => state.agentExcursions)
  return (
    <div className=' overflow-hidden h-[25vh] sm:[35vh] md:h-[40vh]  relative bg-cover lg:hidden bg-light rounded-2xl my-2'>
      <p className='absolute z-10 mt-5 ml-5 text-xl text-darktext font-bold tracking-wider'>
        Images
      </p>
      <Carousel
        infiniteLoop
        autoPlay
        showThumbs={false}
        interval={9000}
        showArrows={false}
        stopOnHover={false}
        swipeable={true}
        showIndicators={false}
        showStatus={false}
      >
        {agentExcursion?.images?.map((item, index) => (
          <div className='bg-inherit h-full relative' key={index}>
            <img src={config.SERVER_URL + item} alt='images' className='bg-cover h-full ' />
          </div>
        ))}

      </Carousel>
    </div>
  )
}

export default CarousalMobile