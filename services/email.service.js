import nodemailer from "nodemailer";
import { environment } from "../environments.js";

let transporter = nodemailer.createTransport({
    service: environment.email.serviceProvider,
    port:465,
    secure: true,
    auth:{
        user: environment.email.username,
        pass: environment.email.password
    }
})

export class EmailService{
    async sendEmail(recieverEmail, header, body){
        let mailOptions = {
            from: environment.email.username,
            to: recieverEmail,
            subject: header,
            text: body
        }
        await transporter.sendMail(mailOptions,(error,info)=>{
            if(error){
                console.log(error);
            }else{
                console.log("Email sent: ", info.response);
            }
        })
    }
}