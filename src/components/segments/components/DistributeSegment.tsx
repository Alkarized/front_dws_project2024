import {useState} from "react";
import {
    Box,
    Button,
    MenuItem,
    Modal,
    Select,
    Stack,
    TextField,
    Typography
} from "@mui/material";

const DistributeSegment = ({handleSubmitRegexSegments, handleSubmitPercentageSegments}) => {

    const [isModalOpen, setModalOpen] = useState(false);
    const [percentage, setPercentage] = useState(1);
    const [segment, setSegment] = useState(0);
    const [regex, setRegex] = useState('');
    const [regexType, setRegexType] = useState("EmailRegexp")

    const handleSubmitRegex = (e) => {
        e.preventDefault();
        console.log({ segment, regex, regexType });
        setModalOpen(false);
        handleSubmitRegexSegments({ segment, regex, regexType });
    };

    const handleSubmitPercentage = (e) => {
        e.preventDefault();
        console.log({percentage});
        setModalOpen(false);
        handleSubmitPercentageSegments({percentage})
    };

    const handleClose = () => {
        setModalOpen(false);
    };

    const handleChangePercentage = (value) => {
        if (value > 100){
            setPercentage(100)
        } else if (value < 1){
            setPercentage(1)
        } else {
            setPercentage(value.replace(/^0+/, ''))
        }

    }

    const handleChangeSegment = (value) => {
        if (value < 0){
            setSegment(0)
        } else {
            setSegment(value.replace(/^0+/, ''))
        }

    }

    const handleChange = (event) => {
        setRegexType(event.target.value);
    };

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
                    <Stack direction="row" spacing={5}>
                        <Stack>
                            <Typography>
                                Распределение всех сегментов для процентов пользователей
                            </Typography>
                            <TextField
                                label="Процент (1-100)"
                                type="number"
                                value={percentage}
                                onChange={(e) => handleChangePercentage(e.target.value)}
                                fullWidth
                                margin="normal"
                            />
                            <form onSubmit={handleSubmitPercentage}>
                                <Button type="submit" variant="contained" color="primary" sx={{mt: 2}}>
                                    Отправить
                                </Button>
                            </form>

                        </Stack>
                        <Stack>
                            <Typography>
                                Распределение сегмента для выбранного типа регулярки
                            </Typography>
                            <Select
                                id="demo-simple-select"
                                value={regexType}
                                variant="outlined"
                                onChange={handleChange}

                            >
                                <MenuItem value={"EmailRegexp"}>email</MenuItem>
                                <MenuItem value={"IpRegexp"}>ip</MenuItem>
                                <MenuItem value={"LoginRegexp "}>login</MenuItem>
                            </Select>
                            <TextField
                                label="ID Segm"
                                type="number"
                                value={segment}
                                onChange={(e) => handleChangeSegment(e.target.value)}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Регулярка"
                                type="text"
                                value={regex}
                                onChange={(e) => setRegex(e.target.value)}
                                fullWidth
                                margin="normal"
                            />

                            <form onSubmit={handleSubmitRegex}>
                                <Button type="submit" variant="contained" color="primary" sx={{mt: 2}}>
                                    Отправить
                                </Button>
                            </form>

                        </Stack>
                    </Stack>

                    <Button type="button" onClick={handleClose} variant="outlined" color="secondary"
                            sx={{mt: 2, ml: 2}}>
                        Закрыть
                    </Button>
                </Box>
            </Modal>
        </>
    )
}

export default DistributeSegment