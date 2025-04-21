import nodemailer from "nodemailer";

// Nodemailer Transporter setup
const transporter = nodemailer.createTransport({
  service: "gmail", // You can change this to your email provider
  auth: {
    user: process.env.ADMIN_EMAIL, // Your email address (e.g., "example@gmail.com")
    pass: process.env.ADMIN_EMAIL_PASS, // Your email password or app-specific password
  },
});
export const sendReplyEmail = async (req, res) => {
  const { email, subject, message } = req.body;

  const mailOptions = {
    from: process.env.ADMIN_EMAIL,
    to: email,
    subject: subject || "Thank you for contacting us",
    text: message || "Dear User,\n\nThank you for your message.",
    html: `
      <p>${message || "Dear User, Thank you for your message."}</p>
      <p>Best Regards,<br/>Prani Seva Ashram</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Reply email sent successfully!" });
  } catch (error) {
    console.error("Error sending reply email: ", error);
    res.status(500).json({ message: "Failed to send reply email" });
  }
};
