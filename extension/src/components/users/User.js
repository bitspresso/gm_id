import React, { useState } from "react";

function Skill({ name, xp }) {
  return (
    <div className="">
      <p>{name}:</p>
      <div className="relative w-full h-8 rounded-full border-2 border-solid border-black overflow-hidden">
        <div
          className={`absolute left-0 bg-black h-full`}
          style={{
            width: (xp / 1000) * 100,
          }}
        />
      </div>
    </div>
  );
}
export default function User({ data }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      {open && (
        <div className="absolute z-10 flex w-[350px] h-[550px] justify-center items-center top-0 left-0 text-black">
          <div className="relative w-[90%] h-[90%] bg-white rounded-xl p-4">
            <button
              className="absolute right-4 top-4"
              onClick={() => setOpen(false)}
            >
              <p>X</p>
            </button>
            <div className="flex flex-col items-center w-full h-full">
              <h2>{data.address}</h2>
              <img
                className="h-32 w-32 rounded-full"
                src={data.pfp}
                alt={data.address}
              />
              <div className="flex flex-wrap gap-2">
                {data.traits.map((el, i) => (
                  <div
                    key={`trait_holder_${i}`}
                    className="relative group w-16 h-16"
                  >
                    <img className="w-full h-full" src={el} alt="Trait" />
                    <div className="absolute bottom-0 left-0 w-full h-full bg-white group-hover:visible invisible">
                      <p className="">Name</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-col w-full">
                {data.skills.map((el, i) => (
                  <Skill key={`skill_${i}`} name={el.name} xp={el.xp} />
                ))}
              </div>
              <div className="absolute bottom-0 left-0 flex gap-2">
                {data.socials.map((el, i) => (
                  <a
                    key={`social_${i}`}
                    href={el.link}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      className="w-10 h-10"
                      src={
                        "https://imgs.search.brave.com/1fQWh1HTRWcKfQHLhg0KeQEAMeaeGDhSJbBrEYsen3g/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9naXRo/dWIuZ2l0aHViYXNz/ZXRzLmNvbS9pbWFn/ZXMvbW9kdWxlcy9s/b2dvc19wYWdlL0dp/dEh1Yi1NYXJrLnBu/Zw"
                      }
                      alt={el.name}
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      <button onClick={() => setOpen(true)} href="/">
        <div className="relative w-16 h-16 rounded-full overflow-hidden">
          <img className="" src={data.pfp} alt={data.address} />
        </div>
      </button>
    </>
  );
}
