import { Fragment } from 'react';
import { ProgressSpinner } from 'primereact/progressspinner';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

const UsersView = ({ loadingData, data, handleDelete, handleUpdate }) => {
    const bodyIsAdmin = (rowData) => {
        return rowData.is_admin ? <span>SI</span> : <span>NO</span>;
    };

    const bodyActions = (rowData) => {
        return (
            <div style={{ display: 'flex', gap: '0.5rem' }}>
                <Button 
                    label="Eliminar" 
                    className="p-button-danger" 
                    onClick={() => handleDelete(rowData.id)} 
                />
                <Button 
                    label="Editar" 
                    className="p-button-secondary" 
                    onClick={() => handleUpdate(rowData.id)} 
                />
            </div>
        );
    };

    return (
        <Fragment>
            {loadingData ? (
                <ProgressSpinner />
            ) : (
                <DataTable value={data} tableStyle={{ minWidth: '50rem' }}>
                    <Column field="username" header="Username" />
                    <Column field="is_admin" header="Admin" body={bodyIsAdmin} />
                    <Column header="Acciones" body={bodyActions} />
                </DataTable>
            )}
        </Fragment>
    );
};

export default UsersView;
