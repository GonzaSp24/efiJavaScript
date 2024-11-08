import { useState, useEffect } from 'react';
import EquiposView from './EquiposView.jsx';
import EditEquipoForm from './EditEquipoForm.jsx';

const EquiposContainer = () => {
    const [data, setData] = useState([]);
    const [loadingData, setLoadingData] = useState(true);
    const [selectedEquipo, setSelectedEquipo] = useState(null);
    const token = JSON.parse(localStorage.getItem('token'));

    const getDataEquipo = async () => {
        if (!token) {
            console.log("Token no encontrado");
            setLoadingData(false);
            return;
        }
        try {
            const response = await fetch("http://localhost:5000/equipos", {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            if (!response.ok) {
                throw new Error("Hubo un error en la consulta");
            }
            const data = await response.json();
            // Filtrar equipos que no están eliminados (borrado lógico)
            const filteredData = data.filter(equipo => !equipo.eliminado);
            setData(filteredData);
        } catch (error) {
            console.log("Hubo un error en la API:", error.message);
            setData([]);
        } finally {
            setLoadingData(false);
        }
    };

    useEffect(() => {
        getDataEquipo();
    }, [token]);

    const handleDelete = async (id) => {
        if (!token) {
            console.log("Token no encontrado");
            return;
        }
        try {
            const response = await fetch(`http://localhost:5000/equipos/${id}`, {
                method: 'PUT', // Cambiado de PATCH a PUT
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ eliminado: true }) // Soft delete
            });
    
            if (!response.ok) {
                console.error("Error al borrar el equipo");
                return;
            }
    
            console.log("Equipo eliminado (soft delete) correctamente");
            // Actualiza la lista de equipos después de borrar
            setData(data.filter(equipo => equipo.id !== id));
        } catch (error) {
            console.error("Error al intentar borrar el equipo:", error);
        }
    };
    

    const handleUpdate = (id) => {
        const equipoToEdit = data.find(equipo => equipo.id === id);
        setSelectedEquipo(equipoToEdit);
    };

    const handleSaveEdit = async (updatedEquipo) => {
        if (!token) {
            console.log("Token no encontrado");
            return;
        }
        try {
            const response = await fetch(`http://localhost:5000/equipos/${updatedEquipo.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(updatedEquipo)
            });

            if (!response.ok) {
                console.error("Error al actualizar el equipo");
                return;
            }

            console.log("Equipo actualizado correctamente");
            // Actualiza la lista de equipos
            setData(data.map(equipo => (equipo.id === updatedEquipo.id ? updatedEquipo : equipo)));
            setSelectedEquipo(null);
        } catch (error) {
            console.error("Error al intentar actualizar el equipo:", error);
        }
    };

    return (
        <div>
            {selectedEquipo ? (
                <EditEquipoForm 
                    equipo={selectedEquipo} 
                    onSave={handleSaveEdit} 
                    onCancel={() => setSelectedEquipo(null)} 
                />
            ) : (
                <EquiposView 
                    loadingData={loadingData} 
                    data={data} 
                    handleDelete={handleDelete} 
                    handleUpdate={handleUpdate} 
                />
            )}
        </div>
    );
};

export default EquiposContainer;
