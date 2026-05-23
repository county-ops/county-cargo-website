
'use server';

import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from './firebase';

export interface EmailTemplate {
    enabled: boolean;
    subject: string;
    htmlBody: string;
}

export interface EmailSettings {
    shipmentStatusUpdate: EmailTemplate;
    welcomeEmail: EmailTemplate;
    newBookingConfirmation: EmailTemplate;
    paymentConfirmation: EmailTemplate;
    adminBookingInvoice: EmailTemplate;
    receivedAtHub: EmailTemplate;
    packageReceivedNotification: EmailTemplate;
}

const defaultEmailSettings: EmailSettings = {
    welcomeEmail: {
        enabled: true,
        subject: 'Welcome to County Cargo!',
        htmlBody: `
            <div>
                <p>Hi {{firstname}},</p>
                <p>Welcome to County Cargo! We're excited to have you on board.</p>
                <p>You can now log in to your dashboard to book and manage your shipments.</p>
                <p>Best regards,<br>The County Cargo Team</p>
            </div>
        `
    },
    newBookingConfirmation: {
        enabled: true,
        subject: 'Your County Cargo Shipment {{shipmentId}} has been booked!',
        htmlBody: `
            <div>
                <p>Hi {{firstname}},</p>
                <p>Your new shipment with ID <strong>{{shipmentId}}</strong> has been successfully booked.</p>
                <p>You can view the full details and make a payment by logging into your dashboard.</p>
                <p>Best regards,<br>The County Cargo Team</p>
            </div>
        `
    },
    receivedAtHub: {
        enabled: true,
        subject: 'We have received your package for shipment {{shipmentId}}!',
        htmlBody: `
            <div>
                <p>Hi {{firstname}},</p>
                <p>Good news! We have successfully received items for your shipment <strong>{{shipmentId}}</strong> at our facility.</p>
                <p>Here are the details of the items we've received:</p>
                {{packageDetails}}
                <p>We are now preparing your shipment for the next step. You will receive another notification once it is being processed.</p>
                <p>Best regards,<br>The County Cargo Team</p>
            </div>
        `
    },
    shipmentStatusUpdate: {
        enabled: true,
        subject: 'Your Shipment {{shipmentId}} is now {{status}}',
        htmlBody: `
            <div>
                <p>Hello {{firstname}},</p>
                <p>This is an update on your shipment with tracking ID <strong>{{shipmentId}}</strong>.</p>
                <p>The status has been updated to: <strong>{{status}}</strong>.</p>
                <p>You can view your shipment details by logging into your dashboard.</p>
                <p>Thank you for shipping with County Cargo.</p>
            </div>
        `
    },
    paymentConfirmation: {
        enabled: true,
        subject: 'Payment Confirmed for Shipment {{shipmentId}}',
        htmlBody: `
            <div>
                <p>Hello {{firstname}},</p>
                <p>We have successfully confirmed your payment for shipment <strong>{{shipmentId}}</strong>.</p>
                <p>The status has been updated to: <strong>Submitted</strong>.</p>
                <p>We are now processing your shipment. You can view the latest updates by logging into your dashboard.</p>
                <p>Thank you for shipping with County Cargo.</p>
            </div>
        `
    },
    adminBookingInvoice: {
        enabled: true,
        subject: 'Your New County Cargo Shipment Booking: {{shipmentId}}',
        htmlBody: `
            <div>
                <p>Hi {{firstname}},</p>
                <p>A new shipment with ID <strong>{{shipmentId}}</strong> has been booked for you by our team.</p>
                <p>Please find the payment details below to complete your booking:</p>
                <ul>
                    <li><strong>Amount Due:</strong> {{totalCost}} NGN</li>
                    <li><strong>Bank Name:</strong> Stanbic IBTC</li>
                    <li><strong>Account Number:</strong> 0001808080</li>
                </ul>
                <p>For a detailed breakdown of charges, you can view the full invoice online:</p>
                <br>
                <a href="{{invoiceLink}}" style="background-color: #1e3a8a; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">View Full Invoice</a>
                <br><br>
                <p>You can also view all your shipment details by logging into your dashboard.</p>
                <p>Best regards,<br>The County Cargo Team</p>
            </div>
        `
    },
    packageReceivedNotification: {
        enabled: true,
        subject: 'Your Package(s) Have Arrived at Our Warehouse!',
        htmlBody: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1e3a8a;">
                <div style="background: #1e3a8a; padding: 24px; border-radius: 12px 12px 0 0; text-align: center;">
                    <h1 style="color: white; margin: 0; font-size: 22px;">County Cargo</h1>
                    <p style="color: #93c5fd; margin: 4px 0 0; font-size: 14px;">Package Arrival Notification</p>
                </div>
                <div style="background: #f0f9ff; padding: 32px; border: 1px solid #bae6fd; border-top: 0;">
                    <p style="margin-top:0;">Hi {{firstname}},</p>
                    <p>Great news! We have received the following package(s) on your behalf at our <strong>{{location}}</strong>:</p>
                    {{trackingNumber}}
                    <p>You can track your package(s) at any time by clicking the button below:</p>
                    <div style="text-align: center; margin: 28px 0;">
                        <a href="https://ship.countycargo.com" style="background-color: #1e3a8a; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 15px; display: inline-block;">
                            🚚 Track Your Package
                        </a>
                    </div>
                    <p style="font-size: 13px; color: #64748b;">Or copy this link: <a href="https://ship.countycargo.com" style="color: #1d4ed8;">https://ship.countycargo.com</a></p>
                    <p>You can also log in to your dashboard to create a new shipment using these packages.</p>
                    <p style="margin-bottom:0;">Best regards,<br><strong>The County Cargo Team</strong></p>
                </div>
                <div style="background: #e0f2fe; padding: 12px; border-radius: 0 0 12px 12px; text-align: center; font-size: 11px; color: #64748b;">
                    County Cargo · <a href="https://ship.countycargo.com" style="color: #1d4ed8;">ship.countycargo.com</a>
                </div>
            </div>
        `
    },
};

const settingsDocRef = doc(db, 'settings', 'email');

export async function getEmailSettings(): Promise<EmailSettings> {
    try {
        const docSnap = await getDoc(settingsDocRef);
        if (docSnap.exists()) {
            // Merge fetched settings with defaults to ensure all templates exist
            const fetchedSettings = docSnap.data() as Partial<EmailSettings>;
            return {
                ...defaultEmailSettings,
                ...fetchedSettings,
                welcomeEmail: { ...defaultEmailSettings.welcomeEmail, ...fetchedSettings.welcomeEmail },
                newBookingConfirmation: { ...defaultEmailSettings.newBookingConfirmation, ...fetchedSettings.newBookingConfirmation },
                receivedAtHub: { ...defaultEmailSettings.receivedAtHub, ...fetchedSettings.receivedAtHub },
                shipmentStatusUpdate: { ...defaultEmailSettings.shipmentStatusUpdate, ...fetchedSettings.shipmentStatusUpdate },
                paymentConfirmation: { ...defaultEmailSettings.paymentConfirmation, ...fetchedSettings.paymentConfirmation },
                adminBookingInvoice: { ...defaultEmailSettings.adminBookingInvoice, ...fetchedSettings.adminBookingInvoice },
                packageReceivedNotification: { ...defaultEmailSettings.packageReceivedNotification, ...fetchedSettings.packageReceivedNotification },
            };
        } else {
            // If settings don't exist, create them with default values
            await setDoc(settingsDocRef, defaultEmailSettings);
            return defaultEmailSettings;
        }
    } catch (error) {
        console.error("Error fetching email settings, returning default:", error);
        return defaultEmailSettings;
    }
}

export async function saveEmailSettings(settings: EmailSettings): Promise<void> {
    await setDoc(settingsDocRef, settings, { merge: true });
}
