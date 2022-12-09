import exp from "constants";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import { Form, Navigate, useLocation, useNavigate } from "react-router-dom";
import Api from "../api/requests";
import { useIsAuthenticated, useSignIn } from 'react-auth-kit';

const api = new Api();

interface FormData {
    [key: string]: any
}

interface FormFields {
    username?: string,
    password?: string
}

export function Login() {
    const navigate = useNavigate();
    const { state } = useLocation();

    const isAuthenticated = useIsAuthenticated()
    const signIn = useSignIn()

    const handleLogin = (credentials: any, { setSubmitting }: any) => {
        api.getAuthToken(credentials).then(async (response) => {
            let authToken = response.data;
            if (signIn(
                {
                    token: authToken,
                    expiresIn: 60,
                    tokenType: "Bearer",
                }
            )) {
                // Redirect or do-something
            } else {
                //Throw error
            }
        });
    }

    const validateForm = (values: { username: string; }) => {
        const errors: FormFields = {};

        if (!values.username) {
            errors.username = 'Required';
        }

        return errors;
    }

    console.log(isAuthenticated())
    if (isAuthenticated()) {
        return (
            <Navigate to={'/'} replace />
        )
    } else {
        return (
            <>
                <main className="mx-4 md:mx-8 lg:mx-16 xl:mx-32">
                    <div className={"py-16 w-full flex items-center justify-center flex-col space-y-4"}>
                        <div className="max-w-lg w-full space-y-12">
                            <h2 className="text-3xl font-semibold uppercase text-center">Login</h2>
                            <Formik
                                initialValues={{ username: '', password: '' }}
                                validate={validateForm}

                                onSubmit={handleLogin}
                            >
                                {({
                                    values,
                                    errors,
                                    touched,
                                    handleChange,
                                    handleBlur,
                                    handleSubmit,
                                    isSubmitting,
                                }) => (

                                    <form className="w-full flex flex-col space-y-6" onSubmit={handleSubmit}>
                                        <div>
                                            <label className="block">Username</label>
                                            <input name="username" type="text" className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-lg" onChange={handleChange} onBlur={handleBlur} value={values.username} />
                                        </div>
                                        {errors.username && touched.username && errors.username}

                                        <div>
                                            <label className="block">Password</label>
                                            <input type="password" name="password" className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-lg" onChange={handleChange} onBlur={handleBlur} value={values.password} />
                                        </div>
                                        {errors.password && touched.password && errors.password}
                                        <button type="submit" disabled={isSubmitting} className="w-full px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded text-lg">
                                            Login
                                        </button>
                                    </form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </main>
            </>
        );
    }
}

export default Login;