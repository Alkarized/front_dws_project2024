import {Box, Button, TextField, Typography} from "@mui/material";
import {useState} from "react";

const UserInput = ({userSetter}) => {
    const [value, setValue] = useState(1);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        let value = e.target.value

        if (value <= 1){
            setValue(1)
        } else {
            setValue(parseInt(value));
        }
    };

    const handleSubmit = () => {
        const numValue = value;

        if (isNaN(numValue) || numValue <= 0) {
            setError(true);
            setErrorMessage('Пожалуйста, введите число больше 0');
        } else {
            setError(false);
            setErrorMessage('');

            userSetter(numValue)
        }
    };

    return (
        <>
            <Box sx={{ display: 'flex', flexDirection: 'column', width: 300, margin: '0 auto' }}>
                <Typography variant="h6" gutterBottom>
                    Введите ID клиента
                </Typography>

                <TextField
                    label="Число"
                    value={value}
                    onChange={handleChange}
                    error={error}
                    helperText={errorMessage}
                    type="number"
                    variant="outlined"
                    fullWidth
                    sx={{ marginBottom: 2 }}
                />

                <Button
                    onClick={handleSubmit}
                    variant="contained"
                    color="primary"
                    fullWidth
                >
                    Отправить
                </Button>
            </Box>
        </>
    )
}

export default UserInput;