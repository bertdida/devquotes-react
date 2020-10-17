import { useEffect } from 'react';

export function useArrowKeyPagination({ goNextPage, goPreviousPage }) {
  useEffect(() => {
    function listener({ key }) {
      if (key === 'ArrowLeft') {
        goPreviousPage();
      } else if (key === 'ArrowRight') {
        goNextPage();
      }
    }

    document.addEventListener('keydown', listener);

    return function cleanUp() {
      document.removeEventListener('keydown', listener);
    };
  }, [goNextPage, goPreviousPage]);
}
