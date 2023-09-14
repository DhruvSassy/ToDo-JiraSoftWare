
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Box,styled } from '@mui/material';
import ButtonComponent from '../Button';


const HeaderCard = styled(Box)({
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: '20px',
    marginTop: '20px',
    marginRight: '10px',
  });


const StatusDropdown = ({ currentStatus ,onClick}) => (
    <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <HeaderCard>
          <ButtonComponent
            variant="contained"
            {...bindTrigger(popupState)}
            title="ToDo" 
            style={{ width: "110px" }}
            endIcon={<KeyboardArrowDownIcon />}
            onClick={onClick}
          ></ButtonComponent>
          <Menu {...bindMenu(popupState)}>
            <MenuItem onClick={onClick}>InProgress</MenuItem>
            <MenuItem onClick={onClick}>QA</MenuItem>
            <MenuItem onClick={onClick}>Done</MenuItem>
          </Menu>
        </HeaderCard>
      )}
    </PopupState>
  );
  
  export default StatusDropdown

  