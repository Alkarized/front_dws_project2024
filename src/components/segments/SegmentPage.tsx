import {Box, Button, Container, TextField, ThemeProvider} from "@mui/material";
import theme from "../../theme/Theme";
import SegmentTable from "./table/SegmentTable";

const SegmentPage = () => {
    return (
        <>
            <ThemeProvider theme={theme}>
                <Container component="main">
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
                            color="primary">
                        </TextField>
                        <Button>
                            Add new Segment
                        </Button>
                    </Box>

                    <SegmentTable/>
                </Container>
            </ThemeProvider>
        </>
    );
};

export default SegmentPage;