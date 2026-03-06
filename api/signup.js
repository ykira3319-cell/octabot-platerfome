import fs from 'fs';
import path from 'path';

export default function handler(req,res){
    if(req.method==='POST'){
        const {name,email,password}=req.body;
        const file=path.resolve('./database/users.json');
        let users=JSON.parse(fs.readFileSync(file,'utf8'));
        if(users.find(u=>u.email===email)) return res.status(400).json({success:false,message:'Email déjà utilisé'});
        users.push({name,email,password});
        fs.writeFileSync(file,JSON.stringify(users,null,2));
        res.json({success:true});
    } else res.status(405).json({message:'Méthode non autorisée'});
                                             }
