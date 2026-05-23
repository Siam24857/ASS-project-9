"use client";
import React, { useState } from "react";
import { Button, Input, Label, TextArea } from "@heroui/react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_URL } from "../lib/config";
import { useRouter } from "next/navigation";
import { authClient } from "../lib/auth-client";

const Alladdromms = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const onsubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        const amenities = formData.getAll("amenities");
        const rooomid = Math.floor(Math.random() * 1000000);
        
        const finalData = {
            roomID: rooomid,
            roomName: data.roomName?.trim(),
            description: data.description?.trim(),
            image: data.image?.trim(),
            floor: data.floor?.trim(),
            capacity: parseInt(data.capacity) || 0,
            rate: data.rate?.trim(),
            amenities: amenities,
            bookings: parseInt(data.bookings) || 0,
            createdAt: new Date().toISOString()
        };

        if (!finalData.roomName) {
            toast.error("Room name is required");
            setIsLoading(false);
            return;
        }

        if (!finalData.image) {
            toast.error("Image URL is required");
            setIsLoading(false);
            return;
        }

        try {
            const { data, error } = await authClient.token();
            console.log(data);

            const [addRoomRes, addListedRes] = await Promise.all([
                fetch(`${API_URL}/add-rooms`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        authorization: `Bearer ${data.token}`,
                    },
                    credentials: 'include',
                    body: JSON.stringify(finalData),
                }),
                fetch(`${API_URL}/listed-room-add`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        authorization: `Bearer ${data.token}`,
                    },
                    credentials: 'include',
                    body: JSON.stringify(finalData),
                }),
            ]);

            if (addRoomRes.status === 401 || addListedRes.status === 401) {
                toast.error("Session expired. Please login again.");
                setIsLoading(false);
                return;
            }

            const addRoomBody = addRoomRes.ok ? await addRoomRes.json().catch(() => null) : await addRoomRes.text().catch(() => null);
            const addListedBody = addListedRes.ok ? await addListedRes.json().catch(() => null) : await addListedRes.text().catch(() => null);

            if (addRoomRes.ok && addListedRes.ok) {
                toast.success("Room Added Successfully!", {
                    position: "top-center",
                    autoClose: 3000,
                });
                e.target.reset();
                const checkboxes = e.target.querySelectorAll('input[type="checkbox"]');
                checkboxes.forEach(cb => cb.checked = false);
                
                setTimeout(() => {
                    router.push("/my-listroom");
                }, 2000);
            } else {
                console.error("Add room error:", { 
                    addRoomResStatus: addRoomRes.status, 
                    addRoomBody, 
                    addListedResStatus: addListedRes.status, 
                    addListedBody 
                });
                const msg = addRoomBody?.error || addListedBody?.error || addRoomBody || addListedBody || "Failed to Add Room. Please try again.";
                toast.error(msg.toString());
            }
        } catch (err) {
            console.error("Server error:", err);
            toast.error("Network error. Please check if the server is running.");
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <div className="min-h-screen bg-gray-950">
            <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-6 md:py-8 lg:py-10">
                <form
                    onSubmit={onsubmit}
                    className="w-full max-w-2xl mx-auto bg-gray-900 text-white rounded-2xl shadow-xl transition-all duration-300"
                    style={{
                        padding: 'clamp(1.5rem, 5vw, 2rem)'
                    }}
                >
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 md:mb-8">
                        🏠 Add New Room
                    </h2>

                    <div className="space-y-4 sm:space-y-5 md:space-y-6">
                        {/* Room Name */}
                        <div>
                            <Label className="text-sm sm:text-base">Room Name *</Label>
                            <Input 
                                name="roomName" 
                                placeholder="e.g. Research Lab Suite"
                                required
                                className="mt-1 text-gray-300"
                                classNames={{
                                    input: "text-sm sm:text-base",
                                }}
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <Label className="text-sm sm:text-base">Description</Label>
                            <TextArea 
                                name="description" 
                                placeholder="Describe the room..." 
                                className="mt-1"
                                classNames={{
                                    input: "text-sm sm:text-base",
                                }}
                            />
                        </div>

                        {/* Initial Bookings */}
                        <div>
                            <Label className="text-sm sm:text-base">Initial Bookings</Label>
                            <Input 
                                name="bookings" 
                                type="number" 
                                placeholder="0"
                                min="0"
                                className="mt-1 text-gray-300"
                                classNames={{
                                    input: "text-sm sm:text-base",
                                }}
                            />
                        </div>

                        {/* Image URL */}
                        <div>
                            <Label className="text-sm sm:text-base">Image URL *</Label>
                            <Input 
                                name="image" 
                                placeholder="https://example.com/room-image.jpg"
                                required
                                className="mt-1 text-gray-300"
                                classNames={{
                                    input: "text-sm sm:text-base",
                                }}
                            />
                        </div>

                        {/* Grid Fields - Responsive layout */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                            <div>
                                <Label className="text-sm sm:text-base">Floor</Label>
                                <Input 
                                    name="floor" 
                                    placeholder="e.g., 5th Floor" 
                                    className="mt-1 text-gray-300"
                                    classNames={{
                                        input: "text-sm sm:text-base",
                                    }}
                                />
                            </div>

                            <div>
                                <Label className="text-sm sm:text-base">Capacity (people)</Label>
                                <Input 
                                    name="capacity" 
                                    type="number"
                                    placeholder="6"
                                    min="1"
                                    className="mt-1 text-gray-300"
                                    classNames={{
                                        input: "text-sm sm:text-base",
                                    }}
                                />
                            </div>

                            <div>
                                <Label className="text-sm sm:text-base">Rate</Label>
                                <Input 
                                    name="rate" 
                                    placeholder="$16/hr" 
                                    className="mt-1 text-gray-300"
                                    classNames={{
                                        input: "text-sm sm:text-base",
                                    }}
                                />
                            </div>
                        </div>

                        {/* Amenities - Responsive grid */}
                        <div>
                            <Label className="text-sm sm:text-base mb-2 block">Amenities</Label>
                            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3 text-sm sm:text-base">
                                <label className="flex items-center gap-2 cursor-pointer hover:bg-gray-800 p-1 rounded transition-colors">
                                    <input type="checkbox" name="amenities" value="Whiteboard" className="w-4 h-4" /> 
                                    <span>Whiteboard</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer hover:bg-gray-800 p-1 rounded transition-colors">
                                    <input type="checkbox" name="amenities" value="Projector" className="w-4 h-4" /> 
                                    <span>Projector</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer hover:bg-gray-800 p-1 rounded transition-colors">
                                    <input type="checkbox" name="amenities" value="Wi-Fi" className="w-4 h-4" /> 
                                    <span>Wi-Fi</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer hover:bg-gray-800 p-1 rounded transition-colors">
                                    <input type="checkbox" name="amenities" value="Power Outlets" className="w-4 h-4" /> 
                                    <span>Power Outlets</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer hover:bg-gray-800 p-1 rounded transition-colors">
                                    <input type="checkbox" name="amenities" value="Quiet Zone" className="w-4 h-4" /> 
                                    <span>Quiet Zone</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer hover:bg-gray-800 p-1 rounded transition-colors">
                                    <input type="checkbox" name="amenities" value="Air Conditioning" className="w-4 h-4" /> 
                                    <span>Air Conditioning</span>
                                </label>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-semibold py-2 sm:py-3 text-sm sm:text-base transition-all duration-200"
                        >
                            {isLoading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    Adding Room...
                                </span>
                            ) : "Add Room"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Alladdromms;