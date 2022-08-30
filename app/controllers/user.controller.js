const db = require("../models");
const bcrypt = require("bcrypt")
const nodemailer = require('nodemailer');
const request = require('request');

require('dotenv').config();
const User = db.user;
const Work = db.work;

const emailSender = "thivakorn.ng@gmail.com";
const emailReceiver = "thitann4@gmail.com";

const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
        user: emailSender,
        pass: process.env.EMAILPASSWORD,
    },
    secure: true,
});

sendMail = (workId) =>{
    Work.findOne({where:{id:workId}}).then(result=>{
        if(result.isApproveUser1 && result.isApproveUser2 && result.isApproveUser3){
            const mailData = {
                from: emailSender,
                to: emailReceiver,
                subject: 'User approve notification',
                text: 'All user approve!',
                html: 'All user approve!',
            };
        
            transporter.sendMail(mailData, (error, info) => {
                if (error) {
                    return console.log(error);
                }
                return {"isSendEmail":true}
            });
        }
        else {
            return {"isSendEmail":false}
        }
    })
}

exports.userApprove = async (req,res) =>{
    const username = req.body.username;
    const password = req.body.password;
    const workId = req.body.workId;
    
    if(username != null && password != null){
        const checkUsername = await User.findOne({where:{userName:username}});
        if(checkUsername == null){
            res.send('no user')
            return
        }
        const userId = checkUsername.userId
        console.log("this is userid ",userId);
        const userPassword = checkUsername.userPassword;
        const checkpass = bcrypt.compareSync(password, userPassword);
        var getWork = await Work.findOne({where:{id:workId}});
        if(checkpass){
            if(userId == "1"){
                if(getWork.isApproveUser1 == true){
                    res.send('user already approved')
                    return
                }
                Work.update({isApproveUser1: true}, {
                    where: { id: workId }
                }).then(num => {
                    if (num == 1) {
                        const check = sendMail(workId)
                        console.log(check);
                        res.send('user approved')
                    } 
                    else{
                        res.send('not found')
                    }
                })
            }
            else if(userId == "2"){
                if(getWork.isApproveUser2 == true){
                    res.send('user already approved')
                    return
                }
                Work.update({isApproveUser2: true}, {
                    where: { id: workId }
                }).then(num => {
                    if (num == 1) {
                        sendMail(workId)
                        res.send('user approved')
                    } 
                    else{
                        res.send('not found')
                    }
                })
            }
            else if(userId == "3"){
                if(getWork.isApproveUser3 == true){
                    res.send('user already approved')
                    return
                }
                Work.update({isApproveUser3: true}, {
                    where: { id: workId }
                }).then(num => {
                    if (num == 1) {
                        sendMail(workId)
                        res.send('user approved')
                    } 
                    else{
                        res.send('not found')
                    }
                })
            }
        }
        else{
            res.send('wrong password')
            return
        }
    }
    else{
        res.send('invalid username or password')
        return
    }
}