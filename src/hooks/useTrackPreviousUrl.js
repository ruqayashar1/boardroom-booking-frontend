import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const useTrackPreviousUrl = () => {
  const location = useLocation();

  useEffect(() => {
    // Save the current URL as the previous URL
    sessionStorage.setItem("previousUrl", location.pathname);
  }, [location]);
};

export default useTrackPreviousUrl;
