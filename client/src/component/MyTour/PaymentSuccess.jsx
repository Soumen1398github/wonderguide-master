import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { CheckCircleIcon } from "lucide-react";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const sessionId = searchParams.get("session_id");
  const [bookingData, setBookingData] = useState(null);

  useEffect(() => {
    const verify = async () => {
      if (!sessionId) return;

      try {
        const res = await fetch(`${import.meta.env.VITE_SERVER}/api/book/payment/verify`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId }),
        });

        const result = await res.json();
        if (!res.ok) throw new Error(result.message);

        console.log("✅ Booking verified", result);
        setBookingData(result); // Save to display on screen
      } catch (error) {
        console.error("❌ Verification failed", error.message);
        navigate("/cancel");
      }
    };

    verify();
  }, [sessionId, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50 px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-md">
        <CheckCircleIcon className="text-green-500 w-16 h-16 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-green-700 mb-2">Payment Successful!</h1>
        <p className="text-gray-600 mb-4">
          Thank you for your booking. A confirmation email has been sent.
        </p>

        {bookingData && (
          <>
            <p className="text-sm text-gray-500">
              <strong>Tour:</strong> {bookingData.tourName}
            </p>
            <p className="text-sm text-gray-500">
              <strong>Tickets:</strong> {bookingData.numberOfTickets}
            </p>
            <p className="text-sm text-gray-500">
              <strong>Total:</strong> ₹{bookingData.totalPrice}
            </p>
          </>
        )}

        {sessionId && (
          <p className="text-xs text-gray-400 mt-4">
            Session ID: <span className="font-mono">{sessionId}</span>
          </p>
        )}

        <a
          href="/"
          className="mt-6 inline-block bg-green-600 text-white px-6 py-2 rounded-lg shadow hover:bg-green-700 transition"
        >
          View My Bookings
        </a>
      </div>
    </div>
  );
};

export default PaymentSuccess;
