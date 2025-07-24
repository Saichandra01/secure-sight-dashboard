"use client";

import { useEffect, useState } from "react";

interface Camera {
  id: number;
  name: string;
  location: string;
}

interface Incident {
  id: number;
  cameraId: number;
  type: string;
  tsStart: string;
  tsEnd: string;
  thumbnailUrl: string;
  resolved: boolean;
}

export default function Home() {
  const [cameras, setCameras] = useState<Camera[]>([]);
  const [incidents, setIncidents] = useState<Incident[]>([]);

  // Fetch cameras and incidents
  useEffect(() => {
    fetch("/api/cameras")
      .then((res) => res.json())
      .then(setCameras);

    fetch("/api/incidents")
      .then((res) => res.json())
      .then(setIncidents);
  }, []);

  // Mark incident as resolved
  const resolveIncident = async (id: number) => {
    await fetch(`/api/incidents/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ resolved: true }),
    });

    // Update UI after resolve
    setIncidents((prev) =>
      prev.map((i) => (i.id === id ? { ...i, resolved: true } : i))
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Secure Sight Dashboard</h1>

      {/* Cameras Section */}
      <h2 className="text-xl font-semibold mb-4">Cameras</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {cameras.map((cam) => (
          <div key={cam.id} className="p-4 bg-white rounded shadow">
            <h3 className="text-lg font-bold">{cam.name}</h3>
            <p className="text-gray-600">{cam.location}</p>
          </div>
        ))}
      </div>

      {/* Incidents Section */}
      <h2 className="text-xl font-semibold mb-4">Recent Incidents</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {incidents.map((incident) => (
          <div key={incident.id} className="p-4 bg-white rounded shadow">
            <img
              src={incident.thumbnailUrl}
              alt="Thumbnail"
              className="w-full h-40 object-cover rounded mb-4"
            />
            <p className="font-bold">{incident.type}</p>
            <p className="text-sm text-gray-500">
              {new Date(incident.tsStart).toLocaleString()} -{" "}
              {new Date(incident.tsEnd).toLocaleString()}
            </p>
            <p
              className={`mt-2 font-semibold ${
                incident.resolved ? "text-green-600" : "text-red-600"
              }`}
            >
              {incident.resolved ? "Resolved" : "Unresolved"}
            </p>
            {!incident.resolved && (
              <button
                onClick={() => resolveIncident(incident.id)}
                className="mt-3 bg-blue-500 text-white px-4 py-2 rounded"
              >
                Resolve
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
