import { useState } from "react";
import { Formik } from "formik";
import * as Yup from 'yup';

const CreateUser = () => {
    const [message, setMessage] = useState(null); // Estado para mensajes de éxito/error

    const RegisterUser = async (values) => {
        // Obtener el token sin comillas adicionales
        const token = JSON.parse(localStorage.getItem('token'))?.replace(/"/g, "");

        if (!token) {
            setMessage("Error: No se encontró un token de autenticación. Inicia sesión primero.");
            return;
        }

        const bodyRegisterUser = {
            usuario: values.username, 
            password: values.password
        };
        
        try {
            const response = await fetch('http://localhost:5000/users', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token  // Quita el "Bearer" si no es necesario
                },
                body: JSON.stringify(bodyRegisterUser)  // Asegurarse de que se envía correctamente en formato JSON
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.log("Error en la respuesta del servidor:", errorData); // Depuración
                setMessage(`Error: ${errorData.msg || "Error en la creación del usuario"}`);
                return;
            }

            setMessage("Usuario creado exitosamente");

        } catch (error) {
            console.log("Error en la solicitud:", error);
            setMessage("Error en la solicitud. Por favor, intenta de nuevo.");
        }
    };

    const ValidationSchema = Yup.object().shape({
        password: Yup.string()
            .required("Es un campo requerido")
            .min(5, 'La contraseña debe tener al menos 5 caracteres'),
        username: Yup.string()
            .required("El nombre de usuario es requerido")
            .min(5, 'Mínimo 5 caracteres')
            .max(15, 'Máximo 15 caracteres')
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
                        onClick={() => RegisterUser(values)}
                        disabled={values.username === '' || values.password === '' || !isValid}
                    >
                        Crear Usuario
                    </button>

                    {/* Mostrar mensaje de éxito o error */}
                    {message && <p>{message}</p>}
                </form>
            )}
        </Formik>
    );
};

export default CreateUser;
