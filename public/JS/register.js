document.getElementById("register-form").addEventListener("submit",async(e)=>{
    e.preventDefault();
    console.log(e.target.elements.user.value)
    const res = await fetch("http://localhost:4000/api/register",{
        method:"POST",
        headers:{
            "Content-type" : "application/json"
        },
        body: JSON.stringify({
            user: e.target.elements.user.value,
            password: e.target.elements.password.value,
            password_repeat: e.target.elements.password_repeat.value,
        })
    });
});