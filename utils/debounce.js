function debounceTime(Fn, delay) {
  let timerId;
  return function (...args) {
    timerId && clearTimeout(timerId);
    timerId = setTimeout(() => {
      Fn(...args);
    }, delay);
  };
}

export default debounceTime;
