import {Container, ThemeProvider} from "@mui/material";
import theme from "../../theme/Theme";
import SegmentTable from "./table/SegmentTable";

const SegmentPage = () => {
    return (
        <>
            <ThemeProvider theme={theme}>
                <Container component="main">
                    <SegmentTable
                    />
                </Container>
            </ThemeProvider>
            <div> Вопрос про контролл флоу: <br/>
                Есть toast, который всплывает по факту окончания вызова API1, то есть до вызова получения данных с сервера или после их получения? <br/>
                2 примера, add и change elem
            </div>
        </>
    );
};

export default SegmentPage;