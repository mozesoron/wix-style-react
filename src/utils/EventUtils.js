/**
 * Chain event handlers.
 *
 * Returns an event handler which:
 * - calls all the given event handler by order
 * - If an exception is thrown in the a handler, then the rest of the handler will NOT be called.
 * - returns the return value of the first (defined) handler
 * @returns An event handler that chains all given handlers
 */
export function chainEventHandlers(...handlers) {
  return event => {
    let res;
    handlers.forEach(h => {
      if (h) {
        const r = h && h(event);
        res = res !== undefined && r;
      }
    });

    return res;
  };
}
