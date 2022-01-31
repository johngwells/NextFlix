import Head from 'next/head'
import styles from '../styles/Home.module.css'

import Banner from '../components/banner/banner'
import NavBar from '../components/nav/navbar'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>NextFlix App</title>
        <meta name="description" content="NextJS Netflix app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <NavBar username='johnny@google.com' />
        <Banner title='Lord of the Rings' subTitle='Mordor' imgUrl='/static/Lordoftherings.jpeg' />
        {/* <Card /> */}
      </main>

    </div>
  )
}
