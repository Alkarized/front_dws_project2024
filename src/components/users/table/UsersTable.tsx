import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';

import {useEffect, useState} from "react"
import UsersTableHead from "./UsersTableHead";
import UsersTableBody from "./UsersTableBody";
import LoadingProgressTable from "../components/LoadingProgressTable";
import {
    filters, getSegmentsOnPage,
} from "../../../api/SegmentApi";
import {notifyError, notifyLoading, notifySuccess, updateError, updateSuccess} from "../../../toast/Notifies";
import SegmentAdd from "../components/SegmentAdd";
import {useAuth} from "../../auth/AuthProvider";
import UserInput from "../components/UserInput";
import EmptyTable from "../../EmptyTable";
import {addNewSegmentToUser, deleteSegment, getSegmentsOnUserPage} from "../../../api/UserApi";

export default function UsersTable() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [visible, setVisible] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [emptyRows, setEmptyRows] = useState(0)
    const [segmentAddValue, setSegmentAddValue] = useState("");
    const [segmentDescription, setSegmentDescription] = useState("");

    const [isProcessAdd, setIsProcessAdd] = useState(false)
    const [rowsAmount, setRowsAmount] = useState(0)
    const [filterElements, setFilterElements] = useState<filters>({nameFilter: "", idFilter: ""})
    const [rerender, setRerender] = useState(false);
    const [pageChanged, setPageChanged] = useState(false);
    const {logout} = useAuth();

    const [userInput, setUserInput] = useState(true);
    const [userData, setUserData] = useState(-1);

    const toggleRerender = () => {
        setRerender((prev) => !prev)
    }

    const handleSegmentAddValue = (e) => {
        setSegmentAddValue(e.target.value.trim())
    }

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleAddSegment = () => {
        if (segmentAddValue === "") {
            notifyError("Пустое поле")
            return
        }

        setIsProcessAdd(true);
        setIsLoading(true)

        const id = notifyLoading("Добавление элемента");

        addNewSegmentToUser(userData, segmentAddValue).then((e) => {
            updateSuccess(id, "Элемент добавлен")
        }).catch((error) => {
            updateError(id, "Ошибка добавления элемента: \n" + error.response.data.error)
        }).finally(() => {
            toggleRerender()
            setIsProcessAdd(false);
        })
    }

    useEffect(() => {
        if (pageChanged) {
            setPageChanged(false)
            return
        }

        setIsLoading(false)

        if (userData != -1 && userInput) {
            getSegmentsOnUserPage(userData, rowsPerPage, page).then((returned) => {

                let values = returned.data.content;
                let totalRows = returned.data.totalElements

                setVisible(values)
                setRowsAmount(totalRows)

                if (page * rowsPerPage >= totalRows && totalRows != 0) {
                    let diff = ~~(totalRows / rowsPerPage);
                    setPage(totalRows % rowsPerPage == 0 ? Math.max(0, diff - 1) : diff)
                } else {

                    setIsLoading(false)

                    if (totalRows == 0 && page != 0) {
                        setPage(0)
                        setPageChanged(true);
                        setIsLoading(false)
                    }
                }

                setEmptyRows(Math.max(0, (1 + page) * rowsPerPage - totalRows))

            }).catch(e => {
                console.log(e)
                if (e.response.status === 404){
                    handleUnchoose()
                    notifyError("Такой юзер не найден")
                } else {
                    logout()
                }

            }).finally(() => {

            })
        }

    }, [page, rowsPerPage, rerender, userData])

    const userSetter = (value) => {
        setUserData(value)
        setUserInput(true)
    }

    const handleUnchoose = () => {
        setUserInput(false)
        setUserData(-1);
    }

    const handleDeleteSegmentFromUser = (id) => {
        deleteSegment(userData, id).then((e) => {
            notifySuccess("Сегмент удален")
        }).catch((error) => {
            notifyError("Ошибка удаления сегмента: \n" + error.response.data.error)
        }).finally(() => {
            toggleRerender()
        })
    }

    return (
        <>
            {!userInput || userData == - 1 ? (
                <UserInput
                    userSetter={userSetter}
                />
            ) : (
                <>
                    <SegmentAdd
                        handleSegmentAddValue={handleSegmentAddValue}
                        segmentAddValue={segmentAddValue}
                        handleAddSegment={handleAddSegment}
                        isProcessAdd={isProcessAdd}
                        handleUnchoose={handleUnchoose}
                        userId={userData}
                    />
                    <Box sx={{width: '100%'}}>
                        <Paper sx={{width: '100%', mb: 2}}>
                            <TableContainer>
                                <Table
                                    sx={{minWidth: 750}}
                                    aria-labelledby="tableTitle"
                                    size={'medium'}
                                >
                                    <UsersTableHead
                                    />
                                    {isLoading ? (
                                        <LoadingProgressTable rowsPerPage={rowsPerPage}/>
                                    ) : visible.length == 0 ? (
                                        <EmptyTable/>
                                    ) : (
                                        <UsersTableBody
                                            visibleRows={visible}
                                            emptyRows={emptyRows}
                                            handleDeleteSegmentFromUser={handleDeleteSegmentFromUser}
                                        />
                                    )}

                                </Table>
                            </TableContainer>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 15]}
                                component="div"
                                count={rowsAmount}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                showFirstButton
                                showLastButton
                            />
                        </Paper>
                    </Box>
                </>
            )}

        </>

    );
}