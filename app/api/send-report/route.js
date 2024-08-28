import puppeteer from 'puppeteer';
import { NextResponse } from 'next/server';
import { ServerClient } from 'postmark';
import { writeFile } from 'fs/promises';
export async function POST(request) {
  try {
    // Parse the request body
    const { uprn, email } = await request.json();

    let url = `https://home-portfolio-weld.vercel.app/home-valuation/${uprn}`;

    // Validate the URL and email
    if (!url || !email) {
      return NextResponse.json({ error: 'URL and email are required.' }, { status: 400 });
    }

    // Check if the URL is valid and includes http:// or https://
    if (!/^https?:\/\//i.test(url)) {
      return NextResponse.json({ error: 'Invalid URL format.' }, { status: 400 });
    }

    // Step 1: Generate PDF from URL using Puppeteer
    const browser = await puppeteer.launch({
      headless: true, // Ensure Puppeteer runs in headless mode
      args: ['--no-sandbox', '--disable-setuid-sandbox'], // Useful for certain environments like Docker
    });

    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2' });
      


    // wait for 5 seconds

    // await page.waitForTimeout(5000);
    

  // Get the bounding box of the container

  // Generate PDF of the container
  const pdfBuffer = await page.pdf({
    format: 'A4',
  });
    // const pdfBuffer = await page.pdf({ format: 'A4' });
    await browser.close();

    // Convert the buffer to a base64 string with correct encoding
    const base64Pdf = Buffer.from(pdfBuffer).toString('base64');

    // Log to verify the base64 string (can be commented out after verifying)
    console.log('Base64 PDF length:', base64Pdf.length);

    // // save the PDF to the file system
    // await writeFile('public/report.pdf', pdfBuffer);

    // return NextResponse.json({ message: 'PDF generated successfully!' }, { status: 200 });


    // Step 2: Send the PDF via Postmark using ServerClient
    const client = new ServerClient("0c51222a-992b-4673-9490-c11a877d5d2b");

    await client.sendEmail({
      From: 'samos@homeportfolio.com',  // Your verified sender email address
      To: email,
      Subject: 'Your Requested Report PDF',
      HtmlBody: '<p>Please find attached the report you requested.</p>',
      Attachments: [
        {
          Name: 'report.pdf',
          Content: base64Pdf, // Correctly encoded base64 content
          ContentType: 'application/pdf',
        },
      ],
    });

    return NextResponse.json({ message: 'PDF generated and email sent successfully!' }, { status: 200 });

  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Error generating PDF or sending email' }, { status: 500 });
  }
}
