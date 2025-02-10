import React, { useState } from 'react';
import { FaQuestionCircle, FaEnvelope, FaVideo, FaComments, FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const HelpSupportPage = () => {
  const navigate = useNavigate();
  
  const [faqs, setFaqs] = useState([
    {
      question: 'How do I set budgets?',
      answer: 'To set a budget, navigate to the Budgeting section, enter your desired budget amount, and save your changes.',
      isOpen: false,
    },
    {
      question: 'How do I add transactions?',
      answer: 'You can add transactions by going to the Transactions page and clicking on "Add Transaction". Fill in the details and submit.',
      isOpen: false,
    },
    {
      question: 'How do I use analytics?',
      answer: 'Visit the Analytics section to view your spending habits and insights. You can filter by date and category for detailed information.',
      isOpen: false,
    },
  ]);

  const [contact, setContact] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Support request submitted! We will get back to you shortly.');
    setContact({ name: '', email: '', message: '' }); // Reset form
  };

  return (
    <div className="flex">
      {/* Navbar */}
      <aside className="w-64 bg-blue-800 text-white flex flex-col justify-between p-4 fixed inset-y-0">
        <div>
          <h2 className="text-2xl font-bold mb-4 text-center">Navigation</h2>
          <div className="flex items-center mb-6 cursor-pointer" onClick={() => navigate('/dashboard')}>
            <FaArrowLeft className="mr-2" />
            <span>Dashboard</span>
          </div>
          <ul className="space-y-4">
            <li className="hover:text-blue-300 cursor-pointer" onClick={() => navigate('/transactions')}>Transactions</li>
            <li className="hover:text-blue-300 cursor-pointer" onClick={() => navigate('/budgeting')}>Budgeting</li>
            <li className="hover:text-blue-300 cursor-pointer" onClick={() => navigate('/goals')}>Goals</li>
            <li className="hover:text-blue-300 cursor-pointer" onClick={() => navigate('/reports')}>Reports</li>
            <li className="hover:text-blue-300 cursor-pointer" onClick={() => navigate('/settings')}>Settings</li>
          </ul>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-grow p-6 ml-64 bg-gray-100">
        <h1 className="text-3xl font-bold text-blue-700 text-center mb-8">Help & Support</h1>

        {/* FAQs Section */}
        <section className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="flex items-center text-2xl font-semibold mb-4 text-blue-600">
            <FaQuestionCircle className="mr-2" /> FAQs
          </h2>
          <div>
            {faqs.map((faq, index) => (
              <div key={index} className="mb-4 border-b pb-2">
                <button
                  className="flex justify-between items-center w-full text-left font-semibold text-blue-600 focus:outline-none"
                  onClick={() => {
                    const newFaqs = [...faqs];
                    newFaqs[index].isOpen = !newFaqs[index].isOpen;
                    setFaqs(newFaqs);
                  }}
                >
                  <span>{faq.question}</span>
                  <span className="text-lg">{faq.isOpen ? '-' : '+'}</span>
                </button>
                {faq.isOpen && <p className="mt-2 text-gray-700">{faq.answer}</p>}
              </div>
            ))}
          </div>
        </section>

        {/* Contact Support Form */}
        <section className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="flex items-center text-2xl font-semibold mb-4 text-blue-600">
            <FaEnvelope className="mr-2" /> Contact Support
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              value={contact.name}
              onChange={(e) => setContact({ ...contact, name: e.target.value })}
              className="w-full p-3 border rounded-lg"
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              value={contact.email}
              onChange={(e) => setContact({ ...contact, email: e.target.value })}
              className="w-full p-3 border rounded-lg"
              required
            />
            <textarea
              placeholder="Your Message"
              value={contact.message}
              onChange={(e) => setContact({ ...contact, message: e.target.value })}
              className="w-full p-3 border rounded-lg h-24"
              required
            ></textarea>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700"
            >
              Send Message
            </button>
          </form>
        </section>

        {/* User Guide & Tutorials */}
        <section className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="flex items-center text-2xl font-semibold mb-4 text-blue-600">
            <FaVideo className="mr-2" /> User Guide & Tutorials
          </h2>
          <p className="text-gray-700 mb-4">Check out our video tutorials to learn more about using the app:</p>
          <ul className="space-y-2">
            <li>
              <a
                href="#"
                className="text-blue-600 hover:underline"
              >
                - How to Set Budgets
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-blue-600 hover:underline"
              >
                - How to Add Transactions
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-blue-600 hover:underline"
              >
                - Understanding Analytics
              </a>
            </li>
          </ul>
        </section>

        {/* Community Forum Link */}
        <section className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="flex items-center text-2xl font-semibold mb-4 text-blue-600">
            <FaComments className="mr-2" /> Community Forum
          </h2>
          <p className="text-gray-700">Join our community forum to connect with other users:</p>
          <a
            href="#"
            className="text-blue-600 hover:underline"
          >
            Visit Community Forum
          </a>
        </section>
      </div>
    </div>
  );
};

export default HelpSupportPage;
