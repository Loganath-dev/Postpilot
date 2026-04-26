import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Text,
  Button,
  Section,
  Hr,
  Link,
} from '@react-email/components';
import React from 'react';

interface WelcomeEmailProps {
  userEmail: string;
}

export default function WelcomeEmail({ userEmail }: WelcomeEmailProps) {
  const previewText = `Welcome to PostPilot! Let's get started.`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Welcome to PostPilot 🚀</Heading>
          
          <Text style={text}>
            Hi there,
          </Text>
          <Text style={text}>
            We're thrilled to have you on board! PostPilot is the elite social media ghostwriter built for founders and creators who want to scale their brand without sounding like an AI.
          </Text>
          
          <Section style={buttonContainer}>
            <Button style={button} href="https://postpilot.co/generate">
              Go to Creative Studio
            </Button>
          </Section>

          <Text style={text}>
            <strong>Here are a few things you can do right now:</strong>
          </Text>
          <ul>
            <li style={listItem}>Train your <strong>Writing DNA™</strong> so the AI sounds exactly like you.</li>
            <li style={listItem}>Convert unstructured thoughts into viral X threads and LinkedIn stories.</li>
            <li style={listItem}>Turn URL tweets into beautiful shareable image cards.</li>
          </ul>

          <Text style={text}>
            If you have any questions or need help setting up your style profile, just reply to this email. I read every single one.
          </Text>

          <Hr style={hr} />

          <Text style={footer}>
            Best,<br />
            The PostPilot Team
          </Text>

          <Text style={subFooter}>
            You received this email because you signed up for PostPilot with the email {userEmail}. 
            If you didn't mean to do this, you can ignore this email.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

// Styles
const main = {
  backgroundColor: '#f6f9fc',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '40px 20px',
  marginBottom: '64px',
  borderRadius: '8px',
  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
};

const h1 = {
  color: '#111827',
  fontSize: '24px',
  fontWeight: '700',
  margin: '0 0 20px',
  padding: '0',
  lineHeight: '1.25',
};

const text = {
  color: '#4b5563',
  fontSize: '16px',
  lineHeight: '26px',
  marginBottom: '20px',
};

const listItem = {
  color: '#4b5563',
  fontSize: '16px',
  lineHeight: '26px',
  marginBottom: '10px',
};

const buttonContainer = {
  textAlign: 'center' as const,
  margin: '32px 0',
};

const button = {
  backgroundColor: '#111827',
  borderRadius: '6px',
  color: '#fff',
  fontSize: '16px',
  fontWeight: '600',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '12px 24px',
};

const hr = {
  borderColor: '#e5e7eb',
  margin: '32px 0',
};

const footer = {
  color: '#374151',
  fontSize: '16px',
  lineHeight: '24px',
  fontWeight: '600',
};

const subFooter = {
  color: '#9ca3af',
  fontSize: '12px',
  lineHeight: '16px',
  marginTop: '32px',
};
