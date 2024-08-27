import postmark from 'postmark';
import puppeteer from 'puppeteer';

export default async function handler({email, url}) {
  if (req.method === 'POST') {
    const { url, email } = req.body;

    try {
      // Step 1: Generate PDF from URL using Puppeteer
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto(url, { waitUntil: 'networkidle2' });
      const pdfBuffer = await page.pdf({ format: 'A4' });
      await browser.close();

      // Step 2: Send the PDF via Postmark
      const client = new postmark.ServerClient("0c51222a-992b-4673-9490-c11a877d5d2b");

      await client.sendEmail({
        From: 'samos@homeportfolio.com',  // Your verified sender email address
        To: email,
        Subject: 'Your Requested Report PDF',
        HtmlBody: '<p>Please find attached the report you requested.</p>',
        Attachments: [
          {
            Name: 'report.pdf',
            Content: pdfBuffer.toString('base64'),
            ContentType: 'application/pdf',
          },
        ],
      });

      res.status(200).json({ message: 'PDF generated and email sent successfully!' });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Error generating PDF or sending email' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
