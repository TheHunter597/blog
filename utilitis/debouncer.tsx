export function debounce(fun: any, delay: number) {
  let timer: any;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fun;
    }, delay);
  };
}
