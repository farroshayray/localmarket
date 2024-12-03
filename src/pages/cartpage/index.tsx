import React from "react";
import ProtectedRoute from "@/components/ProtectedRoute";

const CartPage = () => {
    return (
        <ProtectedRoute allowedRoles={["konsumen"]}>
            <div>cart pagedd</div>
        </ProtectedRoute>
        
    );
};

export default CartPage;