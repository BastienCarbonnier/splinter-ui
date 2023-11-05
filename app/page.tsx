import styles from './page.module.css'
import Link from 'next/link'

export default function Home() {
  return (
      <main className={styles.main}>
        Main page
        <Link href="/dashboard">Dashboard</Link>
      </main>
  )
}
