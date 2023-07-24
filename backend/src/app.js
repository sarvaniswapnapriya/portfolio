const exp = require('constants');
const express =require('express');
const path=require('path');

var nodemailer = require('nodemailer'); //including nodemailer package to send mails
//mail details
var smtpConfig = {
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'amazonprimemoviescreate@gmail.com', //admin mailOptions
    pass: 'aevorninrhrcvgwe'
  }
};

var smtpTransport = nodemailer.createTransport(smtpConfig); //creating the mail transport using smtp

require("./db/conn");
const User = require("./models/contact");
const { text } = require('body-parser');
const port=process.env.PORT || 3000
const app =express()
//setting path
const staticpath=path.join(path.join(__dirname,"../public"));
//console.log(path.join(__dirname,"../public"));
//middleware
app.use(express.urlencoded({extended:false}))
app.use(express.static(staticpath))

app.get('/',(req,res)=>{
     res.render("index");
})

    
app.post("/contact", async(req,res) => {
    try{
        const UserData=new User(req.body);
        const email=UserData.email;
        await UserData.save();
        // console.log("saved");
        
        
        mailOptions = {
            from: 'amazonprimemoviescreate@gmail.com', //admin email to send the confirmation mail
            to: 'ysspriya14@gmail.com',
            subject: UserData.subject,
       
            html: "Hello<br>" +UserData.message+ "<br>From<br>" + UserData.email
           };
        smtpTransport.sendMail(mailOptions, (error, respose) => {

        //console.log(error);
        //console.log(respose);
        //if error occours in sending verification email inform user the same
        if (error) {
            console.log(error);
            res.send({
            status: false,
            msg: 'Unable to send mail'
            });
            return;
        }
        //inform user to check  mail for resetting password
        console.log('message sent');

        });
        res.redirect("/");
    }catch(error){
        res.status(500).send(error);
    }
})
//server create
app.listen(port,()=>{
    console.log("server is a ${port}")
})