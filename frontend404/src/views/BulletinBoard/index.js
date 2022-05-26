import { useEffect, useState } from "react";
import useUser from "useUser";
import BulletinBoardEmployee from "./employee";
import BulletinBoardManager from "./manager";

const BulletinBoard = () => {
  const { user } = useUser();
  const [isManager, setIsManager] = useState(false);
  useEffect(() => {
    setIsManager(user.role === "C");
  }, [user])
  if (isManager) {
    return <BulletinBoardManager />;
  } else {
    return <BulletinBoardEmployee />;
  }
};

export default BulletinBoard;