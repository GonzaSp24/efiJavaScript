import { Formik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginUser = () => {
    const [message, setMessage] = useState('');
    const navigate = useNavigate(); 

    const onLoginUser = async (values) => {
        const bodyLoginUser = btoa(
            `${values.username}:${values.password}`
        );

        const response = await fetch('http://127.0.0.1:5000/login', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Basic ${bodyLoginUser}`  
            },
            body: JSON.stringify({
                username: values.username,
                password: values.password
            })
        });

        if (!response.ok) {
            console.log("Hubo un error en la llamada a la API");
            setMessage('Error en la conexión con el servidor');
            return;
        }

        const data = await response.json();

        if (data.Token) {
            console.log('Token recibido', data.Token);
            localStorage.setItem('token', JSON.stringify(data.Token));
            setMessage('Inicio de sesión exitoso');

            setTimeout(() => {
                navigate('/'); 
            }, 1500);  
        } else {
            console.log('No se recibió el token');
            setMessage('Nombre o usuario incorrecto');
        }

        console.log(data.Token);
    };    

    const ValidationSchema = Yup.object().shape({
        username: Yup.string()
            .required('Debes ingresar un nombre de usuario')
            .min(3, 'mínimo 3 caracteres')
            .max(20, 'máximo 20 caracteres'),
        password: Yup.string()
            .required('Requerido')
            .min(5, 'mínimo 5 caracteres'),  
    });

    return (
        <div className="login-form-container">
            <h2>Iniciar Sesión</h2>
            <Formik
                initialValues={{ password: '', username: '' }}
                validationSchema={ValidationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    console.log('Formulario enviado', values);
                    onLoginUser(values);
                    setSubmitting(false);
                }}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                    isValid
                }) => (
                    <form onSubmit={handleSubmit} className="login-form">
                        <div className="form-field">
                            <input
                                type="text"
                                name="username"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.username}
                                placeholder="Nombre de usuario"
                                className="input-field"
                            />
                            {errors.username && touched.username && (
                                <div className="error-message">{errors.username}</div>
                            )}
                        </div>
                        <div className="form-field">
                            <input
                                type="password"
                                name="password"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password}
                                placeholder="Contraseña"
                                className="input-field"
                            />
                            {errors.password && touched.password && (
                                <div className="error-message">{errors.password}</div>
                            )}
                        </div>
                        <button type="submit" disabled={values.password === '' || values.username === '' || !isValid || isSubmitting} className="login-button">
                            Iniciar Sesión
                        </button>
                        {message && (
                            <div className={`message-box ${message === 'Inicio de sesión exitoso' ? 'success' : 'error'}`}>
                                {message}
                            </div>
                        )}
                    </form>
                )}
            </Formik>
        </div>
    );
};

export default LoginUser;
