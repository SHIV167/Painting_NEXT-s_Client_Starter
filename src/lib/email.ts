import { Resend } from 'resend';

// Initialize Resend with API key from environment
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export async function sendEmail({ to, subject, html, text }: EmailOptions) {
  // Try SMTP first
  try {
    const nodemailer = (await import('nodemailer')).default;
    
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
    
    const mailOptions = {
      from: process.env.SMTP_FROM,
      to,
      subject,
      html,
      text: text || html.replace(/<[^>]*>/g, ''),
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully via SMTP:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('SMTP error:', error);
    
    // Fallback to Resend if SMTP fails
    if (resend) {
      try {
        const { data, error } = await resend.emails.send({
          from: process.env.RESEND_FROM || 'onboarding@resend.dev',
          to,
          subject,
          html,
          text: text || html.replace(/<[^>]*>/g, ''),
        });

        if (error) {
          console.error('Resend error:', error);
          return { success: false, error: error.message };
        }

        console.log('Email sent successfully via Resend:', data);
        return { success: true, messageId: data?.id };
      } catch (resendError) {
        console.error('Resend error:', resendError);
        return { success: false, error: resendError instanceof Error ? resendError.message : 'Unknown error' };
      }
    }

    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export async function sendContactFormEmail(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h2 style="color: #7c3aed;">New Contact Form Submission</h2>
      <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Subject:</strong> ${data.subject}</p>
        <p><strong>Message:</strong></p>
        <p style="white-space: pre-wrap;">${data.message}</p>
      </div>
      <p style="color: #6b7280; font-size: 12px;">This email was sent from the Art Gallery contact form.</p>
    </div>
  `;

  return sendEmail({
    to: process.env.SUPPORT_EMAIL || process.env.SMTP_USER || 'support@example.com',
    subject: `Contact Form: ${data.subject}`,
    html,
  });
}

export async function sendNewsletterConfirmation(email: string) {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h2 style="color: #7c3aed;">Welcome to Art Gallery Newsletter</h2>
      <p>Thank you for subscribing to our newsletter!</p>
      <p>You'll receive updates about new exhibitions, artists, and events.</p>
      <div style="margin: 30px 0;">
        <a href="${process.env.NEXT_PUBLIC_SITE_URL}" style="background: linear-gradient(to right, #7c3aed, #ec4899); color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; display: inline-block;">Visit Gallery</a>
      </div>
      <p style="color: #6b7280; font-size: 12px;">© ${new Date().getFullYear()} Art Gallery. All rights reserved.</p>
    </div>
  `;

  return sendEmail({
    to: email,
    subject: 'Welcome to Art Gallery Newsletter',
    html,
  });
}
