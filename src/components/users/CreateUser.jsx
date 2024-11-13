import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateUser = () => {
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const navigate = useNavigate();

  const ValidationSchema = Yup.object().shape({
    username: Yup.string()
      .required('Debe tener un nombre de usuario')
      .min(5, 'Mínimo 5 caracteres')
      .max(20, 'Máximo 20 caracteres'),
    password: Yup.string()
      .required('Requerido')
      .min(5, 'Mínimo 5 caracteres')
      .max(20, 'Máximo 20 caracteres'),
  });

  const token = JSON.parse(localStorage.getItem('token'));

  const RegisterUser = async (values) => {
    const bodyRegisterUser = {
      usuario: values.username,
      contrasenia: values.password,
    };

    try {
      const response = await fetch('http://127.0.0.1:5000/users', {
        method: 'POST',
        body: JSON.stringify(bodyRegisterUser),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`,
        },
      });

      if (!response.ok) {
        console.log('Hubo un error en la llamada a la API');
        setMessage('Error en la creación del usuario.');
        setMessageType('error');
        return;
      }

      const data = await response.json();
      console.log('Usuario creado:', data);
      setMessage('Usuario creado correctamente.');
      setMessageType('success');
      setTimeout(() => {
        navigate('/usuarios');
      }, 2000);
    } catch (error) {
      console.error('Error al crear el usuario:', error);
      setMessage('Error en la conexión con el servidor.');
      setMessageType('error');
    }
  };

  return (
    <div className="login-form-container">
      <h2>Crear Usuario</h2>
      <Formik
        initialValues={{ password: '', username: '' }}
        validationSchema={ValidationSchema}
        onSubmit={(values, { setSubmitting }) => {
          console.log('Formulario enviado', values);
          RegisterUser(values);
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
            <button
              type="submit"
              disabled={!isValid || isSubmitting}
              className="login-button"
            >
              Crear Usuario
            </button>
            {message && (
              <div className={`message-box ${messageType}`}>
                {message}
              </div>
            )}
          </form>
        )}
      </Formik>
    </div>
  );
};

export default CreateUser;
