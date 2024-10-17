import HTTPStatus from 'http-status';
import getTransporter from '../../config/emailConfig';

const transporter = getTransporter();

function buildTemplates(type, data) {
  const emailBodyObject = {
    newsletter: {
      subject: 'New sign-up for newsletter',
      text: `
  ${data.email} was submitted for interest in the newsletter.

  phone: ${data.phone}
  zip: ${data.zip}

  Please add this to your records.

  Thank you`,
      html: `
  <div>${data.email} was submitted for interest in the newsletter.</div>

  <div>phone: ${data.phone}</div>
  <div>zip: ${data.zip}</div>

  <div>Please add this to your records.</div>

  <div>Thank you</div>
`,
    },
    contactUs: {
      subject: 'New submission on website Contact Us form',
      text: `
  New submission on website

  First Name: ${data.firstName}
  Last Name: ${data.lastName}
  Email: ${data.email}
  Zip Code: ${data.zip}
  Message: ${data.message}

  Thank you`,
      html: `
  <div>New submission on website</div><br>
  <div>First Name: ${data.firstName}</div>
  <div>Last Name: ${data.lastName}</div>
  <div>Email: ${data.email}</div>
  <div>Zip Code: ${data.zip}</div>
  <div>Message: ${data.message}</div><br>

  <div>Thank you</div>
`,
    },

  };
  return emailBodyObject[type];
}

export function sendNewsletterEmail(req, res) {
  const email = req.body;

  const emailTemplate = buildTemplates('newsletter', email);
  const mailOptions = {
    from: '"Website Support" <support@email.com>',
    to: 'newsletter@email.com ',
    subject: emailTemplate.subject,
    text: emailTemplate.text,
    html: emailTemplate.html,
  };

  transporter.sendMail(mailOptions, error => {
    if (error) {
      console.log(`error sending newsletter email: ${error}`);
    }

    res.sendStatus(HTTPStatus.OK);
  });
}

export function sendContactUsEmail(req, res) {
  const data = req.body;

  const emailTemplate = buildTemplates('contactUs', data);
  const mailOptions = {
    from: '"Website Support" <support@email.com>',
    to: 'support@email.com ',
    subject: emailTemplate.subject,
    text: emailTemplate.text,
    html: emailTemplate.html,
  };

  transporter.sendMail(mailOptions, error => {
    if (error) {
      console.log(`error sending contact us email: ${error}`);
    }

    res.sendStatus(HTTPStatus.OK);
  });
}
