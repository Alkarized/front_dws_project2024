import {Box, Button, TextField} from "@mui/material";

const SegmentAdd = ({segmentAddValue, handleSegmentAddValue, segmentDescription, handleSegmentDescription, handleAddSegment,  isProcessAdd}) => {
    return (
        <Box margin={2} sx={{
            display: 'flex',
            bgcolor: 'background.paper',
            justifyContent: "space-between",
            borderRadius: 3,
            boxShadow: 3,
            p: 1,
            width: 700

        }}>
            <TextField
                id="newSegment"
                label="Название сегмента"
                name="newSegment"
                variant="outlined"
                color="primary"
                value={segmentAddValue}
                onChange={handleSegmentAddValue}
            />
            <TextField
                id="newDesc"
                label="Описание сегмента"
                name="newDesc"
                variant="outlined"
                color="primary"
                value={segmentDescription}
                onChange={handleSegmentDescription}
            />
            <Button
                disabled={isProcessAdd}
                onClick={handleAddSegment}
            >
                Добавить новый сегмент
            </Button>
        </Box>
    )
}

export default SegmentAdd