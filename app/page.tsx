import Image from 'next/image'
import styles from './page.module.css'
import Dashboard from './dashboard/page'
import Link from 'next/link'

export default function Home() {
  return (
    <main className={styles.main}>
      Main page
      <Link href="/dashboard">Dashboard</Link>
    </main>
  )
}
