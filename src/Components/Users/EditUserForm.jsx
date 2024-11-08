import { useState } from 'react';

const EditUserForm = ({ user, onSave, onCancel }) => {
    // Estado local para manejar los datos del formulario
    const [formData, setFormData] = useState({
        username: user?.username || '', // Maneja caso undefined o null
        password: '', // Deja el campo de contraseña vacío inicialmente
        is_admin: user?.is_admin || false
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Llama a la función de guardado y pasa los datos actualizados
        onSave({ ...user, ...formData });
    };

    if (!user) {
        return <div>Error: No se seleccionó ningún usuario para editar.</div>;
    }

    return (
        <form onSubmit={handleSubmit} style={{ padding: '1rem', border: '1px solid #ccc', borderRadius: '8px', maxWidth: '400px', margin: '0 auto' }}>
            <h3>Editar Usuario</h3>
            <div style={{ marginBottom: '1rem' }}>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    style={{ width: '100%', padding: '0.5rem', marginBottom: '0.5rem' }}
                />
            </div>
            <div style={{ marginBottom: '1rem' }}>
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Deja en blanco para no cambiar"
                    style={{ width: '100%', padding: '0.5rem', marginBottom: '0.5rem' }}
                />
            </div>
            <div style={{ marginBottom: '1rem' }}>
                <label htmlFor="is_admin">Admin:</label>
                <input
                    type="checkbox"
                    id="is_admin"
                    name="is_admin"
                    checked={formData.is_admin}
                    onChange={handleChange}
                    style={{ marginLeft: '0.5rem' }}
                />
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
                <button type="submit" style={{ padding: '0.5rem 1rem', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px' }}>Guardar</button>
                <button type="button" onClick={onCancel} style={{ padding: '0.5rem 1rem', backgroundColor: '#f44336', color: 'white', border: 'none', borderRadius: '4px' }}>Cancelar</button>
            </div>
        </form>
    );
};

export default EditUserForm;
