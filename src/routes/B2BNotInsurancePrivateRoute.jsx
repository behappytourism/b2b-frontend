import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";


function B2BNotInsurancePrivateRoute({children}) {

    const { isLoggedIn, agent } = useSelector((state)=> state.agents)

    if(!isLoggedIn) {
        return <Navigate replace to="/login" />
    }

    if(agent.hasOwnProperty("configuration")) {
        if(agent?.configuration?.showHotel &&
            !agent?.configuration?.showInsurance
            ) {
            return <Navigate replace to="/" />
        } else if (
            agent?.configuration?.showAttraction && 
            !agent?.configuration?.showInsurance
        ) {
            return <Navigate replace to={"/attraction"} />
        } else if (
            agent?.configuration?.showFlight && 
            !agent?.configuration?.showInsurance
        ) {
            return <Navigate replace to={"/flight"} />
        } else if (
            agent?.configuration?.showVisa && 
            !agent?.configuration?.showInsurance
        ) {
            return <Navigate replace to={"/visa"} />
        } else if (
            agent?.configuration?.showA2a && 
            !agent?.configuration?.showInsurance
        ) {
            return <Navigate replace to={"/a2a"} />
        } else if(
            agent?.configuration?.showQuotation && 
            !agent?.configuration?.showInsurance
        ) {
            return <Navigate replace to={"/quotation"} />
        }
    }

    return children
}

export default B2BNotInsurancePrivateRoute