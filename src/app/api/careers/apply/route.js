import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const formData = await req.formData();

    const name = formData.get("name");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const position = formData.get("position");
    const experience = formData.get("experience");
    const message = formData.get("message");
    const resume = formData.get("resume");

    if (!name || !email || !phone || !position || !experience || !resume) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate file size (max 5MB)
    if (resume.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { success: false, message: "File size too large (max 5MB)" },
        { status: 400 }
      );
    }

    // Validate file type
    const allowedTypes = [".pdf", ".doc", ".docx"];
    const fileExtension = path.extname(resume.name).toLowerCase();
    if (!allowedTypes.includes(fileExtension)) {
      return NextResponse.json(
        { success: false, message: "Invalid file type. Only PDF, DOC, and DOCX are allowed." },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const bytes = await resume.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Ensure upload directory exists
    const uploadDir = path.join(process.cwd(), "public", "uploads", "resumes");
    await mkdir(uploadDir, { recursive: true });

    // Generate unique filename
    const timestamp = Date.now();
    const safeName = resume.name.replace(/[^a-zA-Z0-9.]/g, "_");
    const uniqueFilename = `${timestamp}_${safeName}`;
    const filePath = path.join(uploadDir, uniqueFilename);

    // Save file
    await writeFile(filePath, buffer);

    console.log("Career Application Received:", {
      name,
      email,
      phone,
      position,
      experience,
      message,
      resume: `/uploads/resumes/${uniqueFilename}`,
    });

    // Send email notification using SMTP
    try {
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
        to: "dev1.bcsgroup@gmail.com",
        subject: `📄 New Career Application: ${position}`,
        html: `
          <div style="font-family: Arial, sans-serif; background:#f4f6f8; padding:20px;">
            <div style="max-width:600px; margin:auto; background:#ffffff; border-radius:8px; padding:20px; box-shadow:0 2px 6px rgba(0,0,0,0.1);">
              
              <h2 style="color:#222; font-size:20px; margin-top:0;">📬 New Career Application Received</h2>
              
              <table style="width:100%; border-collapse: collapse; margin: 16px 0;">
                <tr>
                  <td style="padding:8px 0; font-weight:bold; width:120px;">Name:</td>
                  <td style="padding:8px 0;">${name}</td>
                </tr>
                <tr>
                  <td style="padding:8px 0; font-weight:bold;">Email:</td>
                  <td style="padding:8px 0;"><a href="mailto:${email}" style="color:#1a73e8;">${email}</a></td>
                </tr>
                <tr>
                  <td style="padding:8px 0; font-weight:bold;">Phone:</td>
                  <td style="padding:8px 0;">${phone}</td>
                </tr>
                <tr>
                  <td style="padding:8px 0; font-weight:bold;">Position:</td>
                  <td style="padding:8px 0;">${position}</td>
                </tr>
                <tr>
                  <td style="padding:8px 0; font-weight:bold;">Experience:</td>
                  <td style="padding:8px 0;">${experience}</td>
                </tr>
                <tr>
  <td style="padding:8px 0; font-weight:bold;">Resume:</td>
  <td style="padding:8px 0;">
    <a href="${process.env.NEXT_PUBLIC_BASE_URL}/uploads/resumes/${uniqueFilename}" 
       style="color:#1a73e8; text-decoration:none;" target="_blank">
       Download Resume
    </a>
    <br />
    <small style="color:#666;">(Attached as file too)</small>
  </td>
</tr>

              </table>

              <div style="margin-top:20px;">
                <p style="font-weight:bold; margin-bottom:8px;">Message:</p>
                <div style="background:#f9f9f9; padding:12px; border-radius:6px; line-height:1.5; white-space:pre-line;">
                  ${message || "No additional message provided"}
                </div>
              </div>

              <p style="margin-top:20px; font-size:12px; color:#888;">
                Application received at: ${new Date().toLocaleString()}
              </p>
            </div>
          </div>
        `,
        attachments: [
          {
            filename: resume.name,
            content: buffer,
          },
        ],
      };

      const info = await transporter.sendMail(mailOptions);
      console.log("Email notification sent:", info.messageId);
    } catch (emailError) {
      console.error("Error sending email notification:", emailError);
    }

    return NextResponse.json({
      success: true,
      message: "Application submitted successfully",
    });
  } catch (error) {
    console.error("Error handling application:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
