import { fakeEvents } from "../../../mockData/fakeEvents";
import Link from "next/link";

function Event({ name, domain }) {
  return (
    <Link
      href={`/events/${domain}`}
      className="w-full rounded-xl px-4 py-2 flex justify-evenly border-2 border-solid border-white"
    >
      <p>{domain}</p>
      <p>{name}</p>
    </Link>
  );
}

export default function Events() {
  return (
    <div className="w-screen flex flex-col gap-4 items-center justify-center items-center">
      <h2>Events</h2>
      <div className="w-3/4 flex flex-col gap-2">
        {fakeEvents.map((el, i) => {
          return <Event key={`event_${i}`} name={el.name} domain={el.domain} />;
        })}
      </div>
    </div>
  );
}
