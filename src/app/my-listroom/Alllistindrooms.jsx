"use client";
import {Button, Input, Label, Modal, Surface, TextArea, TextField} from "@heroui/react";
import { Rocket } from "lucide-react";
 
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React, { useState } from "react";
import { BsFillPeopleFill } from "react-icons/bs";
import { TfiMoney } from "react-icons/tfi";
import { toast } from "react-toastify";

const Alllistindrooms = ({ da, token }) => {
  const {
    _id,
   roomID,
    roomName,
    description,
    image,
    floor,
    capacity,
    rate,
    amenities = [],
  } = da || {};
  
    const onsubmit = async (e) => {
      e.preventDefault();
      
  
      const formData = new FormData(e.currentTarget);
      const data = Object.fromEntries(formData.entries());
  
       const amenities = formData.getAll("amenities");
   
      const finalData = {
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
  
      // Validate required fields
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

       const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/listed/${_id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json", 
        authorization: token
      },
      body: JSON.stringify(finalData)

    });
     
    const datas = await res.json()

       const ress = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/rooms/${roomID}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
          authorization: token
      },
      body: JSON.stringify(finalData)

    });
    
    const datase = await ress.json()

  console.log(datas)
  if(datas.modifiedCount > 0){
     redirect("/my-listroom")
     toast.success("Updated room")
  }
  if(!datas.modifiedCount > 0){
    
     toast.error("error Updated room")
  }

 }

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    roomName: roomName || "",
    description: description || "",
    floor: floor || "",
    capacity: capacity || "",
    rate: rate || "",
    image: image || "",
    amenities: amenities || []
  });
 
   const verifiedtoken = process.env.JWTTOKJEN
  const onDelete = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/listed/${_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
         authorization: verifiedtoken
      },
    });

    const result = await res.json();
    console.log("DELETE RESULT:", result);

    if (res.ok) {
      alert("Room deleted successfully");
    } else {
      alert(result.message || "Delete failed");
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      if (checked) {
        setFormData(prev => ({
          ...prev,
          amenities: [...prev.amenities, value]
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          amenities: prev.amenities.filter(amenity => amenity !== value)
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  // Handle form submission
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/listed/${_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      
      if (res.ok) {
        alert("Room updated successfully");
        setIsEditModalOpen(false);
        window.location.reload();
      } else {
        alert(result.message || "Update failed");
      }
    } catch (err) {
      console.log("UPDATE ERROR:", err);
      alert("An error occurred while updating");
    }
  };

  return (
    <>
      <div className="max-w-sm bg-[#111827] rounded-2xl shadow-lg overflow-hidden border border-gray-800">
        {/* Image */}
        <div className="relative w-full h-48">
          <Image
            src={image || "https://images.unsplash.com/photo-1521737604893-d14cc237f11d"}
            alt={roomName || "room"}
            fill
            className="object-cover"
          />
          <span className="absolute top-3 right-3 bg-white text-black text-xs px-2 py-1 rounded-md font-semibold">
            ${rate || 0}/hr
          </span>
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          {/* Title */}
          <h2 className="text-lg font-semibold text-white">{roomName}</h2>

          {/* Description */}
          <p className="text-sm text-gray-400">{description}</p>

          {/* Stats */}
          <div className="flex items-center gap-3 text-xs text-gray-300 flex-wrap">
            <span>Floor {floor}</span>
            <span className="flex gap-1 items-center"><BsFillPeopleFill /> Up to {capacity} people</span>
            <span className="flex gap-1 items-center"><TfiMoney /> ${rate}/hr</span>
          </div>

          {/* Amenities */}
          <div className="flex flex-wrap gap-2">
            {amenities.length > 0 ? (
              amenities.map((text, i) => (
                <span key={i} className="bg-gray-800 px-2 py-1 rounded-full text-xs text-white">
                  {text}
                </span>
              ))
            ) : (
              <span className="text-xs text-gray-500">No amenities</span>
            )}
          </div>

          {/* Buttons */}
          <div className="flex gap-2 pt-2">
           <Link href={`/listedroomdettails/${_id}`}> <button className="flex-1   hover:bg-gray-700 py-2 rounded-lg text-sm  bg-blue-900 transition">
              View
            </button>
            </Link>

           <Modal>
      <Button variant="secondary">Edite</Button>
      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog className="sm:max-w-[360px]">
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Icon className="bg-default text-foreground">
                <Rocket className="size-5" />
              </Modal.Icon>
              <Modal.Heading>Edite</Modal.Heading>
            </Modal.Header>
            <Modal.Body>
              <form
                      onSubmit={onsubmit}
                      className="w-full max-w-2xl  p-8 rounded-2xl shadow-xl space-y-6 "
                    >
                     <Link href={"/add-room"}><h2 className="text-2xl font-bold"> Add New Room</h2></Link> 
              
                      <div>
                        <Label>Room Name *</Label>
                        <Input 
                          name="roomName" 
                          placeholder="e.g. Research Lab Suite"
                          required
                          className="mt-1 text-white"
                        />
                      </div>
              
                      <div>
                        <Label>Description</Label>
                        <TextArea 
                          name="description" 
                          placeholder="Describe the room..." 
                          className="mt-1"
                        />
                      </div>
              
                      <div>
                        <Label>Initial Bookings</Label>
                        <Input 
                          name="bookings" 
                          type="number" 
                          placeholder="0"
                          min="0"
                          className="mt-1 text-gray-300"
                        />
                      </div>
              
                      <div>
                        <Label>Image URL *</Label>
                        <Input 
                          name="image" 
                          placeholder="https://example.com/room-image.jpg"
                          required
                          className="mt-1 text-white"
                        />
                      </div>
              
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <Label>Floor</Label>
                          <Input name="floor" placeholder="e.g., 5th Floor" className="mt-1 text-gray-300"  />
                        </div>
              
                        <div>
                          <Label>Capacity (people)</Label>
                          <Input 
                            name="capacity" 
                            type="number"
                            placeholder="6"
                            min="1"
                            className="mt-1 text-white"
                          />
                        </div>
              
                        <div>
                          <Label>Rate</Label>
                          <Input name="rate" placeholder="$16/hr" className="mt-1 text-white" />
                        </div>
                      </div>
              
                      <div>
                        <Label className="mb-2 block">Amenities</Label>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <label className="flex items-center gap-2">
                            <input type="checkbox" name="amenities" value="Whiteboard" /> 
                            <span>Whiteboard</span>
                          </label>
                          <label className="flex items-center gap-2">
                            <input type="checkbox" name="amenities" value="Projector" /> 
                            <span>Projector</span>
                          </label>
                          <label className="flex items-center gap-2">
                            <input type="checkbox" name="amenities" value="Wi-Fi" /> 
                            <span>Wi-Fi</span>
                          </label>
                          <label className="flex items-center gap-2">
                            <input type="checkbox" name="amenities" value="Power Outlets" /> 
                            <span>Power Outlets</span>
                          </label>
                          <label className="flex items-center gap-2">
                            <input type="checkbox" name="amenities" value="Quiet Zone" /> 
                            <span>Quiet Zone</span>
                          </label>
                          <label className="flex items-center gap-2">
                            <input type="checkbox" name="amenities" value="Air Conditioning" /> 
                            <span>Air Conditioning</span>
                          </label>
                        </div>
                      </div>
              
                      <Button
                        type="submit"
                      slot="close"
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-semibold"
                      >
                      Update Room
                      </Button>
                    </form>
            </Modal.Body>
            
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>

            <button
              onClick={onDelete}
              className="bg-red-600 hover:bg-red-700 px-4 rounded-lg text-white transition"
            >
              🗑
            </button>
          </div>
        </div>
      </div>
 
    </>
  );
};

export default Alllistindrooms;