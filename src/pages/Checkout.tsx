
import React, { useState } from "react";
import { ArrowLeft, Calendar, MapPin, Minus, Plus, Store, Check, CreditCard, Wallet, DollarSign, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { DateTimePicker } from "@/components/DateTimePicker";
import { AddressSidebar } from "@/components/AddressSidebar";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

type PaymentMethod = "credit-card" | "wallet" | "cash";

const Checkout = () => {
  const [quantity, setQuantity] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [deliveryAddress, setDeliveryAddress] = useState("Plot No. 5, Sh. Chaudhari Devi Lal Memorial (CDCL), Sector 28-B, Chandigarh, 160028, India");
  const [addressSidebarOpen, setAddressSidebarOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("credit-card");
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Mock data
  const product = {
    name: "The Barbeque bacon 7 incher",
    price: 15.00,
    location: "MP4G+7MH, Sector 82, JLPL Industrial Area",
    imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1899&q=80"
  };
  
  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => prev > 1 ? prev - 1 : 1);
  
  const handleCheckout = () => {
    if (!selectedDate) {
      toast("Please select a delivery time", {
        description: "Delivery schedule is required for home delivery."
      });
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      toast("Order placed successfully!", {
        description: `Your order has been placed and will be delivered as scheduled. Payment method: ${getPaymentMethodName(paymentMethod)}`
      });
    }, 1500);
  };
  
  const getPaymentMethodName = (method: PaymentMethod): string => {
    switch(method) {
      case "credit-card": return "Credit Card";
      case "wallet": return "Digital Wallet";
      case "cash": return "Cash on Delivery";
      default: return "Unknown";
    }
  };
  
  const getPaymentMethodIcon = (method: PaymentMethod) => {
    switch(method) {
      case "credit-card": return <CreditCard className="h-5 w-5" />;
      case "wallet": return <Wallet className="h-5 w-5" />;
      case "cash": return <DollarSign className="h-5 w-5" />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="py-4 px-6 bg-white shadow-sm">
        <Link to="/" className="flex items-center text-gray-800 hover:text-gray-600">
          <ArrowLeft className="h-5 w-5 mr-2" />
          <span className="font-medium">Back to home</span>
        </Link>
      </header>

      <div className="flex-1 container max-w-6xl mx-auto py-8 px-4 lg:px-6 animate-fade-in">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column - Delivery details */}
          <div className="lg:col-span-2 space-y-6">
            <h1 className="text-2xl font-semibold mb-6">Checkout</h1>
            
            {/* Use Accordion for content sections */}
            <Accordion type="single" collapsible className="w-full space-y-4">
              {/* Delivery Options */}
              <AccordionItem value="delivery-options" className="border rounded-lg overflow-hidden bg-white shadow-sm">
                <AccordionTrigger className="px-6 py-4 hover:no-underline">
                  <h2 className="text-lg font-medium">Home Delivery</h2>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 pt-0">
                  <div className="rounded-lg p-4 border-primary bg-primary/5 ring-1 ring-primary">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-medium">Home delivery</span>
                      <span className="flex items-center justify-center rounded-full bg-primary h-5 w-5">
                        <Check className="h-3 w-3 text-white" />
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">
                      Get your order delivered to your doorstep
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            
              {/* Delivery Schedule */}
              <AccordionItem value="delivery-schedule" className="border rounded-lg overflow-hidden bg-white shadow-sm">
                <AccordionTrigger className="px-6 py-4 hover:no-underline">
                  <h2 className="text-lg font-medium">Delivery Schedule</h2>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 pt-0">
                  <p className="text-sm text-gray-500 mb-4">
                    Please select when you'd like your order to be delivered
                  </p>
                  <DateTimePicker 
                    date={selectedDate} 
                    setDate={setSelectedDate} 
                    className="w-full"
                  />
                  {!selectedDate && (
                    <p className="text-sm text-red-500 mt-2">
                      Delivery schedule is required for home delivery
                    </p>
                  )}
                </AccordionContent>
              </AccordionItem>
              
              {/* Delivery Address */}
              <AccordionItem value="delivery-address" className="border rounded-lg overflow-hidden bg-white shadow-sm">
                <AccordionTrigger className="px-6 py-4 hover:no-underline">
                  <h2 className="text-lg font-medium">Delivery Address</h2>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 pt-0">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-medium">Select Address</h3>
                    <Button variant="outline" size="sm" onClick={() => setAddressSidebarOpen(true)}>
                      Change
                    </Button>
                  </div>
                  <div className="p-4 flex border rounded-lg">
                    <div className="flex-shrink-0 mr-4">
                      <div className="flex items-center justify-center bg-gray-100 rounded-full h-10 w-10">
                        <MapPin className="h-5 w-5 text-gray-500" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Current Location</h3>
                      <p className="text-sm text-gray-600">
                        {deliveryAddress}
                      </p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              {/* Payment Methods */}
              <AccordionItem value="payment-methods" className="border rounded-lg overflow-hidden bg-white shadow-sm">
                <AccordionTrigger className="px-6 py-4 hover:no-underline">
                  <h2 className="text-lg font-medium">Payment Method</h2>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 pt-0">
                  <div className="space-y-4">
                    <div 
                      className={cn(
                        "p-4 border rounded-lg cursor-pointer transition-all",
                        paymentMethod === "credit-card" 
                          ? "border-primary bg-primary/5 ring-1 ring-primary" 
                          : "hover:border-gray-300"
                      )}
                      onClick={() => setPaymentMethod("credit-card")}
                    >
                      <div className="flex items-center">
                        <div className="flex-shrink-0 mr-4">
                          <div className={cn(
                            "flex items-center justify-center rounded-full h-10 w-10",
                            paymentMethod === "credit-card" ? "bg-primary/10" : "bg-gray-100"
                          )}>
                            <CreditCard className={cn(
                              "h-5 w-5",
                              paymentMethod === "credit-card" ? "text-primary" : "text-gray-500"
                            )} />
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium">Credit Card</h3>
                          <p className="text-sm text-gray-600">Pay with Visa, Mastercard, or American Express</p>
                        </div>
                        {paymentMethod === "credit-card" && (
                          <Check className="h-5 w-5 text-primary" />
                        )}
                      </div>
                    </div>

                    <div 
                      className={cn(
                        "p-4 border rounded-lg cursor-pointer transition-all",
                        paymentMethod === "wallet" 
                          ? "border-primary bg-primary/5 ring-1 ring-primary" 
                          : "hover:border-gray-300"
                      )}
                      onClick={() => setPaymentMethod("wallet")}
                    >
                      <div className="flex items-center">
                        <div className="flex-shrink-0 mr-4">
                          <div className={cn(
                            "flex items-center justify-center rounded-full h-10 w-10",
                            paymentMethod === "wallet" ? "bg-primary/10" : "bg-gray-100"
                          )}>
                            <Wallet className={cn(
                              "h-5 w-5",
                              paymentMethod === "wallet" ? "text-primary" : "text-gray-500"
                            )} />
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium">Digital Wallet</h3>
                          <p className="text-sm text-gray-600">Pay with Apple Pay, Google Pay, or PayPal</p>
                        </div>
                        {paymentMethod === "wallet" && (
                          <Check className="h-5 w-5 text-primary" />
                        )}
                      </div>
                    </div>

                    <div 
                      className={cn(
                        "p-4 border rounded-lg cursor-pointer transition-all",
                        paymentMethod === "cash" 
                          ? "border-primary bg-primary/5 ring-1 ring-primary" 
                          : "hover:border-gray-300"
                      )}
                      onClick={() => setPaymentMethod("cash")}
                    >
                      <div className="flex items-center">
                        <div className="flex-shrink-0 mr-4">
                          <div className={cn(
                            "flex items-center justify-center rounded-full h-10 w-10",
                            paymentMethod === "cash" ? "bg-primary/10" : "bg-gray-100"
                          )}>
                            <DollarSign className={cn(
                              "h-5 w-5",
                              paymentMethod === "cash" ? "text-primary" : "text-gray-500"
                            )} />
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium">Cash on Delivery</h3>
                          <p className="text-sm text-gray-600">Pay with cash when your order arrives</p>
                        </div>
                        {paymentMethod === "cash" && (
                          <Check className="h-5 w-5 text-primary" />
                        )}
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              {/* Store Location */}
              <AccordionItem value="store-location" className="border rounded-lg overflow-hidden bg-white shadow-sm">
                <AccordionTrigger className="px-6 py-4 hover:no-underline">
                  <h2 className="text-lg font-medium">Store Location</h2>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 pt-0">
                  <div className="p-4 flex border rounded-lg">
                    <div className="flex-shrink-0 mr-4">
                      <div className="flex items-center justify-center bg-gray-100 rounded-full h-10 w-10">
                        <Store className="h-5 w-5 text-gray-500" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Store Address</h3>
                      <p className="text-sm text-gray-600">{product.location}</p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          
          {/* Right column - Order summary */}
          <div>
            <Card className="sticky top-6 border border-gray-200 shadow-sm transition-all hover:shadow-md">
              <CardContent className="p-6 space-y-6">
                <Collapsible className="space-y-2">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold">Order Summary</h2>
                    <CollapsibleTrigger className="rounded-full h-6 w-6 inline-flex items-center justify-center text-sm hover:bg-gray-100 transition-colors">
                      <ChevronDown className="h-4 w-4" />
                    </CollapsibleTrigger>
                  </div>
                  
                  <CollapsibleContent className="space-y-4 animate-accordion-down">
                    {/* Product details */}
                    <div className="flex gap-4 mt-4">
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
                            className="h-8 w-8 flex items-center justify-center border rounded-l-md hover:bg-gray-50 transition-colors"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <div className="h-8 min-w-[2rem] flex items-center justify-center border-t border-b">
                            {quantity}
                          </div>
                          <button 
                            onClick={incrementQuantity}
                            className="h-8 w-8 flex items-center justify-center border rounded-r-md hover:bg-gray-50 transition-colors"
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
                  </CollapsibleContent>
                </Collapsible>
                
                {/* Payment method summary */}
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Payment Method</span>
                  <div className="flex items-center gap-2">
                    {getPaymentMethodIcon(paymentMethod)}
                    <span>{getPaymentMethodName(paymentMethod)}</span>
                  </div>
                </div>
                
                {/* Total */}
                <div className="flex justify-between font-medium text-lg">
                  <span>Total</span>
                  <span>${(product.price * quantity + 3).toFixed(2)}</span>
                </div>
                
                {/* Checkout button */}
                <Button 
                  className="w-full transition-all hover:shadow-lg transform active:scale-[0.98]" 
                  size="lg"
                  onClick={handleCheckout}
                  disabled={isProcessing || !selectedDate}
                >
                  {isProcessing ? "Processing..." : "Place Order"}
                </Button>
                
                <p className="text-xs text-center text-gray-500">
                  By placing your order, you agree to our Terms of Service and Privacy Policy
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      {/* Address Sidebar */}
      <AddressSidebar 
        open={addressSidebarOpen} 
        onOpenChange={setAddressSidebarOpen}
        onAddressSelect={setDeliveryAddress}
      />
    </div>
  );
};

export default Checkout;
