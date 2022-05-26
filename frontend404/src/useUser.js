import { useState } from 'react';
import useToken from 'useToken';
import useAPI from 'useAPI';

export default function useUser() {
  const getUser = () => {
    const tokenString = sessionStorage.getItem('user');
    const user = JSON.parse(tokenString);
    return user;
  };

  const [user, setUser] = useState(getUser());

  const saveUser = user => {
    sessionStorage.setItem('user', JSON.stringify(user));
    setUser(user);
  };

  return {
    setUser: saveUser,
    user
  }

  // // const { token } = useToken();
  // const api = useAPI();
  // const getUser = () => {
  //   // let user = null;
  //   api({
  //     url: "auth/users/me/"
  //   })
  //   .then(response => {
  //     setUser(response.data);
  //   })
  // }

  // const [user, setUser] = useState(getUser);


  // return {
  //   user
  //   // setUser
  // };
}