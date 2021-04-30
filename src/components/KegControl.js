import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as a from './../actions';
import NewKegForm from './NewKegForm';
import KegDetail from './KegDetail';
import KegList from './KegList';
import EditKegForm from './EditKegForm';

class KegControl extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedKeg: null,
    };
  }

  handleClick= () => {
    if (this.state.selectedKeg != null) {
      this.setState({
        selectedKeg: null,
      });
    } else {
      const { dispatch } = this.props;
      const action = a.toggleForm();
      dispatch(action);      
    }
  }

  handleRestockingKegs = (id) => {
    const chosenKeg = this.props.masterKegList[id];
    if (chosenKeg) {
      const newQuantity = (parseInt(chosenKeg.quantity) + 1).toString();
      chosenKeg.quantity = newQuantity
      this.setState({selectedKeg: chosenKeg})
    }
  }

  handleSellingPints = (id) => {
    const chosenKeg = this.props.masterKegList[id];
    if (chosenKeg) {
      const newQuantity = (parseInt(chosenKeg.quantity) - 1).toString();
      chosenKeg.quantity = newQuantity
      this.setState({selectedKeg: chosenKeg})
    }
  }

  handleAddingNewKegToList = (newKeg) => {
    const { dispatch } = this.props;
    const action = a.addKeg(newKeg);
    dispatch(action);
    const action2 = a.toggleForm();
    dispatch(action2);
  }

  handleChangingSelectedKeg = (id) => {
    const selectedKeg = this.props.masterKegList[id];
    this.setState({selectedKeg: selectedKeg});
  }

  handleDeletingKeg = (id) => {
    const { dispatch } = this.props;
    const action = a.deleteKeg(id)
    dispatch(action);
    this.setState({selectedKeg: null});
  }

  handleEditingKeg = (kegToEdit) => {
    const { dispatch } = this.props;
    const action = a.addKeg(kegToEdit);
    dispatch(action);
    const action2 = a.toggleEdit();
    dispatch(action2);
    this.setState({
      selectedKeg: null
    });
  }

  handleEditClick = () => {
    const { dispatch } = this.props;
    const action = a.toggleEdit();
    dispatch(action);      
    // this.setState({editing: true});
  }

  render(){
    let currentlyVisibleState = null;
    let buttonText = null;

    if (this.props.editing) {
      currentlyVisibleState = <EditKegForm keg = {this.state.selectedKeg} onEditKeg = {this.handleEditingKeg}/>
      buttonText = "Return to Keg List"
    
    } else if (this.state.selectedKeg != null) {
      currentlyVisibleState = <KegDetail keg = {this.state.selectedKeg} onClickingDelete = {this.handleDeletingKeg} onClickingEdit = {this.handleEditClick} onClickingRestock = {this.handleRestockingKegs} onClickingBuy = {this.handleSellingPints}/>
      buttonText = "Return to Keg List";
    } else if (this.props.formVisibleOnPage) {
      currentlyVisibleState = <NewKegForm onNewKegCreation = {this.handleAddingNewKegToList} />;
      buttonText = "Return to Keg List";
    } else {
      currentlyVisibleState = <KegList kegList={this.props.masterKegList} onKegSelection={this.handleChangingSelectedKeg}/>;
      buttonText = "Add Keg";
    }
    return (
      <React.Fragment>
        {currentlyVisibleState}
        <button onClick={this.handleClick}>{buttonText}</button>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    masterKegList: state.masterKegList,
    formVisibleOnPage: state.formVisibleOnPage, 
    editing: state.editing
  }
}

KegControl.propTypes = {
  masterKegList: PropTypes.object,
  formVisibleOnPage: PropTypes.bool,
  editing: PropTypes.bool
};

KegControl = connect(mapStateToProps)(KegControl);

export default KegControl;  
