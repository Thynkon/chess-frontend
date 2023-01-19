import { Formik, Form, Field } from "formik";
import { useNavigate } from "react-router-dom";
import LevelPicker from "./LevelPicker";
import Api from "../../api/requests";
import VariantDropdown from "./VariantDropdown";
import TimeDurationPicker from "./TimeDurationPicker";
import { Alert } from "flowbite-react";

const api = new Api();

interface FormData {
    [key: string]: any
}

interface FormFields {
    variant: string,
    level: number,
    duration: number
}

export function PlayAgainstFriend() {
    const navigate = useNavigate();

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
            <div className="p-6 w-96 bg-gray-50 rounded-md shadow-md">
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
                                <i className="las la-user-friends text-5xl text-black sm:text-3xl md:text-8xl mr-5" />
                            </div>
                            <h5 className="text-gray-900 text-xl font-medium mb-2">Play against friend</h5>
                            <Form className="w-full flex flex-col space-y-6">
                                <div className="p-2 bg-gray-50 rounded-lg space-y-2 shadow drop-shadow w-full">
                                    <label className="block">Rank</label>
                                    <LevelPicker values={["Casual", "Ranked"]} field={undefined} form={undefined} />
                                </div>
                                {errors.level ? (
                                    <Alert color="failure">
                                        {errors.level && touched.level && errors.level}
                                    </Alert>
                                ) : ""}

                                <div className="p-2 bg-gray-50 rounded-lg space-y-2 shadow drop-shadow w-full">
                                    <label className="block">Duration</label>
                                    <Field name="duration" component={TimeDurationPicker} />
                                </div>
                                {errors.duration ? (
                                    <Alert color="failure">
                                        {errors.duration && touched.duration && errors.duration}
                                    </Alert>
                                ) : ""}

                                <button type="submit" disabled={isSubmitting} className="w-full px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-lg">
                                    Play
                                </button>
                            </Form>
                        </div>
                    )}
                </Formik>
            </div>
        </div >
    );
}