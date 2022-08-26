import {readFile} from 'fs';
import axios from 'axios';
const path = process.argv[2];

const cat =()=>{

    readFile(path, "utf8", (err,data)=>{
        if(err){
            console.log(err);
            process.exit(1);
        };
        console.log(data);
    })
}

const webCat = async ()=> {
    try{
        const resp = await axios.get(path);
        console.log(resp.data);
    }
    catch(err){
        console.log(err);
    }

};

try{
    const isURL = new URL(path);
    webCat();
}
catch{
    cat();
}