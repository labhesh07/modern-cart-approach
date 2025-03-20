
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold mb-4">Welcome to Our Store</h1>
        <p className="text-xl text-gray-600">Browse our products and proceed to checkout</p>
        <Button asChild className="mt-4">
          <Link to="/checkout">Go to Checkout</Link>
        </Button>
      </div>
    </div>
  );
};

export default Index;
