const addItemDriverFactory = component => ({
  click: () => component.click(),
  element: () => component
});

export default addItemDriverFactory;
