import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function B2BPrivateRoute({ children }) {
  const { agent, isLoggedIn, isSiteLoading } = useSelector(
    (state) => state.agents
  );
  if (isSiteLoading) {
    return <div>Loading.....</div>;
  }
  if (!isLoggedIn) {
    return <Navigate replace to="/login" />;
  }


  if (
    agent?.hasOwnProperty("configuration") === false ||
    agent?.configuration === null
  ) {
    return <Navigate replace to="/entrydenied" />;
  }

  if (
    agent?.hasOwnProperty("configuration") &&
    agent?.configuration?.showAttraction === false &&
    agent?.configuration?.showHotel === false &&
    agent?.configuration?.showFlight === false &&
    agent?.configuration?.showVisa === false &&
    agent?.configuration?.showA2a === false &&
    agent?.configuration?.showQuotaion === false &&
    agent?.configuration?.showInsurance === false
  ) {
    return <Navigate replace to="/entrydenied" />;
  }

  return children;
}

export default B2BPrivateRoute;
