/**
 * v0 by Vercel.
 * @see https://v0.dev/t/Ew0ptVYKtfv
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Input, Button, Card } from "@nextui-org/react"


export default function Component() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#b792f6b5] to-[#ffffff]">
      <div className="text-center">
        <h1 className="text-4xl font-bold">
          Get an instant{" "}
          <span className="relative inline-block">
            <span className="relative z-10">home evaluation</span>
            <span className="absolute inset-0 bg-[#874debb5] z-0 transform -skew-x-6" />
          </span>
          , powered by Valery AI
        </h1>
      </div>
      <div className="mt-8">
        <Card className="flex flex-row items-center p-4 shadow-lg rounded-lg min-w-[50vw]">
          <Input
            fullWidth
            placeholder="Enter address"
            contentLeft={<HomeIcon className="text-muted-foreground" />}
            className="mr-4"
          />
          <Button auto flat className="font-bold" color="secondary">
            Get My Report
          </Button>
        </Card>
      </div>
      <div className="mt-8 flex flex-row justify-center space-x-4 text-muted-foreground">
        {/* <span>As seen on:</span>
        <img src="/placeholder.svg" alt="CP24" className="h-6" />
        <img src="/placeholder.svg" alt="OMNI" className="h-6" />
        <img src="/placeholder.svg" alt="CTV" className="h-6" />
        <img src="/placeholder.svg" alt="Radio One" className="h-6" /> */}
      </div>
    </div>
  )
}

function HomeIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  )
}


function InfoIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  )
}