import { useRoutes } from "react-router-dom";

import ThemeRoutes from "./routes/Router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getInitialData, getInitialVisaCountryList } from "./redux/slices/homeSlice";
import { fetchAgent } from "./redux/slices/agentSlice";
import { getAllAirports } from "./redux/slices/generalSlice";
import { getSocialMedia } from "./redux/slices/homeSlice";

export default function App() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAgent());
        dispatch(getInitialData());
        dispatch(getInitialVisaCountryList())
        dispatch(getAllAirports())
        dispatch(getSocialMedia())
    }, []);

    const routing = useRoutes(ThemeRoutes);
    return routing;
}
