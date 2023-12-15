import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function B2BNotHotelPrivateRoute({ children }) {
  const { isLoggedIn, agent } = useSelector((state) => state.agents);

  if (!isLoggedIn) {
    return <Navigate replace to="/login" />;
  }

  if (agent.hasOwnProperty("configuration")) {
    if (
      !agent?.configuration?.showHotel &&
      agent?.configuration?.showAttraction
    ) {
      return <Navigate replace to="/attraction" />;
    } else if (
      !agent?.configuration?.showHotel &&
      agent?.configuration?.showFlight
    ) {
      return <Navigate replace to="/flight" />;
    } else if (
      !agent?.configuration?.showHotel &&
      agent?.configuration?.showVisa
    ) {
      return <Navigate replace to="/visa" />;
    } else if (
      !agent?.configuration?.showHotel &&
      agent?.configuration?.showA2a
    ) {
      return <Navigate replace to="/a2a" />;
    } else if (
      !agent?.configuration?.showHotel &&
      agent?.configuration?.showQuotaion
    ) {
      return <Navigate replace to="/quotation" />;
    } else if (
      !agent?.configuration?.showHotel &&
      agent?.configuration?.showInsurance
    ) {
      return <Navigate replace to={'insurance'} />
    }
  }

  return children;
}

export default B2BNotHotelPrivateRoute;
