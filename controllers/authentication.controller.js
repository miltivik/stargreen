async function login(req,res){

}

async function register(req,res){
    console.log(req.body);
    const user_email = req.body.user_email;
    const password = req.body.password;
    const user = req.body.user;
    if (!user || !password || !user_email){
        res.status(400).send({status:"Error",message:"Los campos estan incompletos"})
    }
}

export const methods = {
  login,
  register
}