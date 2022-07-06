import axios from "axios";
import { TokenContext } from "App";
import { useContext } from "react";
import useToken from "useToken";

// const apiURL = "http://127.0.0.1:8000/";
const apiURL = "http://404g.pythonanywhere.com/";

const useAPI = () => {
    // const { token } = useContext(TokenContext);
    const { token } = useToken();
    // console.log(token);
    const api = axios.create({
      baseURL: apiURL
    });
	const request = (config) => (
		api({
			...config, headers: {
				...config.headers,
				...token && { "Authorization": "Bearer " + token }
			}
		})
	)
	return request;
}

export default useAPI;