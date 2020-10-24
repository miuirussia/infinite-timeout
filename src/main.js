// @flow
const MAX_TIMEOUT_MS = 0x7FFFFFFF;

type PromiseRunner = () => Promise<mixed>
type CancelFunction = () => void;

export const scheduleTimeout = (f: PromiseRunner, timeout: number, loop?: boolean): CancelFunction => {
  let timeoutId = null;

  const startTimeout = (remainingTimeout: number) => {
    if (remainingTimeout <= MAX_TIMEOUT_MS) {
      timeoutId = setTimeout(async () => {
        await f();
        clearTimeout(timeoutId);
        if (loop) {
          timeoutId = startTimeout(timeout);
        }
      }, remainingTimeout);
    } else {
      timeoutId = setTimeout(() => {
        clearTimeout(timeoutId);
        timeoutId = startTimeout(remainingTimeout - MAX_TIMEOUT_MS);
      }, MAX_TIMEOUT_MS);
    }
  };

  startTimeout(timeout);

  return () => {
    clearTimeout(timeoutId);
  };
};
