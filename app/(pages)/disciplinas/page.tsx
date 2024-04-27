"use client"
import { Metadata } from 'next';
import IconTrashLines from '@/components/icon/icon-trash-lines';
import IconPencil from '@/components/icon/icon-pencil';
import IconEye from '@/components/icon/icon-eye';
import Tippy from '@tippyjs/react';
import { Group } from '@mantine/core';
import { DataTable } from 'mantine-datatable';
import { useEffect, useState, useCallback } from 'react';
import 'tippy.js/dist/tippy.css';
import React from 'react';
import Breadcrumb from '@/components/layouts/Breadcrumb';


const rowData = [
    { id: 1, name: 'Algoritmos e Programação Estruturada' },
    { id: 2, name: 'Lógica Computacional' },
    { id: 3, name: 'Arquitetura e Organização de Computadores' },
    { id: 4, name: 'Programação Orientada a Objetos' },
    { id: 5, name: 'Banco de Dados' },
    { id: 6, name: 'Desenvolvimento Web I' },
    { id: 7, name: 'Desenvolvimento Web II' },
    { id: 8, name: 'Sistemas Operacionais' },
    { id: 9, name: 'Redes de Computadores' },
    { id: 10, name: 'Projeto de Software' },
    { id: 11, name: 'Metodologias de Desenvolvimento de Software' },
    { id: 12, name: 'Gerenciamento de Projetos' },
    { id: 13, name: 'Inglês Técnico' },
    { id: 14, name: 'Matemática para Computação' },
    { id: 15, name: 'Probabilidade e Estatística' },
    { id: 16, name: 'Ética e Legislação em Informática' },
    { id: 17, name: 'Comunicação e Expressão' },
    { id: 18, name: 'Empreendedorismo e Inovação' },
];

interface Record {
    id: number;
    name: string;
    textAlign?: 'left' | 'center' | 'right';
}

const Disciplinas = () => {
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
            item.name.toLowerCase().includes(lowercasedSearch)
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
            <Breadcrumb items={[
                { label: 'Home', path: '/' },
                { label: 'Disciplinas' }
            ]} />
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
                            { accessor: 'name', title: 'Nome da Disciplina' },
                            {
                                accessor: 'actions',
                                title: '',
                                textAlign: 'right',
                                render: () => (
                                    <Group style={{ justifyContent: 'flex-end' }}>
                                        <Tippy content="Ver">
                                            <button type="button">
                                                <IconEye className="mr-3 text-primary" />
                                            </button>
                                        </Tippy>
                                        <Tippy content="Editar">
                                            <button type="button">
                                                <IconPencil className="mr-3 text-warning" />
                                            </button>
                                        </Tippy>
                                        <Tippy content="Excluir">
                                            <button type="button">
                                                <IconTrashLines className="text-danger" />
                                            </button>
                                        </Tippy>
                                    </Group>
                                ),
                            },
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

export default Disciplinas;