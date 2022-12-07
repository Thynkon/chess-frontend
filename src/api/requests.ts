
import axios, { AxiosInstance } from "axios";
import { config } from "../config";

type Nullable<T> = T | null;

interface Headers {
    [key: string]: any
}

export default class Api {
    api_token: Nullable<string>;
    api_url: string;
    client: Nullable<AxiosInstance>;

    constructor() {
        this.api_token = null;
        this.client = null;
        this.api_url = config.api_url;
    }

    init = async () => {
        this.api_token = localStorage.getItem('auth-token');

        let headers: Headers = {};
        headers.Accept = "application/json";

        if (this.api_token) {
            headers.Authorization = `Bearer ${this.api_token}`;
        }

        this.client = axios.create({
            baseURL: this.api_url,
            timeout: 31000,
            headers: headers,
        });

        return this.client;
    };

    getAuthToken = async (params: object) => {
        return (await this.init()).post("/login", params);
    };

    getCurrentUser = async () => {
        return (await this.init()).get("/profile");
    };

    updateProfile = async (params: object) => {
        return (await this.init()).post("/profile", params);
    }

    uploadPhoto = async (params: FormData) => {
        return (await this.init()).post("/profile/photo", params, {
            headers: {
                'Content-type': 'multipart/form-data',
            }
        });
    }

    getEventsList = async () => {
        return (await this.init()).get("/events");
    };

    createEvent = async (params: object) => {
        return (await this.init()).post("/events", params);
    }

    deleteEvent = async (eventId: number) => {
        return (await this.init()).delete(`${config.api_url}/events/${eventId}`)
    };
}