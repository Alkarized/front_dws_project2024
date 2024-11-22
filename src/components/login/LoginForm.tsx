import {Container, TextField, Button, Typography, Box, createTheme, ThemeProvider} from '@mui/material';
import theme from "../../theme/Theme";

const LoginForm = () => {

    const handleSubmit = () => {
        console.log("test")
    }

    return (
        <>
            <ThemeProvider theme={theme}>
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
                            Вход
                        </Typography>
                        <Box component="form"  sx={{mt: 1}}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Имя пользователя"
                                name="username"
                                autoComplete="username"
                                autoFocus
                                variant="outlined"
                                color="primary"
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Пароль"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                variant="outlined"
                                color="primary"
                            />
                            <Button
                                onClick={handleSubmit}
                                fullWidth
                                //type="submit"
                                variant="contained"
                                color="primary"
                                sx={{mt: 3, mb: 2}}
                            >
                                Войти
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        </>
    )
}

export default LoginForm