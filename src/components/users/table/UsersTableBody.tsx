import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import * as React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";

const UsersTableBody = ({visibleRows, emptyRows, handleDeleteSegmentFromUser}) => {
    return (
        <TableBody>
            {visibleRows.map((row, index) => {
                const labelId = `segment-table-checkbox-${index}`;

                return (
                    <TableRow
                        key={row.id}
                    >
                        <TableCell
                            component="th"
                            id={labelId}
                            scope="row"
                            padding={'normal'}
                        >
                            {row.id}
                        </TableCell>

                        <TableCell
                            align="left"
                        >
                            {row.name}
                        </TableCell>

                        <TableCell
                            align="left"
                        >
                            {row.description}
                        </TableCell>
                        <TableCell
                            padding={'normal'}
                            style={{width: '50px'}}
                        >
                            <IconButton aria-label="delete" size="large" onClick={() => handleDeleteSegmentFromUser(row.id)}>
                                <DeleteIcon />
                            </IconButton>
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

export default UsersTableBody