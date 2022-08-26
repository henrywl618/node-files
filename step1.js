import {readFile} from 'fs';
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

cat();