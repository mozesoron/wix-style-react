import React from 'react';
import PropTypes from 'prop-types';
import AddItem from '../../src/AddItem/AddItem';
import {Container, Row, Col} from '../../src/Grid';

const Example = () => (
  <Container>
    <Row>
      <Col span={2}>
        <h3>Add Item - default</h3>
        <AddItem dataHook="add-item" onAddImage={() => {}}/>
      </Col>
      <Col span={4}>
        <h3>Add Item - with tooltip & ratio 16/9 </h3>
        <AddItem
          aspectRatio="16/9"
          dataHook="add-item"
          tooltipContent="Add Tooltip Content"
          onAddImage={() => {}}
          />
      </Col>
    </Row>
  </Container>
);

Example.propTypes = {
  theme: PropTypes.string
};

export default Example;
