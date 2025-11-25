import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Portfolio from '@/models/Portfolio';
import { defaultContent } from '@/lib/defaultContent';

export async function GET() {
    try {
        await dbConnect();
        let portfolio = await Portfolio.findOne().sort({ createdAt: -1 });

        if (!portfolio) {
            // If no data exists, return default content but don't save it yet
            // or save it as initial seed data
            return NextResponse.json(defaultContent);
        }

        return NextResponse.json(portfolio);
    } catch (error) {
        console.error('Error fetching portfolio:', error);
        return NextResponse.json({ error: 'Failed to fetch portfolio data' }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        await dbConnect();
        const data = await request.json();

        // Check if a portfolio document already exists
        let portfolio = await Portfolio.findOne().sort({ createdAt: -1 });

        if (portfolio) {
            // Update existing document
            portfolio = await Portfolio.findByIdAndUpdate(portfolio._id, data, { new: true });
        } else {
            // Create new document
            portfolio = await Portfolio.create(data);
        }

        return NextResponse.json(portfolio);
    } catch (error) {
        console.error('Error saving portfolio:', error);
        return NextResponse.json({ error: 'Failed to save portfolio data' }, { status: 500 });
    }
}
