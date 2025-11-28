import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dbConnect from '@/lib/db';
import Portfolio from '@/models/Portfolio';
import { defaultContent } from '@/lib/defaultContent';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(request) {
    try {
        const { message } = await request.json();

        if (!process.env.GEMINI_API_KEY) {
            return NextResponse.json(
                { response: "I'm not fully configured yet. Please add the GEMINI_API_KEY to the environment variables." },
                { status: 500 }
            );
        }

        // Fetch portfolio data to provide context
        await dbConnect();
        let portfolio = await Portfolio.findOne().sort({ createdAt: -1 });

        if (!portfolio) {
            portfolio = defaultContent;
        }

        // Construct the system prompt with portfolio context
        const context = `
            You are an AI assistant for Sazzad Hossain's portfolio website.
            Your role is to answer questions about Sazzad based ONLY on the following information.
            If the user asks about anything else (like general knowledge, other people, coding help unrelated to Sazzad's work), politely decline and say you can only talk about Sazzad.
            
            Here is Sazzad's information:
            
            Name: ${portfolio.hero?.name || defaultContent.hero.name}
            Tagline: ${portfolio.hero?.tagline || defaultContent.hero.tagline}
            Description: ${portfolio.hero?.description || defaultContent.hero.description}
            
            About:
            ${portfolio.about?.paragraphs?.join('\n') || defaultContent.about.paragraphs.join('\n')}
            
            Skills:
            ${portfolio.skills?.map(s => s.name).join(', ') || defaultContent.skills.map(s => s.name).join(', ')}
            
            Experience:
            ${portfolio.experience?.map(job => `
                - ${job.position} at ${job.company} (${job.range})
                ${job.description?.join('\n')}
            `).join('\n') || defaultContent.experience.map(job => `
                - ${job.position} at ${job.company} (${job.range})
                ${job.description?.join('\n')}
            `).join('\n')}
            
            Projects:
            ${portfolio.projects?.map(p => `
                - ${p.title}: ${p.description}
                Technologies: ${p.technologies?.join(', ')}
            `).join('\n') || defaultContent.projects.map(p => `
                - ${p.title}: ${p.description}
                Technologies: ${p.technologies?.join(', ')}
            `).join('\n')}
            
            Contact:
            Email: ${portfolio.contact?.email || defaultContent.contact.email}
            
            Be helpful, professional, and concise.
        `;

        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

        const chat = model.startChat({
            history: [
                {
                    role: "user",
                    parts: [{ text: context }],
                },
                {
                    role: "model",
                    parts: [{ text: "Understood. I will answer questions about Sazzad Hossain based on the provided information and decline to discuss other topics." }],
                },
            ],
        });

        const result = await chat.sendMessage(message);
        const response = result.response.text();

        return NextResponse.json({ response });
    } catch (error) {
        console.error('Chat API Error:', error);

        if (error.message?.includes('429') || error.status === 429) {
            return NextResponse.json(
                { response: "I'm receiving too many messages right now. Please try again in a minute." },
                { status: 429 }
            );
        }

        return NextResponse.json(
            { response: "Sorry, I'm having trouble connecting right now. Please try again later." },
            { status: 500 }
        );
    }
}
