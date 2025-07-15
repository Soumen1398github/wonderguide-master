import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);


const AddMembersPage = () => {
  const tourId = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const totalTickets = location.state?.totalTickets || 1;
  const [members, setMembers] = useState([]);
  const [member, setMember] = useState({ name: "", age: "", gender: "" });

  const handleChange = (e) => {
    setMember({ ...member, [e.target.name]: e.target.value });
  };

  const handleAddMember = () => {
    if (member.name && member.age && member.gender) {
      setMembers([...members, member]);
      setMember({ name: "", age: "", gender: "" });
    }
  };

  // const handleProceedToPayment = async () => {
  //   try {
  //     const res = await axios.post(`${import.meta.env.VITE_SERVER}/api/bookings/create-checkout-session`, {
  //       tourId,
  //       userId,
  //       numberOfTickets: totalTickets,
  //       members, // optional: if you plan to save members on backend later
  //     });

  //     const { id: sessionId } = res.data;

  //     const stripe = await window.Stripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
  //     stripe.redirectToCheckout({ sessionId });
  //   } catch (err) {
  //     console.error("Payment error:", err);
  //     alert("Payment failed. Try again.");
  //   }
  // };
  const handleProceedToPayment = async () => {
    const userId = localStorage.getItem("id"); // Assuming you store userId in localStorage
    // console.log("userId",userId)

    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER}/api/book/create-checkout-session`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tourId,
          userId,
          numberOfTickets: totalTickets,
          members,
        }),
      });
  
      const data = await response.json();
      console.log("data",data)
  
      if (!response.ok || !data.id) {
        throw new Error(data.message || "Failed to create payment session");
      }
  
      // logic for verifyPaymentSession
      const stripe = await stripePromise; // loadStripe()
      await stripe.redirectToCheckout({ sessionId: data.id }); 

    } catch (err) {
      console.error("Payment initiation failed:", err.message);
      // alert("❌ Payment initiation failed. Please try again later.");
      navigate("/cancel")
    }
  };
  


  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Total Tickets: {totalTickets}</h1>

      <div className="mb-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={member.name}
          onChange={handleChange}
          className="w-full mb-2 px-3 py-2 border rounded"
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={member.age}
          onChange={handleChange}
          className="w-full mb-2 px-3 py-2 border rounded"
        />
        <select
          name="gender"
          value={member.gender}
          onChange={handleChange}
          className="w-full mb-2 px-3 py-2 border rounded"
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <button
          onClick={handleAddMember}
          disabled={members.length >= totalTickets}
          className="bg-blue-600 text-white px-4 py-2 rounded w-full disabled:opacity-50"
        >
          Add Member
        </button>
      </div>

      <h2 className="text-lg font-semibold mb-2">Added Members:</h2>
      <ul className="mb-4">
        {members.map((m, index) => (
          <li key={index} className="border-b py-1">
            {m.name} - {m.age} - {m.gender}
          </li>
        ))}
      </ul>

      {members.length === totalTickets && (
        <button
          onClick={handleProceedToPayment}
          className="bg-green-600 text-white px-6 py-2 rounded w-full"
        >
          Proceed to Payment
        </button>
      )}
    </div>
  );
};

export default AddMembersPage;