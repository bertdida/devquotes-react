import { useEffect } from 'react';

export function useArrowKeyPagination({ nextPage, previousPage }) {
  useEffect(() => {
    function listener({ key }) {
      if (key === 'ArrowLeft') {
        previousPage();
      } else if (key === 'ArrowRight') {
        nextPage();
      }
    }

    document.addEventListener('keydown', listener);

    return function cleanUp() {
      document.removeEventListener('keydown', listener);
    };
  }, [nextPage, previousPage]);
}
