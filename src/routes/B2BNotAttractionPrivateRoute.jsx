import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function B2BNotAttractionPrivateRoute({ children }) {
  const { isLoggedIn, agent } = useSelector((state) => state.agents);

  if (!isLoggedIn) {
    return <Navigate replace to="/login" />;
  }
  if (agent.hasOwnProperty("configuration")) {
    if (
      agent?.configuration?.showHotel &&
      !agent?.configuration?.showAttraction
    ) {
      return <Navigate replace to="/" />;
    } else if (
      !agent?.configuration?.showAttraction &&
      agent?.configuration?.showFlight
    ) {
      return <Navigate replace to="/flight" />;
    } else if (
      !agent?.configuration?.showAttraction &&
      agent?.configuration?.showVisa
    ) {
      return <Navigate replace to="/visa" />;
    } else if (
      !agent?.configuration?.showAttraction &&
      agent?.configuration?.showA2a
    ) {
      return <Navigate replace to="/a2a" />;
    } else if (
      !agent?.configuration?.showAttraction &&
      agent?.configuration?.showQuotaion
    ) {
      return <Navigate replace to="/quotation" />;
    } else if (
      agent?.configuration?.showInsurance &&
      !agent?.configuration?.showAttraction
    ) {
      return <Navigate replace to={'/insurance'} />
    }
  }

  return children;
}

export default B2BNotAttractionPrivateRoute;
