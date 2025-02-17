import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
    const { user } = useContext(AuthContext);
    return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
// In the code snippet above, we have created a PrivateRoute component that uses the useContext hook to access the user object from the AuthContext. If the user is authenticated (i.e., user is not null), the PrivateRoute component renders the children components. Otherwise, it redirects the user to the login page using the Navigate component from react-router-dom.