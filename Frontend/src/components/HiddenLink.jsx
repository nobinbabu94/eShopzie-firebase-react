import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../redux/slice/AuthSlice";

const ShowLogin = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  if (isLoggedIn) {
    return children;
  } else return null;
};
export const ShowLogOut = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  if (!isLoggedIn) {
    return children;
  } else return null;
};

export default ShowLogin;
