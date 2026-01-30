import { NextRequest, NextResponse } from 'next/server';
import { sendSummitInvitation, type SummitInvitationData } from '@/lib/email';

const validIndustryFocuses = [
  'Bitcoin Mining',
  'Heating & Buildings',
  'Both',
  'Other',
];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    const requiredFields = [
      'name',
      'email',
      'company',
      'industryFocus',
      'whyAttend',
      'contribution',
    ];

    for (const field of requiredFields) {
      if (!body[field] || String(body[field]).trim() === '') {
        return NextResponse.json(
          { error: `${field} is required` },
          { status: 400 }
        );
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Validate industry focus
    if (!validIndustryFocuses.includes(body.industryFocus)) {
      return NextResponse.json(
        { error: 'Invalid industry focus selection' },
        { status: 400 }
      );
    }

    // Sanitize and limit input lengths
    const sanitizedData: SummitInvitationData = {
      name: String(body.name).slice(0, 200).trim(),
      email: String(body.email).slice(0, 200).trim(),
      company: String(body.company).slice(0, 300).trim(),
      industryFocus: body.industryFocus,
      whyAttend: String(body.whyAttend).slice(0, 2000).trim(),
      contribution: String(body.contribution).slice(0, 2000).trim(),
    };

    // Send email
    const success = await sendSummitInvitation(sanitizedData);

    if (success) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { error: 'Failed to submit request. Please try again.' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Summit invitation API error:', error);
    return NextResponse.json(
      { error: 'An error occurred. Please try again.' },
      { status: 500 }
    );
  }
}
