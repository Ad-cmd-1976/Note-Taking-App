import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function DashboardPage() {
  const [expanded, setExpanded] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="mx-auto max-w-xl md:max-w-4xl flex flex-col min-h-screen">
        <div className="flex items-center justify-between mb-6 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center">
              <span className="text-blue-600 font-semibold">HD</span>
            </div>
            <h1 className="text-lg md:text-2xl font-semibold">Dashboard</h1>
          </div>
          <button className="text-sm text-blue-600 hover:underline">Sign Out</button>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm mb-5 shrink-0">
          <h2 className="font-bold text-lg md:text-xl">
            Welcome, <span className="text-gray-800">User</span> !
          </h2>
          <p className="text-sm text-gray-500 mt-1">Email: user@example.com</p>
        </div>

        <div className="mb-5 shrink-0">
          <div className="flex justify-center">
            <button
              onClick={() => setShowForm((prev) => !prev)}
              className="w-full md:w-1/2 bg-blue-600 text-white rounded-lg py-3 flex items-center justify-center gap-3 hover:bg-blue-700 transition"
            >
              {showForm ? "Cancel" : "Create Note"}
            </button>
          </div>

          <AnimatePresence>
            {showForm && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="mt-4 bg-white p-4 rounded-lg shadow-sm space-y-3"
              >
                <input
                  type="text"
                  placeholder="Enter title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <textarea
                  placeholder="Enter content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={4}
                  className="w-full border border-gray-300 rounded-lg p-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="flex justify-end">
                  <button className="w-16 bg-blue-600 text-white rounded-lg py-2 hover:bg-blue-700 transition">
                    Create
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex flex-col">
          <h3 className="text-sm text-gray-700 font-medium mb-3 shrink-0">Notes</h3>

          <div className="space-y-3">
            <motion.div
              layout
              onClick={() => setExpanded(expanded === 1 ? null : 1)}
              aria-expanded={expanded === 1}
              className="bg-white rounded-lg p-3 shadow-sm flex items-start justify-between cursor-pointer"
            >
              <div className="flex-1 pr-3 overflow-hidden">
                <div className="font-medium text-gray-800 truncate">Note 1</div>
                <div className="mt-1 text-gray-600">
                  <AnimatePresence initial={false} mode="wait">
                    {expanded !== 1 ? (
                      <motion.p
                        key="n1-collapsed"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        className="text-xs text-gray-500 line-clamp-3"
                      >
                        Lorem ipsum dolor sit amet consectetur adipisicing elit...
                      </motion.p>
                    ) : (
                      <motion.div
                        key="n1-expanded"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <p className="text-sm text-gray-700 whitespace-pre-wrap">
                          Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure,
                          quis vitae dicta quasi excepturi nihil, corporis deleniti autem...
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <button
                className="p-2 rounded-md hover:bg-gray-100"
                onClick={(e) => e.stopPropagation()}
              >
                🗑
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
