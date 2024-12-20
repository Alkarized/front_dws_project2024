import axios from "axios";
import {Id} from "react-toastify/dist/types";

const BASE_URL = 'http://89.169.167.3:8090/api/v1/';

export const instance = axios.create({
    baseURL: BASE_URL
});

instance.interceptors.request.use(
    (config) => {
        config.headers.Authorization = `Bearer ${localStorage.getItem("user").replace("\"", "")}`
        return config
    }
)


export interface Data {
    id: number;
    name: string;
    description: string;
}

export interface ReturnData{
    data: Data[];
    rows: number;
}

export function createData(id: number, name: string): Data {
    return {id, name, description : "test"};
}

export const START_LENGTH = 110

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
export const addNewSegment = (text1: string, text2: string) => {
    return instance.post("segments", {name: text1, description: text2})
}

export const getSegmentsOnPageWithFilter = (rowsPerPage, page, filter : filters) => {
    return instance.get("segments?sort=id&page=" + (page) + "&size=" + rowsPerPage);
}

export const getSegmentsOnPage = (rowsPerPage, page) => {
    let filter : filters = {
        idFilter : "",
        nameFilter : ""
    }
    return getSegmentsOnPageWithFilter(rowsPerPage, page, filter)

}

export const updateSegmentData = (id, data) => {
    return instance.put("segments/" + id, data)
}

export const deleteSegments = (allSelected: boolean, id /*ids: Set<Id>*/) => {

    return instance.delete("segments/" + id)
}


export const distribute = (data) => {
    return instance.post("filter/distribute", {type: data.regexType, regexp: data.regex, segmentId: data.segment})
}

export const distributeRandom = (percentage) => {
    return instance.post("segments/distribute-random", {percentage: percentage})
}

export const authUser = async (data: any) => {
    return axios.post(BASE_URL + "auth/login", data)
}

export const registerUser = async (data: any) => {
    return axios.post(BASE_URL + "auth/register", data)
}

export const testApi = async (data: any) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true)
        }, 1000);
    })
}
/*return new Promise((resolve, reject) => {
    let newId = ROWS.length == 0 ? 0 : ROWS[ROWS.length - 1].id + 1
    setTimeout(() => {
        ROWS.push(createData(newId, text))
        resolve(newId);
    }, 1000);
})*/

/*return new Promise((resolve, reject) => {

    let filteredData = [...ROWS].filter(elem => elem.id.toString().startsWith(filter.idFilter))
        .filter(elem=> elem.name.startsWith(filter.nameFilter));

    let data = filteredData
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

    setTimeout(() => {
        resolve({data: data, rows: filteredData.length});
    }, 1000);
})*/

/*return new Promise((resolve) => {
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
   })*/

/*return new Promise((resolve) => {
        let count = 0

        if (allSelected){
            ROWS = ROWS.filter((row) => {
                if (ids.has(row.id)){
                    return true
                }
                count++
                return false
            })
        } else {
            ROWS = ROWS.filter((row) => {
                if (ids.has(row.id)){
                    count++
                    return false
                }
                return true
            })
        }

        setTimeout(() => {
            resolve({deleted: count, rows: ROWS.length - count})
        }, 1000);
    })*/
