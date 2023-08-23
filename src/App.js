import './App.css';
import DashBoard from './Page/DashBoard';
import { SnackbarProvider } from 'notistack';

const App = () => {
  return (
    <SnackbarProvider maxSnack={3}>
      <DashBoard />
    </SnackbarProvider>
  );
};

export default App;
