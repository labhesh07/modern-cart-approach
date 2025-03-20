
import React, { useState } from "react";
import { X, MapPin, Plus, Home, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { motion } from "framer-motion";

// Mock data for saved addresses
const SAVED_ADDRESSES = [
  {
    id: 1,
    name: "Home",
    address: "Plot No. 5, Sh. Chaudhari Devi Lal Memorial (CDCL), Sector 28-B, Chandigarh, 160028, India",
    default: true,
  },
  {
    id: 2,
    name: "Office",
    address: "MP4G+7MH, Sector 82, JLPL Industrial Area, Mohali, Punjab, India",
    default: false,
  },
];

type SidebarMode = "select" | "new";

interface AddressSidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddressSelect: (address: string) => void;
}

export function AddressSidebar({ open, onOpenChange, onAddressSelect }: AddressSidebarProps) {
  const [mode, setMode] = useState<SidebarMode>("select");
  const [newAddress, setNewAddress] = useState({
    name: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "India",
  });

  const handleModeChange = (newMode: SidebarMode) => {
    setMode(newMode);
  };

  const handleSelectAddress = (address: string) => {
    onAddressSelect(address);
    onOpenChange(false);
    toast("Delivery address updated", {
      description: "Your delivery address has been updated successfully."
    });
  };

  const handleAddNewAddress = (e: React.FormEvent) => {
    e.preventDefault();
    const fullAddress = `${newAddress.street}, ${newAddress.city}, ${newAddress.state}, ${newAddress.zipCode}, ${newAddress.country}`;
    onAddressSelect(fullAddress);
    onOpenChange(false);
    toast("New address added", {
      description: "Your new address has been added and selected for delivery."
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewAddress((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader className="mb-4">
          <SheetTitle className="text-lg font-semibold">
            {mode === "select" ? "Select Delivery Address" : "Add New Address"}
          </SheetTitle>
          <div className="flex mt-4 space-x-2">
            <Button
              variant={mode === "select" ? "default" : "outline"}
              size="sm"
              onClick={() => handleModeChange("select")}
              className="flex-1"
            >
              Saved Addresses
            </Button>
            <Button
              variant={mode === "new" ? "default" : "outline"}
              size="sm"
              onClick={() => handleModeChange("new")}
              className="flex-1"
            >
              New Address
            </Button>
          </div>
        </SheetHeader>

        {mode === "select" ? (
          // Select from saved addresses with animations
          <div className="space-y-4 mt-4">
            {SAVED_ADDRESSES.map((addr, index) => (
              <div
                key={addr.id}
                className={cn(
                  "p-4 border rounded-lg cursor-pointer transition-all hover:border-primary",
                  addr.default && "border-primary bg-primary/5"
                )}
                onClick={() => handleSelectAddress(addr.address)}
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
                // Using CSS animations with delays for a staggered effect
                className={cn(
                  "p-4 border rounded-lg cursor-pointer transition-all hover:border-primary animate-fade-in",
                  addr.default && "border-primary bg-primary/5"
                )}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <Home className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{addr.name}</span>
                  </div>
                  {addr.default && (
                    <span className="flex items-center justify-center rounded-full bg-primary h-5 w-5">
                      <Check className="h-3 w-3 text-white" />
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600 mt-1">{addr.address}</p>
              </div>
            ))}
            
            <Button
              variant="outline"
              className="w-full mt-4 flex items-center justify-center transition-all hover:bg-primary/5"
              onClick={() => handleModeChange("new")}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add New Address
            </Button>
          </div>
        ) : (
          // Add new address form with animations
          <form onSubmit={handleAddNewAddress} className="space-y-4 mt-4 animate-fade-in">
            <div className="space-y-2">
              <Label htmlFor="name">Address Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="Home, Office, etc."
                value={newAddress.name}
                onChange={handleInputChange}
                required
                className="transition-all focus:ring-2 focus:ring-primary"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="street">Street Address</Label>
              <Textarea
                id="street"
                name="street"
                placeholder="Street address, apartment, etc."
                value={newAddress.street}
                onChange={handleInputChange}
                required
                className="transition-all focus:ring-2 focus:ring-primary"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  name="city"
                  placeholder="City"
                  value={newAddress.city}
                  onChange={handleInputChange}
                  required
                  className="transition-all focus:ring-2 focus:ring-primary"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Input
                  id="state"
                  name="state"
                  placeholder="State"
                  value={newAddress.state}
                  onChange={handleInputChange}
                  required
                  className="transition-all focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="zipCode">ZIP Code</Label>
                <Input
                  id="zipCode"
                  name="zipCode"
                  placeholder="ZIP Code"
                  value={newAddress.zipCode}
                  onChange={handleInputChange}
                  required
                  className="transition-all focus:ring-2 focus:ring-primary"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  name="country"
                  placeholder="Country"
                  value={newAddress.country}
                  onChange={handleInputChange}
                  required
                  className="transition-all focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
            
            <div className="flex gap-2 pt-4">
              <Button
                type="button"
                variant="outline"
                className="flex-1 transition-all"
                onClick={() => handleModeChange("select")}
              >
                Cancel
              </Button>
              <Button type="submit" className="flex-1 transition-all hover:shadow-md">
                Save Address
              </Button>
            </div>
          </form>
        )}
      </SheetContent>
    </Sheet>
  );
}
