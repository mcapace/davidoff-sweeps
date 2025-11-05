import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | Davidoff Accessories Sweepstakes",
  description: "Davidoff Privacy Policy - Learn how we collect, use, and protect your personal information.",
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-white to-stone-50/20 py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-12 border border-stone-200">
          <h1 className="font-serif text-4xl sm:text-5xl font-light text-stone-900 mb-4">
            Privacy Policy
          </h1>
          <p className="text-stone-600 text-sm mb-8 font-light">
            Last Updated: November 2025
          </p>
          
          <div className="prose prose-stone max-w-none space-y-8">
            <section>
              <h2 className="font-serif text-2xl font-semibold text-stone-900 mb-4">
                1. Introduction
              </h2>
              <p className="text-stone-700 leading-relaxed font-light">
                Davidoff (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) respects your privacy and is committed to protecting your personal information. 
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and 
                participate in the Davidoff Accessories Sweepstakes (the &quot;Sweepstakes&quot;), in partnership with Cigar Aficionado.
              </p>
              <p className="text-stone-700 leading-relaxed font-light mt-4">
                By using our website and entering the Sweepstakes, you consent to the data practices described in this Privacy Policy. 
                If you do not agree with the practices described in this policy, please do not use our website or enter the Sweepstakes.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-semibold text-stone-900 mb-4">
                2. Information We Collect
              </h2>
              
              <h3 className="font-serif text-xl font-semibold text-stone-900 mb-3 mt-6">
                2.1 Information You Provide
              </h3>
              <p className="text-stone-700 leading-relaxed font-light mb-4">
                When you enter the Sweepstakes, we collect the following information:
              </p>
              <ul className="list-disc list-inside space-y-2 text-stone-700 font-light ml-4">
                <li>First and last name</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>Date of birth</li>
                <li>Mailing address (street address, city, state, ZIP code)</li>
                <li>Agreement to Official Rules and age verification (21+)</li>
                <li>Optional: Consent to receive marketing communications</li>
              </ul>

              <h3 className="font-serif text-xl font-semibold text-stone-900 mb-3 mt-6">
                2.2 Automatically Collected Information
              </h3>
              <p className="text-stone-700 leading-relaxed font-light mb-4">
                When you visit our website, we may automatically collect certain information, including:
              </p>
              <ul className="list-disc list-inside space-y-2 text-stone-700 font-light ml-4">
                <li>IP address</li>
                <li>Browser type and version</li>
                <li>Device information (type, operating system)</li>
                <li>Pages visited and time spent on pages</li>
                <li>Referring website addresses</li>
                <li>Cookies and similar tracking technologies (see Cookie Policy below)</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-semibold text-stone-900 mb-4">
                3. How We Use Your Information
              </h2>
              <p className="text-stone-700 leading-relaxed font-light mb-4">
                We use the information we collect for the following purposes:
              </p>
              <ul className="list-disc list-inside space-y-2 text-stone-700 font-light ml-4">
                <li>To process and manage your Sweepstakes entry</li>
                <li>To verify your eligibility (age, residency)</li>
                <li>To contact you regarding your entry (e.g., winner notification)</li>
                <li>To fulfill prize delivery if you win</li>
                <li>To comply with legal obligations and enforce our Official Rules</li>
                <li>To send you marketing communications (only if you have opted in)</li>
                <li>To analyze website usage and improve our services</li>
                <li>To prevent fraud and ensure security</li>
                <li>To respond to your inquiries and provide customer support</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-semibold text-stone-900 mb-4">
                4. Cookies and Tracking Technologies
              </h2>
              <p className="text-stone-700 leading-relaxed font-light mb-4">
                We use cookies and similar tracking technologies to track activity on our website and store certain information. 
                Cookies are small data files stored on your device. We use the following types of cookies:
              </p>
              
              <h3 className="font-serif text-xl font-semibold text-stone-900 mb-3 mt-6">
                4.1 Essential Cookies
              </h3>
              <p className="text-stone-700 leading-relaxed font-light">
                These cookies are necessary for the website to function properly. They enable basic functions like page navigation 
                and access to secure areas of the website. The website cannot function properly without these cookies.
              </p>

              <h3 className="font-serif text-xl font-semibold text-stone-900 mb-3 mt-6">
                4.2 Analytics Cookies
              </h3>
              <p className="text-stone-700 leading-relaxed font-light">
                These cookies help us understand how visitors interact with our website by collecting and reporting information 
                anonymously. This helps us improve the website&apos;s functionality and user experience.
              </p>

              <h3 className="font-serif text-xl font-semibold text-stone-900 mb-3 mt-6">
                4.3 Marketing Cookies
              </h3>
              <p className="text-stone-700 leading-relaxed font-light">
                These cookies are used to track visitors across websites to display relevant advertisements. They may also be 
                used to limit the number of times you see an advertisement and measure the effectiveness of advertising campaigns.
              </p>

              <p className="text-stone-700 leading-relaxed font-light mt-4">
                You can control cookie preferences through the cookie settings panel on our website. Note that disabling certain 
                cookies may limit your ability to use some features of our website.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-semibold text-stone-900 mb-4">
                5. Information Sharing and Disclosure
              </h2>
              <p className="text-stone-700 leading-relaxed font-light mb-4">
                We do not sell your personal information. We may share your information with:
              </p>
              <ul className="list-disc list-inside space-y-2 text-stone-700 font-light ml-4">
                <li>
                  <strong>Service Providers:</strong> Third-party vendors who perform services on our behalf, such as email 
                  delivery, data hosting, and analytics (these providers are contractually obligated to protect your information)
                </li>
                <li>
                  <strong>Business Partners:</strong> Cigar Aficionado, our Sweepstakes partner, for the purpose of administering 
                  the Sweepstakes
                </li>
                <li>
                  <strong>Legal Requirements:</strong> When required by law, court order, or government regulation, or to protect 
                  our rights and safety
                </li>
                <li>
                  <strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets (with notice 
                  to affected users)
                </li>
                <li>
                  <strong>With Your Consent:</strong> For any other purpose disclosed to you at the time we collect the information
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-semibold text-stone-900 mb-4">
                6. Data Security
              </h2>
              <p className="text-stone-700 leading-relaxed font-light">
                We implement appropriate technical and organizational security measures to protect your personal information against 
                unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet 
                or electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your information, 
                we cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-semibold text-stone-900 mb-4">
                7. Your Privacy Rights
              </h2>
              <p className="text-stone-700 leading-relaxed font-light mb-4">
                Depending on your location, you may have certain rights regarding your personal information:
              </p>

              <h3 className="font-serif text-xl font-semibold text-stone-900 mb-3 mt-6">
                7.1 European Economic Area (EEA) and UK Residents (GDPR)
              </h3>
              <p className="text-stone-700 leading-relaxed font-light mb-4">
                If you are located in the EEA or UK, you have the right to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-stone-700 font-light ml-4">
                <li>Access your personal data</li>
                <li>Rectify inaccurate data</li>
                <li>Request erasure of your data</li>
                <li>Restrict processing of your data</li>
                <li>Data portability</li>
                <li>Object to processing</li>
                <li>Withdraw consent at any time</li>
              </ul>

              <h3 className="font-serif text-xl font-semibold text-stone-900 mb-3 mt-6">
                7.2 California Residents (CCPA/CPRA)
              </h3>
              <p className="text-stone-700 leading-relaxed font-light mb-4">
                If you are a California resident, you have the right to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-stone-700 font-light ml-4">
                <li>Know what personal information is collected, used, shared, or sold</li>
                <li>Delete your personal information (subject to exceptions)</li>
                <li>Opt-out of the sale of personal information (we do not sell your information)</li>
                <li>Non-discrimination for exercising your privacy rights</li>
                <li>Correct inaccurate personal information</li>
                <li>Limit the use of sensitive personal information</li>
              </ul>

              <h3 className="font-serif text-xl font-semibold text-stone-900 mb-3 mt-6">
                7.3 Virginia, Colorado, Connecticut, Utah Residents
              </h3>
              <p className="text-stone-700 leading-relaxed font-light mb-4">
                Residents of these states have similar rights, including:
              </p>
              <ul className="list-disc list-inside space-y-2 text-stone-700 font-light ml-4">
                <li>Access to personal data</li>
                <li>Correction of inaccurate data</li>
                <li>Deletion of personal data</li>
                <li>Opt-out of targeted advertising and sale of personal data</li>
                <li>Data portability</li>
              </ul>

              <p className="text-stone-700 leading-relaxed font-light mt-4">
                To exercise any of these rights, please contact us at the information provided in Section 11 below.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-semibold text-stone-900 mb-4">
                8. Data Retention
              </h2>
              <p className="text-stone-700 leading-relaxed font-light">
                We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, 
                unless a longer retention period is required or permitted by law. For Sweepstakes entries, we retain information for 
                the duration of the Sweepstakes and for a reasonable period thereafter to comply with legal obligations, resolve disputes, 
                and enforce our agreements.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-semibold text-stone-900 mb-4">
                9. Children&apos;s Privacy
              </h2>
              <p className="text-stone-700 leading-relaxed font-light">
                Our website and Sweepstakes are not intended for individuals under the age of 21. We do not knowingly collect personal 
                information from individuals under 21. If we become aware that we have collected personal information from an individual 
                under 21, we will take steps to delete such information. If you believe we have collected information from someone under 21, 
                please contact us immediately.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-semibold text-stone-900 mb-4">
                10. International Data Transfers
              </h2>
              <p className="text-stone-700 leading-relaxed font-light">
                Your information may be transferred to and processed in countries other than your country of residence. These countries 
                may have data protection laws that differ from those in your country. We take appropriate safeguards to ensure that your 
                personal information receives adequate protection, including using standard contractual clauses approved by relevant 
                authorities.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-semibold text-stone-900 mb-4">
                11. Contact Us
              </h2>
              <p className="text-stone-700 leading-relaxed font-light mb-4">
                If you have questions about this Privacy Policy or wish to exercise your privacy rights, please contact us:
              </p>
              <div className="bg-stone-50 p-4 rounded-lg">
                <p className="text-stone-700 font-light">
                  <strong>Davidoff</strong><br />
                  Email: privacy@davidoff.com<br />
                  Address: [Address to be provided]
                </p>
              </div>
              <p className="text-stone-700 leading-relaxed font-light mt-4">
                For California residents, you may also designate an authorized agent to exercise your rights on your behalf.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-semibold text-stone-900 mb-4">
                12. Changes to This Privacy Policy
              </h2>
              <p className="text-stone-700 leading-relaxed font-light">
                We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new 
                Privacy Policy on this page and updating the &quot;Last Updated&quot; date. You are advised to review this Privacy Policy 
                periodically for any changes. Your continued use of our website after such modifications constitutes acknowledgment 
                and acceptance of the modified Privacy Policy.
              </p>
            </section>

            <div className="pt-8 mt-8 border-t border-stone-200">
              <p className="text-sm text-stone-600 font-light">
                <Link href="/" className="text-davidoff-gold hover:text-davidoff-gold-dark underline underline-offset-2">
                  Return to Home
                </Link>
                {" | "}
                <Link href="/official-rules" className="text-davidoff-gold hover:text-davidoff-gold-dark underline underline-offset-2">
                  Official Rules
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

