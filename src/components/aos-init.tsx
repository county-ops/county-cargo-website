'use client';

import * as React from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export function AosInit() {
  React.useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  return null;
}
