import {useState} from "react";
import {Box, Button, Modal, TextField, Typography} from "@mui/material";

const DistributeSegment = () => {

    const [isModalOpen, setModalOpen] = useState(false);
    const [percentage, setPercentage] = useState(0);
    const [email, setEmail] = useState('');
    const [ip, setIp] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ percentage, email, ip });
        setModalOpen(false);
    };

    const handleClose = () => {
        setModalOpen(false);
    };

    const handleChangePercentage = (value) => {
        if (value > 100){
            setPercentage(100)
        } else if (value < 0){
            setPercentage(1)
        } else {
            setPercentage(value.replace(/^0+/, ''))
        }

    }

    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
    };

    return (
        <>
            <Button variant="contained" color="primary" onClick={() => setModalOpen(true)}>
                Открыть окно
            </Button>

            <Modal open={isModalOpen} onClose={handleClose}>
                <Box sx={modalStyle}>
                    <Typography variant="h6" component="h2" gutterBottom>
                        Ввод данных
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Процент (1-100)"
                            type="number"
                            value={percentage}
                            onChange={(e) => handleChangePercentage(e.target.value)}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Почта"
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="IP"
                            type="text"
                            value={ip}
                            onChange={(e) => setIp(e.target.value)}
                            fullWidth
                            margin="normal"
                        />
                        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                            Отправить
                        </Button>
                        <Button type="button" onClick={handleClose} variant="outlined" color="secondary" sx={{ mt: 2, ml: 2 }}>
                            Закрыть
                        </Button>
                    </form>
                </Box>
            </Modal>
        </>
    )
}

export default DistributeSegment