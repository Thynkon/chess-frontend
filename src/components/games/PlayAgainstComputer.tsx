import { Alert } from "@mui/material";
import { Field, useFormik, FormikProvider } from "formik";
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
    const location = useLocation();

    const handleSubmit = (data: FormFields, { setSubmitting, setErrors }: any) => {
        let form_data = data;
        form_data.duration = form_data.duration * 60;
        console.log(form_data);
        navigate("/loading");
        /*
                api.createGame(form_data).then((response) => {
                    localStorage.setItem('current_route', "/play");
                    navigate("/loading");
                    setSubmitting(false);
                }).catch(error => {
                    console.log(error.response);
                    setErrors({
                        api: error.response.data.error.message
                    });
                }).finally(() => {
                    setSubmitting(false);
                });
                */
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

    const variants = ["standard", "crazyhouse"];
    const formik = useFormik({
        initialValues: {
            variant: variants[0],
            level: 1,
            duration: 300,
        },
        validate: validateForm,
        onSubmit: handleSubmit,
    });

    return (
        <FormikProvider value={formik}>
            <div className="flex justify-center">
                <div className="p-6 w-96">
                    <form onSubmit={formik.handleSubmit}>
                        <div className="w-full">
                            <div className="py-6 text-center">
                                <i className="las la-robot text-xs text-black sm:text-3xl md:text-8xl mr-5"></i>
                            </div>
                            <h5 className="text-gray-900 text-xl font-medium mb-2">Play against computer</h5>
                            <div className="w-full flex flex-col space-y-6">
                                <div className="p-2 bg-gray-50 rounded-lg space-y-2 shadow drop-shadow w-full">
                                    <label className="block">Variant</label>
                                    <Field name="variant" component={VariantDropdown} />
                                </div>

                                {formik.errors.variant ? (
                                    <Alert severity="error">
                                        {formik.errors.variant}
                                    </Alert>
                                ) : ""}

                                <div className="p-2 bg-gray-50 rounded-lg space-y-2 shadow drop-shadow w-full">
                                    <label className="block">Level</label>
                                    <Field name="level" component={LevelPicker} values={Array.from({ length: 4 }, (value, index) => index + 1)} />
                                </div>
                                {formik.errors.level ? (
                                    <Alert severity="error">
                                        {formik.errors.level}
                                    </Alert>
                                ) : ""}

                                <div className="p-2 bg-gray-50 rounded-lg space-y-2 shadow drop-shadow w-full">
                                    <label className="block">Duration</label>
                                    <Field name="duration" component={TimeDurationPicker} />
                                </div>
                                {formik.errors.duration ? (
                                    <Alert severity="error">
                                        {formik.errors.duration}
                                    </Alert>
                                ) : ""}

                                <button type="submit" disabled={formik.isSubmitting} className="w-full px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-lg">
                                    Play
                                </button>
                            </div>
                        </div>
                    </form>
                </div >
            </div >
        </FormikProvider>
    );
}