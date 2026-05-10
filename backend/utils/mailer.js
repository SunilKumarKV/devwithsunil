const nodemailer = require("nodemailer");
const logger = require("./logger");
const {
  EMAIL_HOST,
  EMAIL_PORT,
  EMAIL_SECURE,
  EMAIL_USER,
  EMAIL_PASS,
  EMAIL_TO,
} = process.env;

const mailConfigured = Boolean(
  EMAIL_HOST &&
    EMAIL_PORT &&
    EMAIL_USER &&
    EMAIL_PASS &&
    EMAIL_TO,
);

if (!mailConfigured) {
  logger.warn(
    "Mailer is not fully configured. Email notifications are disabled.",
  );
}

const transporter = mailConfigured
  ? nodemailer.createTransport({
      host: EMAIL_HOST,
      port: Number(EMAIL_PORT) || 587,
      secure: EMAIL_SECURE === "true",
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    })
  : null;

const safeSend = async (mailOptions) => {
  if (!transporter) {
    logger.warn("Skipping email send because mailer is not configured.", {
      to: mailOptions.to,
      subject: mailOptions.subject,
    });
    return Promise.resolve({ message: "Email not configured" });
  }

  return transporter.sendMail(mailOptions);
};

exports.sendContactNotification = async ({ name, email, message }) => {
  const mailOptions = {
    from: `DevWithSunil Website <${EMAIL_USER || "no-reply@devwithsunil.com"}>`,
    to: EMAIL_TO || "no-reply@devwithsunil.com",
    subject: `New contact message from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong><br>${message.replace(/\n/g, "<br>")}</p>`,
  };

  return safeSend(mailOptions);
};

exports.sendNewsletterWelcome = async (email) => {
  const mailOptions = {
    from: `DevWithSunil <${EMAIL_USER || "no-reply@devwithsunil.com"}>`,
    to: email,
    subject: "Welcome to DevWithSunil Newsletter!",
    text: `Thank you for subscribing to the DevWithSunil newsletter!\n\nYou'll receive updates on the latest blog posts, tutorials, and tech insights.\n\nBest regards,\nSunil Kumar`,
    html: `<h2>Welcome to DevWithSunil Newsletter!</h2><p>Thank you for subscribing!</p><p>You'll receive updates on the latest blog posts, tutorials, and tech insights.</p><p>Best regards,<br>Sunil Kumar</p>`,
  };

  return safeSend(mailOptions);
};
