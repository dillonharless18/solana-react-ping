import { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import WalletContextProvider from '../components/WalletContextProvider'
import { AppBar } from '../components/AppBar'
// import { BalanceDisplay } from '../components/BalanceDisplay'
import { PingButton } from '../components/PingButton'
import Head from 'next/head'
import { SolSender } from '../components/SolSender'

const SolSenderPage: NextPage = (props) => {


  return (
    <div className={styles.App}>
      <Head>
        <title>Sol Sender</title>
        <meta
          name="description"
          content="Sol Sender"
        />
      </Head>
      <WalletContextProvider>
        <AppBar />
        <SolSender />
      </WalletContextProvider >
    </div>
  );
}

export default SolSenderPage;