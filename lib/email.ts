import nodemailer from 'nodemailer';
import type { GrantApplication } from '@/types/grants';
import { categoryOptions } from '@/data/grants';

interface SendEmailParams {
  name: string;
  email: string;
  message: string;
}

function getTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

export async function sendContactEmail({ name, email, message }: SendEmailParams): Promise<boolean> {
  const transporter = getTransporter();

  try {
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.SMTP_USER, // Send to the same address (admin@heatpunks.org)
      replyTo: email,
      subject: `[Heatpunks Contact] Message from ${name}`,
      text: `
Name: ${name}
Email: ${email}

Message:
${message}
      `.trim(),
      html: `
<h2>New Contact Form Submission</h2>
<p><strong>Name:</strong> ${escapeHtml(name)}</p>
<p><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
<h3>Message:</h3>
<p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>
      `.trim(),
    });

    return true;
  } catch (error) {
    console.error('Failed to send email:', error);
    return false;
  }
}

export async function sendGrantApplication(application: GrantApplication): Promise<boolean> {
  const transporter = getTransporter();
  const grantsEmail = process.env.GRANTS_EMAIL || 'grants@heatpunks.org';

  const categoryLabel = categoryOptions.find(c => c.value === application.category)?.label || application.category;

  const textContent = `
NEW GRANT APPLICATION
=====================

CONTACT INFORMATION
-------------------
Name: ${application.name}
Email: ${application.email}
Organization: ${application.organization || 'Not provided'}
Country: ${application.country}

PROJECT DETAILS
---------------
Category: ${categoryLabel}
Project Title: ${application.projectTitle}
Budget Requested: $${application.budget.toLocaleString()} USD

Project Description:
${application.projectDescription}

Timeline:
${application.timeline}

IMPACT & BACKGROUND
-------------------
Expected Impact & Deliverables:
${application.impact}

Applicant Background:
${application.background}

ADDITIONAL INFORMATION
----------------------
References: ${application.references || 'Not provided'}
Source: ${application.source || 'Not provided'}

ACKNOWLEDGEMENTS
----------------
All acknowledgements have been confirmed:
- Grants paid in Bitcoin: Yes
- Open license for deliverables: Yes
- Permission to share project info: Yes
- No guarantee of funding: Yes
- Consent to contact: Yes
  `.trim();

  const htmlContent = `
<h1 style="color: #f97316; border-bottom: 2px solid #f97316; padding-bottom: 10px;">New Grant Application</h1>

<h2 style="color: #333; margin-top: 24px;">Contact Information</h2>
<table style="border-collapse: collapse; width: 100%; max-width: 600px;">
  <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Name:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${escapeHtml(application.name)}</td></tr>
  <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Email:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><a href="mailto:${escapeHtml(application.email)}">${escapeHtml(application.email)}</a></td></tr>
  <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Organization:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${escapeHtml(application.organization || 'Not provided')}</td></tr>
  <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Country:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${escapeHtml(application.country)}</td></tr>
</table>

<h2 style="color: #333; margin-top: 24px;">Project Details</h2>
<table style="border-collapse: collapse; width: 100%; max-width: 600px;">
  <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Category:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${escapeHtml(categoryLabel)}</td></tr>
  <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Project Title:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${escapeHtml(application.projectTitle)}</td></tr>
  <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Budget Requested:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">$${application.budget.toLocaleString()} USD</td></tr>
</table>

<h3 style="color: #666; margin-top: 16px;">Project Description</h3>
<div style="background: #f9f9f9; padding: 16px; border-left: 3px solid #f97316; margin-bottom: 16px;">
${escapeHtml(application.projectDescription).replace(/\n/g, '<br>')}
</div>

<h3 style="color: #666; margin-top: 16px;">Timeline</h3>
<div style="background: #f9f9f9; padding: 16px; border-left: 3px solid #f97316; margin-bottom: 16px;">
${escapeHtml(application.timeline).replace(/\n/g, '<br>')}
</div>

<h2 style="color: #333; margin-top: 24px;">Impact & Background</h2>

<h3 style="color: #666; margin-top: 16px;">Expected Impact & Deliverables</h3>
<div style="background: #f9f9f9; padding: 16px; border-left: 3px solid #f97316; margin-bottom: 16px;">
${escapeHtml(application.impact).replace(/\n/g, '<br>')}
</div>

<h3 style="color: #666; margin-top: 16px;">Applicant Background</h3>
<div style="background: #f9f9f9; padding: 16px; border-left: 3px solid #f97316; margin-bottom: 16px;">
${escapeHtml(application.background).replace(/\n/g, '<br>')}
</div>

<h2 style="color: #333; margin-top: 24px;">Additional Information</h2>
<table style="border-collapse: collapse; width: 100%; max-width: 600px;">
  <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>References:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${escapeHtml(application.references || 'Not provided')}</td></tr>
  <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Source:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${escapeHtml(application.source || 'Not provided')}</td></tr>
</table>

<h2 style="color: #333; margin-top: 24px;">Acknowledgements</h2>
<p style="color: #666;">All acknowledgements have been confirmed by the applicant.</p>
<ul style="color: #666;">
  <li>Grants paid in Bitcoin: ✓</li>
  <li>Open license for deliverables: ✓</li>
  <li>Permission to share project info: ✓</li>
  <li>No guarantee of funding: ✓</li>
  <li>Consent to contact: ✓</li>
</ul>
  `.trim();

  try {
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: grantsEmail,
      replyTo: application.email,
      subject: `[Heatpunks Grant] ${application.projectTitle} - ${application.name}`,
      text: textContent,
      html: htmlContent,
    });

    return true;
  } catch (error) {
    console.error('Failed to send grant application email:', error);
    return false;
  }
}

function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}
