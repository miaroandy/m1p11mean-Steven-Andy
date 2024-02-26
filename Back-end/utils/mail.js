const nodemailer = require("nodemailer");

class Mail {

    //recipient peut etre un string separer par des virgules si plusieur recipient 
    constructor(recipient,subject){
        this.recipient=recipient;
        this.subject=subject;
    }

    createTransporter(){
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: "madagasikaandy@gmail.com",
                pass: "iqzg wvks qudb xehr",
            },
        });
        return transporter;
    }

    createMailBody(htmlBody){
        const template = "<html lang=\"en\"><head>  <meta charset=\"UTF-8\">  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">  <title>Beauty-full</title>  <style>    .container{      display: flex;      flex-direction: column;      justify-content: center;      align-items: center;    }    .element{      padding: 40px;      background-color: #fff;      border-radius: 10px;      border: 2px solid #00796b;      box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.1);    }  </style></head><body>  <div class=\"container\">    <div class=\"element\">      <h1 style=\"color: #00796b;\">Beauty-full</h1>      <p>Bienvenue chez Beauty-full, votre destination beauté ultime!</p>"+htmlBody+"<p>Merci d'avoir choisi Beauty-full pour vos besoins de beauté.</p>      <p>Cordialement,<br>        L'équipe de Beauty-full</p>    </div>  </div></body></html>";
        return template;
    }

    async sendMail(htmlBody){
        const transporter=this.createTransporter();
        const info = await transporter.sendMail({
            from: 'Beauty-full <madagasikaandy@gmail.com>', // sender address
            to: this.recipient, 
            subject: this.subject, // Subject line
            html: this.createMailBody(htmlBody), // html body
        });
        return info;
    }
    
}

module.exports = Mail;