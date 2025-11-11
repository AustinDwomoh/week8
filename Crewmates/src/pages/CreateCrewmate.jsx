import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import {
  FaUserAstronaut,
  FaTools,
  FaMedkit,
  FaBinoculars,
} from "react-icons/fa";
import { motion } from "framer-motion";

const ATTRIBUTE_OPTIONS = {
  role: [
    { label: "Pilot", icon: FaUserAstronaut },
    { label: "Engineer", icon: FaTools },
    { label: "Medic", icon: FaMedkit },
    { label: "Scout", icon: FaBinoculars },
  ],
  color: ["Red", "Blue", "Green", "Yellow"],
};


const COLOR_MAP = {
  Red: "bg-red-600",
  Blue: "bg-blue-600",
  Green: "bg-green-600",
  Yellow: "bg-yellow-400 text-black",
};

export default function CreateCrewmate() {
  const [name, setName] = useState("");
  const [role, setRole] = useState("Pilot");
  const [color, setColor] = useState("Red");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const payload = { name, role, color };
    const { error: supError } = await supabase
      .from("crewmates")
      .insert([payload])
      .select();

    setLoading(false);
    if (supError) return setError(supError.message);

    navigate("/summary");
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-black text-white">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-gray-900/80 backdrop-blur-md p-10 rounded-3xl shadow-2xl w-full max-w-md border border-gray-700"
      >
        <h2 className="text-4xl font-bold mb-6 text-center bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
          Create Crewmate
        </h2>

        {/* 🔹 Live Preview Card */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8 p-6 rounded-xl border text-center shadow-lg border-gray-600 bg-gray-800"
        >
          <h3 className="text-2xl font-bold mb-2">
            {name || "Unnamed Crewmate"}
          </h3>
          <p className="font-medium text-gray-300 mb-3">{role}</p>

          {/* 🎨 Color Circle */}
          <div className="flex justify-center">
            <div
              className={`w-10 h-10 rounded-full border-2 border-white transition-all duration-300 ${
                COLOR_MAP[color] || "bg-gray-700"
              }`}
            >{color}</div>
          </div>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full bg-gray-800 border border-gray-700 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/30 
                         rounded-lg px-4 py-3 text-gray-100 placeholder-gray-500 outline-none transition"
              placeholder="Enter crewmate name..."
            />
          </div>

          {/* Role Selection */}
          <div className="grid grid-cols-2 gap-3">
            {ATTRIBUTE_OPTIONS.role.map(({ label, icon: Icon }) => (
              <motion.button
                key={label}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={() => setRole(label)}
                className={`flex items-center justify-center gap-2 py-3 rounded-lg font-medium border transition-all duration-200
                  ${
                    label === role
                      ? "bg-teal-500 text-white border-teal-400 shadow-md shadow-teal-500/20 scale-105"
                      : "bg-gray-800 border-gray-700 text-gray-300 hover:border-teal-400 hover:bg-gray-700"
                  }`}
              >
                <Icon className="text-xl" /> {label}
              </motion.button>
            ))}
          </div>

          {/* Color Selection */}
          <div className="grid grid-cols-2 gap-3">
            {ATTRIBUTE_OPTIONS.color.map((c) => (
              <motion.button
                key={c}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={() => setColor(c)}
                className={`py-3 rounded-lg font-semibold text-center border transition-all duration-200
                  ${
                    c === color
                      ? `${COLOR_MAP[c]} border-white scale-105`
                      : `bg-gray-800 border-gray-700 text-gray-300 hover:border-gray-600`
                  }`}
              >
                {c}
              </motion.button>
            ))}
          </div>

          {/* Submit */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={loading}
            className="w-full py-3 mt-2 rounded-lg font-semibold text-lg bg-teal-500 hover:bg-teal-400 transition-all 
                       disabled:opacity-50 shadow-md shadow-teal-500/30"
          >
            {loading ? "Creating..." : "Create Crewmate"}
          </motion.button>

          {error && <p className="text-red-400 text-center mt-3">{error}</p>}
        </form>
      </motion.div>
    </section>
  );
}
