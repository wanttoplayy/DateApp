"use client";
import { useState } from "react";
import Image from "next/image";
import PattayaCafe from "public/images/cafePattaya.jpg";
import BlueSpace from "public/images/BlueSpaceCafe.jpg";
import Travel from "public/images/travel.jpg";
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
      name: "Pattaya",
      schedule: [
        {
          time: "10-12am",
          activity: "Travel to Pattaya",
          imageUrl: Travel,
        },
        {
          time: "12-1.30pm",
          activity: "Good Old Sea Cafe",
          imageUrl: PattayaCafe,
          linkUrl: "https://www.facebook.com/goodoldsea/",
        },
        {
          time: "2-3.30pm",
          activity: "Blue Space Cafe",
          imageUrl: BlueSpace,
          linkUrl: "https://www.facebook.com/bluespacecafe/",
        },
      ],
    },
    {
      name: "Bangkok",
      schedule: [
        // {
        //   time: "10-11am",
        //   activity: "Arrive in Bangkok",
        //   imageUrl: "path_to_bangkok_image1.jpg",
        // },
        // {
        //   time: "11-12pm",
        //   activity: "Visit Temple",
        //   imageUrl: "path_to_bangkok_image2.jpg",
        // },
        // {
        //   time: "12-1pm",
        //   activity: "Lunch at Riverside",
        //   imageUrl: "path_to_bangkok_image3.jpg",
        // },
        // {
        //   time: "1-2pm",
        //   activity: "Shopping at MBK",
        //   imageUrl: "path_to_bangkok_image4.jpg",
        // },
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
                className="bg-white rounded-lg shadow-md p-4 transition-transform transform hover:scale-105 hover:bg-pink-100"
                onClick={() => setSelectedLocationName(location.name)}
              >
                <h2 className="text-2xl font-semibold text-[#2b2d42]">
                  {location.name}
                </h2>
              </button>
            ))}
          </div>
        ) : (
          <>
            <button
              onClick={() => setSelectedLocationName(null)}
              className="self-start mb-4 bg-white py-1 px-3 rounded-full shadow-md text-[#2b2d42] hover:bg-pink-100 transition-colors"
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
                      <h3 className="text-xl font-semibold mb-2 text-[#2b2d42]">
                        {entry.time}
                      </h3>
                      <input
                        type="text"
                        value={entry.activity}
                        onChange={(e) =>
                          handleActivityChange(e, selectedLocationName, idx)
                        }
                        className="border rounded-md p-2 w-60 focus:border-2 focus:ring-2 focus:ring-indigo-200 shadow-md bg-white placeholder-[#2b2d42]"
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
