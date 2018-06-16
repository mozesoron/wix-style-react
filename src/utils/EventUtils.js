/**
 * Chain event handlers.
 *
 * Returns an event handler which :
 * - chains both handler calls
 * - The outer handler is called first.
 * - If event.preventDefault() is not called, then the inner handler will be called.
 * - If an exception is thrown in the out handler, then the  inner handler will NOT be called.
 * - returns the return value of the first (defined) handler
 * @param {function} outerHandler
 * @param {function} innerHandler
 * @returns An event handler that chains all given handlers
 */
export function chainEventHandlers(...handlers) {
  return event => {
    let res;
    handlers.some(h => {
      if (h) {
        const r = h && h(event);
        res = typeof res !== 'undefined' && r;
        if (event.defaultPrevented) {
          return true;
        }
      }
      return false;
    });

    return res;
  };
}
