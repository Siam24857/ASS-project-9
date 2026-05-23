"use client";
import { Button, Input, Label, Modal, TextArea } from "@heroui/react";
import { Rocket } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { BsFillPeopleFill } from "react-icons/bs";
import { TfiMoney } from "react-icons/tfi";
import { toast } from "react-toastify";
import { authClient } from "@/app/lib/auth-client";

const Alllistindrooms = ({ da }) => {
  const router = useRouter();
  
  const {
    _id,
    roomID,
    roomName,
    description,
    image,
    floor,
    capacity,
    rate,
    bookings,
    amenities = [],
  } = da || {};
  
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const onsubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const amenitiesList = formData.getAll("amenities");

    const finalData = {
      roomName: data.roomName,
      description: data.description,
      image: data.image,
      floor: data.floor,
      capacity: parseInt(data.capacity) || 0,
      rate: data.rate,
      amenities: amenitiesList,
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
      
      if (error || !data?.token) {
        toast.error("Authentication failed. Please login again.");
        setIsLoading(false);
        return;
      }
      
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/listed/${_id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json", 
          authorization: `Bearer ${data.token}`,
        },
        body: JSON.stringify(finalData)
      });
     
      const datas = await res.json();

      const ress = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/rooms/${roomID}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${data.token}`
        },
        body: JSON.stringify(finalData)
      });
      
      const datase = await ress.json();

      if (datase.modifiedCount > 0 || datas.modifiedCount > 0) {
        toast.success("Room updated successfully");
        setIsEditModalOpen(false);
        router.push("/my-listroom");
        router.refresh();
      } else {
        toast.error("Failed to update room");
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error("An error occurred while updating");
    } finally {
      setIsLoading(false);
    }
  };

  const onDelete = async () => {
    if (!confirm("Are you sure you want to delete this room?")) {
      return;
    }
    
    try {
      const { data, error } = await authClient.token();
      const token = data?.token || error?.token;
      
      if (!token) {
        toast.error("Authentication failed. Please login again.");
        router.push("/login");
        return;
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/listed/${_id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      });

      const result = await res.json();
      
      if (res.ok) {
        toast.success("Room deleted successfully");
        router.push("/my-listroom");
        router.refresh();
      } else {
        toast.error(result.message || "Delete failed");
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("An error occurred while deleting");
    }
  };

  return (
    <>
      <div className="w-full max-w-sm mx-auto sm:mx-0 bg-[#111827] rounded-xl sm:rounded-2xl shadow-lg overflow-hidden border border-gray-800">
        <div className="relative w-full h-40 sm:h-48">
          <Image
            src={image || "https://images.unsplash.com/photo-1521737604893-d14cc237f11d"}
            alt={roomName || "room"}
            fill
            className="object-cover"
          />
          <span className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-white text-black text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md font-semibold">
            ${rate || 0}/hr
          </span>
        </div>

        <div className="p-3 sm:p-4 space-y-2 sm:space-y-3">
          <h2 className="text-base sm:text-lg font-semibold text-white line-clamp-1">
            {roomName}
          </h2>
          
          <p className="text-xs sm:text-sm text-gray-400 line-clamp-2">
            {description}
          </p>
          
          <div className="flex items-center gap-2 sm:gap-3 text-xs text-gray-300 flex-wrap">
            <span>Floor {floor}</span>
            <span className="flex gap-1 items-center">
              <BsFillPeopleFill className="text-xs sm:text-sm" /> Up to {capacity} people
            </span>
            <span className="flex gap-1 items-center">
              <TfiMoney className="text-xs sm:text-sm" /> ${rate}/hr
            </span>
          </div>

          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {amenities.length > 0 ? (
              amenities.slice(0, 3).map((text, i) => (
                <span key={i} className="bg-gray-800 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs text-white">
                  {text}
                </span>
              ))
            ) : (
              <span className="text-xs text-gray-500">No amenities</span>
            )}
            {amenities.length > 3 && (
              <span className="bg-gray-800 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs text-white">
                +{amenities.length - 3}
              </span>
            )}
          </div>

          <div className="flex gap-2 pt-1 sm:pt-2">
            <Link href={`/listedroomdettails/${_id}`} className="flex-1">
              <button className="w-full hover:bg-gray-700 p-2 sm:p-3 rounded-lg text-xs sm:text-sm bg-blue-900 transition">
                View
              </button>
            </Link>

            <Button 
              onPress={() => setIsEditModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm px-3 sm:px-4"
            >
              Edit
            </Button>

            <button
              onClick={onDelete}
              className="bg-red-600 hover:bg-red-700 px-3 sm:px-4 rounded-lg text-white transition text-sm sm:text-base"
            >
              🗑
            </button>
          </div>
        </div>
      </div>

      {/* HeroUI Modal - Responsive */}
      <Modal isOpen={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <Modal.Backdrop>
          <Modal.Container>
            <Modal.Dialog className="w-full max-w-[95vw] sm:max-w-[500px] mx-2 sm:mx-auto bg-gray-900 text-white">
              <Modal.CloseTrigger />
              <Modal.Header>
                <Modal.Icon className="bg-default text-foreground">
                  <Rocket className="size-4 sm:size-5" />
                </Modal.Icon>
                <Modal.Heading className="text-lg sm:text-xl">Edit Room</Modal.Heading>
              </Modal.Header>
              <Modal.Body>
                <form onSubmit={onsubmit} className="w-full space-y-4 sm:space-y-6">
                  <div>
                    <Label className="text-sm sm:text-base">Room Name *</Label>
                    <Input 
                      name="roomName" 
                      placeholder="e.g. Research Lab Suite"
                      required
                      className="mt-1 text-white text-sm sm:text-base"
                      defaultValue={roomName}
                    />
                  </div>
          
                  <div>
                    <Label className="text-sm sm:text-base">Description</Label>
                    <TextArea 
                      name="description" 
                      placeholder="Describe the room..." 
                      className="mt-1 text-white text-sm sm:text-base"
                      defaultValue={description}
                    />
                  </div>
          
                  <div>
                    <Label className="text-sm sm:text-base">Initial Bookings</Label>
                    <Input 
                      name="bookings" 
                      type="number" 
                      placeholder="0"
                      min="0"
                      className="mt-1 text-white text-sm sm:text-base"
                      defaultValue={bookings}
                    />
                  </div>
          
                  <div>
                    <Label className="text-sm sm:text-base">Image URL *</Label>
                    <Input 
                      name="image" 
                      placeholder="https://example.com/room-image.jpg"
                      required
                      className="mt-1 text-white text-sm sm:text-base"
                      defaultValue={image}
                    />
                  </div>
          
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                    <div>
                      <Label className="text-sm sm:text-base">Floor</Label>
                      <Input 
                        name="floor" 
                        placeholder="e.g., 5th Floor" 
                        className="mt-1 text-white text-sm sm:text-base" 
                        defaultValue={floor}
                      />
                    </div>
          
                    <div>
                      <Label className="text-sm sm:text-base">Capacity (people)</Label>
                      <Input 
                        name="capacity" 
                        type="number"
                        placeholder="6"
                        min="1"
                        className="mt-1 text-white text-sm sm:text-base"
                        defaultValue={capacity}
                      />
                    </div>
          
                    <div>
                      <Label className="text-sm sm:text-base">Rate</Label>
                      <Input 
                        name="rate" 
                        placeholder="$16/hr" 
                        className="mt-1 text-white text-sm sm:text-base" 
                        defaultValue={rate} 
                      />
                    </div>
                  </div>
          
                  <div>
                    <Label className="mb-2 block text-sm sm:text-base">Amenities</Label>
                    <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 text-xs sm:text-sm">
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          name="amenities"
                          value="Whiteboard"
                          defaultChecked={amenities?.includes("Whiteboard")}
                          className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                        />
                        <span>Whiteboard</span>
                      </label>

                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          name="amenities"
                          value="Projector"
                          defaultChecked={amenities?.includes("Projector")}
                          className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                        />
                        <span>Projector</span>
                      </label>

                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          name="amenities"
                          value="Wi-Fi"
                          defaultChecked={amenities?.includes("Wi-Fi")}
                          className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                        />
                        <span>Wi-Fi</span>
                      </label>

                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          name="amenities"
                          value="Power Outlets"
                          defaultChecked={amenities?.includes("Power Outlets")}
                          className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                        />
                        <span>Power Outlets</span>
                      </label>

                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          name="amenities"
                          value="Quiet Zone"
                          defaultChecked={amenities?.includes("Quiet Zone")}
                          className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                        />
                        <span>Quiet Zone</span>
                      </label>

                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          name="amenities"
                          value="Air Conditioning"
                          defaultChecked={amenities?.includes("Air Conditioning")}
                          className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                        />
                        <span>Air Conditioning</span>
                      </label>
                    </div>
                  </div>
          
                  <Button
                    type="submit"
                    isLoading={isLoading}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-semibold text-sm sm:text-base py-2 sm:py-2.5"
                  >
                    Update Room
                  </Button>
                </form>
              </Modal.Body>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </>
  );
};

export default Alllistindrooms;