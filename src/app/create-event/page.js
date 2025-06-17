"use client";
import { useState } from "react";
import axios from "axios";
import { Textarea } from "@/ui/textarea";
import { Label } from "@/ui/label";
import { Input } from "@/ui/input";
import { Button } from "@/ui/button";

export default function CreateEvent() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    price: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:3004/events",
        formData
      );
      alert("Event created successfully");
      window.location.href = "/events";
    } catch (err) {
      setError("Failed to create event");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-5 p-8 shadow-lg shadow-blue-400">
      <h1 className="text-3xl font-bold text-center mb-8">Create New Event</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="title">Event Title</Label>
          <Input
            id="title"
            name="title"
            type="text"
            value={formData.title}
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
            value={formData.description}
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
            value={formData.date}
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
            value={formData.location}
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
            value={formData.price}
            onChange={handleChange}
            placeholder="Event Price"
            required
          />
        </div>

        {error && <div className="text-red-500 text-center">{error}</div>}

        <Button
          type="submit"
          disabled={loading}
          className={`w-full m-4 bg-blue-500`}
        >
          {loading ? "Creating..." : "Create Event"}
        </Button>
      </form>
    </div>
  );
}
