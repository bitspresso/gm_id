"use client";

import { beautifyWallet } from "../../../../common/commonFunctions";
import { metamaskContext } from "../../../../contexts/metamaskContext";
import { useContext, useState } from "react";
import TraitsTable from "../../../../components/common/traitsTable";
import { fakeChallenge } from "../../../../mockData/fakeChallenge";
import User from "../../../../components/common/user";
import { abis, addresses } from "../../../../common/contracts";

function EventInfo({ data }) {
  console.log(data);
  const { metamaskAccounts } = useContext(metamaskContext);

  function register() {
    /*const contract = new web3.eth.Contract(abis.register, addresses.register);
    const data = "0x1234567890";
    contract.methods
      .propagate(data)
      .send({
        from: metamaskAccounts[0],
      })
      .then((res) => console.log(res));
      */
  }
  return (
    <div className="flex flex-col gap-4 items-center justify-center text-3xl font-bold w-full h-full text-white text-center ">
      <div>
        <h2 className="break-all">
          Current event:
          <br /> {data.name} @ {data.domain}
        </h2>
      </div>
      <p>An active challenge was found</p>
      <p>{data.description}</p>
      <div className="grid grid-cols-4 justify-center flex-wrap justify-start gap-4 bg-black p-2">
        {data.partecipants?.map((el, i) => (
          <User key={`user_${i}`} data={el} />
        ))}
      </div>
      <div>
        <p>Tags matched:</p>
        <p>[{data.tags?.map((el, i) => `${i !== 0 ? ", " : ""}${el}`)}]</p>
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex justify-evenly">
          <button onClick={register}>
            <p>Proceed</p>
          </button>
        </div>
      </div>
    </div>
  );
}

function ChoseTraits({ name, setChosenTraits }) {
  const { metamaskAccounts } = useContext(metamaskContext);
  return (
    <div className="flex flex-col items-center gap-4">
      <h2>Gm {beautifyWallet(metamaskAccounts[0])}</h2>
      <p>{name} matches the following traits:</p>
      <TraitsTable />
      <button onClick={() => setChosenTraits({ hello: "world" })}>
        <p>Confirm</p>
      </button>
    </div>
  );
}

export default function Event() {
  const [chosenTraits, setChosenTraits] = useState({});
  return (
    <div className="flex flex-col items-center justify-center">
      {JSON.stringify(chosenTraits) !== "{}" ? (
        <EventInfo data={fakeChallenge} />
      ) : (
        <ChoseTraits
          name={fakeChallenge.name}
          setChosenTraits={setChosenTraits}
        />
      )}
    </div>
  );
}
