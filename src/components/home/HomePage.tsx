import {useNavigate} from "react-router-dom";
import {Box, Button, Container, Stack, Typography} from "@mui/material";
import {getSegmentsOnPage} from "../../api/SegmentApi";
import {useEffect} from "react";

const HomePage = () => {
    const navigate = useNavigate();

    const handleClickLogin = () => {
        navigate("/login")
    }

    const handleClickRegister = () => {
        navigate("/register")
    }

    const handleClickDashboard = () => {
        navigate("/dashboard")
    }

    useEffect(()=>{
        getSegmentsOnPage(5, 1).then((e) => {
            console.log(e.data)
        })
    })

    return (
        <>
            <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    bgcolor: 'background.paper',
                    borderRadius: 1,
                    boxShadow: 3,
                    p: 3,
                }}
            >
                <Typography component="h1" variant="h5" color="secondary">
                    WelcomePage
                </Typography>
                <Stack spacing={4} direction="column" maxWidth={300}>
                    <Button variant="outlined" onClick={handleClickLogin}>Логин</Button>
                    <Button variant="outlined" onClick={handleClickRegister}>Регистрация</Button>
                    <Button variant="outlined" onClick={handleClickDashboard}>Дэшборд</Button>
                </Stack>
            </Box>
            </Container>
        </>
    )
}

export default HomePage;