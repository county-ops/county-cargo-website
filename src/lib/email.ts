'use server';

interface EmailRecipient {
    email_address: {
        address: string;
        name: string;
    };
}

interface SendEmailParams {
    to: EmailRecipient[];
    subject: string;
    htmlBody: string;
}

const ZEPTO_API_URL = 'https://api.zeptomail.com/v1.1/email';
const API_KEY = process.env.ZEPTO_MAIL_API_KEY;
const FROM_ADDRESS = 'noreply@countycargo.com';
const REPLY_TO_ADDRESS = 'info@countycargo.com';

export async function sendEmail({ to, subject, htmlBody }: SendEmailParams): Promise<{ success: boolean; message?: string }> {
    if (!API_KEY || API_KEY === 'YOUR_API_KEY_HERE') {
        console.error('ZeptoMail API key is not configured.');
        return { success: false, message: 'Email service is not configured.' };
    }

    const payload: any = {
        from: { address: FROM_ADDRESS, name: 'County Cargo' },
        to,
        reply_to: [{ address: REPLY_TO_ADDRESS, name: 'County Cargo' }],
        subject,
        htmlbody: htmlBody,
    };

    try {
        const response = await fetch(ZEPTO_API_URL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': API_KEY,
            },
            body: JSON.stringify(payload),
        });

        if (response.ok) {
            console.log('Email sent successfully to:', to.map(t => t.email_address.address).join(', '));
            return { success: true };
        } else {
            const errorBody = await response.json();
            console.error('Failed to send email:', errorBody);
            return { success: false, message: `Failed to send email. Status: ${response.status}` };
        }
    } catch (error) {
        console.error('Error sending email:', error);
        return { success: false, message: 'An unexpected error occurred while sending the email.' };
    }
}
