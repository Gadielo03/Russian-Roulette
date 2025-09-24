import { Stack } from '@mui/material';
import { useContext } from 'react';
import Roulette from './components/roulette/Roulette'
import Configuration from './components/configuration/Configuration';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import DataContext from './DataContext';


function App() {
  const { sessionActive } = useContext(DataContext);

  return (
    <>
      <Stack spacing={5} sx={{ width: '100%'}}>
        <Header />
        <Stack
          direction="row"
          spacing={12}
          sx={{
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {!sessionActive && <Configuration />}
          <Roulette />
        </Stack>
        <Footer />
      </Stack>
    </>
  )
}

export default App
