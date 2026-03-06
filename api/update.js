import fs from 'fs';
import path from 'path';

export default function handler(req,res){
    const file=path.resolve('./database/updates.json');
    let data=JSON.parse(fs.readFileSync(file,'utf8'));
    res.json(data);
}
