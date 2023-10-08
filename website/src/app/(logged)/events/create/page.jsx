"use client";

function CustomInput({ label, setText }) {
  return (
    <div className="relative">
      <p className="absolute left-5 text-black text-sm font-bold">{label}</p>
      <input
        className="w-full h-full px-5 pt-5 pb-2 rounded-xl text-black"
        type="text"
      />
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
        <CustomInput label={"Tags"} />
        <button onClick={create}>
          <p>Start The Event!</p>
        </button>
      </div>
    </div>
  );
}
