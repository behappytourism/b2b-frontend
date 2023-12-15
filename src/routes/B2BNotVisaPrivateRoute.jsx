import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function B2BNotVisaPrivateRoute({ children }) {
  const { isLoggedIn, agent } = useSelector((state) => state.agents);

  if (!isLoggedIn) {
    return <Navigate replace to="/login" />;
  }

  if (agent.hasOwnProperty("configuration")) {
    if (agent?.configuration?.showHotel && !agent?.configuration?.showVisa) {
      return <Navigate replace to="/" />;
    } else if (
      agent?.configuration?.showAttraction &&
      !agent?.configuration?.showVisa
    ) {
      return <Navigate replace to="/attraction" />;
    } else if (
      agent?.configuration?.showFlight &&
      !agent?.configuration?.showVisa
    ) {
      return <Navigate replace to="/flight" />;
    } else if (
      !agent?.configuration?.showVisa &&
      agent?.configuration?.showA2a
    ) {
      return <Navigate replace to="/a2a" />;
    } else if (
      !agent?.configuration?.showVisa &&
      agent?.configuration?.showQuotaion
    ) {
      return <Navigate replace to="/quotation" />;
    } else if (
      !agent?.configuration?.showVisa &&
      agent?.configuration?.showInsurance
    ) {
      return <Navigate replace to={'/insurance'} />
    }
  }

  return children;
}

export default B2BNotVisaPrivateRoute;
