"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/ui/button"; // Button from ShadCN
import { Plus, Edit, Trash } from "lucide-react"; // Icons for Edit and Delete
import { FaPlus } from "react-icons/fa";
import { Card } from "@/ui/card"; // Assuming you have a Card component
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const router = useRouter();

  useEffect(() => {
    // Fetching events data from an API (replace with your actual API)
    axios.get("http://localhost:3004/events").then((response) => {
      // console.log(response.data);
      setEvents(response.data);
    });
  }, []);

  const handleEdit = (eventId) => {
    router.push(`/edit-event/${eventId}`);
  };
  const onCardClick = (eventId) => {
    router.push(`event/${eventId}`);
  };

  const handleDelete = async (eventId) => {
    // if (!window.confirm("Are you sure you want to delete this event?")) return;

    try {
      await axios.delete(`http://localhost:3003/events/${eventId}`);
      setEvents(events.filter((event) => event.id !== eventId)); // Update UI
      alert("Event deleted successfully");
    } catch (error) {
      console.error("Error deleting event:", error);
      alert("Failed to delete event");
    }
  };

  return (
    <>
      <div className="w-full mt-8">
        <Link
          href={"/create-event"}
          className="inline-flex px-8 py-5 bg-cyan-300 text-white text-lg borde "
        >
          <span className="flex flex-col items-center relative top-1 mr-1">
            <FaPlus />
          </span>
          New Event
        </Link>
      </div>
      <div className="flex gap-6 m-8">
        {events.map((event) => (
          <Card
            key={event.id}
            className=" w-96 h-52 flex justify-between items-center p-4 drop-shadow-lg"
          >
            <div className="flex-grow" onClick={() => onCardClick(event.id)}>
              <h3 className="text-lg text-black">{event.title}</h3>
              <p className="text-sm text-gray-600">{event?.date}</p>
            </div>
            <div className="flex space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleEdit(event.id)}
                className="hover:bg-blue-200"
              >
                <Edit className="w-5 h-5 text-blue-500" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDelete(event.id)}
                className="hover:bg-red-200"
              >
                <Trash className="w-5 h-5 text-red-500" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}
