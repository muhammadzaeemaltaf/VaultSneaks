import nodemailer from "nodemailer";

async function sendActivationEmail({ to, subject, text, userId }: {to: string, subject: string, text: string, userId: string}) {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        logger: true,
        debug: true,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
        tls: {
            rejectUnauthorized: true,
        }
    });

    const activationLink = `${process.env.NEXT_PUBLIC_BASE_URL}/activation?userId=${userId}`;
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject: "Activate Your Account",
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
                <div style="text-align: center;">
                    <img src="https://vaultsneaks.vercel.app/_next/image?url=%2FVaultSneak_Logo-01.png&w=1080&q=75" 
                         alt="VaultSneak Logo" 
                         style="width: 150px; height: auto; margin-bottom: 20px;" />
                </div>
                <div style="background: #fff; padding: 20px; text-align: center;">
                    <h2 style="color: #333;">Welcome to VaultSneak!</h2>
                    <p style="color: #555; font-size: 16px;">${text}</p>
                    <a href="${activationLink}" 
                       style="display: inline-block; margin-top: 20px; padding: 12px 20px; background: #000; color: #fff; font-size: 16px; text-decoration: none; border-radius: 5px;">
                       Activate Account
                    </a>
                </div>
                <div style="text-align: center; margin-top: 20px; font-size: 12px; color: #888;">
                    <p>If you did not request this email, please ignore it.</p>
                    <p>&copy; ${new Date().getFullYear()} VaultSneak. All rights reserved.</p>
                </div>
            </div>
        `
    };

    await transporter.sendMail(mailOptions);
}

async function sendSuccessEmail({ to, fullName }: {to: string, fullName: string}) {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        logger: true,
        debug: true,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
        tls: {
            rejectUnauthorized: true,
        }
    });

    const successMailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject: "Account Activated Successfully",
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
                <div style="text-align: center;">
                    <img src="https://vaultsneaks.vercel.app/_next/image?url=%2FVaultSneak_Logo-01.png&w=1080&q=75" 
                         alt="VaultSneak Logo" 
                         style="width: 150px; height: auto; margin-bottom: 20px;" />
                </div>
                <div style="background: #fff; padding: 20px; text-align: center;">
                    <h2 style="color: #333;">Account Activated Successfully!</h2>
                    <p style="color: #555; font-size: 16px;">Dear ${fullName}, your account has been activated successfully. You can start using our services.</p>
                </div>
                <div style="text-align: center; margin-top: 20px; font-size: 12px; color: #888;">
                    <p>If you did not request this email, please ignore it.</p>
                    <p>&copy; ${new Date().getFullYear()} VaultSneak. All rights reserved.</p>
                </div>
            </div>
        `
    };

    await transporter.sendMail(successMailOptions);
}

export async function POST(req: any) {
    try {
        const { to, subject, text, userId, isActivationSuccess, fullName } = await req.json();

        if (!to || !subject || !text || (!isActivationSuccess && !userId) || (isActivationSuccess && !fullName)) {
            const missingFields = [];
            if (!to) missingFields.push("to");
            if (!subject) missingFields.push("subject");
            if (!text) missingFields.push("text");
            if (!isActivationSuccess && !userId) missingFields.push("userId");
            if (isActivationSuccess && !fullName) missingFields.push("fullName");
            console.log("Missing fields:", missingFields.join(", "));
            return Response.json({ message: "All fields are required" }, { status: 400 });
        }

        if (!isActivationSuccess) {
            await sendActivationEmail({ to, subject, text, userId });
        } else {
            await sendSuccessEmail({ to, fullName });
        }

        return Response.json({ message: "Email sent successfully" }, { status: 200 });

    } catch (error) {
        console.error("Email Error:", error);
        return Response.json({ message: "Error sending email", error }, { status: 500 });
    }
}
