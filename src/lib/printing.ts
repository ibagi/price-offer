export function usePrintFileName() {
  const originalTitle = document.title;
  let printFileName = '';

  window.addEventListener('beforeprint', () => {
    document.title = printFileName;
  });

  window.addEventListener('afterprint', () => {
    document.title = originalTitle;
  });

  return (offerNumber: string) => (printFileName = offerNumber);
}
