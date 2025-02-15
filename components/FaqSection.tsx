"use client"

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What is Mythril AI?",
    answer: "Mythril AI is your startup AI companion which will guide you in your startup journey to help you achieve sucess.",
  },
  {
    question: "How can I use Mythril AI?",
    answer: "You can use Mythril AI by signing up on our platform and exploring our AI-powered tools and services.",
  },
  {
    question: "Is there a free trial available?",
    answer: "Yes! We offer a free trial for new users to explore our features before committing to a plan.",
  },
  {
    question: "How can I contact support?",
    answer: "You can reach out to our support team via email at support@mythrilai.com or through our contact form.",
  },
];

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-transparent py-12">
      <div className="container mx-auto px-6 lg:px-12">
        <h2 className="text-3xl font-bold text-center text-gray-100">Frequently Asked Questions</h2>
        <div className="mt-8 space-y-4 max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-[#192339] shadow-md rounded-lg p-4 cursor-pointer"
              onClick={() => toggleFaq(index)}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-100">{faq.question}</h3>
                <ChevronDown
                  className={`transition-transform duration-300 ${openIndex === index ? "rotate-180" : ""}`}
                />
              </div>
              {openIndex === index && (
                <p className="mt-2 text-white">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
