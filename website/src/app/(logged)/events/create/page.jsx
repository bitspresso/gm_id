"use client";

import { useState } from "react";

function CustomInput({ label, setText, type }) {
  const [value, setValue] = useState("");
  const [vals, setVals] = useState([]);
  return (
    <div className="relative">
      <p className="absolute left-5 text-black text-sm font-bold">{label}</p>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === " ") {
            setVals([...vals, value.split(" ")]);
            setValue("");
          }
        }}
        className={`w-full h-full px-5 pt-5 ${
          type === "array" ? "pb-5" : "pb-2"
        } rounded-xl text-black`}
        type="text"
      />
      <div className="absolute bottom-0 left-4 text-black flex gap-1">
        {type === "array" &&
          vals.map((el, i) => {
            return <div key={`val_${i}`}>{el}</div>;
          })}
      </div>
    </div>
  );
}

export default function CreateEvent() {
  function create() {}

  return (
    <div className="flex items-center flex-col gap-8 text-center">
      <h2>Welcome to the event creation page!</h2>
      <div className="flex flex-col gap-4 max-w-[min(500px,50%)]">
        <CustomInput label={"Name"} />
        <CustomInput label={"Description"} />
        <CustomInput label={"Domain"} />
        <CustomInput label={"Tags"} type="array" />
        <CustomInput label={"Set Of Traits"} type="array" />
        <button onClick={create}>
          <p>Start The Event!</p>
        </button>
      </div>
    </div>
  );
}
