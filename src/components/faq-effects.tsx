'use client';

import { useEffect } from 'react';

export function FaqEffects() {
  useEffect(() => {
    // FAQ Toggle Logic
    const toggles = document.querySelectorAll('.faq-toggle');
    const toggleHandler = (event: Event) => {
      const toggle = event.currentTarget as HTMLElement;
      toggle.classList.toggle('active');
      const answer = toggle.nextElementSibling as HTMLElement;
      if (answer.style.maxHeight) {
        answer.style.maxHeight = '';
      } else {
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    };
    toggles.forEach(toggle => {
      toggle.addEventListener('click', toggleHandler);
    });

    // FAQ Search Logic
    const searchInput = document.getElementById('faq-search') as HTMLInputElement;
    const faqItems = document.querySelectorAll('.faq-item');

    const handleSearch = () => {
      const query = searchInput.value.toLowerCase();
      faqItems.forEach(item => {
        const questionEl = item.querySelector('h3');
        const answerEl = item.querySelector('p');

        if (questionEl && answerEl) {
          // Reset highlighting
          questionEl.innerHTML = questionEl.innerText;
          answerEl.innerHTML = answerEl.innerText;
          
          const questionText = questionEl.innerText.toLowerCase();
          const answerText = answerEl.innerText.toLowerCase();

          const isMatch = questionText.includes(query) || answerText.includes(query);
          (item as HTMLElement).style.display = isMatch ? '' : 'none';

          if (isMatch && query) {
            const regex = new RegExp(`(${query})`, 'gi');
            questionEl.innerHTML = questionEl.innerText.replace(regex, '<mark>$1</mark>');
            answerEl.innerHTML = answerEl.innerText.replace(regex, '<mark>$1</mark>');
          }
        }
      });
    };

    searchInput?.addEventListener('input', handleSearch);

    // Back to Top button logic
    const backToTopButton = document.getElementById('backToTop');
    const handleScroll = () => {
      if (backToTopButton) {
        backToTopButton.style.display = window.scrollY > 300 ? 'block' : 'none';
      }
    };
    window.addEventListener('scroll', handleScroll);

    const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (backToTopButton) {
      backToTopButton.addEventListener('click', scrollToTop);
    }

    // Cleanup function
    return () => {
      toggles.forEach(toggle => {
        toggle.removeEventListener('click', toggleHandler);
      });
      searchInput?.removeEventListener('input', handleSearch);
      window.removeEventListener('scroll', handleScroll);
      if (backToTopButton) {
        backToTopButton.removeEventListener('click', scrollToTop);
      }
    };
  }, []);

  return null;
}
