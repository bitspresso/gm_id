"use client";

import { useRouter } from "next/navigation";
import { metamaskContext } from "../contexts/metamaskContext";
import { useContext } from "react";
import beaver from "../../public/images/beaver.png";
import catto from "../../public/images/catto.png";
import Image from "next/image";

export default function Home() {
  const router = useRouter();
  const { metamaskAccounts, connectWallet } = useContext(metamaskContext);
  function checkConnection(func) {
    if (metamaskAccounts.length === 0) {
      connectWallet(() => {
        func();
      });
    } else {
      func();
    }
  }
  function create() {
    return router.push("/events/create");
  }
  function partecipate() {
    return router.push("/events");
  }
  return (
    <div className="flex flex-col align-center items-center gap-8 w-full ">
      <h2 className="text-center">Community-driven, event-focused identity</h2>
      <div className="grid grid-cols-2 w-full">
        <div className="group relative w-full h-80 flex justify-center items-center overflow-hidden">
          <Image
            className="absolute object-cover h-full grayscale group-hover:grayscale-0 transition-all"
            src={beaver}
            alt="Beaver"
          />
          <button className="relative" onClick={() => checkConnection(create)}>
            <p>[create]</p>
          </button>
        </div>
        <div className="group relative w-full h-80 flex justify-center items-center overflow-hidden">
          <Image
            className="group absolute object-cover h-full grayscale group-hover:grayscale-0 transition-all"
            src={catto}
            alt="Cat"
          />
          <button
            className="relative"
            onClick={() => checkConnection(partecipate)}
          >
            <p>[partecipate]</p>
          </button>
        </div>
      </div>
    </div>
  );
}
