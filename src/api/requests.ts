
import axios, { AxiosInstance } from "axios";
import { config } from "../config";

type Nullable<T> = T | null;

interface Headers {
    [key: string]: any
}

export default class Api {
    apiToken: Nullable<string>;
    apiUrl: string;
    client: Nullable<AxiosInstance>;

    constructor() {
        this.apiToken = null;
        this.client = null;
        this.apiUrl = config.api_url;
    }

    init = async () => {
        this.apiToken = localStorage.getItem('authToken');

        let headers: Headers = {};
        headers.Accept = "application/json";

        if (this.apiToken) {
            headers.Authorization = `Bearer ${this.apiToken}`;
        }

        this.client = axios.create({
            baseURL: this.apiUrl,
            timeout: 31000,
            headers: headers,
        });

        return this.client;
    };

    getAuthToken = async (params: object) => {
        return (await this.init()).post("/login", params);
    };

    createAccount = async (params: object) => {
        return (await this.init()).post("/register", params);
    };

    createGame = async (params: object) => {
        return (await this.init()).post("/games", params);
    };
}