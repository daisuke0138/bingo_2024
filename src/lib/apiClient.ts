import axios from "axios";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASEURL;
const apiClient = axios.create({
    // baseURL: "http://localhost:8888/api",
    baseURL: apiBaseUrl,
    headers: {
        "Content-Type": "application/json",
    },
});

export const fetchData = async (endpoint: string) => {
    const response = await apiClient.get(`/api/${endpoint}`);
    return response.data;
};

export default apiClient;