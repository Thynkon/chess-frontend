import { Form } from "react-router-dom";
import Api from "../api/requests";

const api = new Api();

interface FormData {
    [key: string]: any
}

export async function action({ params, request }: { params: any, request: any }) {
    let formData = await request.formData();

    let data: FormData = {};
    for (const [key, value] of formData.entries()) {
        data[key] = value;
    }

    api.getAuthToken(data).then(async (response) => {
        let authToken = response.data;
        localStorage.setItem('auth-token', authToken.token);

        //this.setState({ message: 'User successfully authenticated!' });
    }).catch(err => {
        if (err.response.status === 401) {
            //setMessage('Authentication failed! Please check your credentials and try again.');
            // setError("test", { type: "focus" }, { shouldFocus: true });
        }
    }).finally(() => {
        // dispatch({ type: 'SIGN_IN', token: authToken });
    });;
    return null;
}

const handleSubmit = (event: any) => {
    event.preventDefault();

    console.log("handleSubmit!");
    // 👇️ redirect
    //navigate('/contacts', {replace: true});
};


export function Login() {
    return (
        <>
            <main className="mx-4 md:mx-8 lg:mx-16 xl:mx-32">
                <div className={"py-16 w-full flex items-center justify-center flex-col space-y-4"}>

                    <div className="max-w-lg w-full space-y-12">
                        <h2 className="text-3xl font-semibold uppercase text-center">Login</h2>

                        <Form className="w-full flex flex-col space-y-6" method="post">
                            <div>
                                <label className="block">Username</label>
                                <input name="username" type="text" className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-lg" />
                            </div>
                            <div>
                                <label className="block">Password</label>
                                <input type="password" name="password" className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-lg" />
                            </div>

                            <button type="submit"
                                className="w-full px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded text-lg">Login</button>
                        </Form>
                    </div>
                </div>
            </main>
        </>
    );
}