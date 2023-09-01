import './App.css';
import { SnackbarProvider } from 'notistack';
import DashBoard from './Page/DashBoard';

const App = () => {
  return (
    <SnackbarProvider maxSnack={3}>
      <DashBoard />
    </SnackbarProvider>
  );
};

export default App;
