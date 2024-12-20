import {Container, TextField, Button, Typography, Box, createTheme, ThemeProvider, InputAdornment} from '@mui/material';
import {useNavigate} from "react-router-dom";
import {useAuth} from "../auth/AuthProvider";
import {useState} from "react";
import BackButton from "../dashboard/BackButton";
import {notifyInfo} from "../../toast/Notifies";
import IconButton from "@mui/material/IconButton";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import PasswordTextField from "../auth/PasswordTextField";

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    const {login} = useAuth();
    const navigate = useNavigate();

    const validateDataLogin = () => {
        if (username.trim() === ""){
            notifyInfo("Логин не может быть пустым")
            return false
        }
        if (password.trim() === ""){
            notifyInfo("Пароль не может быть пустым")
            return false
        }
        if (password.trim().length <= 7 || password.trim().length >= 256) {
            notifyInfo("Пароль должен быть не меньше 8 и не болл 255 символов")
            return false
        }
        return true
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateDataLogin()){
            login({username: username, password: password}, navigate, '/dashboard');
        }

    };

    return (
        <>
            <BackButton/>
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
                    <Box component="form" sx={{mt: 1}}>
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
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <PasswordTextField
                            password={password}
                            setPassword={setPassword}
                        />
                        <Button
                            onClick={handleSubmit}
                            fullWidth
                            variant="contained"
                            color="primary"
                            sx={{mt: 3, mb: 2}}
                        >
                            Войти
                        </Button>
                    </Box>
                </Box>
            </Container>
        </>
    )
}

export default LoginPage