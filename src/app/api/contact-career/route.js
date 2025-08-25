import nodemailer from "nodemailer";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

// ✅ Common CORS headers
const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*", // allow all origins
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export async function OPTIONS() {
  // Handle preflight request
  return new Response(null, { status: 204, headers: CORS_HEADERS });
}

export async function POST(req) {
  try {
    const contentType = req.headers.get("content-type") || "";
    let formType = contentType.includes("multipart/form-data") ? "career" : "contact";

    if (formType === "contact") {
      const { name, email, phone, message } = await req.json();

      if (!name || !email || !message) {
        return new Response(
          JSON.stringify({ success: false, message: "Name, email, and message are required." }),
          { status: 400, headers: CORS_HEADERS }
        );
      }

      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_PASS,
        },
      });

      const mailOptions = {
        from: `"${name}" <${process.env.GMAIL_USER}>`,
        to: process.env.GMAIL_USER,
        replyTo: email,
        subject: `📩 Contact from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || "Not provided"}\nMessage: ${message}`,
        html: `<div>
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
          <p><strong>Message:</strong><br/>${message}</p>
        </div>`,
      };

      await transporter.sendMail(mailOptions);

      return new Response(
        JSON.stringify({ success: true, message: "Message sent successfully!" }),
        { status: 200, headers: CORS_HEADERS }
      );
    }

    // Career form
    const formData = await req.formData();
    const name = formData.get("name");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const position = formData.get("position");
    const experience = formData.get("experience");
    const message = formData.get("message");
    const resume = formData.get("resume");

    if (!name || !email || !phone || !position || !experience || !resume) {
      return new Response(
        JSON.stringify({ success: false, message: "Missing required fields" }),
        { status: 400, headers: CORS_HEADERS }
      );
    }

    if (resume.size > 5 * 1024 * 1024) {
      return new Response(
        JSON.stringify({ success: false, message: "File too large (max 5MB)" }),
        { status: 400, headers: CORS_HEADERS }
      );
    }

    const allowedTypes = [".pdf", ".doc", ".docx"];
    const fileExtension = path.extname(resume.name).toLowerCase();
    if (!allowedTypes.includes(fileExtension)) {
      return new Response(
        JSON.stringify({ success: false, message: "Invalid file type" }),
        { status: 400, headers: CORS_HEADERS }
      );
    }

    const buffer = Buffer.from(await resume.arrayBuffer());

    const uploadDir = path.join(process.cwd(), "public", "uploads", "resumes");
    await mkdir(uploadDir, { recursive: true });

    const timestamp = Date.now();
    const safeName = resume.name.replace(/[^a-zA-Z0-9.]/g, "_");
    const uniqueFilename = `${timestamp}_${safeName}`;
    await writeFile(path.join(uploadDir, uniqueFilename), buffer);

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.SMTP_FROM || `"Career Form" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      subject: `📄 New Career Application: ${position}`,
      html: `
        <div>
          <h2>New Career Application</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Position:</strong> ${position}</p>
          <p><strong>Experience:</strong> ${experience}</p>
          <p><strong>Message:</strong> ${message || "None"}</p>
          <p><a href="${process.env.NEXT_PUBLIC_BASE_URL}/uploads/resumes/${uniqueFilename}" target="_blank">Download Resume</a></p>
        </div>
      `,
      attachments: [
        {
          filename: resume.name,
          content: buffer,
        },
      ],
    };

    await transporter.sendMail(mailOptions);

    return new Response(
      JSON.stringify({ success: true, message: "Career application submitted successfully" }),
      { status: 200, headers: CORS_HEADERS }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Server error" }),
      { status: 500, headers: CORS_HEADERS }
    );
  }
}
