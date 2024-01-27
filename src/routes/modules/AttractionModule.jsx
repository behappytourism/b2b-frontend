import { Outlet } from "react-router-dom";
import Footer from "../../b2b/components/Footers/Footer";

export default function AttractionModule() {
  return (
    <div className="">
      <div className="min-h-[70vh]">
        <Outlet />
      </div>
      <div className="w-full">
      <Footer module="attractions" />
      </div>
    </div>
  );
}
