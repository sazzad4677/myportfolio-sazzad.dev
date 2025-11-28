import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Admin from '@/models/Admin';
import crypto from 'crypto';

// Helper to hash password
const hashPassword = (password) => {
    return crypto.createHash('sha256').update(password).digest('hex');
};

export async function POST(request) {
    try {
        await dbConnect();

        const { username, password } = await request.json();

        if (!username || !password) {
            return NextResponse.json(
                { error: 'Username and password are required' },
                { status: 400 }
            );
        }

        // Check if any admin exists
        const adminCount = await Admin.countDocuments();

        // Seed default admin if none exists
        if (adminCount === 0) {
            const defaultAdmin = new Admin({
                username: 'admin',
                password: hashPassword('admin123')
            });
            await defaultAdmin.save();
            console.log('Default admin created');
        }

        // Find admin
        const admin = await Admin.findOne({ username });

        if (!admin) {
            return NextResponse.json(
                { error: 'Invalid credentials' },
                { status: 401 }
            );
        }

        // Verify password
        const hashedPassword = hashPassword(password);
        if (hashedPassword !== admin.password) {
            return NextResponse.json(
                { error: 'Invalid credentials' },
                { status: 401 }
            );
        }

        // Login success
        return NextResponse.json({ success: true, username: admin.username });

    } catch (error) {
        console.error('Login Error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
