import { useState } from "react";
import { Formik } from "formik";
import * as Yup from 'yup';

const LoginUser = () => {
    const [message, setMessage] = useState(null); // Estado para mensaje de éxito/error

    const onLoginUser = async (values) => {
        try {
            const bodyLoginUser = btoa(`${values.username}:${values.password}`);
    
            const response = await fetch('http://127.0.0.1:5000/login', {
                method: 'POST',
                headers: {
                    "Authorization": `Basic ${bodyLoginUser}`,
                    "Content-Type": "application/json"
                }
            });
    
            if (!response.ok) {
                throw new Error("Error en la solicitud");
            }
            const data = await response.json();
            localStorage.setItem('token', JSON.stringify(data.Token));
            console.log(data.Token);
        } catch (error) {
            console.error("Error:", error);
        }
    };
    
    const ValidationSchema = Yup.object().shape({
        password: Yup.string()
            .required('Es un campo requerido')
            .min(5, 'Mínimo 5 caracteres'),
        username: Yup.string()
            .min(5, 'Mínimo 5 caracteres')
            .max(15, 'Máximo 15 caracteres')
            .required('Nombre de usuario es requerido')
    });

    return (
        <Formik
            initialValues={{ password: '', username: '' }}
            validationSchema={ValidationSchema}
        >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                isValid
            }) => (
                <form>
                    <input
                        type="text"
                        name="username"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.username}
                    />
                    {errors.username && touched.username && errors.username}

                    <input
                        type="password"
                        name="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                    />
                    {errors.password && touched.password && errors.password}

                    <button
                        type="button"
                        onClick={() => onLoginUser(values)}
                        disabled={values.username === '' || values.password === '' || !isValid}
                    >
                        Iniciar sesión
                    </button>

                    {/* Mostrar mensaje de éxito o error */}
                    {message && <p>{message}</p>}
                </form>
            )}
        </Formik>
    );
};

export default LoginUser;
