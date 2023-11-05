"use client"
import { Provider } from 'react-redux';
import FileUploader from '../components/file/file-uploader';
import { store } from '../store';

import Container from '@mui/material/Container';

export default function Dashboard() {
  return (
    <Provider store={store}>
      <Container>
        <main>
          <h1>Splinter</h1>
          <FileUploader/>
        </main>
      </Container>
    </Provider>
  )
}
