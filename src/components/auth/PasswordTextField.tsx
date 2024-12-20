import {InputAdornment, TextField} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {useState} from "react";

const PasswordTextField = ({password, setPassword}) => {
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);

    return (
        <TextField
            label="Пароль"
            variant="outlined"
            name="password"
            id="password"
            margin="normal"
            required
            fullWidth
            color="primary"
            autoComplete="current-password"
            type={showPassword ? "text" : "password"}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                        >
                            {showPassword ?  <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                )
            }}
        />
    )
}

export default PasswordTextField;