import axios from "axios"


export const dataapi=()=>async(dispatch)=>{
        let response=await axios.get("https://api.escuelajs.co/api/v1/products")
        dispatch({type:"SETDATA",payload:response.data})
}


