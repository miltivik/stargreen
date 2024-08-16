const express = require('express'); 
const jwt = require('jsonwebtoken'); 

const app = express(); 
const PORT = 3000; 

app.get('/verify/:token', (req, res)=>{ 
	const {token} = req.params; 

	// Verifying the JWT token 
	jwt.verify(token, 'ourSecretKey', function(err, decoded) { 
		if (err) { 
			console.log(err); 
			res.status(400).json({ error: "Email verification failed, possibly the link is     invalid or expired" });
		} 
		else { 
			res.status(200).json({ message: "Email verified successfully"});
		} 
	}); 
}); 

app.listen(PORT, (error) =>{ 
	if(!error) 
		console.log("Server is Successfully Running, and App is listening on port "+ PORT) 
    else{
        console.error("Error occurred, server can't start", error);
    }
		
	} 
); 