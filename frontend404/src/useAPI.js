import axios from "axios";
import { TokenContext } from "App";
import { useContext } from "react";

const apiURL = "http://127.0.0.1:8000/";

const useAPI = () => {
    const { token } = useContext(TokenContext);
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