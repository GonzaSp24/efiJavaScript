import { Fragment } from "react";
import { ProgressSpinner } from "primereact/progressspinner";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from "primereact/button";

const EquiposView = ({ loadingData, data, handleDelete, handleUpdate }) => {
    // Función para manejar las acciones de borrar y editar
    const bodyActions = (row) => {
        return (
            <div style={{ display: 'flex', gap: '0.5rem' }}>
                <Button 
                    label="Borrar" 
                    className="custom-delete-button p-button-danger" 
                    onClick={() => handleDelete(row.id)} 
                />
                <Button 
                    label="Editar" 
                    className="custom-edit-button p-button-warning" 
                    onClick={() => handleUpdate(row.id)} 
                />
            </div>
        );
    };
    

    return (
        <Fragment>
            {loadingData ? (
                <ProgressSpinner /> 
            ) : data.length > 0 ? (
                <DataTable 
                    value={data} 
                    paginator 
                    rows={10} 
                    tableStyle={{ minWidth: '50rem' }}
                >
                    <Column field="nombre" header="Nombre" />
                    <Column field="modelo_id" header="ID Modelo" />
                    <Column field="categoria_id" header="ID Categoria" />
                    <Column field="costo" header="Costo" />
                    <Column body={bodyActions} header="Acciones" />
                </DataTable>
            ) : (
                <p>No hay datos disponibles.</p>
            )}
        </Fragment>
    );
};

export default EquiposView;
