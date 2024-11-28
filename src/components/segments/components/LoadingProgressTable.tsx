import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import {CircularProgress} from "@mui/material";
import * as React from "react";
import TableBody from "@mui/material/TableBody";

const LoadingProgressTable = ({rowsPerPage}) => {
    return (
        <TableBody>
            <TableRow>
                <TableCell
                    colSpan={6}
                    align="center"
                    style={{
                        height: (49*rowsPerPage),
                    }}
                >
                    <CircularProgress />
                </TableCell>
            </TableRow>
        </TableBody>

    )
}

export default LoadingProgressTable