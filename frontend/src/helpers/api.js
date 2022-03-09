import {getBaseApiUrl} from "./utils";
import axios from "axios";


const getProducts = (page_number, search_term) => {
    let baseApiUrl = getBaseApiUrl();
    return  axios({
        "method": "GET",
        "url": `${baseApiUrl}/api/products/`,
        params: {
            search: search_term,
            page: page_number
        }
    }).then((response) => {
        return response.data
    }).catch((error) => {
        console.log(error)
    })
};

export default getProducts;