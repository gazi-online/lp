export default function TermsPage() {
  return (
    <>
      <h1 className="text-4xl font-black text-navy-900 mb-8 border-b border-navy-900/10 pb-4">Terms of Service</h1>
      <section className="space-y-6">
        <h2 className="text-xl font-bold text-navy-900 uppercase tracking-wider">1. Service Delivery</h2>
        <p>While we guarantee a **3-Day Processing** for PAN cards, final physical delivery depends on government logistics (NSDL/UTIITSL).</p>
        
        <h2 className="text-xl font-bold text-navy-900 uppercase tracking-wider">2. Accuracy of Information</h2>
        <p>Users are responsible for the accuracy of Aadhaar data provided. Incorrect data may lead to application rejection by the IT department.</p>
        
        <h2 className="text-xl font-bold text-navy-900 uppercase tracking-wider">3. Refunds</h2>
        <p>Fees are generally non-refundable once the application has been processed through the government portal.</p>
      </section>
    </>
  );
}
