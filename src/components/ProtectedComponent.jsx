import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { isLoggedIn } from "../redux/features/userSlice";

const ProtectedComponent = ({ children }) => {
  const navigate = useNavigate();
  const isLoggedInSelector = useSelector(isLoggedIn);

  useEffect(() => {
    if (!isLoggedInSelector) {
      navigate("/login");
      return;
    }
  }, [navigate, isLoggedInSelector]);
  //   if (loading) {
  //     return;
  //   }
  return children;
};

export default ProtectedComponent;
