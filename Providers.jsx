// app/providers.tsx
'use client'

import {NextUIProvider} from '@nextui-org/react'
import { useRouter } from "next/navigation";


export default function Providers({children}) {
  const router = useRouter()
  return (
    <NextUIProvider navigate={router.push}>
      {children}
    </NextUIProvider>
  )
}