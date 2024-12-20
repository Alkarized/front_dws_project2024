import {useNavigate} from "react-router-dom";
import {Button} from "@mui/material";
import {ArrowBack} from "@mui/icons-material";

const BackButton = () => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate("/dashboard")
    };

    return (
        <Button
            onClick={handleBack}
            startIcon={<ArrowBack />}
            style={{ position: 'absolute', top: '16px', left: '16px' }}
        >
            Назад
        </Button>
    );
};

export default BackButton;