import BackButton from "../dashboard/BackButton";
import {Box, Button, Container, TextField, Typography} from "@mui/material";
import {useState} from "react";
import {useAuth} from "../auth/AuthProvider";
import {useNavigate} from "react-router-dom";
import {notifyInfo} from "../../toast/Notifies";
import PasswordTextField from "../auth/PasswordTextField";

const expression: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;


const RegisterPage = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const {register} = useAuth();
    const navigate = useNavigate();

    const validateData = () => {
        if (username.trim() == ""){
            notifyInfo("Логин не может быть пустым")
            return false
        }
        if (email.trim() == ""){
            notifyInfo("Почта не может быть пустой")
            return false
        }

        if (!expression.test(email)){
            notifyInfo("Введена неккоретная почта")
            return false
        }
        if (password.trim() == ""){
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

        if (validateData()){
            register({username: username, password: password, email: email}, navigate, '/dashboard');
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
                        Регистрация
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
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Почта"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            variant="outlined"
                            color="primary"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                            Зарегистрироваться
                        </Button>
                    </Box>
                </Box>
            </Container>
        </>
    )
}

export default RegisterPage;