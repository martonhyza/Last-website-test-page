import React from 'react';
import LegalLayout from '../components/LegalLayout.tsx';

const PrivacyPolicy: React.FC = () => {
  return (
    <LegalLayout title="Privacy Policy">
      <section className="space-y-8">
        <div>
          <p className="text-indigo-400 font-bold uppercase tracking-widest text-xs mb-2">Effective Date: April 9, 2026</p>
          <p>
            HyzaLabs ("we," "our," or "us"), operated by Foldeaki Group LLC, is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website and use our services.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">1. Information We Collect</h2>
          <p>We may collect the following types of information:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Personal Information:</strong> Name, email address, and phone number provided through our contact or audit forms.</li>
            <li><strong>Usage Data:</strong> Information about how you use our website, including IP address, browser type, and pages visited.</li>
          </ul>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">2. How We Use Your Information</h2>
          <p>We use the collected data for the following purposes:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>To respond to leads and inquiries.</li>
            <li>To communicate with customers regarding services and updates.</li>
            <li>To deliver and improve our AI automation and marketing services.</li>
            <li>To analyze website performance and user experience.</li>
          </ul>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">3. SMS & A2P Compliance</h2>
          <p>
            By providing your phone number, you consent to receive SMS communications from HyzaLabs, including appointment reminders, follow-ups, and support messages.
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Message frequency may vary.</li>
            <li>Message and data rates may apply.</li>
            <li>You can opt out at any time by replying <strong>STOP</strong> to any message.</li>
          </ul>
          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl mt-4">
            <p className="font-bold text-white mb-2 italic">Important Disclosure:</p>
            <p className="italic">
              "Mobile information will not be shared with third parties or affiliates for marketing or promotional purposes. All categories exclude text messaging originator opt-in data and consent; this information will not be shared with any third parties."
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">4. Data Sharing & Disclosure</h2>
          <p>
            We do not sell, rent, or share your personal information with third parties for their marketing purposes. We only share information as necessary to provide our services or as required by law.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">5. Data Security</h2>
          <p>
            We implement industry-standard security measures to protect your data from unauthorized access, alteration, or disclosure. However, no method of transmission over the internet is 100% secure.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">6. Your Rights</h2>
          <p>Depending on your location, you may have the following rights regarding your data:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>The right to access the data we hold about you.</li>
            <li>The right to request correction of inaccurate data.</li>
            <li>The right to request deletion of your personal information.</li>
            <li>The right to object to or restrict certain data processing.</li>
          </ul>
          <p>To exercise these rights, please contact us at the email below.</p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">7. Contact Information</h2>
          <p>If you have any questions about this Privacy Policy, please contact us at:</p>
          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
            <p><strong>HyzaLabs / Foldeaki Group LLC</strong></p>
            <p>30 N Gould St Ste N</p>
            <p>Sheridan, WY 82801</p>
            <p>Email: <a href="mailto:info@hyzalabs.com" className="text-indigo-400 hover:underline">info@hyzalabs.com</a></p>
          </div>
        </div>
      </section>
    </LegalLayout>
  );
};

export default PrivacyPolicy;
