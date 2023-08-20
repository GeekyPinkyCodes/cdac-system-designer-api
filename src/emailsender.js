const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
	service: "Gmail",
	auth: {
		user: "your@gmail.com",
		pass: "your-password",
	},
});

const sendVerificationEmail = (toEmail, verificationCode) => {
	const mailOptions = {
		from: "your@gmail.com",
		to: toEmail,
		subject: "Email Verification",
		text: `Your verification code: ${verificationCode}`,
	};

	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			console.log("Error sending email: ", error);
		} else {
			console.log("Email sent: ", info.response);
		}
	});
};

// Use sendVerificationEmail when registering a user
