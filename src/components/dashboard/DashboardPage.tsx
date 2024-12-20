import {useNavigate} from "react-router-dom";
import {Box, Button, Container, Stack, Typography} from "@mui/material";
import LogoutButton from "../auth/LogoutButton";

const DashboardPage = () => {
    const navigate = useNavigate();

    const handleClickSegments = () => {
        navigate("/segments")
    }

    const handleClickUsers = () => {
        navigate("/users")
    }

    return (
        <>
            <LogoutButton/>
            <Container component="main">
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        bgcolor: 'background.paper',
                        borderRadius: 1,
                        boxShadow: 5,
                        p: 2,
                        m: 1,
                    }}
                >
                    <Typography component="h1" variant="h4" color="primary">
                        Dashboard
                    </Typography>
                    <Stack spacing={2} direction="column" maxWidth={500}>
                        <Button variant="outlined" onClick={handleClickSegments}>На сегменты</Button>
                        <Button variant="outlined" onClick={handleClickUsers}>На пользователей</Button>
                    </Stack>
                </Box>
            </Container>
        </>
    )
}

export default DashboardPage;