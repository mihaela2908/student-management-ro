import React from 'react';
import Table from './Table'; // importă componenta ta

const MyTablePage = () => {
    // Datele tale
    const data = [
        { id: 1, nume: 'Ion Popescu', email: 'ion@email.com', varsta: 25 },
        { id: 2, nume: 'Maria Ionescu', email: 'maria@email.com', varsta: 30 },
        { id: 3, nume: 'Andrei Pavel', email: 'andrei@email.com', varsta: 28 },
    ];

    // Definirea coloanelor
    const columns = [
        {
            accessorKey: 'id',
            header: 'ID',
            size: 80,
        },
        {
            accessorKey: 'nume',
            header: 'Nume',
            size: 200,
        },
        {
            accessorKey: 'email',
            header: 'Email',
            size: 250,
        },
        {
            accessorKey: 'varsta',
            header: 'Vârsta',
            size: 100,
        },
    ];

    return (
        <div>
            <h1>Lista utilizatori</h1>

            <Table
                data={data}
                columns={columns}
                isLoading={false}
                isFirstColumnPinned={true}
                hasPagination={true}
                pageSize={10}
                hasFiltering={true}
                hasSorting={true}
                tableHeight={400}
                paginationDirection="right"
            />
        </div>
    );
};

export default MyTablePage;