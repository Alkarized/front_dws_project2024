import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';

import {useEffect, useMemo, useRef, useState} from "react"
import SegmentTableToolBar from "./SegmentTableToolBar";
import SegmentTableHead from "./SegmentTableHead";
import SegmentTableBody from "./SegmentTableBody";
import LoadingProgressTable from "../components/LoadingProgressTable";
import {
    addNewSegment,
    deleteSegments, filters,
    getSegmentsOnPage,
    START_LENGTH,
    updateSegmentData
} from "../../../api/SegmentApi";
import {notifyError, notifyLoading, updateError, updateSuccess} from "../../../toast/Notifies";
import {Id} from "react-toastify/dist/types";
import SegmentAdd from "../components/SegmentAdd";
import DisterbuteComponent from "../components/DisterbuteComponent";

export default function SegmentTable() {
    const [selected, setSelected] = useState<number[]>([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [visible, setVisible] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [nid, setNid] = useState<Id>(0);
    const [textToDisplay, setTextToDisplay] = useState("")
    const [selectedAll, setSelectedAll] = useState(false)
    const [pageChanged, setPageChanged] = useState(false)
    const [emptyRows, setEmptyRows] = useState(0)
    const [segmentAddValue, setSegmentAddValue] = useState("");
    const [isProcessAdd, setIsProcessAdd] = useState(false)
    const [rowsAmount, setRowsAmount] = useState(0)
    const [filterElements, setFilterElements] = useState<filters>({nameFilter: "", idFilter: ""})

    const handleSegmentAddValue = (e) => {
        setSegmentAddValue(e.target.value.trim())
    }

    const handleAddSegment = () => {
        if (segmentAddValue === ""){
            notifyError("Пустое поле")
            return
        }

        setIsProcessAdd(true);

        const id = notifyLoading("Добавление элемента");

        addNewSegment(segmentAddValue).then((e : number)=>{
            updateSuccess(id, "Элемент добавлен")
            setRowsAmount(amount=> amount + e)
        }).finally(()=>{
            setIsProcessAdd(false);
        })
    }

    const clearSelections = () => {
        setSelectedAll(false)
        setSelected([])
        setPageChanged(false)
    }

    const setSelAll = () => {
        setSelectedAll(true)
        setSelected([])
    }

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => { //todo FIX
        const newSelected = visible.map((n) => n.id);
        //console.log(newSelected + " " + selectedAll + " " + rowsAmount + " " + selected)

        if (selectedAll) {
            if (selected.length == 0){
                setSelectedAll(false)
            }
            setSelected([])
        } else {
            if (selected.length != 0 && selected.length % rowsPerPage == 0 || selected.length == rowsAmount){
                if (pageChanged){
                    setSelected(sels => sels.concat(newSelected))
                    setPageChanged(false)
                } else {
                    setSelAll()
                }
                return
            }
            if (selected.length > rowsPerPage){
                setSelected(sels => sels.concat(newSelected))
            } else {
                if (newSelected.length == rowsAmount) {
                    setSelAll()
                } else {
                    setSelected(newSelected)
                }

            }

        }

    };

    //todo add filters!

    const handleClick = (event: React.MouseEvent<unknown>, id: number) => { //todo fix bug when selected <= rowsAmount and page == 1 + check selectedAll
        const selectedIndex = selected.indexOf(id);
        let newSelected: number[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
        setSelected(newSelected);
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
        setPageChanged(true)
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleFilter = (value : string, label : string) => { //todo fix with filters pagination! + fix chekced all
        if (label == "ID"){
            setFilterElements(elem => {
                return {
                    ...elem,
                    idFilter: value
                }
            })
        } else if (label == "NAME"){
            setFilterElements(elem => {
                return {
                    ...elem,
                    nameFilter: value
                }
            })
        }
    }


    const handleChangeById = (id, newValue) => {
        setIsLoading(true)

        let tmpId = notifyLoading("Обновление значения элемента")
        setTextToDisplay("Значение элемента обновлено")

        updateSegmentData(id, newValue).then(()=>{
            setNid(tmpId)
        })

    }

    const handleDeleteSegments = () => {
        setIsLoading(true)
        clearSelections()

        let tmpId = notifyLoading("Элементы удаляются")

        deleteSegments(selectedAll, selected).then((deletedAmount : number)=> {
            setSelected([])
            updateSuccess(tmpId, "Выбранные элементы удалены")
            let diff = rowsAmount - deletedAmount
            let amount = ~~(diff / rowsPerPage)

            if (deletedAmount == 0){
                setIsLoading(false)
            }

            setRowsAmount(diff)

            if (page >= amount) { //todo FIX bug если я оставлю единственный элемент на странице!!!
                setPage(diff % rowsPerPage == 0 ? Math.max(0, amount - 1) : amount)
            }

        })

    }


    useEffect(() => {
        setRowsAmount(START_LENGTH)
    }, []);


    useEffect(() => {
        getSegmentsOnPage(rowsPerPage, page, filterElements).then((r : any[]) => {
            setVisible(r)
            updateSuccess(nid, textToDisplay);
            setIsLoading(false)
        }).catch(e => {
            updateError(nid, "Ошибка сервера");
        })

    }, [nid])

    useEffect(() => {
        setIsLoading(true)
        setEmptyRows(Math.max(0, (1 + page) * rowsPerPage - rowsAmount))

        getSegmentsOnPage(rowsPerPage, page, filterElements).then((r : any[]) => {
            setVisible(r)
            setIsLoading(false)

        }).catch(e => {
            notifyError("Ошибка получения данных с сервера")
        })

    }, [page, rowsPerPage, rowsAmount, setRowsAmount, filterElements])

    return (
        <>
            <SegmentAdd
                handleSegmentAddValue={handleSegmentAddValue}
                segmentAddValue={segmentAddValue}
                handleAddSegment={handleAddSegment}
                isProcessAdd={isProcessAdd}

            />
            <DisterbuteComponent
            />
            <Box sx={{width: '100%'}}>
                <Paper sx={{width: '100%', mb: 2}}>
                    <SegmentTableToolBar
                        numSelected={selectedAll ? rowsAmount - selected.length : selected.length}
                        handleDeleteSegments={handleDeleteSegments}
                    />
                    <TableContainer>
                        <Table
                            sx={{minWidth: 750}}
                            aria-labelledby="tableTitle"
                            size={'medium'}
                        >
                            <SegmentTableHead
                                numSelected={selectedAll ? rowsAmount - selected.length : selected.length}
                                onSelectAllClick={handleSelectAllClick}
                                rowCount={rowsAmount}
                                handleFilter={handleFilter}
                            />
                            {isLoading ? (
                                <LoadingProgressTable rowsPerPage={rowsPerPage}/>
                            ) : visible.length == 0 ? (
                                    <div>
                                        Nothing to see
                                    </div>
                                ) : (
                                    <SegmentTableBody
                                        allSelected={selectedAll}
                                        visibleRows={visible}
                                        selected={selected}
                                        handleClick={handleClick}
                                        emptyRows={emptyRows}
                                        handleChangeById={handleChangeById}
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

    );
}