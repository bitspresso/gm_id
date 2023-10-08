"use client";

import { beautifyWallet } from "../../../common/commonFunctions";
import { metamaskContext } from "../../../contexts/metamaskContext";
import { fakeUser } from "../../../mockData/fakeUser";
import { useContext, useState } from "react";
import TraitsTable from "../../../components/common/traitsTable";

function InputField({ type, defaultValue, defaultKey }) {
  const [active, setActive] = useState(false);
  const [show, setShow] = useState(true);
  return (
    show && (
      <div className="relative rounded-xl overflow-hidden">
        <input
          defaultValue={defaultKey}
          className="px-3 py-1 text-black w-full"
          type="text"
          onFocus={() => setActive(true)}
          onBlur={() => setActive(false)}
        />
        {type === "active" ? (
          <button
            className="absolute top-1 right-3 text-black"
            onClick={() => {
              setShow(false);
            }}
          >
            <p>X</p>
          </button>
        ) : (
          <button
            className="absolute top-1 right-3 text-black"
            onClick={() => {
              setShow(true);
            }}
          >
            <p>Y</p>
          </button>
        )}
      </div>
    )
  );
}
export default function UserPage() {
  const { metamaskAccounts } = useContext(metamaskContext);
  console.log(fakeUser);
  return (
    <div className="flex flex-col gap-4">
      <h2>Gm, {beautifyWallet(metamaskAccounts[0])}</h2>
      <div className="flex flex-col gap-2">
        <p>Your current skills:</p>
        {Object.keys(fakeUser.skills).map((el, i) => (
          <InputField
            key={`skill_${i}`}
            type={"active"}
            defaultKey={el}
            defaultValue={fakeUser.skills[el]}
          />
        ))}
        <InputField type={"inactive"} />
      </div>
      <div className="flex flex-col gap-4">
        <p>Your current traits:</p>
        <TraitsTable />
      </div>
    </div>
  );
}
