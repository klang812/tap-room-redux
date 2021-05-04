import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as a from './../actions';
import NewKegForm from './NewKegForm';
import KegDetail from './KegDetail';
import KegList from './KegList';
import EditKegForm from './EditKegForm';

class KegControl extends React.Component {

  handleClick = () => {
    const { dispatch } = this.props;
    if (this.props.editing === false && this.props.selectedKeg === null && this.props.formVisibleOnPage === false) { //add keg
        dispatch(a.toggleForm());
      }  
      else if (this.props.editing === true && this.props.selectedKeg === null && this.props.formVisibleOnPage ===true) {
        dispatch(a.toggleEdit());
      }
      else if (this.props.editing === false && this.props.selectedKeg !== null && this.props.formVisibleOnPage ===false) {
        dispatch(a.unselectedKeg());
      }
      else if (this.props.editing === false && this.props.selectedKeg === null && this.props.formVisibleOnPage === true) {
        dispatch(a.toggleForm());
      }
      else if (this.props.selectedKeg != null) { //edit keg
        dispatch(a.toggleEdit());
        dispatch(a.unselectedKeg());
      }
      else {
        dispatch(a.toggleForm());
        dispatch(a.toggleEdit());
      }
  };

  handleRestockingKegs = () => {
    const chosenKeg = this.props.selectedKeg;
    if (chosenKeg) {
      const newQuantity = (parseInt(chosenKeg.quantity) + 1).toString();
      chosenKeg.quantity = newQuantity
      const{ dispatch } = this.props;
      const selectKegAction = a.selectedKeg(chosenKeg);
      dispatch(selectKegAction);
      dispatch(a.addKeg(chosenKeg));
    }
  };

  handleSellingPints = () => {
    const chosenKeg = this.props.selectedKeg;
    if (chosenKeg) {
      const newQuantity = (parseInt(chosenKeg.quantity) - 1).toString();
      chosenKeg.quantity = newQuantity
      const{ dispatch } = this.props;
      const selectKegAction = a.selectedKeg(chosenKeg);
      dispatch(selectKegAction);
      dispatch(a.addKeg(chosenKeg));
    }
  };

  handleAddingNewKegToList = (newKeg) => {
    const { dispatch } = this.props;
    const newKegAction = a.addKeg(newKeg);
    dispatch(newKegAction);
    const toggleFormAction = a.toggleForm();
    dispatch(toggleFormAction);
  };

  handleChangingSelectedKeg = (id) => {
    const keg = this.props.masterKegList[id];
    const { dispatch } = this.props;
    const selectKegAction = a.selectedKeg(keg);
    dispatch(selectKegAction);
  };
    

  handleDeletingKeg = (id) => {
    const { dispatch } = this.props;
    const deleteKegAction = a.deleteKeg(id)
    dispatch(deleteKegAction);
    const unselectAction = a.unselectedKeg();
    dispatch(unselectAction);
  };

  handleEditingKeg = (kegToEdit) => {
    const { dispatch } = this.props;
    const addKegAction = a.addKeg(kegToEdit);
    dispatch(addKegAction);
    const editAction = a.toggleEdit();
    dispatch(editAction);
    const unselectAction = a.unselectedKeg();
    dispatch(unselectAction);
  };

  handleEditClick = () => {
    const { dispatch } = this.props;
    const editAction = a.toggleEdit();
    dispatch(editAction);      
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
