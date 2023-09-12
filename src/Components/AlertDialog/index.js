import React from 'react';

import {Dialog,DialogContent,DialogContentText,DialogTitle,DialogActions,styled} from '@mui/material';
import ButtonComponent from '../ButtonComponent';

const CustomModalContainer = styled(Dialog)({
  minHeight: "300px",
});

const ModalTitleContainer = styled(DialogTitle)({
  display: "flex",
  justifyContent: "space-between",
  paddingRight: "48px",
  alignItems: "center",
});

const AlertDialog = ({ open, onClose, onConfirm, title, description }) => {
  return (
    <CustomModalContainer open={open} onClose={onClose}>
      <ModalTitleContainer>{title}</ModalTitleContainer>
      <DialogContent>
        <DialogContentText>{description}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <ButtonComponent onClick={onClose} style={{backgroundColor:"whitesmoke",color:"black"}} title="Cancel" />
        <ButtonComponent onClick={onConfirm} autoFocus title="Confirm" />         
      </DialogActions>
    </CustomModalContainer>
  );
};

export default AlertDialog;
