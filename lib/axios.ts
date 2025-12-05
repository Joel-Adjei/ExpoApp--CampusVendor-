import axios from "axios";

const useAxios = axios.create({
  baseURL: "https://dummyjson.com",
  headers: { "X-Custom-Header": "foobar" },
});

export default useAxios;
