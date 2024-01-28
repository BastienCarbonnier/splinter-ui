"use client"
import styles from './page.module.css'

import { Provider } from 'react-redux';
import FileUploader from './components/file/file-uploader';
import { store } from './store';

import Container from '@mui/material/Container';

export default function Home() {
  return (
    <Provider store={store}>
      <main className={styles.main}>
        <Container>
          <main>
            <h1>Splinter</h1>
            <FileUploader />
          </main>
        </Container>
      </main>
    </Provider>
  )
}
