import { useState, useEffect } from 'react';
import UsersView from './UserView'; // Verifica que esta importación sea correcta
import EditUserForm from './EditUserForm'; // Verifica que este componente exista

const UsersContainer = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedUser, setSelectedUser] = useState(null);
    const token = localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null;

    const fetchUsers = async () => {
        if (!token) {
            console.log("Token no encontrado");
            setLoading(false);
            return;
        }
        try {
            const response = await fetch('http://localhost:5000/users', {
                headers: {
                    "Authorization": `${token}`, // Asegúrate de que el formato sea correcto
                    "Content-Type": "application/json"
                }
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Error en la consulta de usuarios:", errorData);
                setLoading(false);
                return;
            }

            const data = await response.json();
            setData(data);
        } catch (error) {
            console.error("Error al obtener los usuarios:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleDelete = async (id) => {
        if (!token) {
            console.log("Token no encontrado");
            return;
        }
        try {
            const response = await fetch(`http://localhost:5000/users/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Error al eliminar el usuario:", errorData);
                return;
            }

            console.log("Usuario eliminado correctamente");
            setData(data.filter(user => user.id !== id));
        } catch (error) {
            console.error("Error al intentar eliminar el usuario:", error);
        }
    };

    const handleUpdate = (id) => {
        const userToEdit = data.find(user => user.id === id);
        setSelectedUser(userToEdit || null);
    };

    const handleSaveEdit = async (updatedUser) => {
        if (!token) {
            console.log("Token no encontrado");
            return;
        }
        try {
            const response = await fetch(`http://localhost:5000/users/${updatedUser.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(updatedUser)
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Error al actualizar el usuario:", errorData);
                return;
            }

            const data = await response.json();
            console.log("Usuario actualizado correctamente", data);
            setData(prevData => prevData.map(user => (user.id === updatedUser.id ? data : user)));
            setSelectedUser(null);
        } catch (error) {
            console.error("Error al intentar actualizar el usuario:", error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {selectedUser ? (
                <EditUserForm 
                    user={selectedUser} 
                    onSave={handleSaveEdit} 
                    onCancel={() => setSelectedUser(null)} 
                />
            ) : (
                <UsersView 
                    data={data} 
                    handleDelete={handleDelete} 
                    handleUpdate={handleUpdate} 
                />
            )}
        </div>
    );
};

export default UsersContainer;
