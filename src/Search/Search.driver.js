import inputDriverFactory from '../InputWithOptions/InputWithOptions.driver';

const searchDriverFactory = ({element, wrapper, component}) => {
  const inputWithOptionsDriver = element && inputDriverFactory({component, element, wrapper});

  return inputWithOptionsDriver;
};

export default searchDriverFactory;
