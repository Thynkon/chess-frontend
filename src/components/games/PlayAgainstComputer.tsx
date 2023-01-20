import { Field, useFormik, FormikProvider, FormikProps } from "formik";
import { useNavigate, useLocation } from "react-router-dom";
import LevelPicker from "./LevelPicker";
import Api from "../../api/requests";
import VariantDropdown from "./VariantDropdown";
import TimeDurationPicker from "./TimeDurationPicker";
import { Alert } from "flowbite-react";
import { useEffect, useState, memo } from "react";

const api = new Api();

interface FormData {
    [key: string]: any
}

interface Variant {
    id: string;
    name: string;
}

interface FormFields {
    variant: string,
    level: number,
    duration: number
    type: string;
}

interface PlayArgs {
    game_id: number,
    user_id: number,
    duration: number
}

function PlayAgainstComputer() {
    const navigate = useNavigate();
    const location = useLocation();

    const handleSubmit = (data: FormFields, { setSubmitting, setErrors }: any) => {
        let form_data = data;
        form_data.type = "pvc";
        api.createGame(form_data).then((response) => {
            let args: PlayArgs = {
                game_id: response.data.data.id,
                user_id: response.data.data.user_id,
                duration: form_data.duration,
            }

            api.createGameParticipation(args).then((response) => {
                navigate("/play", { state: args });
                setSubmitting(false);
            }).catch(error => {
            }).finally(() => {
            });
        }).catch(error => {
            console.log(error.response);
            setErrors({
                api: error.response.data.error.message
            });
        }).finally(() => {
            setSubmitting(false);
        });
    }

    const validateForm = (values: FormFields) => {
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

    function MyForm({ variants }: { variants: Variant[] }) {
        const formik = useFormik({
            initialValues: {
                variant: variants[0].name,
                level: 1,
                duration: 300,
                type: 'pvc',
            },
            validate: validateForm,
            onSubmit: handleSubmit,
        });

        return (
            <FormikProvider value={formik}>
                <div className="flex justify-center md:w-96">
                    <div className="p-6 md:w-96 rounded-md shadow-md">
                        <form onSubmit={formik.handleSubmit} className="w-full">
                            <div className="py-6 text-center">
                                <i className="las la-robot text-5xl text-black sm:text-3xl md:text-8xl mr-5" />
                            </div>
                            <h5 className="text-gray-900 text-xl font-medium mb-2">Play against computer</h5>
                            <div className="w-full flex flex-col space-y-6">
                                <div className="p-2 bg-neutral-50 rounded-lg space-y-2 shadow drop-shadow w-full">
                                    <label className="block">Variant</label>
                                    <Field name="variant" component={VariantDropdown}
                                        variants={variants.map(v => v.name)}
                                    />
                                </div>

                                {formik.errors.variant ? (
                                    <Alert color="failure">
                                        {formik.errors.variant}
                                    </Alert>
                                ) : ""}

                                <div className="p-2 bg-gray-50 rounded-lg space-y-2 shadow drop-shadow w-full">
                                    <label className="block">Level</label>
                                    <Field name="level" component={LevelPicker} values={Array.from({ length: 4 }, (value, index) => index + 1)} />
                                </div>
                                {formik.errors.level ? (
                                    <Alert color="failure">
                                        {formik.errors.level}
                                    </Alert>
                                ) : ""}

                                <div className="p-2 bg-gray-50 rounded-lg space-y-2 shadow drop-shadow w-full">
                                    <label className="block">Duration</label>
                                    <Field name="duration" component={TimeDurationPicker} />
                                </div>
                                {formik.errors.duration ? (
                                    <Alert color="failure">
                                        {formik.errors.duration}
                                    </Alert>
                                ) : ""}

                                <button type="submit" disabled={formik.isSubmitting} className="w-full px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-lg">
                                    Play
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </FormikProvider >
        );
    }

    const [variants, setVariants] = useState<Variant[]>([]);
    useEffect(() => {
        api.getVariants().then((response) => {
            let v = response.data.data;
            setVariants(v);
        }).catch(error => {
            console.log(error.response);
        }).finally(() => {
        })

    }, []);

    if (variants.length === 0) {
        return (
            <div>
                Loading...
            </div>
        );
    }

    return (
        <MyForm variants={variants} />
    );
}

export default memo(PlayAgainstComputer);