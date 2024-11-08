import { useState } from 'react';

const EditEquipoForm = ({ equipo, onSave, onCancel }) => {
    const [formData, setFormData] = useState(equipo);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Nombre:
                <input 
                    type="text" 
                    name="nombre" 
                    value={formData.nombre} 
                    onChange={handleChange} 
                />
            </label>
            <label>
                Modelo ID:
                <input 
                    type="number" 
                    name="modelo_id" 
                    value={formData.modelo_id} 
                    onChange={handleChange} 
                />
            </label>
            <label>
                Categoría ID:
                <input 
                    type="number" 
                    name="categoria_id" 
                    value={formData.categoria_id} 
                    onChange={handleChange} 
                />
            </label>
            <label>
                Costo:
                <input 
                    type="number" 
                    name="costo" 
                    value={formData.costo} 
                    onChange={handleChange} 
                />
            </label>
            <button type="submit">Guardar</button>
            <button type="button" onClick={onCancel}>Cancelar</button>
        </form>
    );
};

export default EditEquipoForm;
