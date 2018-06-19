import React from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';

const BulkSelectionState = Object.freeze({
  CHECKED: 'checked',
  UNCHECKED: 'unchecked',
  INTERMEDIATE: 'indeterminate'
});

/**
 * Table is a composit component that allows adding header, fuooter and bulk actions to tables
 */
export class BulkSelection extends React.Component {

  constructor(props) {
    super(props);
    const selections = props.selections.slice();
    this.state = {
      selections
    };
  }

  getSelectionsCount(selections) {
    return selections.reduce((total, current) => current ? total + 1 : total, 0);
  }

  getNextBulkSelectionState(selections) {
    const numOfSelected = this.getSelectionsCount(selections);
    const numOfRows = selections.length;
    return numOfSelected === 0 ? BulkSelectionState.UNCHECKED :
      numOfSelected === numOfRows ? BulkSelectionState.CHECKED : BulkSelectionState.INTERMEDIATE;
  }

  // This method is equivilant to the React 16 Lifecycle method getDerivedStateFromProps
  static _getDerivedStateFromProps(props, state) {
    return isEqual(props.selections, state.selections) ? null : {selections: props.selections.slice()};
  }

  componentWillReceiveProps(nextProps) {
    const newState = BulkSelection._getDerivedStateFromProps(nextProps, this.state);
    newState && this.setState(newState);
  }

  toggleAll = enable => {
    return this.state.selections.map(() => enable);
  }

  handleItemSelectionChange() {
    let selections;
    const bulkSelectionState = this.getNextBulkSelectionState(this.state.selections);
    if (bulkSelectionState === BulkSelectionState.INTERMEDIATE) {
      selections = this.toggleAll(true);
    } else if (bulkSelectionState === BulkSelectionState.CHECKED) {
      selections = this.toggleAll(false);
    } else {
      selections = this.toggleAll(true);
    }
    this.setSelection({selections});
  }

  setSelection = ({selections}) => {
    this.setState({selections});
    this.props.onSelectionChanged && this.props.onSelectionChanged(selections);
  }

  toggleItem = rowNum => {
    const selections = this.state.selections.slice();
    selections[rowNum] = !selections[rowNum];
    this.setSelection({selections});
  }

  getStateAndHelpers() {
    return {
      selection: this.state.selection,
      toggleItem: this.toggleItem,
      toggleAll: this.toggleAll,
      setSelection: this.setSelection
    };
  }

  render() {
    return this.props.children(this.getStateAndHelpers());
  }
}

BulkSelection.defaultProps = {
  selections: []
};

BulkSelection.propTypes = {
  /** Array of row selection boolean states. Should correspond in length to the data prop */
  selections: PropTypes.arrayOf(PropTypes.bool),
  /** Called when row selection changes. Receives the updated selection array as argument. */
  onSelectionChanged: PropTypes.func,
  children: PropTypes.func
};



