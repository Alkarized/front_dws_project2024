import {useNavigate} from "react-router-dom";
import {Button} from "@mui/material";
import {Logout} from "@mui/icons-material";
import {useAuth} from "./AuthProvider";

const LogoutButton = () => {
    const navigate = useNavigate();
    const {logout} = useAuth();

    const handleBack = () => {
        logout()
        navigate("/")
    };

    return (
        <Button
            onClick={handleBack}
            startIcon={<Logout/>}
            style={{ position: 'absolute', top: '16px', right: '16px' }}
        >
            Выход
        </Button>
    );
}

export default LogoutButton