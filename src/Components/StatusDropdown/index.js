import React, { useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Menu, MenuItem, Box, styled, Fade } from '@mui/material';

import { Button } from '../index';

const HeaderCard = styled(Box)({
  display: 'flex',
  justifyContent: 'flex-end',
  marginBottom: '20px',
  marginTop: '20px',
  marginRight: '10px',
});

const StatusDropdown = ({ onChangeStatus, selectedStatus, currentStatus }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  let statusOptions = [];

  if (currentStatus && currentStatus.status === 1) {
    statusOptions = [{ id: 2, title: 'InProgress' }];
  } else if (currentStatus && currentStatus.status === 2) {
    statusOptions = [
      { id: 1, title: 'ToDo' },
      { id: 3, title: 'QA' },
    ];
  } else if (currentStatus && currentStatus.status === 3) {
    statusOptions = [
      { id: 2, title: 'InProgress' },
      { id: 4, title: 'Done' },
    ];
  }

  return (
    <div>
      <HeaderCard>
        <Button
          id="status-button"
          onClick={handleClick}
          variant="contained"
          style={{ width: '130px' }}
          title={selectedStatus}
          endIcon={<KeyboardArrowDownIcon />}
        />
      </HeaderCard>

      <Menu
        id="status-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        {statusOptions.map((status) => (
          <MenuItem
            key={status.id}
            onClick={() => {
              onChangeStatus(status.id);
              handleClose();
            }}
            style={{ width: '130px' }}
          >
            {status.title}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default StatusDropdown;
