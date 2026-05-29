// src/api/axiosConfig.js
// Central Axios setup — all API calls use this instance.
// Change baseURL here if your backend runs on a different port.

import axios from "axios";

export default axios.create({
    baseURL: "http://localhost:8080",
    headers: {
        "Content-Type": "application/json",
    },
});