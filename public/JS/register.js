document.getElementById("register-form").addEventListener("submit",async(e)=>{
    e.preventDefault();
    console.log(e.target.elements.user.value)
    const res = await fetch("http://localhost:4000/api/register",{
        method:"POST",
        headers:{
            "Content-type" : "application/json"
        },
        body: JSON.stringify({
            user_email: e.target.elements.user_email.value,
            password: e.target.elements.password.value,
            user: e.target.elements.user.value,
        })
    });
});