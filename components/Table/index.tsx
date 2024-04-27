import TableRoot from "./TableRoot";
import TableHead from "./TableHead";
import TableBody from "./TableBody";
import TableRow from "./TableRow";
import TableCell from "./TableCell";

export const Table = {
    Root: TableRoot,
    Head: TableHead, 
    Body: TableBody,
    Row: TableRow,
    Cell: TableCell,
};


// Exemplo pra usar depois kk
const tableData = [
    {
        id: 1,
        name: 'Português',
    },
    {
        id: 2,
        name: 'Matemática',
    },
    {
        id: 3,
        name: 'Geografia',
    },
    {
        id: 4,
        name: 'História',
    },
];


<div className="grid grid-cols-1">
<PanelCodeHighlight title="Disciplinas">
    <Table.Root>
        <Table.Head>
            <th>ID</th>
            <th>Nome</th>
            <th className="text-center"></th>
        </Table.Head>
        <Table.Body>
            {tableData.map((data) => (
                <Table.Row key={data.id.toString()}>
                    <Table.Cell className="">{data.id}</Table.Cell>
                    <Table.Cell className="">{data.name}</Table.Cell>
                    <Table.Cell className="text-right">
                        <Tippy content="Editar">
                            <button type="button">
                                <IconPencil className="mr-3 text-primary" />
                            </button>
                        </Tippy>
                        <Tippy content="Excluir">
                            <button type="button">
                                <IconTrashLines className="text-danger" />
                            </button>
                        </Tippy>
                    </Table.Cell>
                </Table.Row>
            ))}
        </Table.Body>
    </Table.Root>
</PanelCodeHighlight>
</div>