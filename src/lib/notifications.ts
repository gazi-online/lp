/**
 * Notification Service Hub
 * Integration points for SMS, WhatsApp, and Email APIs.
 */

export const sendSMS = async (phone: string, message: string) => {
  console.log(`[SMS Protocol] Dispatching to ${phone}: ${message}`);
  // Integration example:
  // await fetch('https://api.sms-provider.com/send', { method: 'POST', body: JSON.stringify({ to: phone, msg: message }) });
  return true;
};

export const sendWhatsApp = async (phone: string, message: string) => {
  console.log(`[WhatsApp Protocol] Secure Link for ${phone}: ${message}`);
  return true;
};

export const sendEmail = async (email: string, subject: string, body: string) => {
  console.log(`[SMTP Protocol] Sending to ${email}: ${subject}`);
  return true;
};

export const notifyBookingConfirmation = async (booking: { id: string, client: string, phone: string, date: string, time: string, service: string }) => {
  const message = `Hello ${booking.client}, your appointment for ${booking.service} is confirmed on ${booking.date} at ${booking.time}. ID: ${booking.id}. - Gazi Online Hub`;
  
  await sendSMS(booking.phone, message);
  await sendWhatsApp(booking.phone, message);
};
