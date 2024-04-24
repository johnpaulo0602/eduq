"use client"
import { Metadata } from 'next';
import IconTrashLines from '@/components/icon/icon-trash-lines';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import React from 'react';
import { Table } from '@/components/Table';
import PanelCodeHighlight from '@/components/panel-code-highlight';

const Disciplinas = () => {

    const tableData = [
        {
            id: 1,
            name: 'John Doe',
            email: 'johndoe@yahoo.com',
            date: '10/08/2020',
            sale: 120,
            status: 'Complete',
            register: '5 min ago',
            progress: '40%',
            position: 'Developer',
            office: 'London',
        },
        {
            id: 2,
            name: 'Shaun Park',
            email: 'shaunpark@gmail.com',
            date: '11/08/2020',
            sale: 400,
            status: 'Pending',
            register: '11 min ago',
            progress: '23%',
            position: 'Designer',
            office: 'New York',
        },
        {
            id: 3,
            name: 'Alma Clarke',
            email: 'alma@gmail.com',
            date: '12/02/2020',
            sale: 310,
            status: 'In Progress',
            register: '1 hour ago',
            progress: '80%',
            position: 'Accountant',
            office: 'Amazon',
        },
        {
            id: 4,
            name: 'Vincent Carpenter',
            email: 'vincent@gmail.com',
            date: '13/08/2020',
            sale: 100,
            status: 'Canceled',
            register: '1 day ago',
            progress: '60%',
            position: 'Data Scientist',
            office: 'Canada',
        },
    ];

    return (
<div className="grid grid-cols-1">
    <PanelCodeHighlight title="Disciplinas">
    <Table.Root>
        <Table.Head>
            <th>Name</th>
            <th>Date</th>
            <th>Sale</th>
            <th>Status</th>
            <th className="text-center">Action</th>
        </Table.Head>
        <Table.Body>
            {tableData.map((data) => (
                <Table.Row key={data.id.toString()}>
                    <Table.Cell className="">{data.name}</Table.Cell>
                    <Table.Cell className="">{data.date}</Table.Cell>
                    <Table.Cell className="">{data.sale.toString()}</Table.Cell>
                    <Table.Cell className={`whitespace-nowrap ${
                        data.status === 'completed'
                            ? 'text-success'
                            : data.status === 'Pending'
                            ? 'text-secondary'
                            : data.status === 'In Progress'
                            ? 'text-info'
                            : data.status === 'Canceled'
                            ? 'text-danger'
                            : 'text-success'
                    }`}>
                        {data.status}
                    </Table.Cell>
                    <Table.Cell className="text-center">
                        <Tippy content="Delete">
                            <button type="button">
                                <IconTrashLines className="m-auto" />
                            </button>
                        </Tippy>
                    </Table.Cell>
                </Table.Row>
            ))}
        </Table.Body>
    </Table.Root>
    </PanelCodeHighlight>
</div>
    );
};

export default Disciplinas;

