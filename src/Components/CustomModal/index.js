import React from 'react';

import { Dialog, DialogContent, DialogTitle, IconButton, styled } from '@mui/material';
import { Close } from '@mui/icons-material';

const CustomModalContainer = styled(Dialog)({
    minHeight: "180px",
});

const ModalTitleContainer = styled(DialogTitle)({
  display: "flex",
  justifyContent: "space-between",
  paddingRight: "48px",
  alignItems: "center",
});

const CloseButton = styled(IconButton)({
  padding: 0,
});

const CustomModal = ({
  title,
  fullScreen,
  onClose,
  open,
  children,
  className = '',
  autoClose = true,
}) => {
  return (
    <CustomModalContainer
      fullScreen={fullScreen}
      fullWidth
      open={open}
      onClose={autoClose ? onClose : null}
    >
      <ModalTitleContainer>
        {title}
        <CloseButton onClick={onClose}>
          <Close />
        </CloseButton>
      </ModalTitleContainer>
      <DialogContent >
        {children}
      </DialogContent>
    </CustomModalContainer>
  );
};

export default CustomModal;

