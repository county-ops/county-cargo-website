
'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import NProgress from 'nprogress'

export function NavigationEvents() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    const url = `${pathname}?${searchParams}`
    console.log(url)
    NProgress.done()
  }, [pathname, searchParams])

  useEffect(() => {
    NProgress.configure({ showSpinner: false });

    const handleAnchorClick = (event: MouseEvent) => {
        const targetUrl = (event.currentTarget as HTMLAnchorElement).href;
        const currentUrl = window.location.href;
        if (targetUrl !== currentUrl) {
            NProgress.start();
        }
    };

    const handleMutation: MutationCallback = () => {
        const anchorElements = document.querySelectorAll('a');
        anchorElements.forEach(anchor => anchor.addEventListener('click', handleAnchorClick));
    };

    const mutationObserver = new MutationObserver(handleMutation);
    mutationObserver.observe(document, { childList: true, subtree: true });

    return () => {
       mutationObserver.disconnect();
    };
  }, [])

  return null
}

    