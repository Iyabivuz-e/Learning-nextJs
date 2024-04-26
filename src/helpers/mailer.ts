import bcryptjs from "bcryptjs";
import User from "@/models/userModel";
import nodemailer from "nodemailer";

export const SendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        VerifyToken: hashedToken,
        VerifyExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotpasswordToken: hashedToken,
        forgotpasswordTokenExpiryF: Date.now() + 3600000,
      });
    }

    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.AUTH_USER,
        pass: process.env.AUTH_PASSWORD,
      },
    });

    const mailOptions = {
      from: "",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset Your Password",
      html: `<p>Click <a href="${
        process.env.DOMAIN
      }/verifyemail?token=${hashedToken}"> Here </a to ${
        emailType ? "Verify email" : "Reset your Password"
      }> or copy and paste the  link in your browser. <br> ${
        process.env.DOMAIN
      }/verifyemail?token=${hashedToken}
      </p>`,
    };

    const mailerResponse = transport.sendMail(mailOptions);
    return mailerResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
