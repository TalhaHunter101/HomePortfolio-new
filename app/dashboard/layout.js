'use client';

import { useEffect, useState } from 'react';
import pb from '../../lib/pocketbase';

export default function RootLayout({ children }) {
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {


    if(typeof window !== 'undefined') {
        const user = localStorage.getItem('pocketbase_auth')
        setUserDetails(user);
    }


  }, []);

  return (
    <html lang="en">
      <body>
        {children}
     
      </body>
    </html>
  );
}