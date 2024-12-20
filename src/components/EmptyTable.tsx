import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import * as React from "react";

const EmptyTable = () => {
    return (
        <TableBody>
            <TableRow>
                <TableCell
                    colSpan={4}
                    height={"600px"}
                    align="center"
                    valign="middle"
                >
                    <img src="/cote.jpeg" alt="Nothing to see" />
                </TableCell>
            </TableRow>
        </TableBody>
    )
}

export default EmptyTable;