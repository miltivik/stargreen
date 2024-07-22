async function login(req,res){

}

async function register(req,res){
    console.log(req.body);
    const user = req.body.user;
    const password = req.body.password;
    const password_repeat = req.body.password_repeat;
    if (!user || !password || !password_repeat){
        res.status(400).send({status:"Error",message:"Los campos estan incompletos"})
    }
}

export const methods = {
  login,
  register
}