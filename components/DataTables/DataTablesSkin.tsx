'use client';
import { DataTable } from 'mantine-datatable';
import { useEffect, useState, useCallback } from 'react';

const rowData = [
    {
        id: 1,
        firstName: 'Caroline',
        lastName: 'Jensen',
        email: 'carolinejensen@zidant.com',
        dob: '2004-05-28',
        address: {
            street: '529 Scholes Street',
            city: 'Temperanceville',
            zipcode: 5235,
            geo: {
                lat: 23.806115,
                lng: 164.677197,
            },
        },
        phone: '+1 (821) 447-3782',
        isActive: true,
        age: 39,
        company: 'POLARAX',
    },
];

interface Record {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    dob: string;
    address: {
        street: string;
        city: string;
        zipcode: number;
        geo: {
            lat: number;
            lng: number;
        };
    };
    phone: string;
    isActive: boolean;
    age: number;
    company: string;
}

const ComponentsDatatablesSkin = () => {
    const PAGE_SIZES = [10, 20, 30, 50, 100];

    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [filteredRecords, setFilteredRecords] = useState(rowData);
    const [displayRecords, setDisplayRecords] = useState<Record[]>([]);
    const [searchTerm, setSearchTerm] = useState('');

    const filterRecords = useCallback(() => {
        const lowercasedSearch = searchTerm.toLowerCase();
        return rowData.filter((item) => (
            item.id.toString().includes(lowercasedSearch) ||
            item.firstName.toLowerCase().includes(lowercasedSearch) ||
            item.lastName.toLowerCase().includes(lowercasedSearch) ||
            item.email.toLowerCase().includes(lowercasedSearch) ||
            item.phone.toLowerCase().includes(lowercasedSearch)
        ));
    }, [searchTerm]);

    useEffect(() => {
        setPage(1);
    }, [pageSize]);

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setDisplayRecords(() => filteredRecords.slice(from, to));
    }, [page, pageSize, filteredRecords]);

    useEffect(() => {
        const newFilteredRecords = filterRecords();
        setFilteredRecords(newFilteredRecords);
    }, [searchTerm, filterRecords]);

    return (
        <>
            <div className="panel">
                <div className="mb-5 flex items-center justify-between">
                    <h5 className="text-lg font-semibold dark:text-white-light">Disciplinas</h5>
                    <input
                        type="text"
                        className="form-input w-auto"
                        placeholder="Buscar..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="datatables">
                    <DataTable
                        highlightOnHover
                        className="table-hover whitespace-nowrap"
                        records={displayRecords}
                        columns={[
                            { accessor: 'id', title: 'ID' },
                            { accessor: 'firstName', title: 'First Name' },
                            { accessor: 'lastName', title: 'Last Name' },
                            { accessor: 'email' },
                            { accessor: 'phone', title: 'Phone No.' },
                        ]}
                        totalRecords={filteredRecords.length}
                        recordsPerPage={pageSize}
                        page={page}
                        onPageChange={setPage}
                        recordsPerPageOptions={PAGE_SIZES}
                        onRecordsPerPageChange={setPageSize}
                        minHeight={200}
                        paginationText={({ from, to, totalRecords }) => `Showing ${from} to ${to} of ${totalRecords} entries`}
                    />
                </div>
            </div>
        </>
    );
};

export default ComponentsDatatablesSkin;
