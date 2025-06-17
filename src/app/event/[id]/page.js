"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/ui/button";

export default function EventDetail({ params }) {
  const { id } = params;
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchEvent() {
      try {
        const response = await axios.get(`http://localhost:3004/events/${id}`);
        setEvent(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load event");
        setLoading(false);
      }
    }
    fetchEvent();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="max-w-3xl mt-5 mx-auto p-8 shadow-lg shadow-blue-400">
      <h1 className="text-4xl font-bold text-center mb-8">{event.title}</h1>

      <div className="space-y-6">
        <p className="text-xl text-gray-800">{event.description}</p>
        <p className="text-lg text-gray-600">Date: {event.date}</p>
        <p className="text-lg text-gray-600">Location: {event.location}</p>
        <p className="text-lg text-gray-600">Price: ${event.price}</p>
      </div>

      <div className="mt-8 text-center">
        <Button
          onClick={() => (window.location.href = `/edit-event/${event.id}`)}
          className="mr-4 bg-yellow-300"
        >
          Edit Event
        </Button>
        <Button
          onClick={() => (window.location.href = "/events")}
          className="bg-red-300"
        >
          Back to Events
        </Button>
      </div>
    </div>
  );
}
