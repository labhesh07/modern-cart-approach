
import React, { useState } from "react";
import { ArrowLeft, Calendar, MapPin, Minus, Plus, Store, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Link } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

type DeliveryOption = "Home delivery" | "Virtual Meet" | "Pick And Drop";

const Checkout = () => {
  const [deliveryOption, setDeliveryOption] = useState<DeliveryOption>("Home delivery");
  const [quantity, setQuantity] = useState(1);
  const [scheduleOrder, setScheduleOrder] = useState(false);
  
  // Mock data
  const product = {
    name: "The Barbeque bacon 7 incher",
    price: 15.00,
    location: "MP4G+7MH, Sector 82, JLPL Industrial Area",
    imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1899&q=80"
  };
  
  const handleCheckout = () => {
    toast({
      title: "Order placed successfully!",
      description: "Your order has been placed and will be processed soon.",
    });
  };

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => prev > 1 ? prev - 1 : 1);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="py-4 px-6 bg-white shadow-sm">
        <Link to="/" className="flex items-center text-gray-800 hover:text-gray-600">
          <ArrowLeft className="h-5 w-5 mr-2" />
          <span className="font-medium">Back to home</span>
        </Link>
      </header>

      <div className="flex-1 container max-w-6xl mx-auto py-8 px-4 lg:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column - Delivery options and Address */}
          <div className="lg:col-span-2 space-y-6">
            <h1 className="text-2xl font-semibold mb-6">Checkout</h1>
            
            {/* Delivery Options */}
            <div>
              <h2 className="text-lg font-medium mb-4">Delivery Options</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {["Home delivery", "Virtual Meet", "Pick And Drop"].map((option) => (
                  <div
                    key={option}
                    className={cn(
                      "border rounded-lg p-4 cursor-pointer transition-all",
                      deliveryOption === option
                        ? "border-primary bg-primary/5 ring-1 ring-primary"
                        : "border-gray-200 hover:border-gray-300"
                    )}
                    onClick={() => setDeliveryOption(option as DeliveryOption)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-medium">{option}</span>
                      {deliveryOption === option && (
                        <span className="flex items-center justify-center rounded-full bg-primary h-5 w-5">
                          <Check className="h-3 w-3 text-white" />
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500">
                      {option === "Home delivery" 
                        ? "Get your order delivered to your doorstep" 
                        : option === "Virtual Meet" 
                          ? "Discuss your order online with our consultant" 
                          : "We'll pick up and drop off your items"}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Delivery Address */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium">Delivery Address</h2>
                <Button variant="outline" size="sm">Change</Button>
              </div>
              <Card>
                <CardContent className="p-4 flex">
                  <div className="flex-shrink-0 mr-4">
                    <div className="flex items-center justify-center bg-gray-100 rounded-full h-10 w-10">
                      <MapPin className="h-5 w-5 text-gray-500" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Current Location</h3>
                    <p className="text-sm text-gray-600">
                      Plot No. 5, Sh. Chaudhari Devi Lal Memorial (CDCL), Sector 28-B, Chandigarh, 160028, India
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Store Location */}
            <div>
              <h2 className="text-lg font-medium mb-4">Store Location</h2>
              <Card>
                <CardContent className="p-4 flex">
                  <div className="flex-shrink-0 mr-4">
                    <div className="flex items-center justify-center bg-gray-100 rounded-full h-10 w-10">
                      <Store className="h-5 w-5 text-gray-500" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Store Address</h3>
                    <p className="text-sm text-gray-600">{product.location}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Schedule Order Switch */}
            <div>
              <div className="flex items-center justify-between bg-white p-4 rounded-lg border">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center bg-gray-100 rounded-full h-10 w-10">
                    <Calendar className="h-5 w-5 text-gray-500" />
                  </div>
                  <div>
                    <h3 className="font-medium">Schedule Order</h3>
                    <p className="text-sm text-gray-500">Get it delivered when you want</p>
                  </div>
                </div>
                <Switch 
                  checked={scheduleOrder} 
                  onCheckedChange={setScheduleOrder}
                />
              </div>
            </div>
          </div>
          
          {/* Right column - Order summary */}
          <div>
            <Card className="sticky top-6">
              <CardContent className="p-6 space-y-6">
                <h2 className="text-xl font-semibold">Order Summary</h2>
                
                {/* Product details */}
                <div className="flex gap-4">
                  <div className="h-20 w-20 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                    <img 
                      src={product.imageUrl} 
                      alt={product.name} 
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTEgMTcuMjVBNS4yNSA1LjI1IDAgMSAxIDE3LjI1IDExIDUuMjUgNS4yNSAwIDAgMSAxMSAxNy4yNXptMC0xQTQuMjUgNC4yNSAwIDEgMCAxNi4yNSAxMSA0LjI1IDQuMjUgMCAwIDAgMTEgMTYuMjV6TTcgOC40NlYxMS41aDFWNy41NEw2LjA0IDhsMC4zMSAwLjk1LTEuMSAwLjI5IDAuMjEgMC44IDEuNTQtMC4zOXpNMTcuNTQgMTVsLTAuNy0wLjcxLTEuMDkgMS4wOSA0LjUgNC41IDAuNzEtMC43TDE3LjkzIDE2Ljc2IDE5IDEyLjVoLTFMMTcuNTQgMTV6Ii8+PC9zdmc+";
                      }}
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium mb-1">{product.name}</h3>
                    <p className="text-gray-500 text-sm mb-2">Classic Burger</p>
                    <div className="flex items-center">
                      <button 
                        onClick={decrementQuantity}
                        className="h-8 w-8 flex items-center justify-center border rounded-l-md"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <div className="h-8 min-w-[2rem] flex items-center justify-center border-t border-b">
                        {quantity}
                      </div>
                      <button 
                        onClick={incrementQuantity}
                        className="h-8 w-8 flex items-center justify-center border rounded-r-md"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-medium">${(product.price * quantity).toFixed(2)}</span>
                  </div>
                </div>
                
                <Separator />
                
                {/* Price details */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span>${(product.price * quantity).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivery fee</span>
                    <span>$2.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Platform fee</span>
                    <span>$1.00</span>
                  </div>
                </div>
                
                <Separator />
                
                {/* Total */}
                <div className="flex justify-between font-medium text-lg">
                  <span>Total</span>
                  <span>${(product.price * quantity + 3).toFixed(2)}</span>
                </div>
                
                {/* Checkout button */}
                <Button 
                  className="w-full" 
                  size="lg"
                  onClick={handleCheckout}
                >
                  Place Order
                </Button>
                
                <p className="text-xs text-center text-gray-500">
                  By placing your order, you agree to our Terms of Service and Privacy Policy
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
