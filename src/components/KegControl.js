import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as a from './../actions';
import NewKegForm from './NewKegForm';
import KegDetail from './KegDetail';
import KegList from './KegList';
import EditKegForm from './EditKegForm';

class KegControl extends React.Component {

  handleClick= () => {
    const { dispatch } = this.props;
    if (this.props.selectedKeg != null) {
      const editAction = a.toggleEdit(false);
      dispatch(editAction);
      const unselectAction = a.unselectedKeg();
      dispatch(unselectAction);
    } else {
      const toggleFormAction = a.toggleForm();
      dispatch(toggleFormAction);      
    }
  };

  handleRestockingKegs = (id) => {
    const chosenKeg = this.props.masterKegList[id];
    if (chosenKeg) {
      const newQuantity = (parseInt(chosenKeg.quantity) + 1).toString();
      chosenKeg.quantity = newQuantity
      const{ dispatch } = this.props;
      const action = a.selectedKeg();
      dispatch(action);
    }
  };

  handleSellingPints = (id) => {
    const chosenKeg = this.props.masterKegList[id];
    if (chosenKeg) {
      const newQuantity = (parseInt(chosenKeg.quantity) - 1).toString();
      chosenKeg.quantity = newQuantity
      const{ dispatch } = this.props;
      const action = a.selectedKeg();
      dispatch(action);
    }
  }

  handleAddingNewKegToList = (newKeg) => {
    const { dispatch } = this.props;
    const action = a.addKeg(newKeg);
    dispatch(action);
    const action2 = a.toggleForm();
    dispatch(action2);
  };

  handleChangingSelectedKeg = (id) => {
    const keg = this.props.masterKegList[id];
    const { dispatch } = this.props;
    const action = a.selectedKeg(keg);
    dispatch(action);
  };
    

  handleDeletingKeg = (id) => {
    const { dispatch } = this.props;
    const action = a.deleteKeg(id)
    dispatch(action);
    const unselectAction = a.unSelectedKeg();
    dispatch(unselectAction);
  };

  handleEditingKeg = (kegToEdit) => {
    const { dispatch } = this.props;
    const addKegAction = a.addKeg(kegToEdit);
    dispatch(addKegAction);
    const editAction = a.toggleEdit(false);
    dispatch(editAction);
    const unselectAction = a.unselectedKeg();
    dispatch(unselectAction);
  };

  handleEditClick = () => {
    const { dispatch } = this.props;
    const action = a.toggleEdit(true);
    dispatch(action);      
  };

  render(){
    let currentlyVisibleState = null;
    let buttonText = null;

    if (this.props.editing) {
      currentlyVisibleState = <EditKegForm keg = {this.props.selectedKeg} onEditKeg = {this.handleEditingKeg}/>
      buttonText = "Return to Keg List"
    
    } else if (this.props.selectedKeg != null) {
      currentlyVisibleState = <KegDetail keg = {this.props.selectedKeg} onClickingDelete = {this.handleDeletingKeg} onClickingEdit = {this.handleEditClick} onClickingRestock = {this.handleRestockingKegs} onClickingBuy = {this.handleSellingPints}/>
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
    editing: state.editing,
    selectedKeg: state.selectedKeg
  }
}

KegControl.propTypes = {
  masterKegList: PropTypes.object,
  formVisibleOnPage: PropTypes.bool,
  editing: PropTypes.bool,
  selectedKeg: PropTypes.object
};

KegControl = connect(mapStateToProps)(KegControl);

export default KegControl;  
