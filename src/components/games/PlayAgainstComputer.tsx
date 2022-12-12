import { Alert } from "@mui/material";
import { Formik, Form } from "formik";
import { useIsAuthenticated, useSignIn } from "react-auth-kit";
import { useNavigate, useLocation } from "react-router-dom";
import LevelPicker from "./LevelPicker";
import Api from "../../api/requests";
import VariantDropdown from "./VariantDropdown";
import TimeDurationPicker from "./TimeDurationPicker";

const api = new Api();

interface FormData {
    [key: string]: any
}

interface FormFields {
    variant: string,
    level: number,
    duration: number
}

export function PlayAgainstComputer() {
    const navigate = useNavigate();
    const { state } = useLocation();

    const handleLogin = (credentials: FormFields, { setSubmitting, setErrors }: any) => {
        api.getAuthToken(credentials).then((response: { data: any; }) => {
            console.log(credentials);
        }).catch((error: { response: { data: { error: { message: any; }; }; }; }) => {
            console.log(error.response);
            setErrors({
                api: error.response.data.error.message
            });
        }).finally(() => {
            setSubmitting(false);
        });
    }

    const validateForm = (values: { variant: string, level: number, duration: number }) => {
        const errors: { variant?: string, level?: string, duration?: string } = {};
        console.log(values);

        if (!values.variant) {
            errors.variant = 'Required';
        }

        if (!values.level) {
            errors.level = 'Required';
        }

        if (!values.duration) {
            errors.duration = 'Required';
        }

        return errors;
    }
    return (
        <div className="flex justify-center">
            <div className="rounded-lg shadow-lg bg-white">
                <div className="p-6 w-96">
                    <Formik
                        initialValues={{ variant: '', level: 1, duration: 5 }}
                        validate={validateForm}

                        onSubmit={handleLogin}
                    >
                        {({
                            values,
                            errors,
                            touched,
                            handleChange,
                            handleBlur,
                            isSubmitting,
                        }) => (

                            <div className="w-full">
                                <div className="py-6 text-center">
                                    <i className="las la-robot text-xs text-black sm:text-3xl md:text-8xl mr-5"></i>
                                </div>
                                <h5 className="text-gray-900 text-xl font-medium mb-2">Play against computer</h5>
                                <Form className="w-full flex flex-col space-y-6">
                                    <div className="p-2 bg-gray-50 rounded-lg space-y-2 shadow drop-shadow w-full">
                                        <label className="block">Variant</label>
                                        <VariantDropdown />
                                    </div>

                                    {errors.variant ? (
                                        <Alert severity="error">
                                            {errors.variant && touched.variant && errors.variant}
                                        </Alert>
                                    ) : ""}

                                    <div className="p-2 bg-gray-50 rounded-lg space-y-2 shadow drop-shadow w-full">
                                        <label className="block">Level</label>
                                        <LevelPicker values={Array.from({ length: 4 }, (value, index) => index + 1)} />
                                    </div>
                                    {errors.level ? (
                                        <Alert severity="error">
                                            {errors.level && touched.level && errors.level}
                                        </Alert>
                                    ) : ""}

                                    <div className="p-2 bg-gray-50 rounded-lg space-y-2 shadow drop-shadow w-full">
                                        <label className="block">Duration</label>
                                        <TimeDurationPicker />
                                    </div>
                                    {errors.duration ? (
                                        <Alert severity="error">
                                            {errors.duration && touched.duration && errors.duration}
                                        </Alert>
                                    ) : ""}

                                    <button type="submit" disabled={isSubmitting} className="w-full px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded text-lg">
                                        Play
                                    </button>
                                </Form>
                            </div>
                        )}
                    </Formik>
                </div>
            </div>
        </div >
    );
}