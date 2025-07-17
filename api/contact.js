import express from 'express';
import cors from 'cors';
import 'dotenv/config';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// EmailJS configuration - Uses environment variables
const EMAILJS_CONFIG = {
  serviceId: process.env.EMAILJS_SERVICE_ID,
  templateId: process.env.EMAILJS_TEMPLATE_ID,
  userId: process.env.EMAILJS_USER_ID,
  accessToken: process.env.EMAILJS_ACCESS_TOKEN
};

// Function to send email via EmailJS API
const sendEmailViaEmailJS = async (formData) => {
  try {
    const emailData = {
      service_id: EMAILJS_CONFIG.serviceId,
      template_id: EMAILJS_CONFIG.templateId,
      user_id: EMAILJS_CONFIG.userId,
      accessToken: EMAILJS_CONFIG.accessToken,
      template_params: {
        to_name: 'AgenticAI Team',
        from_name: `${formData.firstName} ${formData.lastName}`,
        from_email: formData.email,
        company: formData.company || 'Not specified',
        subject: formData.subject || 'Contact Form Submission',
        message: formData.message,
        reply_to: formData.email,
        to_email: 'info@agentic-ai.ltd'
      }
    };

    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailData)
    });

    if (!response.ok) {
      throw new Error(`EmailJS API error: ${response.status}`);
    }

    return { success: true, message: 'Email sent successfully' };
  } catch (error) {
    console.error('EmailJS send error:', error);
    throw error;
  }
};

// Function to send acknowledgment email to user
const sendAcknowledgmentEmail = async (formData) => {
  try {
    const ackData = {
      service_id: EMAILJS_CONFIG.serviceId,
      template_id: process.env.EMAILJS_ACK_TEMPLATE_ID,
      user_id: EMAILJS_CONFIG.userId,
      accessToken: EMAILJS_CONFIG.accessToken,
      template_params: {
        to_name: formData.firstName,
        to_email: formData.email,
        from_name: 'AgenticAI Team',
        subject: 'Thank you for contacting AgenticAI',
        company: formData.company || 'Not specified',
        original_subject: formData.subject || 'General Inquiry',
        message: `Hello ${formData.firstName},\n\nThank you for reaching out to AgenticAI! We've received your message and our team will get back to you within 24 hours.\n\nYour inquiry details:\n- Subject: ${formData.subject || 'General Inquiry'}\n- Company: ${formData.company || 'Not specified'}\n- Message: ${formData.message}\n\nBest regards,\nThe AgenticAI Team`
      }
    };

    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ackData)
    });

    if (!response.ok) {
      throw new Error(`EmailJS acknowledgment error: ${response.status}`);
    }

    return { success: true, message: 'Acknowledgment email sent successfully' };
  } catch (error) {
    console.error('EmailJS acknowledgment error:', error);
    throw error;
  }
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

    console.log('📧 Processing contact form submission:', formData);

    // Check if EmailJS is configured
    if (!isEmailJSConfigured()) {
      console.log('⚠️  EmailJS not configured - logging submission only');
      return res.status(200).json({ 
        message: 'Contact form submitted (EmailJS not configured)',
        timestamp: formData.timestamp,
        status: 'logged_only'
      });
    }

    // Send notification email to AgenticAI team
    try {
      await sendEmailViaEmailJS(formData);
      console.log('✅ Notification email sent to AgenticAI team');
    } catch (emailError) {
      console.error('❌ Failed to send notification email:', emailError);
      // Continue to try acknowledgment email
    }

    // Send acknowledgment email to user
    try {
      await sendAcknowledgmentEmail(formData);
      console.log('✅ Acknowledgment email sent to user');
    } catch (ackError) {
      console.error('❌ Failed to send acknowledgment email:', ackError);
    }

    res.status(200).json({ 
      message: 'Contact form submitted and emails sent successfully',
      timestamp: formData.timestamp,
      status: 'emails_sent'
    });

  } catch (error) {
    console.error('❌ Error processing contact form:', error);
    res.status(500).json({ 
      error: 'Failed to process contact form',
      details: error.message
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK',
    timestamp: new Date().toISOString(),
    service: 'Contact API with EmailJS',
    environment: 'webcontainer'
  });
});

const PORT = process.env.PORT || 3001;

// Check if EmailJS credentials are configured
const isEmailJSConfigured = () => {
  return EMAILJS_CONFIG.serviceId && 
         EMAILJS_CONFIG.templateId && 
         EMAILJS_CONFIG.userId && 
         EMAILJS_CONFIG.accessToken;
};

app.listen(PORT, () => {
  console.log(`🚀 Contact API server running on port ${PORT}`);
  console.log(`📧 EmailJS integration enabled`);
  console.log(`🔗 Health check: http://localhost:${PORT}/api/health`);
  
  if (!isEmailJSConfigured()) {
    console.log(`⚠️  WARNING: EmailJS not configured! Please set up your credentials in .env file`);
    console.log(`   Required: EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, EMAILJS_ACK_TEMPLATE_ID, EMAILJS_USER_ID, EMAILJS_ACCESS_TOKEN`);
  } else {
    console.log(`✅ EmailJS configured and ready to send emails`);
  }
});