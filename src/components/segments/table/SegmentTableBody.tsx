import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Checkbox from "@mui/material/Checkbox";
import TableBody from "@mui/material/TableBody";
import * as React from "react";
import EditableElement from "../../editable/EditableElement";

const SegmentTableBody = ({visibleRows, selected, handleClick, emptyRows}) => {
    return (
        <TableBody>
            {visibleRows.map((row, index) => {
                const isItemSelected = selected.indexOf(row.id) !== -1;
                const labelId = `segment-table-checkbox-${index}`;

                return (
                    <TableRow
                        hover
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.id}
                        selected={isItemSelected}
                    >
                        <TableCell
                            padding="checkbox"
                            sx={{cursor: 'pointer'}}
                            onClick={(event) => handleClick(event, row.id)}
                        >
                            <Checkbox
                                color="primary"
                                checked={isItemSelected}
                                inputProps={{
                                    'aria-labelledby': labelId,
                                }}
                            />
                        </TableCell>

                        <TableCell
                            component="th"
                            id={labelId}
                            scope="row"
                            padding="none"
                        >
                            {row.id}
                        </TableCell>

                        <TableCell
                            align="left"
                        >
                            <EditableElement/>
                        </TableCell>
                    </TableRow>
                );
            })}

            {emptyRows > 0 && (
                <TableRow
                    style={{
                        height: (53) * emptyRows,
                    }}
                >
                    <TableCell colSpan={6}/>
                </TableRow>
            )}
        </TableBody>
    )
}

export default SegmentTableBody