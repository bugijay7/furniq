import React from 'react';

function ReturnPolicy() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-26 text-gray-800">
      <h1 className="text-4xl font-bold mb-6 text-center">Return & Refund Policy</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">1. Return Window</h2>
        <p>
          You may return most items within <strong>7 days of delivery</strong> for a full refund or exchange. 
          Items must be in their original condition and packaging.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">2. Items Not Eligible for Return</h2>
        <ul className="list-disc ml-6">
          <li>Custom or personalized items</li>
          <li>Clearance or final sale items</li>
          <li>Products damaged due to misuse or wear and tear</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">3. Return Process</h2>
        <ol className="list-decimal ml-6 space-y-2">
          <li>Contact our support team at <a href="mailto:support@furniq.co.ke" className="text-amber-600 hover:underline">support@furniq.co.ke</a> within 7 days of delivery.</li>
          <li>Provide your order number and reason for return.</li>
          <li>We will arrange pickup or guide you on how to return the item.</li>
          <li>Once received and inspected, we’ll issue your refund or send a replacement.</li>
        </ol>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">4. Refunds</h2>
        <p>
          Refunds are processed within <strong>3–5 business days</strong> after we receive and inspect the returned product.
          The refund will be made to your original method of payment (e.g. M-PESA, card, PayPal).
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">5. Exchanges</h2>
        <p>
          If you received a defective or damaged item, we’ll exchange it at no cost. Contact our team within 48 hours of delivery for assistance.
        </p>
      </section>

      <section className="mt-12 text-center text-sm text-gray-500">
        <p>
          For further assistance, email us at <a href="mailto:support@furniq.co.ke" className="text-amber-600 hover:underline">support@furniq.co.ke</a> or call <strong>+254 712 345 678</strong>.
        </p>
      </section>
    </div>
  );
}

export default ReturnPolicy;
