import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
    const token = useSelector((state) => state.userSlice.token);
    if (!token) {
        return <Navigate to="/login" replace />;
    }
    return children;
};


export default ProtectedRoute;
