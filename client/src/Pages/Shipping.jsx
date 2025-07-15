import React from 'react';

function Shipping() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-36">
      <h1 className="text-4xl font-bold mb-6 text-center text-amber-700">Shipping & Delivery</h1>

      <section className="space-y-6 text-gray-700 leading-relaxed text-lg">
        <p>
          At <strong>Furniq</strong>, we are committed to ensuring your furniture arrives safely and on time. We offer both local and international shipping to meet the needs of all our customers.
        </p>

        <div>
          <h2 className="text-2xl font-semibold text-black mb-2">📦 Shipping Options</h2>
          <ul className="list-disc list-inside ml-4">
            <li><strong>Standard Delivery:</strong> 3–7 business days</li>
            <li><strong>Express Delivery:</strong> 1–3 business days (available in select areas)</li>
            <li><strong>In-Store Pickup:</strong> Available within 24 hours at our Nairobi showroom</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-black mb-2">🚚 Delivery Information</h2>
          <p>
            All orders are processed within 1–2 business days. You will receive a confirmation email with tracking details as soon as your order ships.
          </p>
          <p>
            Our delivery partners ensure that your furniture is handled with care and delivered right to your doorstep.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-black mb-2">🌍 International Shipping</h2>
          <p>
            We proudly ship to multiple countries. Shipping fees and delivery times vary depending on your location. Duties and taxes may apply based on your country's regulations.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-black mb-2">💬 Questions?</h2>
          <p>
            If you have any questions regarding shipping or tracking your order, feel free to <a href="/contact" className="text-amber-700 underline">contact us</a>. We’re here to help!
          </p>
        </div>
      </section>
    </div>
  );
}

export default Shipping;
