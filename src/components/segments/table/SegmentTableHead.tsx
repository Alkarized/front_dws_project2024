import * as React from "react";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Checkbox from "@mui/material/Checkbox";
import {Data} from "./SegmentTable";

type alignCell = 'inherit' | 'left' | 'center' | 'right' | 'justify';

interface HeadCell {
    disablePadding: boolean;
    id: keyof Data;
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
        label: 'NAME',
    },
];

const SegmentTableHead = ({onSelectAllClick, numSelected, rowCount} ) => {
    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            'aria-label': 'select all desserts',
                        }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.align}
                        padding={headCell.disablePadding ? 'checkbox' : 'normal'}
                    >
                        <span>
                            {headCell.label}
                        </span>

                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

export default SegmentTableHead
