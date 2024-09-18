import { useSelector } from "react-redux";

const useAuthenticatedUser = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const role = useSelector((state) => state.auth.role);
  const user = useSelector((state) => state.auth.user);
  const authUserId = user ? user.id : null;
  const isAuthenticatedUserAdmin = role === "ADMIN";

  return { isAuthenticated, authUserId, isAuthenticatedUserAdmin };
};

export default useAuthenticatedUser;