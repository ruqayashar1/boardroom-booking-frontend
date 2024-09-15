import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchKemriEmployees } from "../../context/users/kemriEmployeeSlice";

const useKemriEmployees = () => {
  const dispatch = useDispatch();

  const kemriEmployees = useSelector(
    (state) => state.kemriEmployee.kemriEmployees
  );

  const fetchKemriEmployeesFromServer = useCallback(() => {
    if (kemriEmployees.length === 0) {
      dispatch(fetchKemriEmployees());
    }
  }, [kemriEmployees.length]);

  useEffect(() => {
    fetchKemriEmployeesFromServer();
  }, []);

  return kemriEmployees;
};

export default useKemriEmployees;
