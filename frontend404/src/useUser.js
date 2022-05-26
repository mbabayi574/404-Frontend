import { useState } from 'react';

export default function useUser() {
  const getUser = () => {
    const tokenString = sessionStorage.getItem('user');
    const userToken = JSON.parse(tokenString);
    return userToken;
  };

  const [user, setUser] = useState(getUser());

  const saveUser = user => {
    sessionStorage.setItem('user', JSON.stringify(user));
    setUser(userToken);
  };

  return {
    setUser: saveUser,
    user
  }
}