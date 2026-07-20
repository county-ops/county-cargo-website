'use client';

import { useEffect } from 'react';

export function InfoEffects() {
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
    toggles.forEach(toggle => toggle.addEventListener('click', toggleHandler));

    // Back to Top Logic
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
    
    // Search Logic
    const searchInput = document.getElementById('search-bar') as HTMLInputElement;

    const handleSearch = () => {
      const query = searchInput.value.toLowerCase().trim();
      const terms = query.split(/\s+/).filter(Boolean);

      // FAQ Items
      document.querySelectorAll('.faq-item').forEach(item => {
        const questionEl = item.querySelector('h3') as HTMLElement | null;
        const answerEl = item.querySelector('.faq-answer') as HTMLElement | null;
        if (!questionEl || !answerEl) return;

        const originalQuestion = questionEl.dataset.originalHtml || questionEl.innerHTML;
        const originalAnswer = answerEl.dataset.originalHtml || answerEl.innerHTML;
        questionEl.dataset.originalHtml = originalQuestion;
        answerEl.dataset.originalHtml = originalAnswer;

        questionEl.innerHTML = originalQuestion;
        answerEl.innerHTML = originalAnswer;
        
        if (!query) {
          (item as HTMLElement).style.display = '';
          return;
        }

        const text = (questionEl.innerText + ' ' + answerEl.innerText).toLowerCase();
        const isMatch = terms.some(term => text.includes(term));

        if (isMatch) {
          (item as HTMLElement).style.display = '';
          terms.forEach(term => {
            const regex = new RegExp(`(${term})`, 'gi');
            questionEl.innerHTML = questionEl.innerHTML.replace(regex, '<mark>$1</mark>');
            answerEl.innerHTML = answerEl.innerHTML.replace(regex, '<mark>$1</mark>');
          });
        } else {
          (item as HTMLElement).style.display = 'none';
        }
      });

      // Table Rows
      document.querySelectorAll('#price-table tbody tr, #electronics-price-table tbody tr').forEach(row => {
        const rowText = (row as HTMLElement).innerText.toLowerCase();
        
        row.querySelectorAll('td').forEach(td => {
          if (!td.dataset.originalHtml) {
            td.dataset.originalHtml = td.innerHTML;
          }
          td.innerHTML = td.dataset.originalHtml || '';
        });

        if (!query) {
          (row as HTMLElement).style.display = '';
          return;
        }

        const isMatch = terms.some(term => rowText.includes(term));
        
        if (isMatch) {
          (row as HTMLElement).style.display = '';
          terms.forEach(term => {
            const regex = new RegExp(`(${term})`, 'gi');
            row.querySelectorAll('td').forEach(td => {
              td.innerHTML = td.innerHTML.replace(regex, '<mark>$1</mark>');
            });
          });
        } else {
          (row as HTMLElement).style.display = 'none';
        }
      });
    };

    searchInput?.addEventListener('input', handleSearch);

    return () => {
      toggles.forEach(toggle => toggle.removeEventListener('click', toggleHandler));
      window.removeEventListener('scroll', handleScroll);
      if (backToTopButton) {
        backToTopButton.removeEventListener('click', scrollToTop);
      }
      searchInput?.removeEventListener('input', handleSearch);
    };
  }, []);

  useEffect(() => {
    // Disable right click (context menu) on the entire page
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };
    
    // Disable copy, cut, paste on the entire page
    const handleCopyCutPaste = (e: ClipboardEvent) => {
      e.preventDefault();
    };
    
    // Disable common keyboard shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      const isMetaOrCtrl = e.ctrlKey || e.metaKey;
      
      // Block Ctrl+C, Ctrl+X, Ctrl+A, Ctrl+S, Ctrl+P
      if (isMetaOrCtrl && (key === 'c' || key === 'x' || key === 'a' || key === 's' || key === 'p')) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('copy', handleCopyCutPaste);
    document.addEventListener('cut', handleCopyCutPaste);
    document.addEventListener('paste', handleCopyCutPaste);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('copy', handleCopyCutPaste);
      document.removeEventListener('cut', handleCopyCutPaste);
      document.removeEventListener('paste', handleCopyCutPaste);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return null;
}
