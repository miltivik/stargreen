const nodemailer = require('nodemailer'); 
const jwt = require('jsonwebtoken'); 

const transporter = nodemailer.createTransport({ 
	host: secure_configuration.HOST,
            port: secure_configuration.PORT,
	auth: { 
		user: secure_configuration.EMAIL_USERNAME, 
		pass: secure_configuration.PASSWORD 
	} 
}); 

const token = jwt.sign({ 
		data: 'Token Data'
	},'ourSecretKey', { expiresIn: '10m' } 
);	 

const mailConfigurations = { 

	// It should be a string of sender/server email 
	from: 'ivan.djuric@railsware.com', 

	to: 'djuric.eth@gmail.com', 

	// Subject of Email 
	subject: 'Email Verification', 
	
	// This would be the text of email body 
	text: `Hi there, you have recently entered your 
		email on our website. 

		Please follow the given link to verify your email 
		http://localhost:3000/verify/${token} 

		Thanks` 
	
}; 

transporter.sendMail(mailConfigurations, function(error, info){ 
	if (error) throw Error(error); 
	console.log('Email Sent Successfully'); 
	console.log(info); 
});