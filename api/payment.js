export default function handler(req,res){
    if(req.method==='POST'){
        // Ici tu peux appeler ton API M-Pesa réel
        res.json({success:true});
    } else res.status(405).json({message:'Méthode non autorisée'});
}
