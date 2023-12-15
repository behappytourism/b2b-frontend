import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSingleReseller } from "../../../redux/slices/resellerSlice";
import DetailsEditForm from "../../components/Resellers/DetailsEditForm";

function EditResellers() {
   const dispatch = useDispatch();
   const { id } = useParams();

   useEffect(() => {
      dispatch(fetchSingleReseller(id));
   }, [dispatch]);

   return (
      <div className="">
         <div className="p-2">
            <div className=" mt-2">
               <DetailsEditForm />
            </div>
         </div>
      </div>
   );
}

export default EditResellers;
