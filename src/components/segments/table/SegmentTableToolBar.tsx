import Toolbar from "@mui/material/Toolbar";
import {alpha} from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import * as React from "react";

const SegmentTableToolBar = ({handleDeleteSegments, numSelected}) => {
    const ToolBarName = "Semgents"

    const handleFilter = () => {
        console.log("filter pressed");
    }

    return (
        <Toolbar
            sx={[
                {
                    pl: {sm: 2},
                    pr: {xs: 1, sm: 1},
                },
                numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                },
            ]}
        >
            {numSelected > 0 ? (
                <>
                    <Typography
                        sx={{flex: '1 1 100%'}}
                        color="inherit"
                        variant="subtitle1"
                        component="div"
                    >
                        {numSelected} selected
                    </Typography>
                    <Tooltip title="Delete">
                        <IconButton
                            onClick={handleDeleteSegments}
                        >
                            <DeleteIcon/>
                        </IconButton>
                    </Tooltip>
                </>
            ) : (
                <>
                    <Typography
                        sx={{flex: '1 1 100%'}}
                        variant="h6"
                        id="tableTitle"
                        component="div"
                    >
                        {ToolBarName}
                    </Typography>
                    <Tooltip title="Filter list">
                        <IconButton onClick={handleFilter}>
                            <FilterListIcon/>
                        </IconButton>
                    </Tooltip>
                </>

            )}
        </Toolbar>
    );
}

export default SegmentTableToolBar