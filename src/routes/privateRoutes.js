import { useSelector } from "react-redux";
import { Route, Navigate, Routes } from "react-router-dom"
import Dashboard from "../views/dashboard";

const PrivateRoutes = () => {
    const token = useSelector((state) => state.data.user.userToken);

    if(token) {
        return (
            <Routes>
            
                <Route path="/Dashboard" exact element={<Dashboard />} />
            </Routes>
        )
    }
    else {
        return (
            <Routes>
                <Route path="/Dashboard" exact element={<Navigate to="/Login" replace />} />
            </Routes>
        )
    }

}

export default PrivateRoutes;