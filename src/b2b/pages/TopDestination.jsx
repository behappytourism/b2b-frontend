import React, {useEffect} from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { config } from "../../constants";
import Aos from 'aos'
import 'aos/dist/aos.css'


function TopDestination({sections}) {
   const navigate = useNavigate();
   const { destinations } = useSelector((state) => state.home);
   useEffect(()=>{
      Aos.init({duration: 2000})
    })


   return (
      // <div className="mx-3" >
      //    <div    data-aos = 'fade-up' className="text-xl md:text-3xl font-bold text-darktext mb-4 " >
      //       Top Destinations
      //    </div>
         
      //    <div className="grid grid-cols-2 md:grid-cols-2 gap-2 ">
      //       {sections?.map((item, index) => (
      //          <div
      //             className="mt-2 relative cursor-pointer "
      //             key={index}
      //             onClick={() => navigate(`/attractions/${item?.name}`)}
      //          >
      //             <div className="overflow-hidden rounded ">
      //                <img
      //                   className="hover:scale-110 object-cover rounded-lg h-[20em] md:h-[25em] w-full transition-all duration-500 cursor-pointer"
                    
      //                   src={config.SERVER_URL + item?.image}
      //                   alt={item?.name}
      //                />
      //             </div>
      //             <div className="absolute top-0 bottom-0 right-0 left-0 rounded-lg hover:bg-black/40 w-full text-light transition-all duration-500 ">
      //                <div    className="font-bold text-4xl text-center pt-44">
      //                   {item?.name}{" "}
      //                </div>
      //             </div>
      //          </div>
      //       ))}
      //    </div>
      // </div>

      <div className="max-3">
         <div className="">
            {
               sections?.map((ele)=>{
                  return (
                     <div>
                        <div className="">
                           <h1 className="font-bold pt-10 text-3xl mb-2">{ele?.title}</h1>
                        </div>
                        <div className="grid md:grid-cols-2 gap-3">
                        {
                           ele?.banners?.map((item, index)=>{
                              return (
                                     <div
                                          className="mt-2 relative cursor-pointer "
                                          key={index}

                                       >
                                          <a href={item?.link}>
                                             <div className="overflow-hidden rounded ">
                                                <img
                                                   className="hover:scale-110 object-cover rounded-lg h-[20em] md:h-[25em] w-full transition-all duration-500 cursor-pointer"
                                             
                                                   src={config.SERVER_URL + item?.image}
                                                   alt={item?.title}
                                                />
                                             </div>
                                             <div className="absolute top-0 bottom-0 right-0 left-0 rounded-lg bg-black/30 w-full text-light transition-all duration-500 ">
                                                <div    className="font-bold text-4xl text-center pt-44">
                                                   {item?.title}{" "}
                                                </div>
                                                <div>
                                                   <h1 className="font-light text-lg text-center pt-1 w-md">{item?.description}</h1>
                                                </div>
                                             </div>

                                          </a>
                                       </div>
                              )
                           })
                        }
                        </div>
                     </div>
                  )
               })
            }
         </div>
      </div>
   );
}

export default TopDestination;
