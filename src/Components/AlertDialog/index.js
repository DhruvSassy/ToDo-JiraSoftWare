import React from 'react';

import {
  styled,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  DialogActions,
} from '@mui/material';

import ButtonComponent from '../Button';

const CustomAlertContainer = styled(Dialog)({
  minHeight: '300px',
});

const AlertTitleContainer = styled(DialogTitle)({
  display: 'flex',
  justifyContent: 'space-between',
  paddingRight: '48px',
  alignItems: 'center',
});

const AlertDialog = (props) => {
  const { open, onClose, onConfirm, title, description } = props;

  return (
    <CustomAlertContainer open={open} onClose={onClose}>
      <AlertTitleContainer>{title}</AlertTitleContainer>
      <DialogContent>
        <DialogContentText>{description}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <ButtonComponent
          onClick={onClose}
          style={{ backgroundColor: 'whitesmoke', color: 'black' }}
          title="Cancel"
        />
        <ButtonComponent onClick={onConfirm} autoFocus title="Confirm" />
      </DialogActions>
    </CustomAlertContainer>
  );
};

export default AlertDialog;
