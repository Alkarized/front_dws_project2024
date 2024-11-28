import React, { useState, useEffect } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Modal,
    TextField,
    Button,
} from '@mui/material';
import { Sort, FilterList } from '@mui/icons-material';


const API_ENDPOINT = 'YOUR_API_ENDPOINT'; // Замените на ваш API endpoint

function Test() {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [totalRows, setTotalRows] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [filterOpen, setFilterOpen] = useState(null); // столбец для фильтрации
    const [filterValue, setFilterValue] = useState('');
    const [columns, setColumns] = useState([]); // добавляем state для столбцов


    useEffect(() => {
        const fetchData = async () => {
            try {
                /*const response = await fetch(`${API_ENDPOINT}?page=${page}&limit=${rowsPerPage}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const jsonData = await response.json();*/
                let jsonData = []
                for (let i = 0; i < 200; i++) {
                    jsonData[i] = i
                }
                setData(jsonData); // предполагаем, что API возвращает {data: [], total: number}
                setTotalRows(200);
                setIsLoading(false);
                //Получаем названия столбцов из первого элемента данных
                setColumns(["names"]);

            } catch (error) {
                console.error("Error fetching data:", error);
                setIsLoading(false);
            }
        };

        fetchData();
    }, [page, rowsPerPage]);


    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };

    const handleRowsPerPageChange = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleFilterOpen = (column) => {
        setFilterOpen(column);
        setFilterValue(''); //сбрасываем значение фильтра при открытии
    };

    const handleFilterClose = () => {
        setFilterOpen(null);
        setFilterValue(''); //сбрасываем значение фильтра при закрытии
    };

    const handleFilterChange = (event) => {
        setFilterValue(event.target.value);
    };

    const filteredData = data.filter(item => {
        if(filterOpen){
            return String(item[filterOpen]).toLowerCase().includes(filterValue.toLowerCase());
        }
        return true;
    });


    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };


    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell key={column}>
                                    {column}
                                    <IconButton onClick={() => handleFilterOpen(column)}>
                                        <FilterList />
                                    </IconButton>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredData.map((row) => (
                            <TableRow key={row.id}> {/* Предполагается, что у каждой строки есть id */}
                                {columns.map((column) => (
                                    <TableCell key={`${row.id}-${column}`}>{row[column]}</TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Modal
                open={filterOpen !== null}
                onClose={handleFilterClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div style={style}>
                    <TextField
                        label={`Filter ${filterOpen}`}
                        value={filterValue}
                        onChange={handleFilterChange}
                        fullWidth
                    />
                    <Button onClick={handleFilterClose}>Close</Button>
                </div>
            </Modal>
            {/* Pagination */}
            {/* ... (Pagination component from MUI) ... */}
        </div>
    );
}

export default Test;