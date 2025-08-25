import nodemailer from "nodemailer";

export async function POST(req) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  try {
    const { name, email, phone, message } = await req.json();

    // ✅ Basic validation
    if (!name || !email || !message) {
      return Response.json(
        { success: false, message: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    // ✅ Configure transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    // ✅ Mail options
    const mailOptions = {
      from: `"${name}" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      replyTo: email,
      subject: `📩 Contact from ${name}`,
      text: `
Name: ${name}
Email: ${email}
Phone: ${phone || "Not provided"}
Message: ${message}
      `,
      html: `
        <div style="font-family: Arial, sans-serif; background:#f4f6f8; padding:20px;">
          <div style="max-width:600px; margin:auto; background:#ffffff; border-radius:8px; padding:20px; box-shadow:0 2px 6px rgba(0,0,0,0.1);">
            
            <h2 style="color:#222; font-size:20px; margin-top:0;">📬 New Contact Form Submission</h2>
            
            <table style="width:100%; border-collapse: collapse; margin: 16px 0;">
              <tr>
                <td style="padding:8px 0; font-weight:bold; width:80px;">Name:</td>
                <td style="padding:8px 0;">${name}</td>
              </tr>
              <tr>
                <td style="padding:8px 0; font-weight:bold;">Email:</td>
                <td style="padding:8px 0;"><a href="mailto:${email}" style="color:#1a73e8;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding:8px 0; font-weight:bold;">Phone:</td>
                <td style="padding:8px 0;">${phone || "Not provided"}</td>
              </tr>
            </table>

            <div style="margin-top:20px;">
              <p style="font-weight:bold; margin-bottom:8px;">Message:</p>
              <div style="background:#f9f9f9; padding:12px; border-radius:6px; line-height:1.5; white-space:pre-line;">
                ${message}
              </div>
            </div>

             
          </div>
        </div>
      `,
    };

    // ✅ Send email
    await transporter.sendMail(mailOptions);

    return Response.json(
      { success: true, message: "Your message has been sent successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Email sending error:", error);

    return Response.json(
      { success: false, message: "Failed to send email. Please try again later." },
      { status: 500 }
    );
  }
}
