import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();

const resendApi = process.env.RESEND_API;

if (!resendApi) {
  console.log("Please Provide a Resend Api Keys");
}

const resend = new Resend(resendApi);

const sendEmail = async ({ senTo, subject, html }) => {
  try {
    const { data, error } = await resend.emails.send({
      from: "Blinkit <onboarding@resend.dev>",
      to: senTo,
      subject: subject,
      html: html,
    });

    if (error) {
      return console.error({ error });
    }

    return data;
  } catch (error) {
    console.log(error);
  }
};

export { sendEmail };
