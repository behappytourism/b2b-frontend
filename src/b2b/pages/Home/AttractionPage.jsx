import React, { useEffect, useState } from "react";
import SearchCards from "../../components/Cards/SearchCards";
import TopDestination from "../TopDestination";
import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";
import Aos from 'aos'
import 'aos/dist/aos.css'
import AttractionCard from "../../components/Cards/AttractionCard";
import axios from '../../../axios'
import { useSelector } from "react-redux";
import { config } from "../../../constants";

function AttractionPage() {

  const { token } = useSelector((state)=> state.agents)
  const [banners, setBanners] = useState([])
  const [sections, setSections] = useState([])

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

  

  useEffect(()=>{
    Aos.init({duration: 2000})
  })

  const fetchHomeBanners = async ()=> {
    try {
      const res = await axios.get(`/b2b/home/banners`, {
        headers: { Authorization: `Bearer ${token}`}
      })
      setBanners(res.data)
    } catch (error) {
      console.log(error);
    }
  }

  const fetchSections = async ()=>{
    try {
      const res = await axios.get(`/b2b/home/sections`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setSections(res?.data)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    fetchHomeBanners()
    fetchSections()
  }, [])

  return (
    <div className="">
  
      {/* <SearchCards /> */}
      <div className="grid md:grid-cols-1 ">
        <Carousel 
        responsive={responsive}
        infinite={true}
        autoPlay={true}
        duration={9000}
        >
          {
            banners.map((ele)=>(
            <div className="w-full h-96 relative">
                  <img className="w-full h-full object-fill" src={config.SERVER_URL + ele?.image} alt="" />
                  <div className="absolute top-36 bottom-0 right-0 left-40 ">
                    <div className="bg-black/40 rounded w-[550px] p-3">
                      <h1 className="font-bold text-white text-5xl">{ele?.title}</h1>
                      <h1 className="text-white text-lg font-semibold max-w-3xl pt-2">{ele?.body}</h1>
                      <div className='pt-1'>
                            {
                                ele?.isButton === true && (
                                    <a href={ele?.buttonUrl}>
                                       <button className='bg-white h-10 rounded-full w-32 font-bold '>{ele?.buttonText}</button>
                                   </a>
                                )
                            }
                      </div>

                    </div>
                  </div>
              </div>
            ))
          }
            </Carousel>
      </div>
      <div className="px-5 pt-7 mt-5 max-w-screen-xl mx-auto" data-aos = "fade-up">
        <TopDestination sections={sections} />
      </div>
    </div>
  );
}

export default AttractionPage;
