import * as React from "react";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Checkbox from "@mui/material/Checkbox";
import FilterByRow from "../components/FilterByRow";

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
        label: 'NAME',
    },
];

const SegmentTableHead = ({onSelectAllClick, numSelected, rowCount, handleFilter}) => {
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
                        style={{width: '45px'}}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.align}
                        padding={headCell.disablePadding ? 'checkbox' : 'normal'}
                        style={{width: '400px'}}

                    >
                        <FilterByRow
                            handleChangeFilter={handleFilter}
                            label={headCell.label}
                        />

                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

export default SegmentTableHead
