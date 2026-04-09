import React from 'react';
import LegalLayout from '../components/LegalLayout.tsx';

const TermsOfService: React.FC = () => {
  return (
    <LegalLayout title="Terms of Service">
      <section className="space-y-8">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">1. Acceptance of Terms</h2>
          <p>
            By accessing or using the services provided by HyzaLabs ("we," "our," or "us"), operated by Foldeaki Group LLC, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">2. Description of Services</h2>
          <p>
            HyzaLabs provides AI automation, CRM systems, digital marketing services, and strategic technical consulting. We reserve the right to modify, suspend, or discontinue any part of our services at any time.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">3. User Responsibilities</h2>
          <p>As a user of our services, you agree to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Provide accurate and complete information when requested.</li>
            <li>Maintain the security of any account credentials.</li>
            <li>Use our services only for lawful purposes and in compliance with these terms.</li>
          </ul>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">4. Communication Consent</h2>
          <p>
            By using our services or providing your contact information, you consent to receive communications from us via email and SMS.
          </p>
          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl space-y-4">
            <h3 className="text-lg font-bold text-indigo-400 uppercase tracking-widest text-xs">SMS Communication Disclosure</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Users may receive messages related to inquiries, bookings, reminders, and support.</li>
              <li>Message frequency may vary based on your interaction with our services.</li>
              <li>Message and data rates may apply.</li>
              <li>You can opt out at any time by replying <strong>STOP</strong> to any message.</li>
              <li>For assistance, you can reply <strong>HELP</strong> to any message.</li>
            </ul>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">5. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law, HyzaLabs and Foldeaki Group LLC shall not be liable for any indirect, incidental, special, or consequential damages arising out of or in connection with the use of our services.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">6. Termination</h2>
          <p>
            We reserve the right to terminate or suspend your access to our services at our sole discretion, without notice, for conduct that we believe violates these terms or is harmful to other users or our business interests.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">7. Governing Law</h2>
          <p>
            These Terms of Service shall be governed by and construed in accordance with the laws of the State of Wyoming, United States, without regard to its conflict of law principles.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">8. Contact Information</h2>
          <p>If you have any questions about these Terms of Service, please contact us at:</p>
          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
            <p><strong>HyzaLabs / Foldeaki Group LLC</strong></p>
            <p>Email: <a href="mailto:info@hyzalabs.com" className="text-indigo-400 hover:underline">info@hyzalabs.com</a></p>
          </div>
        </div>
      </section>
    </LegalLayout>
  );
};

export default TermsOfService;
