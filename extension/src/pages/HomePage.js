import React, { useEffect, useState } from "react";
import FoundContent from "../components/homepage/FoundContent";
import NotFoundContent from "../components/homepage/NotFoundContent";
import { fakeChallenge } from "../mockData/fakeChallenge";
import { normalizeUrl } from "../common/commonFunctions";

export default function HomePage() {
  const [found, setFound] = useState(false);
  const [currentTab, setCurrentTab] = useState({
    url: "",
    tabId: 0,
  });

  /* global chrome */
  useEffect(() => {
    if (chrome && chrome.tabs) {
      // Query current page
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        if (tabs && tabs[0]) {
          console.log(tabs[0]);
          setCurrentTab({
            url: normalizeUrl(tabs[0].url),
            tabId: tabs[0].id,
          });
        }
      });
      // Add page change event listener
      chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
        if (changeInfo.status === "complete") {
          setCurrentTab({
            url: normalizeUrl(tab.url),
            tabId: tabId,
          });
        }
      });
    }
  }, []);
  useEffect(() => {
    const fetchResult = true;
    // Fetch currentTab from backend
    setFound(fetchResult);
  }, [currentTab]);
  useEffect(() => {
    console.log("Updated CurrentTab", currentTab);
  }, [currentTab]);
  return (
    <div className="flex flex-col gap-4 items-center justify-center text-3xl font-bold w-[350px] h-[550px] bg-black text-white text-center overflow-auto">
      <div>
        <h2 className="break-all">
          Currently browsing: <br />{" "}
          {currentTab.url ? currentTab.url : "<page>"}
        </h2>
      </div>
      {found ? (
        <FoundContent
          domain={currentTab.url}
          tabId={currentTab.tabId}
          data={fakeChallenge}
        />
      ) : (
        <NotFoundContent />
      )}
    </div>
  );
}
