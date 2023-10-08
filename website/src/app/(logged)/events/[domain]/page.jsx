"use client";

import { beautifyWallet } from "../../../../common/commonFunctions";
import { metamaskContext } from "../../../../contexts/metamaskContext";
import { useContext, useState } from "react";
import TraitsTable from "../../../../components/common/traitsTable";
import { fakeEvents } from "../../../../mockData/fakeEvents";
import User from "../../../../components/common/user";

function EventInfo({ name, domain, description, partecipants, tags }) {
  return (
    <div className="flex flex-col gap-4 items-center justify-center text-3xl font-bold w-[350px] h-[550px] bg-[#d3e298] text-black text-center overflow-auto">
      <div>
        <h2 className="break-all">
          Current event: {name} @ {domain}
        </h2>
      </div>
      <p>An active challenge was found</p>
      <p>{description}</p>
      <div className="flex justify-center flex-wrap justify-start gap-4 bg-black p-2 max-h-40 overflow-auto">
        {partecipants?.map((el, i) => (
          <User key={`user_${i}`} data={el} />
        ))}
      </div>
      <div>
        <p>Tags matched:</p>
        <p>[{tags?.map((el, i) => `${i !== 0 ? ", " : ""}${el}`)}]</p>
      </div>
      <div className="flex flex-col gap-3">
        <p>Confirm?</p>
        <div className="flex justify-evenly">
          <button onClick={() => {}}>
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
    <div>
      <h2>Gm {beautifyWallet(metamaskAccounts[0])}</h2>
      <p>{name} matches</p>
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
        <EventInfo />
      ) : (
        <ChoseTraits
          name={fakeEvents[0].name}
          traits={fakeEvents[0].traits}
          setChosenTraits={setChosenTraits}
        />
      )}
    </div>
  );
}
