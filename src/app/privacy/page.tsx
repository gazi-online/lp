export default function PrivacyPage() {
  return (
    <>
      <h1 className="text-4xl font-black text-navy-900 mb-8 border-b border-navy-900/10 pb-4">Privacy Policy</h1>
      <section className="space-y-6">
        <p>At **Gazi Online**, your privacy is our priority. This policy outlines how we handle your data.</p>
        
        <h2 className="text-xl font-bold text-navy-900 uppercase tracking-wider">1. Information We Collect</h2>
        <p>We collect temporary information like your Name, Aadhaar number, and Phone number solely for the purpose of processing your PAN application or other requested services.</p>
        
        <h2 className="text-xl font-bold text-navy-900 uppercase tracking-wider">2. Data Retention</h2>
        <p>Per our technical specification, all uploaded documents are automatically purged from our systems after 90 days post-delivery of the requested service.</p>
        
        <h2 className="text-xl font-bold text-navy-900 uppercase tracking-wider">3. Security</h2>
        <p>We use enterprise-grade AES-256 encryption at rest and secure SSL/TLS protocols for data transmission to ensure your fintech data remains private.</p>
      </section>
    </>
  );
}
