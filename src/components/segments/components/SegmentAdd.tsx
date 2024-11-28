import {Box, Button, TextField} from "@mui/material";

const SegmentAdd = ({segmentAddValue, handleSegmentAddValue, handleAddSegment,  isProcessAdd}) => {
    return (
        <Box margin={2} sx={{
            display: 'flex',
            bgcolor: 'background.paper',
            borderRadius: 1,
            boxShadow: 3,
            p: 3,
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