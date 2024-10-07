import axios from "axios";

const config = {
  backend: {
    ip: "localhost",
    port: 3001,
  },
};

const instance = axios.create({
  withCredentials: true,
  baseURL: `http://${config.backend.ip}:${config.backend.port}`,
});

export { instance };
