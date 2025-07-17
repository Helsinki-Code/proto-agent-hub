import express from 'express';
import { createTransport } from 'nodemailer';
import cors from 'cors';
import 'dotenv/config';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// SiteGround SMTP Configuration
const transporter = createTransport({
  host: 'mail.agentic-ai.ltd',
  port: 465,
  secure: true, // true for 465, false for other ports
  tls: {
    rejectUnauthorized: false
  },
  auth: {
    user: 'info@agentic-ai.ltd',
    pass: 'Josh100!', // Your SiteGround email password
  },
});

// Email Templates
const createNotificationEmail = (formData) => {
  return {
    from: process.env.SMTP_USER || 'info@agentic-ai.ltd',
    to: 'info@agentic-ai.ltd',
    subject: `New Contact Form Submission - ${formData.subject || 'No Subject'}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0;">New Contact Form Submission</h1>
        </div>
        
        <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e9ecef;">
          <div style="background: white; padding: 25px; border-radius: 8px; border-left: 4px solid #667eea;">
            <h2 style="color: #333; margin-top: 0;">Contact Details</h2>
            
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #555;">Name:</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #333;">${formData.firstName} ${formData.lastName}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #555;">Email:</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #333;">${formData.email}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #555;">Company:</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #333;">${formData.company || 'Not specified'}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #555;">Subject:</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #333;">${formData.subject || 'No subject'}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #555;">Submitted:</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #333;">${new Date().toLocaleString()}</td>
              </tr>
            </table>
          </div>
          
          <div style="background: white; padding: 25px; border-radius: 8px; margin-top: 20px; border-left: 4px solid #28a745;">
            <h3 style="color: #333; margin-top: 0;">Message</h3>
            <div style="background: #f8f9fa; padding: 20px; border-radius: 5px; border: 1px solid #e9ecef;">
              <p style="color: #333; line-height: 1.6; margin: 0; white-space: pre-wrap;">${formData.message}</p>
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
            <p style="color: #666; font-size: 14px;">
              This email was sent automatically from your website contact form.
            </p>
          </div>
        </div>
      </div>
    `
  };
};

const createAcknowledgmentEmail = (formData) => {
  return {
    from: process.env.SMTP_USER || 'info@agentic-ai.ltd',
    to: formData.email,
    subject: 'Thank you for contacting AgenticAI - We\'ll be in touch soon!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0;">Thank You for Contacting Us!</h1>
        </div>
        
        <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e9ecef;">
          <div style="background: white; padding: 25px; border-radius: 8px;">
            <h2 style="color: #333; margin-top: 0;">Hello ${formData.firstName},</h2>
            
            <p style="color: #555; line-height: 1.6; font-size: 16px;">
              Thank you for reaching out to AgenticAI! We've received your message and our team will get back to you within <strong>24 hours</strong>.
            </p>
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #667eea;">
              <h3 style="color: #333; margin-top: 0;">Your Message Summary</h3>
              <p style="color: #555; margin: 5px 0;"><strong>Subject:</strong> ${formData.subject || 'General Inquiry'}</p>
              <p style="color: #555; margin: 5px 0;"><strong>Company:</strong> ${formData.company || 'Not specified'}</p>
              <p style="color: #555; margin: 5px 0;"><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
            </div>
            
            <p style="color: #555; line-height: 1.6; font-size: 16px;">
              In the meantime, feel free to explore our resources or schedule a demo directly:
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="https://yourdomain.com/schedule-demo" style="display: inline-block; background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold;">
                Schedule a Demo
              </a>
            </div>
            
            <div style="background: #e8f5e8; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #28a745;">
              <h3 style="color: #155724; margin-top: 0;">Contact Information</h3>
              <p style="color: #155724; margin: 5px 0;"><strong>Email:</strong> support@agentic-ai.ltd</p>
              <p style="color: #155724; margin: 5px 0;"><strong>Phone:</strong> +44 7771970567</p>
              <p style="color: #155724; margin: 5px 0;"><strong>Office:</strong> 25 Cavendish Square, London W1G 0PN, UK</p>
            </div>
            
            <p style="color: #555; line-height: 1.6; font-size: 16px;">
              Best regards,<br>
              <strong>The AgenticAI Team</strong>
            </p>
          </div>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
            <p style="color: #666; font-size: 14px;">
              This is an automated response. Please do not reply to this email.
            </p>
          </div>
        </div>
      </div>
    `
  };
};

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { firstName, lastName, email, company, subject, message } = req.body;

    // Validation
    if (!firstName || !lastName || !email || !message) {
      return res.status(400).json({ 
        error: 'Missing required fields: firstName, lastName, email, message' 
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    const formData = {
      firstName,
      lastName,
      email,
      company,
      subject,
      message,
      timestamp: new Date().toISOString()
    };

    // Send notification email to support@agentic-ai.ltd
    const notificationEmail = createNotificationEmail(formData);
    await transporter.sendMail(notificationEmail);

    // Send acknowledgment email to user
    const acknowledgmentEmail = createAcknowledgmentEmail(formData);
    await transporter.sendMail(acknowledgmentEmail);

    res.status(200).json({ 
      message: 'Emails sent successfully',
      timestamp: formData.timestamp 
    });

  } catch (error) {
    console.error('Error sending emails:', error);
    res.status(500).json({ 
      error: 'Failed to send emails',
      details: error.message,
      code: error.code,
      response: error.response,
      responseCode: error.responseCode
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK',
    timestamp: new Date().toISOString(),
    service: 'Contact API' 
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Contact API server running on port ${PORT}`);
});
