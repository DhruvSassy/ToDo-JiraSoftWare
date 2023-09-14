
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


  const StatusDropdown = ({  onChangeStatus }) => (
    <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <HeaderCard>
          <ButtonComponent
            variant="contained"
            {...bindTrigger(popupState)}
            title="Status"
            style={{ width: "110px" }}
            endIcon={<KeyboardArrowDownIcon />}
          ></ButtonComponent>
          <Menu {...bindMenu(popupState)}>
            <MenuItem onClick={() => onChangeStatus('ToDo')}>ToDo</MenuItem>
            <MenuItem onClick={() => onChangeStatus('InProgress')}>
              InProgress
            </MenuItem>
            <MenuItem onClick={() => onChangeStatus('QA')}>QA</MenuItem>
            <MenuItem onClick={() => onChangeStatus('Done')}>Done</MenuItem>
          </Menu>
        </HeaderCard>
      )}
    </PopupState>
  );
  
  
  export default StatusDropdown

  