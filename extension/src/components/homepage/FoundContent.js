import React from "react";
import User from "../users/User";

export default function FoundContent({ domain, tabId, data }) {
  console.log(data);
  /* global chrome */
  function save(res) {
    let challenges = {};
    chrome.storage.local.get("challenges", function (data) {
      challenges = data;
      console.log(data);
    });
    challenges[domain] = res;
    chrome.storage.local.set(
      {
        challenges: JSON.stringify({
          ...challenges,
        }),
      },
      function () {
        if (chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError);
        } else {
          console.log("Data stored successfully");
          chrome.action.setBadgeText({ text: "", tabId: tabId });
          if (res) {
            chrome.tabs.create({
              url: `http://localhost:3000/events/${domain}`,
            });
          } else {
            window.close();
          }
        }
      }
    );
  }
  return (
    <div className="flex flex-col gap-4">
      <p className="text-yellow">An active challenge detected</p>
      <p>{data.description}</p>
      <div className="flex justify-center flex-wrap justify-start gap-4 p-2 max-h-40 overflow-auto">
        {data.partecipants.map((el, i) => (
          <User key={`user_${i}`} data={el} />
        ))}
      </div>
      <div>
        <p>Event traits:</p>
        <p className="text-yellow">
          [{data.tagsMatched.map((el, i) => `${i !== 0 ? ", " : ""}${el}`)}]
        </p>
      </div>
      <div className="flex flex-col gap-3">
        <p className="text-yellow">Are you in?</p>
        <div className="flex justify-evenly">
          <button onClick={() => save(true)}>
            <p>Accept</p>
          </button>
          <button onClick={() => save(false)}>
            <p>Reject</p>
          </button>
        </div>
      </div>
    </div>
  );
}
