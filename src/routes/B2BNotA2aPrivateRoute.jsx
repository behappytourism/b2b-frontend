import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function B2BNotA2aPrivateRoute({ children }) {
  const { isLoggedIn, agent } = useSelector((state) => state.agents);

  if (!isLoggedIn) {
    return <Navigate replace to="/login" />;
  }
  if (agent.hasOwnProperty("configuration")) {
    if (agent?.configuration?.showHotel && !agent?.configuration?.showA2a) {
      return <Navigate replace to="/" />;
    } else if (
      agent?.configuration?.showAttraction &&
      !agent?.configuration?.showA2a
    ) {
      return <Navigate replace to="/attraction" />;
    } else if (
      agent?.configuration?.showFlight &&
      !agent?.configuration?.showA2a
    ) {
      return <Navigate replace to="/flight" />;
    } else if (
      agent?.configuration?.showVisa &&
      !agent?.configuration?.showA2a
    ) {
      return <Navigate replace to="/visa" />;
    } else if (
      !agent?.configuration?.showA2a &&
      agent?.configuration?.showQuotaion
    ) {
      return <Navigate replace to="/quotation" />;
    } else if (
      agent?.configuration?.showInsurance && 
      !agent?.configuration?.showA2a
    ) {
      return <Navigate replace to={'/insurance'} />
    }
  }

  return children;
}

export default B2BNotA2aPrivateRoute;
