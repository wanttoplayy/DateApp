"use client";
import { useState } from "react";
import Image from "next/image";
import PattayaCafe from "public/images/cafePattaya.jpg";
import BlueSpace from "public/images/BlueSpaceCafe.jpg";
import Travel from "public/images/travel.jpg";
import safariworld from "public/images/safariworld.jpg";
import chinatown from "public/images/chinatown.jpg";
import { Roboto, Raleway } from "next/font/google";

const roboto = Raleway({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

export default function DatePlan() {
  const initialLocations = [
    {
      name: "Bangkok",
      schedule: [
        {
          time: "13.00-18.00",
          activity: "Safari World",
          imageUrl: safariworld,
          linkUrl: "https://safariworld.com/365/",
        },
        {
          time: "18.00-21.00",
          activity: "เยาวราช",
          imageUrl: chinatown,
        },
      ],
    },
    {
      name: "Pattaya",
      schedule: [
        {
          time: "12.00-14.00",
          activity: "Go to Pattaya",
          imageUrl: Travel,
        },
        {
          time: "14.00-15.30",
          activity: "Good Old Sea Cafe",
          imageUrl: PattayaCafe,
          linkUrl: "https://www.facebook.com/goodoldsea/",
        },
        {
          time: "15.30-17.00",
          activity: "Blue Space Cafe",
          imageUrl: BlueSpace,
          linkUrl: "https://www.facebook.com/bluespacecafe/",
        },
        {
          time: "17.00-19.00",
          activity: "To be define",
        },
        {
          time: "19.00-21.00",
          activity: "Back to Bangkok",
          imageUrl: Travel,
        },
      ],
    },
  ];

  const [locations, setLocations] = useState(initialLocations);
  const [selectedLocationName, setSelectedLocationName] = useState(null);

  const handleActivityChange = (event, locationName, entryIndex) => {
    const newActivity = event.target.value;
    setLocations((prev) => {
      const newLocations = [...prev];
      const locIndex = newLocations.findIndex((l) => l.name === locationName);
      newLocations[locIndex].schedule[entryIndex].activity = newActivity;
      return newLocations;
    });
  };

  return (
    <>
      <div
        className="flex flex-col items-center justify-center min-h-screen px-4 space-y-6 bg-gradient-to-br from-[#f1faee] to-[#f5ebe0] font-serif"
        style={roboto.style}
      >
        <h1 className="text-4xl font-bold text-[#023e8a]">
          Choose a Date Location
        </h1>

        {!selectedLocationName ? (
          <div className="grid grid-cols-1 gap-6 w-full max-w-xl">
            {locations.map((location, index) => (
              <button
                key={index}
                className="bg-white rounded-lg shadow-md p-4 transition-transform transform hover:scale-105 hover:bg-white"
                onClick={() => setSelectedLocationName(location.name)}
              >
                <h2 className="text-2xl font-semibold text-black">
                  {location.name}
                </h2>
              </button>
            ))}
          </div>
        ) : (
          <>
            <button
              onClick={() => setSelectedLocationName(null)}
              className="self-start mb-4 bg-white py-1 px-3 rounded-full shadow-md text-[#023e8a] hover:bg-pink-100 transition-colors"
            >
              ← Go back
            </button>

            {locations
              .find((loc) => loc.name === selectedLocationName)
              .schedule.map((entry, idx) => (
                <div key={idx} className="mb-4 pb-3">
                  <div className="flex items-start space-x-4">
                    <div>
                      {entry.linkUrl ? (
                        <a
                          href={entry.linkUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-decoration-none"
                        >
                          <Image
                            src={entry.imageUrl}
                            alt={entry.activity}
                            className="rounded-lg cursor-pointer"
                            width={250}
                            height={250}
                          />
                        </a>
                      ) : (
                        <Image
                          src={entry.imageUrl}
                          alt={entry.activity}
                          className="rounded-lg"
                          width={250}
                          height={250}
                        />
                      )}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2 text-[#023e8a]">
                        {entry.time}
                      </h3>
                      <input
                        type="text"
                        value={entry.activity}
                        onChange={(e) =>
                          handleActivityChange(e, selectedLocationName, idx)
                        }
                        className="border rounded-md p-2 w-60 text-[#023e8a] focus:border-2 focus:ring-2 focus:ring-indigo-200 shadow-md bg-white placeholder-[#2b2d42]"
                        placeholder="Enter activity..."
                      />
                    </div>
                  </div>
                </div>
              ))}
          </>
        )}
      </div>
    </>
  );
}
