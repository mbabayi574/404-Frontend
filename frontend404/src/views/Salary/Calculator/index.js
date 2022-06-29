import { useEffect, useState } from "react";
import useUser from "useUser";
import EmployeeBoard from "./employee";
import ManagerBoard from "./manager";

const Board = () => {
  const { user } = useUser();
  const [isManager, setIsManager] = useState(false);
  useEffect(() => {
    setIsManager(user.role === "C");
  }, [user]);
  if (isManager) {
    return <ManagerBoard />;
  } else {
    return <EmployeeBoard />;
  }
};

export default Board;
