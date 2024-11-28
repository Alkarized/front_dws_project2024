import axios from "axios";
import {Id} from "react-toastify/dist/types";

const BASE_URL = 'https://url.com';

export interface Data {
    id: number;
    name: string;
}

export function createData(id: number, name: string): Data {
    return {id, name};
}

export const START_LENGTH = 123

export interface filters {
    nameFilter? : string,
    idFilter? : string
}

let ROWS = generateRowsData(START_LENGTH)

function generateRowsData(c: number): Data[] {
    let ans: Data[] = []
    for (let j = 0; j < c; j++) {
        ans.push(createData(j * 200000, `NAME_SEGMENT${j}`))
    }
    return ans
}

export const testSegment = async () => {
    return await axios.post(BASE_URL + "/test", "{}");
};

export const addNewSegment = (text: string) => {
    return new Promise((resolve, reject) => {
        let newId = ROWS.length == 0 ? 0 : ROWS[ROWS.length - 1].id + 1
        setTimeout(() => {
            ROWS.push(createData(newId, text))
            resolve(1);
        }, 1000);
    })

}

export const getSegmentsOnPage = (rowsPerPage, page, filter : filters) => {
    //console.log("idFilter: " + filter.idFilter)
    //console.log("name: " + filter.nameFilter)
    //console.log("filtered by id: " + [...ROWS].filter(elem => elem.id.toString().startsWith(filter.idFilter)).length)

    return new Promise((resolve, reject) => {

        setTimeout(() => {
            resolve([...ROWS].filter(elem => elem.id.toString().startsWith(filter.idFilter))
                .filter(elem=> elem.name.startsWith(filter.nameFilter)).
                slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage));
        }, 1000);
    })

}

export const updateSegmentData = (id, newValue) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            ROWS = ROWS.map((row) => {
                if (row.id == id){
                    return {
                        ...row,
                        name: newValue
                    }
                } else {
                    return row
                }
            })
            resolve(true);
        }, 1000);
    })
}

export const deleteSegments = (allSelected, ids: Id[]) => {
    return new Promise((resolve, reject) => {
        let count = 0

        if (allSelected){
            ROWS = ROWS.filter((row) => {
                if (ids.indexOf(row.id) !== -1){
                    return true
                }
                count++
                return false
            })
        } else {
            ROWS = ROWS.filter((row) => {
                if (ids.indexOf(row.id) !== -1){
                    count++
                    return false
                }
                return true
            })
        }



        setTimeout(() => {
            resolve(count)
        }, 1000);
    })
}

