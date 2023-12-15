import { Outlet } from "react-router-dom";
import Footer from "../../b2b/components/Footers/Footer";

export default function A2aModule() {
  return (
    <div className="">
      <div className="min-h-[70vh]">
        <Outlet />
      </div>
      <Footer module="a2as" />
    </div>
  );
}
