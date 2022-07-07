import { useEffect, useState } from "react";
import useUser from "useUser";
import FoodEmployee from "./employee";
import FoodManager from "./manager";

const FoodPage = () => {
  const { user } = useUser();
  const [isManager, setIsManager] = useState(false);
  useEffect(() => {
    setIsManager(user.role === "C");
  }, [user])
  if (isManager) {
    return <FoodManager />;
  } else {
    return <FoodEmployee />;
  }
};

export default FoodPage;