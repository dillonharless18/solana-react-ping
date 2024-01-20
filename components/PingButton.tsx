import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { WalletModal, WalletModalButton } from "@solana/wallet-adapter-react-ui";
import { Button } from "@solana/wallet-adapter-react-ui/lib/types/Button";
import { Connection, PublicKey, Transaction, TransactionInstruction } from "@solana/web3.js"
import { FC } from "react"


export const PingButton: FC = () => {

	const { connection } = useConnection();
	const { publicKey, sendTransaction } = useWallet()

	
	const onClick = () => {
		if (!connection || !publicKey) {
			return;
		}

		const pingProgram = new PublicKey("ChT1B39WKLS8qUrkLvFDXMhEJ4F1XZzwUNHUt4AU9aVa");
		const pingDataAccount = new PublicKey("Ah9K7dQ8EHaZqcAsgBW8w37yN2eAy3koFmUn4x3CJtod");
		
		const transaction = new Transaction();

		const instruction = new TransactionInstruction({
			keys: [
				{
					pubkey: pingDataAccount,
					isSigner: false,
					isWritable: true
				}
			],
			programId: pingProgram
		})
	
		transaction.add(instruction)
		sendTransaction(transaction, connection).then(sig => {
			console.log(`Transaction can be viewed at https://explorer.solana.com/tx/${sig}?cluster=devnet`)
		})

	}

	return (<div>
		<button style={{padding: '1em 2em', backgroundColor: 'white', borderRadius: 10}} onClick={onClick}>Ping!</button>
	</div>)

}

