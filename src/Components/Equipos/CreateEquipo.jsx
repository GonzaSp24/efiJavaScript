import { Formik, ErrorMessage } from "formik";
import * as Yup from 'yup';
import { useState } from 'react';

const CreateEquipo = () => {
    const [message, setMessage] = useState("");

    const RegisterEquipo = async (values, { resetForm }) => {  // Agrega resetForm para limpiar el formulario
        const token = JSON.parse(localStorage.getItem('token'))?.replace(/"/g, "");

        if (!token) {
            setMessage("Error: No se encontró un token de autenticación. Inicia sesión primero.");
            return;
        }

        const bodyRegisterEquipo = {
            nombre: values.nombre,
            modelo_id: values.modelo_id,
            categoria_id: values.categoria_id,
            costo: values.costo,
            stock_id: values.stock_id,
            marca_id: values.marca_id
        };

        try {
            const response = await fetch('http://localhost:5000/equipos', {
                method: 'POST',
                body: JSON.stringify(bodyRegisterEquipo),
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            if (response.ok) {
                setMessage("Equipo registrado con éxito");
                resetForm();  // Limpia el formulario después de un registro exitoso
            } else {
                const errorData = await response.json();
                setMessage(`Error: ${errorData.mensaje || "No tiene permisos"}`);
            }
        } catch (error) {
            console.error("Error al registrar el equipo:", error);
            setMessage("Error en la conexión. Inténtalo de nuevo.");
        }
    };

    const ValidationSchema = Yup.object().shape({
        nombre: Yup.string()
            .required("Es un campo requerido")
            .min(5, 'Mínimo 5 caracteres'),
        costo: Yup.number()
            .required("Ingrese el costo")
            .min(2, "El costo debe ser mayor a 2")
            .max(10000000, "El costo no debe superar los 10 millones"),
        modelo_id: Yup.number()
            .required("Seleccione un modelo"),
        categoria_id: Yup.number()
            .required("Seleccione una categoría"),
        stock_id: Yup.number()
            .required("Seleccione un stock"),
        marca_id: Yup.number()
            .required("Seleccione una marca")
    });

    return (
        <div>
            <h2>Registrar Nuevo Equipo</h2>
            {message && <p>{message}</p>}
            
            <Formik
                initialValues={{
                    nombre: '',
                    costo: '',
                    modelo_id: '',
                    categoria_id: '',
                    stock_id: '',
                    marca_id: ''
                }}
                validationSchema={ValidationSchema}
                onSubmit={RegisterEquipo}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isValid,
                }) => (
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>Nombre del Equipo</label>
                            <input
                                type="text"
                                name="nombre"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.nombre}
                            />
                            <ErrorMessage name="nombre" component="div" />
                        </div>

                        <div>
                            <label>Costo</label>
                            <input
                                type="number"
                                name="costo"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.costo}
                            />
                            <ErrorMessage name="costo" component="div" />
                        </div>

                        <div>
                            <label>Modelo ID</label>
                            <input
                                type="number"
                                name="modelo_id"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.modelo_id}
                            />
                            <ErrorMessage name="modelo_id" component="div" />
                        </div>

                        <div>
                            <label>Categoría ID</label>
                            <input
                                type="number"
                                name="categoria_id"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.categoria_id}
                            />
                            <ErrorMessage name="categoria_id" component="div" />
                        </div>

                        <div>
                            <label>Stock ID</label>
                            <input
                                type="number"
                                name="stock_id"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.stock_id}
                            />
                            <ErrorMessage name="stock_id" component="div" />
                        </div>

                        <div>
                            <label>Marca ID</label>
                            <input
                                type="number"
                                name="marca_id"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.marca_id}
                            />
                            <ErrorMessage name="marca_id" component="div" />
                        </div>

                        <button type="submit" disabled={!isValid || !values.nombre || !values.costo || !values.modelo_id || !values.categoria_id || !values.stock_id || !values.marca_id}>
                            Cargar equipo
                        </button>
                    </form>
                )}
            </Formik>
        </div>
    );
};

export default CreateEquipo;

