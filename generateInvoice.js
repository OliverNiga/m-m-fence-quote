// Invoice Generator for MMD Quote App Development
// Run with: node generateInvoice.js

const fs = require('fs');
const path = require('path');

// Invoice Configuration - EDIT THESE VALUES
const INVOICE_CONFIG = {
  // Your Business Details
  provider: {
    name: "YOUR BUSINESS NAME",
    address: "123 Your Street",
    city: "Your City, ST 12345",
    email: "your.email@example.com",
    phone: "(555) 123-4567",
    website: "www.yourwebsite.com" // Optional
  },

  // Client Details
  client: {
    name: "CLIENT NAME",
    company: "CLIENT COMPANY", // Optional
    address: "456 Client Street",
    city: "Client City, ST 67890",
    email: "client@example.com"
  },

  // Invoice Details
  invoice: {
    number: "INV-2026-001",
    date: new Date().toISOString().split('T')[0], // Today's date
    dueDate: getDueDate(30), // 30 days from today
    projectName: "MMD Fence Quote App - Mobile Application Development"
  },

  // Project Cost
  pricing: {
    fixedPrice: 15000, // Edit this amount
    currency: "USD"
  },

  // Line Items - Itemized breakdown of work
  lineItems: [
    {
      description: "Project Planning & Requirements Analysis",
      details: "Initial consultation, requirements gathering, technical specification",
      amount: 1500
    },
    {
      description: "UI/UX Design & User Interface Development",
      details: "Responsive design for mobile and tablet, custom theme implementation",
      amount: 2500
    },
    {
      description: "Core Application Development",
      details: "React Native app setup, navigation, state management (Zustand), data persistence",
      amount: 3000
    },
    {
      description: "Quote Management Features",
      details: "Quote form with customer info, fence segments, installation details, project tracking",
      amount: 2500
    },
    {
      description: "Drawing & Image Features",
      details: "Canvas-based drawing tool, camera integration, image gallery management",
      amount: 2000
    },
    {
      description: "PDF Generation & Export",
      details: "Professional quote PDF generation with company branding and layout diagrams",
      amount: 2000
    },
    {
      description: "Testing & Quality Assurance",
      details: "Cross-platform testing (iOS/Android), bug fixes, performance optimization",
      amount: 1000
    },
    {
      description: "Documentation & Deployment",
      details: "Code documentation, deployment configuration, App Store preparation",
      amount: 500
    }
  ],

  // Payment Terms
  terms: [
    "Payment is due within 30 days of invoice date",
    "Accepted payment methods: Bank transfer, Check, PayPal",
    "Late payments subject to 1.5% monthly interest charge",
    "All amounts in USD"
  ],

  // Notes
  notes: "Thank you for your business! This invoice covers the complete development of the MMD Fence Quote App, including all features, testing, and deployment preparation."
};

// Helper function to get due date
function getDueDate(days) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString().split('T')[0];
}

// Generate HTML Invoice
function generateHTMLInvoice(config) {
  const total = config.lineItems.reduce((sum, item) => sum + item.amount, 0);
  const currency = config.pricing.currency;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Invoice ${config.invoice.number}</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      background: #f5f5f5;
      padding: 20px;
    }

    .invoice-container {
      max-width: 850px;
      margin: 0 auto;
      background: white;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      border-radius: 8px;
      overflow: hidden;
    }

    .invoice-header {
      background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
      color: white;
      padding: 40px;
    }

    .invoice-header h1 {
      font-size: 36px;
      font-weight: 300;
      margin-bottom: 10px;
      letter-spacing: 1px;
    }

    .invoice-number {
      font-size: 18px;
      opacity: 0.9;
      font-weight: 500;
    }

    .invoice-body {
      padding: 40px;
    }

    .party-info {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 40px;
      margin-bottom: 40px;
      padding-bottom: 30px;
      border-bottom: 2px solid #eee;
    }

    .party-box h3 {
      color: #2c3e50;
      font-size: 14px;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 15px;
      font-weight: 600;
    }

    .party-box .name {
      font-size: 18px;
      font-weight: 600;
      color: #2c3e50;
      margin-bottom: 8px;
    }

    .party-box .details {
      color: #666;
      font-size: 14px;
      line-height: 1.8;
    }

    .invoice-meta {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
      margin-bottom: 40px;
      padding: 20px;
      background: #f8f9fa;
      border-radius: 6px;
    }

    .meta-item label {
      display: block;
      font-size: 12px;
      color: #666;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 5px;
      font-weight: 600;
    }

    .meta-item value {
      display: block;
      font-size: 16px;
      color: #2c3e50;
      font-weight: 600;
    }

    .line-items {
      margin-bottom: 30px;
    }

    .line-items h3 {
      color: #2c3e50;
      font-size: 18px;
      margin-bottom: 20px;
      font-weight: 600;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 30px;
    }

    thead {
      background: #2c3e50;
      color: white;
    }

    thead th {
      padding: 15px;
      text-align: left;
      font-weight: 600;
      font-size: 13px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    thead th:last-child {
      text-align: right;
    }

    tbody tr {
      border-bottom: 1px solid #eee;
    }

    tbody tr:last-child {
      border-bottom: 2px solid #ddd;
    }

    tbody td {
      padding: 15px;
      vertical-align: top;
    }

    .item-description {
      font-weight: 600;
      color: #2c3e50;
      margin-bottom: 5px;
      font-size: 15px;
    }

    .item-details {
      font-size: 13px;
      color: #666;
      line-height: 1.5;
    }

    .item-amount {
      text-align: right;
      font-weight: 600;
      color: #2c3e50;
      font-size: 15px;
    }

    .totals {
      margin-left: auto;
      width: 350px;
      margin-bottom: 40px;
    }

    .totals-row {
      display: flex;
      justify-content: space-between;
      padding: 12px 0;
      border-bottom: 1px solid #eee;
    }

    .totals-row.total {
      border-top: 2px solid #2c3e50;
      border-bottom: 3px double #2c3e50;
      margin-top: 10px;
      padding: 20px 0;
      font-size: 20px;
      font-weight: 700;
      color: #2c3e50;
    }

    .terms, .notes {
      margin-bottom: 30px;
    }

    .terms h4, .notes h4 {
      color: #2c3e50;
      font-size: 16px;
      margin-bottom: 15px;
      font-weight: 600;
    }

    .terms ul {
      list-style: none;
      padding-left: 0;
    }

    .terms li {
      padding: 8px 0;
      color: #666;
      font-size: 14px;
      padding-left: 20px;
      position: relative;
    }

    .terms li:before {
      content: "•";
      position: absolute;
      left: 0;
      color: #2c3e50;
      font-weight: bold;
    }

    .notes p {
      color: #666;
      font-size: 14px;
      line-height: 1.8;
      background: #f8f9fa;
      padding: 15px;
      border-radius: 6px;
      border-left: 4px solid #2c3e50;
    }

    .invoice-footer {
      background: #f8f9fa;
      padding: 30px 40px;
      text-align: center;
      color: #666;
      font-size: 13px;
      border-top: 1px solid #eee;
    }

    .amount {
      white-space: nowrap;
    }

    @media print {
      @page {
        margin: 20mm;
      }

      body {
        background: white;
        padding: 0;
      }

      .invoice-container {
        box-shadow: none;
        border-radius: 0;
      }

      .invoice-header {
        background: #2c3e50 !important;
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }
    }
  </style>
</head>
<body>
  <div class="invoice-container">
    <div class="invoice-header">
      <h1>INVOICE</h1>
      <div class="invoice-number">${config.invoice.number}</div>
    </div>

    <div class="invoice-body">
      <div class="party-info">
        <div class="party-box">
          <h3>From</h3>
          <div class="name">${config.provider.name}</div>
          <div class="details">
            ${config.provider.address}<br>
            ${config.provider.city}<br>
            ${config.provider.email}<br>
            ${config.provider.phone}
            ${config.provider.website ? `<br>${config.provider.website}` : ''}
          </div>
        </div>

        <div class="party-box">
          <h3>Bill To</h3>
          <div class="name">${config.client.name}</div>
          <div class="details">
            ${config.client.company ? config.client.company + '<br>' : ''}
            ${config.client.address}<br>
            ${config.client.city}<br>
            ${config.client.email}
          </div>
        </div>
      </div>

      <div class="invoice-meta">
        <div class="meta-item">
          <label>Invoice Date</label>
          <value>${config.invoice.date}</value>
        </div>
        <div class="meta-item">
          <label>Due Date</label>
          <value>${config.invoice.dueDate}</value>
        </div>
        <div class="meta-item">
          <label>Project</label>
          <value style="font-size: 14px; line-height: 1.3;">${config.invoice.projectName}</value>
        </div>
      </div>

      <div class="line-items">
        <h3>Services Provided</h3>
        <table>
          <thead>
            <tr>
              <th style="width: 70%;">Description</th>
              <th style="width: 30%;">Amount</th>
            </tr>
          </thead>
          <tbody>
            ${config.lineItems.map(item => `
            <tr>
              <td>
                <div class="item-description">${item.description}</div>
                <div class="item-details">${item.details}</div>
              </td>
              <td class="item-amount">
                <span class="amount">$${item.amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </td>
            </tr>
            `).join('')}
          </tbody>
        </table>
      </div>

      <div class="totals">
        <div class="totals-row">
          <span>Subtotal</span>
          <span class="amount">$${total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
        </div>
        <div class="totals-row total">
          <span>Total Due</span>
          <span class="amount">$${total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${currency}</span>
        </div>
      </div>

      <div class="terms">
        <h4>Payment Terms</h4>
        <ul>
          ${config.terms.map(term => `<li>${term}</li>`).join('')}
        </ul>
      </div>

      <div class="notes">
        <h4>Notes</h4>
        <p>${config.notes}</p>
      </div>
    </div>

    <div class="invoice-footer">
      This is a computer-generated invoice. No signature required.<br>
      For questions about this invoice, please contact ${config.provider.email}
    </div>
  </div>

  <script>
    // Optional: Auto-print on load
    // window.onload = function() { window.print(); }
  </script>
</body>
</html>`;
}

// Generate the invoice
const html = generateHTMLInvoice(INVOICE_CONFIG);

// Save to file
const outputPath = path.join(__dirname, 'INVOICE.html');
fs.writeFileSync(outputPath, html, 'utf8');

console.log('✅ Invoice generated successfully!');
console.log(`📄 Location: ${outputPath}`);
console.log('\n📝 Next steps:');
console.log('1. Edit the INVOICE_CONFIG section in generateInvoice.js with your actual details');
console.log('2. Run: node generateInvoice.js');
console.log('3. Open INVOICE.html in your browser');
console.log('4. Print to PDF (Cmd+P / Ctrl+P) or use browser "Save as PDF" option');
console.log('\n💡 Tip: The total amount is currently set to $15,000. Adjust as needed!');
