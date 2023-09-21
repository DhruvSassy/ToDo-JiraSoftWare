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


const StatusDropdown = ({ onChangeStatus, selectedStatus,currentStatus }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  let statusOptions = [];

  if (currentStatus && currentStatus.status === 'ToDo') {
    statusOptions = ['InProgress'];
  } else if (currentStatus && currentStatus.status === 'InProgress') {
    statusOptions = ['ToDo', 'QA'];
  } else if (currentStatus && currentStatus.status === 'QA') {
    statusOptions = ['InProgress', 'Done'];
  }

  return (
    <div>
      <HeaderCard>
        <Button
          id="status-button"
          // aria-controls={open ? 'status-menu' : undefined}
          // aria-haspopup="true"
          // aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          variant="contained"
          style={{ width: '130px' }}
          title={selectedStatus}
          endIcon={<KeyboardArrowDownIcon />}
        />
      </HeaderCard>

      <Menu
        id="status-menu"
        // MenuListProps={{
        //   'aria-labelledby': 'status-button',
        // }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        {statusOptions.map((status) => (
          <MenuItem
            key={status}
            onClick={() => {
              onChangeStatus(status);
              handleClose();
            }}
            style={{ width: '130px' }}
          >
            {status}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default StatusDropdown;
