import { Formik } from "formik";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import Api from "../api/requests";
import { useIsAuthenticated, useSignIn } from 'react-auth-kit';
import { Alert } from "@mui/material";
import TransitionAlert from "./TransactionAlert";

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
                                initialValues={{ username: '', password: '', api: '' }}
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
                                        {errors.api ? (
                                            <TransitionAlert message={errors.api} severity="error" />
                                        ) : ""}

                                        <div>
                                            <label className="block">Username</label>
                                            <input name="username" type="text" className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-lg" onChange={handleChange} onBlur={handleBlur} value={values.username} />
                                        </div>
                                        {errors.username ? (
                                            <Alert severity="error">
                                                {errors.username && touched.username && errors.username}
                                            </Alert>
                                        ) : ""}

                                        <div>
                                            <label className="block">Password</label>
                                            <input type="password" name="password" className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-lg" onChange={handleChange} onBlur={handleBlur} value={values.password} />
                                        </div>

                                        {errors.password ? (
                                            <Alert severity="error">
                                                {errors.password && touched.password && errors.password}
                                            </Alert>
                                        ) : ""}

                                        <button type="submit" disabled={isSubmitting} className="w-full px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded text-lg">
                                            Login
                                        </button>
                                    </form>
                                )}
                            </Formik>

                            <Link to="/register" className="block text-gray-600 hover:text-gray-800 text-center" >
                                Don't have an account? Create one
                            </Link>
                        </div>
                    </div>
                </main>
            </>
        );
    }
}

export default Login;