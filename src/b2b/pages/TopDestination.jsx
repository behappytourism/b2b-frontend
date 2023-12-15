import React, {useEffect} from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { config } from "../../constants";
import Aos from 'aos'
import 'aos/dist/aos.css'



function TopDestination() {
   const navigate = useNavigate();
   const { destinations } = useSelector((state) => state.home);
   useEffect(()=>{
      Aos.init({duration: 2000})
    })
   return (
      <div className="mx-3" >
         <div    data-aos = 'fade-up' className="text-xl md:text-3xl font-bold text-darktext mb-4 " >
            Top Destinations
         </div>
         
         <div className="grid grid-cols-2 md:grid-cols-3 gap-2 ">
            {destinations?.map((item, index) => (
               <div
                  className="mt-2 relative cursor-pointer "
                  key={index}
                  onClick={() => navigate(`/attractions/${item?.name}`)}
               >
                  <div className="overflow-hidden rounded ">
                     <img
                        className="hover:scale-110 object-cover rounded-lg h-[10em] md:h-[14em] w-full transition-all duration-500 cursor-pointer"
                    
                        src={config.SERVER_URL + item?.image}
                        alt={item?.name}
                     />
                  </div>
                  <div className="absolute top-0 bottom-0 right-0 left-0 rounded-lg hover:bg-black/40 w-full text-light transition-all duration-500 ">
                     <div    className="font-bold text-xl text-center pt-28">
                        {item?.name}{" "}
                     </div>
                  </div>
               </div>
            ))}
         </div>
      </div>
   );
}

export default TopDestination;
