import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Create a transporter using Gmail SMTP
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Validate email format
const isValidEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export async function POST(req: Request) {
  try {
    const { name, email, phone, subject, message } = await req.json();

    // Enhanced input validation
    if (!name?.trim() || !email?.trim() || !subject?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Verify transporter configuration
    try {
      await transporter.verify();
    } catch (error) {
      console.error('Email configuration error:', error);
      return NextResponse.json(
        { error: 'Email service configuration error' },
        { status: 500 }
      );
    }

    // Email content with sanitized input
    const mailOptions = {
      from: {
        name: 'Website Contact Form',
        address: process.env.EMAIL_USER || '',
      },
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `Website Inquiry: ${subject} from ${name}`,
      headers: {
        'X-Gmail-Label': 'Website Inquiries',
        'Importance': 'high',
        'Category': 'primary'
      },
      text: `
Name: ${name}
Email: ${email}${phone ? `\nPhone: ${phone}` : ''}
Subject: ${subject}

Message:
${message}
      `,
      html: `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <h2 style="color: #8B7355;">Website Contact Form Submission</h2>
  <div style="background-color: #F5F0EB; padding: 20px; border-radius: 8px;">
    <p><strong>From:</strong> ${name}</p>
    <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>${phone ? `
    <p><strong>Phone:</strong> <a href="tel:${phone}">${phone}</a></p>` : ''}
    <p><strong>Subject:</strong> ${subject}</p>
    <hr style="border: none; border-top: 1px solid #D4C5B9; margin: 15px 0;">
    <p><strong>Message:</strong></p>
    <p style="white-space: pre-wrap; margin-top: 10px;">${message.replace(/\n/g, '<br>')}</p>
  </div>
</div>
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    // Send auto-response email to the sender
    const autoResponseOptions = {
      from: {
        name: 'Seth Mak Automation',
        address: process.env.EMAIL_USER || '',
      },
      to: email,
      subject: 'Thank you for your inquiry',
      text: `
Dear ${name},

Thank you for reaching out! This email confirms that we have received your message regarding "${subject}".

We will review your inquiry and get back to you soon. Here's a copy of your message for your records:

${message}

${phone ? `\nWe have your phone number (${phone}) on file if we need to reach you by phone.` : ''}

Best regards,
Seth Mak
Automation Solutions
      `,
      html: `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <div style="background-color: #F5F0EB; padding: 30px; border-radius: 8px;">
    <h2 style="color: #8B7355; margin-top: 0;">Thank You for Your Inquiry</h2>
    
    <p>Dear ${name},</p>
    
    <p>Thank you for reaching out! This email confirms that we have received your message regarding "<strong>${subject}</strong>".</p>
    
    <p>We will review your inquiry and get back to you soon. Here's a copy of your message for your records:</p>
    
    <div style="background-color: white; padding: 20px; border-radius: 4px; margin: 20px 0;">
      <p style="white-space: pre-wrap; margin: 0;">${message.replace(/\n/g, '<br>')}</p>
    </div>
    
    ${phone ? `<p>We have your phone number (<strong>${phone}</strong>) on file if we need to reach you by phone.</p>` : ''}
    
    <p style="margin-bottom: 0;">
      Best regards,<br>
      <strong>Seth Mak</strong><br>
      Automation Solutions
    </p>
  </div>
</div>
      `,
    };

    // Send the auto-response email
    await transporter.sendMail(autoResponseOptions);

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    
    // More detailed error handling
    const errorMessage = error instanceof Error 
      ? error.message
      : 'An unexpected error occurred';
    
    return NextResponse.json(
      { error: `Failed to send email: ${errorMessage}` },
      { status: 500 }
    );
  }
} 