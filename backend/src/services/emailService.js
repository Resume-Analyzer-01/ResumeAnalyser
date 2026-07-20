import nodemailer from 'nodemailer'
import config from '../config/env.js'
import logger from '../config/logger.js'

const transporter = nodemailer.createTransport({
  host: config.email.host,
  port: config.email.port,
  auth: {
    user: config.email.user,
    pass: config.email.pass
  }
})

export const sendMail = async (to, subject, htmlContent) => {
  const mailOptions = {
    from: config.email.from,
    to,
    subject,
    html: htmlContent
  }

  try {
    const info = await transporter.sendMail(mailOptions)
    logger.info(`Email sent: ${info.messageId}`)
    return info
  } catch (error) {
    logger.error(`Failed to send email to ${to}: ${error.message}`)
    // Silent fallback to console log for demo convenience
    logger.warn('SMTP connection failed. Logged email preview below:')
    logger.info(`[SIMULATED EMAIL] To: ${to} | Subject: ${subject} | Content: ${htmlContent.substring(0, 150)}...`)
    return { simulated: true, messageId: 'mock-message-id' }
  }
}

export const sendVerifyEmail = async (email, name, token) => {
  const html = `
    <h3>Welcome to ResumeAI!</h3>
    <p>Hi ${name},</p>
    <p>Verify your account email by navigating to this mock endpoint:</p>
    <a href="http://localhost:5000/api/auth/verify-email?token=${token}">Verify Email Address</a>
  `
  return sendMail(email, 'Verify your email - ResumeAI', html)
}

export const sendResetPasswordEmail = async (email, name, otp) => {
  const html = `
    <h3>Password Reset Request</h3>
    <p>Hi ${name},</p>
    <p>You requested a password reset. Please use the following 6-digit code to reset your password:</p>
    <h2 style="background: #f4f4f4; padding: 10px; display: inline-block; letter-spacing: 2px;">${otp}</h2>
    <p>This code will expire in 10 minutes. If you did not request this, please ignore this email.</p>
  `
  return sendMail(email, 'Reset password instructions - ResumeAI', html)
}
