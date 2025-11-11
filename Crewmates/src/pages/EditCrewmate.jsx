import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
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

export default function EditCrewmate() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [crewmate, setCrewmate] = useState(null);
  const [name, setName] = useState("");
  const [role, setRole] = useState("Pilot");
  const [color, setColor] = useState("Red");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    async function load() {
      setLoading(true);
      const { data, error } = await supabase
        .from("crewmates")
        .select("*")
        .eq("id", id)
        .single();

      if (!mounted) return;

      if (error) setError(error.message);
      else if (data) {
        setCrewmate(data);
        setName(data.name || "");
        setRole(data.role || "Pilot");
        setColor(data.color || "Red");
      }

      setLoading(false);
    }

    load();
    return () => {
      mounted = false;
    };
  }, [id]);

  async function handleUpdate(e) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const updates = { name, role, color };
    const { data, error } = await supabase
      .from("crewmates")
      .update(updates)
      .eq("id", id)
      .select();

    setSaving(false);

    if (error) return setError(error.message);
    if (data && data[0]) {
      setCrewmate(data[0]);
      navigate("/summary"); // redirect back after save
    }
  }

  async function handleDelete() {
    if (!confirm("Delete this crewmate?")) return;
    setSaving(true);
    const { error } = await supabase.from("crewmates").delete().eq("id", id);
    setSaving(false);
    if (error) setError(error.message);
    else navigate("/summary");
  }

  if (loading)
    return (
      <section className="flex justify-center items-center h-screen text-gray-300">
        Loading...
      </section>
    );

  if (error)
    return (
      <section className="flex justify-center items-center h-screen text-red-400">
        {error}
      </section>
    );

  if (!crewmate)
    return (
      <section className="flex justify-center items-center h-screen text-gray-400">
        Not found
      </section>
    );

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-black text-white">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-gray-900/80 backdrop-blur-md p-10 rounded-3xl shadow-2xl w-full max-w-md border border-gray-700"
      >
        <h2 className="text-4xl font-bold mb-6 text-center bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
          Edit Crewmate
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
          <div className="flex justify-center">
            <div
              
            >{color}</div>
          </div>
        </motion.div>

        <form onSubmit={handleUpdate} className="space-y-8">
          {/* Name Field */}
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

          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              disabled={saving}
              className="w-full py-3 mt-2 rounded-lg font-semibold text-lg bg-teal-500 hover:bg-teal-400 transition-all 
                       disabled:opacity-50 shadow-md shadow-teal-500/30"
            >
              {saving ? "Saving..." : "Save Changes"}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              type="button"
              disabled={saving}
              onClick={handleDelete}
              className="w-full py-3 mt-2 rounded-lg font-semibold text-lg bg-red-600 hover:bg-red-500 transition-all 
                       disabled:opacity-50 shadow-md shadow-red-500/30"
            >
              Delete
            </motion.button>
          </div>

          {error && <p className="text-red-400 text-center mt-3">{error}</p>}
        </form>
      </motion.div>
    </section>
  );
}
