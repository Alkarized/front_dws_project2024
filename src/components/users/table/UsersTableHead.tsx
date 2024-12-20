import * as React from "react";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Checkbox from "@mui/material/Checkbox";

type alignCell = 'inherit' | 'left' | 'center' | 'right' | 'justify';

interface HeadCell {
    disablePadding: boolean;
    id: string | number;
    label: string;
    align: alignCell;
}

const headCells: HeadCell[] = [
    {
        id: 'id',
        align: "left",
        disablePadding: true,
        label: 'ID',
    },
    {
        id: 'name',
        align: "left",
        disablePadding: false,
        label: 'Имя',
    },
    {
        id: 'description',
        align: "left",
        disablePadding: false,
        label: 'Описание',
    },
];

const UsersTableHead = () => {
    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.align}
                        padding={'normal'}
                        style={{width: '400px'}}

                    >
                        {headCell.label}
                    </TableCell>
                ))}
                <TableCell
                    padding={'normal'}
                    style={{width: '50px'}}

                >

                </TableCell>
            </TableRow>
        </TableHead>
    );
}

export default UsersTableHead
