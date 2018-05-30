import React from 'react';
import {children, optional, once} from '../Composite';
import Label from '../Label';
import InputArea from '../InputArea';
import InputAreaWithLabelComposite from '../Composite/InputAreaWithLabelComposite/InputAreaWithLabelComposite';

const TextArea = ({children, ...props}) => (
  <InputAreaWithLabelComposite {...props}>
    {children}
  </InputAreaWithLabelComposite>
);

TextArea.propTypes = {
  children: children(optional(Label), once(InputArea))
};

TextArea.displayName = 'TextArea';

export default TextArea;
