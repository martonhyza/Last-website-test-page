import React from 'react';
import LegalLayout from '../components/LegalLayout.tsx';

const PrivacyPolicy: React.FC = () => {
  return (
    <LegalLayout title="Privacy Policy">
      <section className="space-y-8">
        <div>
          <p className="text-accent-light font-bold uppercase tracking-widest text-[10px] mb-4">Effective Date: April 9, 2026</p>
          <p className="text-text-secondary leading-relaxed mb-4">
            HyzaLabs ("we," "our," or "us"), operated by Foldeaki Group LLC, is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website and use our services.
          </p>
          <p className="text-text-muted italic text-sm">
            This policy applies to all SMS communications sent by HyzaLabs.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-bold tracking-tight text-text-primary">1. Information We Collect</h2>
          <p className="text-text-secondary text-sm">We may collect the following types of information:</p>
          <ul className="list-disc pl-6 space-y-2 text-text-muted text-sm">
            <li><strong className="text-text-secondary">Personal Information:</strong> Name, email address, and phone number provided through our contact or audit forms.</li>
            <li><strong className="text-text-secondary">Usage Data:</strong> Information about how you use our website, including IP address, browser type, and pages visited.</li>
          </ul>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-bold tracking-tight text-text-primary">2. How We Use Your Information</h2>
          <p className="text-text-secondary text-sm">We use the collected data for the following purposes:</p>
          <ul className="list-disc pl-6 space-y-2 text-text-muted text-sm">
            <li>To respond to leads and inquiries.</li>
            <li>To communicate with customers regarding services and updates.</li>
            <li>To deliver and improve our AI automation and marketing services.</li>
            <li>To analyze website performance and user experience.</li>
          </ul>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-bold tracking-tight text-text-primary">3. SMS & A2P Compliance</h2>
          <p className="text-text-secondary text-sm">
            SMS opt-in consent and phone numbers will not be shared with third parties or affiliates for marketing or promotional purposes.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-bold tracking-tight text-text-primary">4. Data Security</h2>
          <p className="text-text-secondary text-sm leading-relaxed">
            We use industry-standard measures to protect your information from unauthorized access, disclosure, or misuse.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-bold tracking-tight text-text-primary">5. Your Rights</h2>
          <p className="text-text-secondary text-sm leading-relaxed">
            You may request access to, correction, or deletion of your personal information at any time.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-bold tracking-tight text-text-primary">6. Changes to This Policy</h2>
          <p className="text-text-secondary text-sm leading-relaxed">
            We may update this policy periodically. We encourage you to review it regularly.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-bold tracking-tight text-text-primary">7. Contact Us</h2>
          <p className="text-text-secondary text-sm">If you have any questions about this Privacy Policy, please contact us at:</p>
          <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
            <p className="font-bold text-text-primary">Foldeaki Group LLC</p>
            <p className="text-text-secondary text-sm mt-1">30 N Gould St Ste N</p>
            <p className="text-text-secondary text-sm">Sheridan, WY 82801</p>
            <p className="text-text-secondary text-sm mt-2">Email: <a href="mailto:info@hyzalabs.com" className="text-accent hover:underline">info@hyzalabs.com</a></p>
          </div>
        </div>
      </section>
    </LegalLayout>
  );
};

export default PrivacyPolicy;
