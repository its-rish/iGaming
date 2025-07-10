'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

const FALLBACK_IMAGE = '/logo.png'; 
const Logo = () => {
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchLogo() {
      try {
         const res = await fetch(
          'https://harmonious-surprise-60a0828505.strapiapp.com/api/global?populate=logo'
        );
        const data = await res.json();
     
       
        if (data?.data?.logo?.url) {
          setLogoUrl(data?.data?.logo?.url);
        }
        else {
          setError(true);
        }
      } catch (err) {
        setError(true);
      }
    }

    fetchLogo();

    return () => controller.abort();
  }, []);

  const imageSrc = error || !logoUrl ? FALLBACK_IMAGE : logoUrl;

  return (
      <Image
        src={imageSrc}
        alt="Logo"
        width={150}
        height={80}
        priority
        className=' h-full object-contain w-auto'
        style={{objectFit:"inherit"}}
        onError={() => setError(true)}
      />
  );
};

export default Logo;
