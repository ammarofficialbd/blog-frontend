import axios from "axios";

export const filterPagintaionData = async ({create_new_arr = false, state, data, page, countRoute, data_to_send = {}}) => {
        let obj ;
        if(!create_new_arr  && state !== null) {
            obj = {...state, results : [...state.results, ...data], page: page};
        } else {
           await axios.post(import.meta.env.VITE_API + countRoute, {data_to_send})
           .then(({data: {totalDocs}})=> {
            obj = {results: data, totalDocs, page: 1};
 
           }).catch(err => console.log(err));
        }
        return obj;
}