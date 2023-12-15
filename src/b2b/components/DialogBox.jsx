import React from "react";

function DialogBox({title, text, array, children}) {

   return (
      <div class="group relative flex cursor-default">
        {children}
        <span class={`hidden md:block  absolute top-10 scale-0 transition-all duration-100 rounded bg-gray-800 ${title?.length > 0 || text?.length >0 || array?.length > 0 ? " p-2 " : " "}  delay-200 text-white group-hover:scale-100 z-50`}>
         <p className={`text-[10px] font-[500]`}>{title}</p>
         <p className="text-[9px]">{text}</p>
         {array?.map((item) => (
         <p className="text-[9px]">{item}</p>
         ))}
        </span>
    </div>
   );
}

export default DialogBox;
