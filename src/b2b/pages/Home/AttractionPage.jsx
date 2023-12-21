import React, {useEffect} from "react";
import SearchCards from "../../components/Cards/SearchCards";
import TopDestination from "../TopDestination";
import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";
import Aos from 'aos'
import 'aos/dist/aos.css'
import AttractionCard from "../../components/Cards/AttractionCard";

function AttractionPage() {

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const data = [
    {
      image:"https://mybayutcdn.bayut.com/mybayut/wp-content/uploads/Cover-6-2.jpg"
    },
    {
      image:"https://assets-global.website-files.com/5f46c318c843828732a6f8e2/651e65e2ebed7ab2f4aac8cc_Digital-Signage-Companies-in-Dubai.webp"
    },
    {
      image:"https://media.cntraveler.com/photos/5a84e860b8ebbd42565cf871/2:1/w_2560%2Cc_limit/Dubai_GettyImages-143769640.jpg"
    },
   
  ]

  useEffect(()=>{
    Aos.init({duration: 2000})
  })

  return (
    <div className="">
  
      {/* <SearchCards /> */}
      <div className="grid md:grid-cols-1 relative">
        <Carousel 
        responsive={responsive}
        infinite={true}
        autoPlay={true}
        duration={9000}
        >
          {
            data.map((ele)=>(
            <div className="w-full h-96">
                  <img className="w-full h-full object-fill" src={ele?.image} alt="" />
              </div>
            ))
          }
            </Carousel>
      <div className="absolute left-0 right-0 top-52 bottom-0">
        <AttractionCard/>
      </div>
      </div>
      <div className="px-5 pt-7 mt-5 max-w-screen-xl mx-auto" data-aos = "fade-up">
        <TopDestination />
      </div>
    </div>
  );
}

export default AttractionPage;
