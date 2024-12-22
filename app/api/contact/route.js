import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Name, email, and message are required' }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail', 
      auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS, 
      },
    });

    // Email to the admin (you)
    const mailOptionsAdmin = {
      from: process.env.EMAIL_USER, 
      to: process.env.EMAIL_USER, 
      subject: `New Message from ${name}`,
      text: `Message from: ${name}\n\n${message}`,
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; border-radius: 5px;">
          <h2 style="color: #333;">New Message from ${name}</h2>
          <p style="color: #555;">You have received a new message:</p>
          <div style="background-color: #fff; padding: 15px; border-radius: 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
          </div>
          <p style="color: #777; font-size: 12px; margin-top: 20px;">This email was sent from your contact form.</p>
        </div>
      `,
    };

    // Email to the user (sender) thanking them for their message
    const mailOptionsUser = {
      from: process.env.EMAIL_USER, 
      to: email, 
      subject: 'Thank You for Your Message!',
      text: `Hi ${name},\n\nThank you for getting in touch! We have received your message and will get back to you shortly.`,
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; border-radius: 5px;">
          <h2 style="color: #333;">Thank You for Your Message, ${name}!</h2>
          <p style="color: #555;">We have successfully received your message. Our team will get back to you shortly.</p>
          <p style="color: #555;">Here’s a copy of your message:</p>
          <div style="background-color: #fff; padding: 15px; border-radius: 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
            <p><strong>Your Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
          </div>
          <p style="color: #555;">If you need immediate assistance, feel free to reach us at <strong>${process.env.EMAIL_USER}</strong>.</p>
          <p style="color: #777; font-size: 12px; margin-top: 20px;">This email is to confirm that we have received your inquiry. We will be in touch soon!</p>
        </div>
      `,
    };

    // Send email to admin (you)
    await transporter.sendMail(mailOptionsAdmin);

    // Send thank you email to user
    await transporter.sendMail(mailOptionsUser);

    return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ error: 'Error sending email' }, { status: 500 });
  }
}
