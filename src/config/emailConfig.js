import nodemailer from 'nodemailer';

let transporterConfig;

// GENERIC GMAIL CONFIG SETTINGS
transporterConfig = {
  // service: 'gmail',
  // auth: {
  //   user: 'someemail@gmail.com',
  //   pass: 'password',
  // }


const transporter = nodemailer.createTransport(transporterConfig);

// verify connection configuration
transporter.verify((error) => {
  if (error) {
    // console.log(`error verifying email configuration ${error}`);
  } else {
    console.log('Server is ready to take our messages');
  }
});

export default function getTransporter() {
  return transporter;
}
