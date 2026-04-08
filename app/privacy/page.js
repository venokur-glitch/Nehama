"use client";
export default function Privacy() {
  return (
    <div style={{ minHeight: '100vh', padding: '64px 24px 48px' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <a href="/" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '18px', fontWeight: 300, color: '#8B9E8F', textDecoration: 'none', letterSpacing: '2px' }}>← Nehama</a>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '36px', fontWeight: 300, color: '#2C2C2C', margin: '40px 0 8px 0', letterSpacing: '1px' }}>Privacy Policy</h1>
        <p style={{ fontSize: '12px', color: '#B0B0B0', marginBottom: '40px', letterSpacing: '0.5px' }}>Last updated: April 2026</p>
        <div style={{ fontSize: '15px', color: '#4A4A4A', lineHeight: 1.9 }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '20px', fontWeight: 400, color: '#2C2C2C', margin: '36px 0 12px 0', letterSpacing: '0.3px' }}>The Short Version</h2>
          <p>Your conversations are private. We never see them. Your session data is stored on your own device, not on our servers. We take your privacy seriously because we know how personal the things you share with Nehama can be.</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '20px', fontWeight: 400, color: '#2C2C2C', margin: '36px 0 12px 0', letterSpacing: '0.3px' }}>What Data We Collect</h2>
          <p style={{ marginTop: '14px' }}><strong style={{ fontWeight: 500 }}>Conversation data:</strong> Your conversations with Nehama are stored locally on your device using your browser's storage. We do not have access to this data. We cannot read, review, or retrieve your conversations. If you clear your browser data or switch devices, your conversation history will be lost.</p>
          <p style={{ marginTop: '14px' }}><strong style={{ fontWeight: 500 }}>Email address:</strong> If you voluntarily provide your email address (through the contact form or the email signup after a free reflection), we collect and store it solely for the purpose of communicating with you about Nehama. We will never sell, share, or distribute your email address to third parties.</p>
          <p style={{ marginTop: '14px' }}><strong style={{ fontWeight: 500 }}>Payment information:</strong> If you subscribe to a paid plan, your payment is processed by Stripe. We do not store your credit card number or banking details. Stripe's privacy policy governs the handling of your payment data.</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '20px', fontWeight: 400, color: '#2C2C2C', margin: '36px 0 12px 0', letterSpacing: '0.3px' }}>How Your Conversations Are Processed</h2>
          <p>When you interact with Nehama, your messages are sent to Anthropic's API (the AI service that powers Nehama) to generate responses. This means your conversation content passes through Anthropic's servers in order to function.</p>
          <p style={{ marginTop: '14px' }}>Anthropic's API data policy states that they do not use API inputs or outputs to train their models. Anthropic may retain API data temporarily for safety, abuse prevention, and debugging purposes in accordance with their own privacy policy, which you can review at anthropic.com/privacy.</p>
          <p style={{ marginTop: '14px' }}>We do not store, log, or retain any copy of your conversations on our own servers.</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '20px', fontWeight: 400, color: '#2C2C2C', margin: '36px 0 12px 0', letterSpacing: '0.3px' }}>Cookies and Tracking</h2>
          <p>Nehama does not use advertising cookies or third-party tracking. We may use basic analytics to understand how many people visit the site and general usage patterns. We do not track individual user behavior or conversation content.</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '20px', fontWeight: 400, color: '#2C2C2C', margin: '36px 0 12px 0', letterSpacing: '0.3px' }}>Your Rights</h2>
          <p>You can delete your conversation data at any time by clearing your browser's local storage or by using the "Start New Session" option in the app's settings. If you have provided your email address and would like it removed from our records, please contact us and we will delete it promptly.</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '20px', fontWeight: 400, color: '#2C2C2C', margin: '36px 0 12px 0', letterSpacing: '0.3px' }}>Children's Privacy</h2>
          <p>Nehama is not intended for use by individuals under the age of 18. We do not knowingly collect data from minors.</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '20px', fontWeight: 400, color: '#2C2C2C', margin: '36px 0 12px 0', letterSpacing: '0.3px' }}>Changes to This Policy</h2>
          <p>We may update this privacy policy from time to time. Continued use of Nehama after changes are posted constitutes acceptance of the updated policy.</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '20px', fontWeight: 400, color: '#2C2C2C', margin: '36px 0 12px 0', letterSpacing: '0.3px' }}>Contact</h2>
          <p>If you have questions about your privacy or this policy, please contact us through the Contact form in the app.</p>
        </div>
      </div>
    </div>
  );
}
