import { useState } from "react";
import axios from "axios";

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    referredBy: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/signup", formData, {
        headers: { "Content-Type": "application/json" },
      });

      alert("Signup successful! Your referral code: " + res.data.referralCode);
    } catch (error) {
      console.error("Signup failed:", error.response?.data || error.message);
      alert(error.response?.data?.msg || "Signup failed. Please try again.");
    }
  };


  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">Create Your Account</h2>

      <form onSubmit={handleSubmit} className="mt-4">
        <input type="text" name="name" placeholder="Name" onChange={handleChange} required className="block p-2 border" />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required className="block p-2 border mt-2" />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required className="block p-2 border mt-2" />
        <input type="text" name="referredBy" placeholder="Referral Code (Optional)" onChange={handleChange} className="block p-2 border mt-2" />
        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition mt-4">
  Signup
</button>

      </form>
    </div>
  );
}
