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

app.post("/send-email", async (req, res) => {
    const { to, subject, text } = req.body;
  
    try {
      let info = await emailHelper(to, subject, text);
      res.status(200).send(`Email sent: ${info.response}`);
    } catch (error) {
      res.status(500).send("Error sending email");
    }
  });