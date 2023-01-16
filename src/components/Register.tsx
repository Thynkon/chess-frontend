import { Formik } from "formik";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Api from "../api/requests";
import { useEffect, useState } from "react";
import { Alert } from "flowbite-react";
import anime from "animejs";

const api = new Api();

interface FormData {
    [key: string]: any
}

interface FormFields {
    username?: string,
    password?: string,
    password_confirmation?: string
}

function Register() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const [apiError, setApiError] = useState("");

    useEffect(() => {
        var tl = anime.timeline({
            targets: '.form-field',
            delay: 20,
            duration: 1, // Can be inherited
            direction: 'alternate',
        });

        tl.add({
            translateX: 50,
            // override the easing parameter
            easing: 'spring',
        })

    });

    const handleRegister = (credentials: { username: string, password: string }, { setSubmitting, setErrors }: any) => {
        api.createAccount(credentials).then((response) => {
            console.log(response);
        }).catch(error => {
            console.log(error.response);
            setApiError(error.response.data.error.message);
        }).finally(() => {
            setSubmitting(false);
        });
    }

    const validateForm = (values: { username: string, password: string, password_confirmation: string }) => {
        const errors: FormFields = {};

        if (!values.username) {
            errors.username = 'Required';
        }

        if (!values.password) {
            errors.password = 'Required';
        }

        if (!values.password_confirmation) {
            errors.password_confirmation = 'Required';
        }

        if (values.password !== values.password_confirmation) {
            errors.password = 'Passwords do not match';
        }

        return errors;
    }

    return (
        <>
            <main className="mx-4 md:mx-8 lg:mx-16 xl:mx-32">
                <div className={"py-16 w-full flex items-center justify-center flex-col space-y-4"}>
                    <div className="max-w-lg w-full space-y-12">
                        <h2 className="text-3xl font-semibold uppercase text-center">Register</h2>
                        <Formik
                            initialValues={{ username: '', password: '', password_confirmation: '', api: '' }}
                            validate={validateForm}

                            onSubmit={handleRegister}
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

                                <form className="w-full flex flex-col space-y-6 form-field" onSubmit={handleSubmit}>
                                    {apiError ? (
                                        <Alert color="failure">
                                            {errors.api}
                                        </Alert>
                                    ) : ""}

                                    <div>
                                        <label className="block">Username</label>
                                        <input name="username" type="text" className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-lg" onChange={handleChange} onBlur={handleBlur} value={values.username} />
                                    </div>
                                    {errors.username ? (
                                        <Alert color="failure">
                                            {errors.username}
                                        </Alert>
                                    ) : ""}

                                    <div>
                                        <label className="block">Password</label>
                                        <input type="password" name="password" className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-lg" onChange={handleChange} onBlur={handleBlur} value={values.password} />
                                    </div>

                                    {errors.password ? (
                                        <Alert color="failure">
                                            {errors.password}
                                        </Alert>
                                    ) : ""}

                                    <div>
                                        <label className="block">Password confirmation</label>
                                        <input type="password" name="password_confirmation" className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-lg" onChange={handleChange} onBlur={handleBlur} value={values.password_confirmation} />
                                    </div>

                                    {errors.password_confirmation ? (
                                        <Alert color="failure">
                                            {errors.password_confirmation}
                                        </Alert>
                                    ) : ""}

                                    <button type="submit" disabled={isSubmitting} className="w-full px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-lg">
                                        Register
                                    </button>
                                </form>
                            )}
                        </Formik>

                        <Link to="/login" className="block text-gray-600 hover:text-gray-800 text-center" >
                            Already have an account? Login
                        </Link>
                    </div>
                </div>
            </main>
        </>
    );
}


export default Register;