"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { Textarea } from "@/ui/textarea";
import { Label } from "@/ui/label";
import { Input } from "@/ui/input";
import { Button } from "@/ui/button";

export default function EditEvent() {
  const { id } = useParams();
  const router = useRouter();
  const [event, setEvent] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    price: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    async function fetchEventData() {
      try {
        const response = await axios.get(`http://localhost:3004/events/${id}`);
        console.log(response.data);
        setEvent(response.data);
      } catch (err) {
        setError("Failed to load event data");
      } finally {
        setLoading(false);
      }
    }

    fetchEventData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvent((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await axios.put(`http://localhost:3001/events/${id}`, event);
      alert("Event updated successfully");
      router.push("/events");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to update event");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="max-w-xl mx-auto p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Edit Event</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="title">Event Title</Label>
          <Input
            id="title"
            name="title"
            type="text"
            value={event.title}
            onChange={handleChange}
            placeholder="Event Title"
            required
          />
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            value={event.description}
            onChange={handleChange}
            placeholder="Event Description"
            required
          />
        </div>

        <div>
          <Label htmlFor="date">Event Date</Label>
          <Input
            id="date"
            name="date"
            type="date"
            value={event.date}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            name="location"
            type="text"
            value={event.location}
            onChange={handleChange}
            placeholder="Event Location"
            required
          />
        </div>

        <div>
          <Label htmlFor="price">Price</Label>
          <Input
            id="price"
            name="price"
            type="number"
            value={event.price}
            onChange={handleChange}
            placeholder="Event Price"
            required
          />
        </div>

        {error && <div className="text-red-500 text-center">{error}</div>}

        <Button type="submit" disabled={loading} className="w-full mt-4">
          {loading ? "Updating..." : "Update Event"}
        </Button>
      </form>
    </div>
  );
}
