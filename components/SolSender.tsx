import { FC, useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import Image from 'next/image'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { LAMPORTS_PER_SOL, PublicKey, Transaction, TransactionInstruction, SystemProgram, sendAndConfirmRawTransaction } from '@solana/web3.js'


// TODO - Compare my custom solution with the one they have here: https://github.com/Unboxed-Software/solana-send-sol-frontend/blob/main/components/SendSolForm.tsx

export const SolSender: FC = () => {

    const { connection } = useConnection();
	const { publicKey, sendTransaction } = useWallet();
    const [balance, setBalance] = useState(0);
    const [amountToSend, setAmountToSend] = useState('');
    const [recipentAddress, setRecipientAddress] = useState('');
    const [loading, setLoading] = useState(false);
    const [txnSig, setTxnSig] = useState('');


    useEffect(() => {
        if (!connection || !publicKey) return;

        connection.getBalance(publicKey, 'confirmed')
        .then(bal => {
            setBalance(bal / LAMPORTS_PER_SOL)
        })
    }, [connection, publicKey])

    useEffect(() => {

    })

    const onClick = (e) => {
        e.preventDefault();
        if (!connection || !publicKey) return;
        if (isNaN(+amountToSend)) {
            alert('Amount to send must be a number')
            return;
        }
        if (recipentAddress.length !== 44) {
            alert('recipient address must be 44 characters');
            return;
        }
        
        setLoading(true);
        const recipient = new PublicKey(recipentAddress);

        const transaction = new Transaction();
        const sendSolInstruction = SystemProgram.transfer({
            fromPubkey: publicKey,
            toPubkey: recipient,
            lamports: LAMPORTS_PER_SOL * (+amountToSend)
        })

        transaction.add(sendSolInstruction)

        sendTransaction(transaction, connection).then(sig => {
            console.log(`Transaction can be viewed at https://explorer.solana.com/tx/${sig}?cluster=devnet`)
            setTxnSig(sig);
            setLoading(false);
        })
    }

    return (
        <div style={{padding: '10vh 25vw', color: 'white'}}>
            <h1 style= {{margin: 10}}>Balance: {balance}</h1>
            <h1 style= {{margin: 10}}>Amount (in SOL) to send:</h1>
            <input style= {{margin: 10}} name='amount-input' key='amount-to-send' value={amountToSend} onChange={(event) => setAmountToSend(event.target.value)}></input>
            <h1 style= {{margin: 10}}>Send SOL to:</h1>
            <input style= {{margin: 10}} name='address-input' key='recipient-address' value={recipentAddress} onChange={(event) => setRecipientAddress(event.target.value)}></input>
            <br style= {{margin: 10}} />
            <button onClick={onClick} style= {{margin: 10, padding: '1em 2em'}}>Send</button>
            <h1>Check your transaction at the link below!</h1>
            {
                !loading && txnSig
                ? <a style={{color: 'white'}} href={`https://explorer.solana.com/tx/${txnSig}?cluster=devnet`}>Txn Link</a>
                : <h1>Waiting...</h1>
            }
        </div>
    )
}