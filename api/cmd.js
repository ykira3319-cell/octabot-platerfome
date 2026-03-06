export default async function handler(req,res){
    if(req.method==='POST'){
        const {prompt}=req.body;
        // Appel API Gemini proxy
        const response=await fetch(`https://christus-api.vercel.app/ai/gemini-proxy2?prompt=${encodeURIComponent(prompt)}`);
        const data=await response.json();
        res.json({response:data.response||'Erreur API'});
    } else res.status(405).json({message:'Méthode non autorisée'});
}
