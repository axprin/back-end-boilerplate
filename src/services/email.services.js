import getTransporter from '../config/emailConfig';

const transporter = getTransporter();

function buildTemplates(user, env, type) {
  const emailBodyObject = {
    pwreset: {
      subject: 'Request to reset your password - Website',
      text: `
        ${user.firstName},
        Someone requested that the password for your Website account be reset. Please click on the link below to reset your password.
        ${env}/password-reset?id=${user._id}
        Please note this is a unique link that should not be shared with others, as they will be able to reset your password.
        - Website Team
      `,
      html: `
        <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml">
        <head>
          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
          <meta name="color-scheme" content="light dark">
          <title>Request to reset your password - Website</title>
          <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap" rel="stylesheet">
          <style type="text/css">
            body {background: #fff;color: #40403F;font-family: 'Open Sans', 'Helvetica', arial, sans-serif;font-size: 16px;line-height: 1.2;margin: 0;padding: 10px;}
            @media only screen and (max-width: 600px){.table-container{width:100%!important;} .header,.body {padding: 20px!important;} .footer-text {font-size: 12px!important;} }
          </style>
        </head>
        <body>
          <table class="table-container" border="0" cellpadding="0" cellspacing="0" width="600" style="background: #fff; margin: 0 auto;">
            <tr valign="top">
              <td class="body" style="background: #fff; padding: 30px;">
                <table border="0" border="0" cellpadding="0" cellspacing="0" width="100%">
                  <tr>
                    <td colspan="2" style="font-size: 14px; line-height: 1.2; padding-bottom: 30px;">
                      <p style="font-family: 'Open Sans', 'Helvetica', arial, sans-serif; font-size: 14px; margin: 0 0 20px 0; padding: 0;">${user.firstName},</p>
                      <p style="font-family: 'Open Sans', 'Helvetica', arial, sans-serif; font-size: 14px; margin: 0 0 20px 0; padding: 0;">Someone requested that the password for your Website account be reset. Please click on the link below to reset your password.</p>
                      <p style="font-family: 'Open Sans', 'Helvetica', arial, sans-serif; font-size: 14px; font-weight: 600; margin: 0 0 20px 0; padding: 0;">
                        <a href="${env}/password-reset?id=${user._id}" target="_blank" style="color: #2F8F44; text-decoration: underline;">${env}/password-reset?id=${user._id}</a>
                      </p>
                      <p style="font-family: 'Open Sans', 'Helvetica', arial, sans-serif; font-size: 14px; margin: 0 0 20px 0; padding: 0; font-style: italic;">Please note this is a unique link that should not be shared with others, as they will be able to reset your password.</p>
                      <p style="font-family: 'Open Sans', 'Helvetica', arial, sans-serif; font-size: 14px; margin: 0; padding: 0;">- Website Team</p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td align="center" style="padding: 20px;">
              </td>
            </tr>
          </table>
        </body>
        </html>`,
    },
    pwHasBeenReset: {
      subject: 'Your password has been reset - Website',
      text: `
        ${user.firstName},
        Our records indicate that you have recently updated your password.
        - Website Team
      `,
      html: `
        <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml">
        <head>
          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
          <meta name="color-scheme" content="light dark">
          <title>Your password has been reset - Website</title>
          <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap" rel="stylesheet">
          <style type="text/css">
            body {background: #fff;color: #40403F;font-family: 'Open Sans', 'Helvetica', arial, sans-serif;font-size: 16px;line-height: 1.2;margin: 0;padding: 10px;}
            @media only screen and (max-width: 600px){.table-container{width:100%!important;} .header,.body {padding: 20px!important;} .footer-text {font-size: 12px!important;} }
          </style>
        </head>
        <body>
          <table class="table-container" border="0" cellpadding="0" cellspacing="0" width="600" style="background: #fff; margin: 0 auto;">
            <tr valign="top">
              <td class="body" style="background: #fff; padding: 30px;">
                <table border="0" border="0" cellpadding="0" cellspacing="0" width="100%">
                  <tr>
                    <td colspan="2" style="font-size: 14px; line-height: 1.2; padding-bottom: 30px;">
                      <p style="font-family: 'Open Sans', 'Helvetica', arial, sans-serif; font-size: 14px; margin: 0 0 20px 0; padding: 0;">${user.firstName},</p>
                      <p style="font-family: 'Open Sans', 'Helvetica', arial, sans-serif; font-size: 14px; margin: 0 0 20px 0; padding: 0;">Our records indicate that you have recently updated your password.</p>
                      <p style="font-family: 'Open Sans', 'Helvetica', arial, sans-serif; font-size: 14px; margin: 0; padding: 0;">- Website Team</p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>`,
    },
    accountRegistration: {
      subject: 'Welcome to Website',
      text: `
        ${user.firstName},
        Thank you for creating an online account with Website!
        We hope you are able to find your program and register with ease on our website. If you have any questions about the registration process, please reach out to support@website.com for assistance.
        We can't wait to see you on the field!
        - Website Team
      `,
      html: `
        <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml">
        <head>
          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
          <meta name="color-scheme" content="light dark">
          <title>Welcome to Website</title>
          <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap" rel="stylesheet">
          <style type="text/css">
            body {background: #fff;color: #40403F;font-family: 'Open Sans', 'Helvetica', arial, sans-serif;font-size: 16px;line-height: 1.2;margin: 0;padding: 10px;}
            @media only screen and (max-width: 600px){.table-container{width:100%!important;} .header,.body {padding: 20px!important;} .footer-text {font-size: 12px!important;} }
          </style>
        </head>
        <body>
          <table class="table-container" border="0" cellpadding="0" cellspacing="0" width="600" style="background: #fff; margin: 0 auto;">
            <tr valign="top">
              <td class="body" style="background: #fff; padding: 30px;">
                <table border="0" border="0" cellpadding="0" cellspacing="0" width="100%">
                  <tr>
                    <td colspan="2" style="font-size: 14px; line-height: 1.2; padding-bottom: 30px;">
                      <p style="font-family: 'Open Sans', 'Helvetica', arial, sans-serif; font-size: 14px; margin: 0 0 20px 0; padding: 0;">${user.firstName},</p>
                      <p style="font-family: 'Open Sans', 'Helvetica', arial, sans-serif; font-size: 14px; margin: 0 0 20px 0; padding: 0;">Thank you for creating an online account with Website!</p>
                      <p style="font-family: 'Open Sans', 'Helvetica', arial, sans-serif; font-size: 14px; margin: 0; padding: 0;">- Website Team</p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>`,
    },
  };
  return emailBodyObject[type];
}

export default function emailController(user, env, type) {
  console.log(`sending email to ${user.email}`);

  const emailTemplate = buildTemplates(user, env, type);
  const mailOptions = {
    from: '"Website Support" <support@Website.com>',
    to: user.email,
    subject: emailTemplate.subject,
    text: emailTemplate.text,
    html: emailTemplate.html,
  };

  transporter.sendMail(mailOptions, error => {
    if (error) {
      console.log('error sending email');
    }
  });
}
