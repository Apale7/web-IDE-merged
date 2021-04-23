import axios from "../axios/axiosSetting";

const getIP = async () => {
    const res = await axios.get('/api/ip');
    console.log(res);
    
}


export {getIP};