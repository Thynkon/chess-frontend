import { Formik } from "formik";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import Api from "../api/requests";
import { useIsAuthenticated, useSignIn } from 'react-auth-kit';
import { Alert } from "@mui/material";
import TransitionAlert from "./TransactionAlert";
import Nav from "./Nav";
import { Button, Tabs, Timeline } from "flowbite-react";
import { HiCalendar, HiArrowNarrowRight } from "react-icons/hi";
import { GiTrophyCup } from "react-icons/gi";
import { MotionConfig, motion } from "framer-motion";

const api = new Api();

interface FormData {
    [key: string]: any
}

interface FormFields {
    username?: string,
    password?: string
}

export function Profile() {
    const navigate = useNavigate();
    const { state } = useLocation();

    const isAuthenticated = useIsAuthenticated()
    const signIn = useSignIn()

    const handleLogin = (credentials: { username: string, password: string }, { setSubmitting, setErrors }: any) => {
        api.getAuthToken(credentials).then((response) => {
            let authToken = response.data;
            localStorage.setItem('authToken', authToken.token);
            console.log(authToken.token);
            if (signIn(
                {
                    token: authToken.token,
                    expiresIn: 60,
                    tokenType: "Bearer",
                }
            )) {
                // Redirect or do-something
            } else {
                //Throw error
            }
        }).catch(error => {
            console.log(error.response);
            setErrors({
                api: error.response.data.error.message
            });
        }).finally(() => {
            setSubmitting(false);
        });
    }

    const validateForm = (values: { username: string; password: string }) => {
        const errors: FormFields = {};

        if (!values.username) {
            errors.username = 'Required';
        }

        if (!values.password) {
            errors.password = 'Required';
        }

        return errors;
    }

    return (
        <motion.div>
            <Nav />
            <Tabs.Group
                aria-label="Tabs with underline"
                style="underline"
            >
                <Tabs.Item title="Activity">
                    <Timeline>
                        <Timeline.Item>
                            <Timeline.Point icon={GiTrophyCup} />
                            <Timeline.Content>
                                <Timeline.Time>
                                    19 December 2022
                                </Timeline.Time>
                                <Timeline.Title>
                                    Win streak
                                </Timeline.Title>
                                <Timeline.Body>
                                    Today you won 10 consecutive games!
                                </Timeline.Body>
                            </Timeline.Content>
                        </Timeline.Item>
                    </Timeline>
                </Tabs.Item>
                <Tabs.Item
                    active={true}
                    title="Games"
                >
                    Activity
                </Tabs.Item>
            </Tabs.Group>
        </motion.div>
    );
}

export default Profile;