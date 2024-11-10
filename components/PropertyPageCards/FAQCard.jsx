import { Card, CardBody, CardHeader, Accordion, AccordionItem } from "@nextui-org/react";
import { timeAgo, formatCurrency } from "@/utils/Helper";

export const FAQCard = ({ title, data, bedrooms, bathrooms, area, price }) => {
    const faqs = [
        {
            question: "How many beds, baths, and sqft does this home have?",
            answer: `This property has ${bedrooms} bedrooms, ${bathrooms} bathrooms, and is ${area} square feet.`
        },
        {
            question: "When was this home built?",
            answer: `This home was built in ${data?.attributes?.yearBuilt || "N/A"}.`
        },
        {
            question: "How long has this home been listed on HomePortfolio?",
            answer: `This property has been listed for ${timeAgo(data?.publishedOn)}.`
        },
        {
            question: "What's the current price of this home?",
            answer: `The current listing price is £${formatCurrency(price)}.`
        },
        {
            question: "Is this home in a quiet neighborhood?",
            answer: "Based on our noise level analysis, this area has moderate ambient noise levels typical for an urban residential area. For detailed noise information, please check our Noise Levels section."
        },
        {
            question: "How quickly do homes sell in this neighborhood?",
            answer: `Properties in ${data?.location?.townOrCity} typically sell within 30-45 days of listing. Market conditions may vary.`
        },
        {
            question: "What are the grocery and delivery options?",
            answer: "There are several supermarkets and convenience stores within walking distance. Major delivery services operate in this area. Check the 'What's Nearby?' section for specific locations."
        },
        {
            question: "How is the air quality?",
            answer: "The air quality index in this area is monitored regularly. For current readings and detailed information, please refer to our Air Quality section."
        },
        {
            question: "What are the internet/broadband options?",
            answer: "Multiple internet service providers cover this area with fiber and cable options available. Check our Cellular Information section for detailed connectivity data."
        }
    ];

    return (
        <Card className="m-4">
            <CardHeader className="text-2xl font-bold">{title}</CardHeader>
            <CardBody>
                <Accordion selectionMode="multiple">
                    {faqs.map((faq, index) => (
                        <AccordionItem 
                            key={index} 
                            title={faq.question}
                            className="pl-4"
                        >
                            {faq.answer}
                        </AccordionItem>
                    ))}
                </Accordion>
            </CardBody>
        </Card>
    );
};
