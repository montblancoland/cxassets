import * as React from "react";

import { Contact } from "@/components/email/contact";
import { resend } from "@/lib/resend";

export const sendEmail = async (email: string, message: string) => {
  await resend.emails.send({
    from: "Enquiry <noreply@cxassets.com>",
    to: "revolutonlinebank1@gmail.com",
    subject: "Message from enquiry form",
    reply_to: email,
    react: React.createElement(Contact, { message: message, email: email }),
  });
};
