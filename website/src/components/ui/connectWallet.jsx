"use client";

import Link from "next/link";
import { metamaskContext } from "../../contexts/metamaskContext";
import { useContext } from "react";
import { beautifyWallet } from "../../common/commonFunctions";

export default function ConnectWallet() {
  const { metamaskAccounts, setMetamaskAccounts, hasMetamask, connectWallet } =
    useContext(metamaskContext);
  return metamaskAccounts.length === 0 ? (
    <button
      onClick={connectWallet}
      className="h-min py-2 px-8 rounded-xl border-2 border-solid border-white flex justify-center items-center"
    >
      <p className="text-white">Connect Wallet</p>
    </button>
  ) : (
    <Link
      href="/user"
      className="h-min absolute top-4 right-4 py-2 px-8 rounded-xl border-2 border-solid border-white flex justify-center items-center"
    >
      <p className="text-white">{beautifyWallet(metamaskAccounts[0])}</p>
    </Link>
  );
}
