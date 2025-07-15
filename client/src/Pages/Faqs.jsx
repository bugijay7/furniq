import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const faqData = [
  {
    question: 'What payment methods do you accept?',
    answer:
      'We accept MPESA, Visa, Mastercard, and PayPal for all orders.',
  },
  {
    question: 'How long does delivery take?',
    answer:
      'Standard delivery takes 2–5 business days within Kenya. International shipping may take 7–14 days.',
  },
  {
    question: 'Can I return a product?',
    answer:
      'Yes. You can return any product within 7 days of delivery if it’s in its original condition. Check our return policy for details.',
  },
  {
    question: 'Do you offer custom furniture?',
    answer:
      'Yes, we can customize select pieces. Contact our support team for custom orders and design consultation.',
  },
  {
    question: 'How can I track my order?',
    answer:
      'Once your order is shipped, you’ll receive a tracking number via email or SMS.',
  },
  {
    question: 'Where are your showrooms located?',
    answer:
      'Our showrooms are located in Nairobi, Mombasa, and Kisumu. Visit the contact page for full addresses.',
  },
  {
    question: 'Do you offer assembly services?',
    answer:
      'Yes. We offer free assembly services within Nairobi and low-cost options for other regions.',
  },
  {
    question: 'Are all items in stock?',
    answer:
      'Most products are in stock unless marked “out of stock.” Custom orders have a longer lead time.',
  },
  {
    question: 'Can I change or cancel my order?',
    answer:
      'You can change or cancel your order within 12 hours after placing it. After that, processing may have already begun.',
  },
  {
    question: 'Is my personal information secure?',
    answer:
      'Absolutely. We use industry-standard encryption and never share your data with third parties.',
  },
];


function Faqs() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-26 px-4 md:px-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-amber-700 mb-10">Frequently Asked Questions</h2>

        <div className="space-y-6">
          {faqData.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full flex items-center justify-between p-4 text-left bg-gray-100 hover:bg-gray-200 transition"
              >
                <span className="font-semibold text-gray-800">{faq.question}</span>
                {openIndex === index ? (
                  <FaChevronUp className="text-amber-600" />
                ) : (
                  <FaChevronDown className="text-amber-600" />
                )}
              </button>
              {openIndex === index && (
                <div className="p-4 text-gray-600 border-t border-gray-200 bg-white">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Faqs;
