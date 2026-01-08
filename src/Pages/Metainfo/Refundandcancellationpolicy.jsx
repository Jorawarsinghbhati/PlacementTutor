// import { useState } from "react";
// import {
//   AlertTriangle,
//   CheckCircle,
//   CreditCard,
//   HelpCircle,
//   Landmark,
//   Lock,
//   CalendarX,
//   Globe,
//   ShieldCheck,
// } from "lucide-react";

// const RefundAndCancellation = () => {
//   const [agreed, setAgreed] = useState(false);
//   const [showConfirm, setShowConfirm] = useState(false);
//   const [showHelp, setShowHelp] = useState(false);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-red-50">
//       <div className="max-w-6xl mx-auto px-6 py-12">
//         {/* Header */}
//         <div className="text-center mb-14">
//           <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-red-500 to-rose-600 shadow-lg">
//             <Lock className="h-8 w-8 text-white" />
//           </div>

//           <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
//             Refund & Cancellation Policy
//           </h1>
//           <p className="mt-4 text-gray-600 max-w-3xl mx-auto text-lg">
//             Transparent explanation of how payments, cancellations, and failures
//             are handled on <b>PlacementTutor</b>.
//           </p>

//           <div className="mt-6 flex justify-center gap-3 flex-wrap">
//             <span className="px-3 py-1 rounded-full text-sm bg-red-100 text-red-700 flex items-center gap-1">
//               <Lock className="h-4 w-4" /> Non-Refundable
//             </span>
//             <span className="px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-700 flex items-center gap-1">
//               <Globe className="h-4 w-4" /> Razorpay Payments
//             </span>
//             <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-700 flex items-center gap-1">
//               <ShieldCheck className="h-4 w-4" /> Transparent Policy
//             </span>
//           </div>
//         </div>

//         {/* Strict Notice */}
//         <div className="mb-10 rounded-2xl border border-red-200 bg-red-50 p-6 flex gap-4">
//           <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-500">
//             <AlertTriangle className="h-6 w-6 text-white" />
//           </div>
//           <div>
//             <h2 className="text-2xl font-bold text-gray-900 mb-1">
//               Strict No-Refund Policy
//             </h2>
//             <p className="text-gray-700">
//               All payments made on <b>PlacementTutor</b> are{" "}
//               <span className="font-semibold text-red-600">final and non-refundable</span>.
//               Once a booking is confirmed, the amount cannot be refunded,
//               reversed, or transferred.
//             </p>
//           </div>
//         </div>

//         {/* Policy Cards */}
//         <div className="grid md:grid-cols-3 gap-6 mb-14">
//           <PolicyCard
//             icon={<Lock className="text-red-600" />}
//             title="No Refunds"
//             bg="bg-red-50 border-red-200"
//             items={[
//               "All bookings are non-refundable",
//               "Applies to all mentors & services",
//               "No refunds for cancellations or no-shows",
//               "No refunds for dissatisfaction",
//             ]}
//           />

//           <PolicyCard
//             icon={<CalendarX className="text-orange-600" />}
//             title="Cancellation"
//             bg="bg-orange-50 border-orange-200"
//             items={[
//               "Users may cancel a session",
//               "Cancellation does not qualify for refund",
//               "Rescheduling depends on mentor approval",
//             ]}
//           />

//           <PolicyCard
//             icon={<CreditCard className="text-green-600" />}
//             title="Payment Failures"
//             bg="bg-green-50 border-green-200"
//             items={[
//               "Failed payments are not bookings",
//               "Handled automatically by Razorpay",
//               "Reversal in 5–7 working days",
//             ]}
//           />
//         </div>

//         {/* Razorpay Info */}
//         <div className="mb-14 rounded-xl border bg-white p-6 flex gap-4">
//           <CreditCard className="text-blue-600" />
//           <p className="text-gray-600">
//             PlacementTutor does not manually issue refunds. Failed or incomplete
//             payments are automatically reversed by Razorpay or the user’s bank as
//             per gateway rules.
//           </p>
//         </div>

//         {/* Acceptance */}
//         <div className="rounded-2xl border p-6 flex flex-col md:flex-row items-center justify-between gap-6 mb-16">
//           <div>
//             <h3 className="text-xl font-semibold flex items-center gap-2">
//               {agreed && <CheckCircle className="text-green-600" />}
//               {agreed ? "Policy Accepted" : "Acknowledge Refund Policy"}
//             </h3>
//             <p className="text-gray-600">
//               You must accept this policy before proceeding with bookings.
//             </p>
//           </div>

//           <button
//             onClick={() => setShowConfirm(true)}
//             className="px-6 py-3 rounded-xl bg-red-600 text-white font-medium hover:bg-red-700 transition"
//           >
//             Accept Policy
//           </button>
//         </div>

//         {/* Footer */}
//         <div className="text-center text-sm text-gray-500">
//           <Landmark className="mx-auto mb-2" />
//           Policy effective as of {new Date().toLocaleDateString()} and subject to
//           updates.
//         </div>
//       </div>

//       {/* Confirm Modal */}
//       {showConfirm && (
//         <Modal onClose={() => setShowConfirm(false)}>
//           <h3 className="text-lg font-bold mb-2">Confirm Acceptance</h3>
//           <p className="text-gray-600 mb-6">
//             All payments are strictly non-refundable. Do you understand and agree
//             to continue?
//           </p>
//           <div className="flex justify-end gap-3">
//             <button
//               onClick={() => setShowConfirm(false)}
//               className="px-4 py-2 rounded-lg border"
//             >
//               Review Again
//             </button>
//             <button
//               onClick={() => {
//                 setAgreed(true);
//                 setShowConfirm(false);
//               }}
//               className="px-4 py-2 rounded-lg bg-red-600 text-white"
//             >
//               I Agree
//             </button>
//           </div>
//         </Modal>
//       )}

//       {/* Help Button */}
//       <button
//         onClick={() => setShowHelp(true)}
//         className="fixed bottom-6 right-6 h-12 w-12 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg hover:bg-red-700"
//       >
//         <HelpCircle />
//       </button>

//       {showHelp && (
//         <Modal onClose={() => setShowHelp(false)}>
//           <h3 className="text-lg font-bold mb-2">Refund Policy Help</h3>
//           <p className="text-gray-600">
//             Once a booking is confirmed, PlacementTutor does not offer refunds
//             under any circumstances.
//           </p>
//         </Modal>
//       )}
//     </div>
//   );
// };

// const PolicyCard = ({ icon, title, items, bg }) => (
//   <div className={`rounded-2xl border p-6 ${bg}`}>
//     <div className="flex items-center gap-3 mb-4">
//       {icon}
//       <h4 className="text-lg font-semibold">{title}</h4>
//     </div>
//     <ul className="space-y-2 text-gray-700 text-sm">
//       {items.map((i, idx) => (
//         <li key={idx}>• {i}</li>
//       ))}
//     </ul>
//   </div>
// );

// const Modal = ({ children, onClose }) => (
//   <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
//     <div className="bg-white rounded-xl p-6 max-w-md w-full relative">
//       <button
//         onClick={onClose}
//         className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
//       >
//         ✕
//       </button>
//       {children}
//     </div>
//   </div>
// );

// export default RefundAndCancellation;
import { useState, useEffect } from "react";
import {
  AlertTriangle,
  CheckCircle,
  CreditCard,
  HelpCircle,
  Landmark,
  Lock,
  CalendarX,
  Globe,
  ShieldCheck,
  X,
  ArrowRight,
  FileText,
  Sparkles,
  ChevronDown,
  Eye,
  EyeOff,
  BookOpen,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const RefundAndCancellation = () => {
  const [agreed, setAgreed] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const FloatingElements = () => (
    <div className="fixed inset-0 pointer-events-none z-0">
      {Array.from({ length: 10 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-4 h-4 bg-gradient-to-br from-red-500/10 to-rose-500/10 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -20, 0],
            x: [0, Math.random() * 20 - 10, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            delay: Math.random() * 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );

  const BoxesBackground = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
      <svg className="absolute inset-0 w-full h-full">
        <defs>
          <pattern
            id="grid"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="rgba(255, 255, 255, 0.05)"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
  );

  const MeteorsEffect = ({ number = 10, className = "" }) => {
    const [meteors, setMeteors] = useState([]);

    useEffect(() => {
      const newMeteors = Array.from({ length: number }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 5,
        duration: 2 + Math.random() * 3,
        size: 1 + Math.random() * 2,
      }));
      setMeteors(newMeteors);
    }, [number]);

    return (
      <div
        className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      >
        {meteors.map((meteor) => (
          <motion.div
            key={meteor.id}
            className="absolute h-[1px] bg-gradient-to-r from-red-500/50 to-transparent rounded-full"
            style={{
              left: `${meteor.left}%`,
              top: "-10px",
              width: `${meteor.size * 50}px`,
              rotate: "45deg",
            }}
            animate={{
              top: ["-10px", "110%"],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: meteor.duration,
              delay: meteor.delay,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#111827] to-[#0b1220] text-white relative overflow-hidden">
      <BoxesBackground />
      <MeteorsEffect number={8} />
      <FloatingElements />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-gradient-to-b from-[#111827]/90 to-transparent backdrop-blur-md border-b border-white/10 z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <motion.div
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.5 }}
              className="w-10 h-10 bg-gradient-to-br from-red-500 to-rose-500 rounded-xl flex items-center justify-center"
            >
              <BookOpen className="text-white" size={22} />
            </motion.div>
            <span className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              PlacementTutor
            </span>
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.history.back()}
            className="bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white px-6 py-2.5 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-red-500/30"
          >
            Go Back
          </motion.button>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-20 pt-32">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-2 h-8 bg-gradient-to-b from-red-500 to-rose-500 rounded-full"></div>
            <span className="text-red-400 font-semibold uppercase tracking-wider text-sm">
              Refund & Cancellation
            </span>
            <div className="w-2 h-8 bg-gradient-to-b from-rose-500 to-red-500 rounded-full"></div>
          </div>
          
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-red-500 to-rose-600 shadow-2xl shadow-red-500/20">
            <Lock className="h-8 w-8 text-white" />
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Refund & Cancellation Policy
          </h1>
          <p className="mt-4 text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Transparent explanation of how payments, cancellations, and failures
            are handled on <span className="text-red-300 font-semibold">PlacementTutor</span>.
          </p>

          <div className="mt-8 flex justify-center gap-3 flex-wrap">
            <Badge label="Non-Refundable" />
            <Badge label="Razorpay Payments" />
            <Badge label="Transparent Policy" />
            <Badge label="Strict Terms" />
          </div>
        </motion.div>

        {/* Strict Notice */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 rounded-2xl bg-gradient-to-br from-red-500/10 to-rose-500/10 border border-red-500/20 p-6 flex gap-4 backdrop-blur-sm"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-red-500 to-rose-500 flex-shrink-0"
          >
            <AlertTriangle className="h-6 w-6 text-white" />
          </motion.div>
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Strict No-Refund Policy
            </h2>
            <p className="text-gray-300 leading-relaxed">
              All payments made on <span className="text-red-300 font-semibold">PlacementTutor</span> are{" "}
              <span className="font-bold text-red-400">final and non-refundable</span>.
              Once a booking is confirmed, the amount cannot be refunded,
              reversed, or transferred.
            </p>
          </div>
        </motion.div>

        {/* Policy Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-14">
          <PolicyCard
            icon={<Lock className="text-red-400" />}
            title="No Refunds"
            color="from-red-500/10 to-rose-500/10"
            border="border-red-500/20"
            items={[
              "All bookings are non-refundable",
              "Applies to all mentors & services",
              "No refunds for cancellations or no-shows",
              "No refunds for dissatisfaction",
            ]}
          />

          <PolicyCard
            icon={<CalendarX className="text-orange-400" />}
            title="Cancellation"
            color="from-orange-500/10 to-amber-500/10"
            border="border-orange-500/20"
            items={[
              "Users may cancel a session",
              "Cancellation does not qualify for refund",
              "Rescheduling depends on mentor approval",
            ]}
          />

          <PolicyCard
            icon={<CreditCard className="text-green-400" />}
            title="Payment Failures"
            color="from-green-500/10 to-emerald-500/10"
            border="border-green-500/20"
            items={[
              "Failed payments are not bookings",
              "Handled automatically by Razorpay",
              "Reversal in 5–7 working days",
            ]}
          />
        </div>

        {/* Additional Details */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14"
        >
          <div className="bg-gradient-to-br from-[#1f2937] to-[#111827] rounded-2xl p-8 border border-white/10 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-semibold text-white flex items-center gap-3">
                <FileText className="text-red-400" />
                Detailed Information
              </h3>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowDetails(!showDetails)}
                className="flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors"
              >
                {showDetails ? (
                  <>
                    <EyeOff size={20} />
                    Show Less
                  </>
                ) : (
                  <>
                    <Eye size={20} />
                    Show More Details
                  </>
                )}
                <motion.div
                  animate={{ rotate: showDetails ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown size={20} />
                </motion.div>
              </motion.button>
            </div>

            <AnimatePresence>
              {showDetails && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="pt-6 border-t border-white/10 space-y-8">
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-3">
                        Razorpay Processing
                      </h4>
                      <p className="text-gray-300 leading-relaxed">
                        PlacementTutor does not manually issue refunds. Failed or incomplete
                        payments are automatically reversed by Razorpay or the user's bank as
                        per gateway rules within 5-7 working days.
                      </p>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-white mb-3">
                        Mentor-Initiated Changes
                      </h4>
                      <p className="text-gray-300 leading-relaxed">
                        Only mentors can initiate rescheduling requests, and it requires student approval. 
                        If a mentor needs to reschedule, you'll receive a request via email and dashboard 
                        notification.
                      </p>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-white mb-3">
                        Contact & Support
                      </h4>
                      <p className="text-gray-300">
                        For any payment-related issues, please contact our support team at{" "}
                        <span className="text-red-400 font-medium">support@placementtutor.com</span>
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Acceptance */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl bg-gradient-to-br from-[#1f2937] to-[#111827] p-8 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 mb-16 shadow-2xl"
        >
          <div>
            <h3 className="text-xl font-semibold flex items-center gap-2 text-white">
              {agreed ? (
                <>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring" }}
                  >
                    <CheckCircle className="text-green-400" />
                  </motion.div>
                  Policy Accepted
                </>
              ) : (
                <>
                  <Lock className="text-red-400" />
                  Acknowledge Refund Policy
                </>
              )}
            </h3>
            <p className="text-gray-300 mt-2">
              {agreed
                ? "You have accepted our non-refundable policy."
                : "You must accept this policy before proceeding with bookings."}
            </p>
          </div>

          <div className="flex gap-3 flex-wrap">
            {!agreed ? (
              <motion.button
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowConfirm(true)}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 text-white hover:from-red-700 hover:to-rose-700 transition-all duration-300 shadow-lg hover:shadow-red-500/30 flex items-center gap-2 group"
              >
                <CheckCircle size={20} />
                Accept Policy
                <ArrowRight
                  size={20}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setAgreed(false)}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-gray-600 to-gray-700 text-white hover:from-gray-700 hover:to-gray-800 transition-all duration-300 shadow-lg"
              >
                Revoke Acceptance
              </motion.button>
            )}
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-sm text-gray-400 pt-8 border-t border-white/10"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="w-8 h-8 bg-gradient-to-br from-red-500 to-rose-500 rounded-lg flex items-center justify-center"
              >
                <Landmark size={16} className="text-white" />
              </motion.div>
              <span>
                Policy effective as of {new Date().toLocaleDateString('en-US', { 
                  month: 'long', 
                  day: 'numeric', 
                  year: 'numeric' 
                })} and subject to updates.
              </span>
            </div>
            <div className="flex gap-6 text-xs">
              <span className="text-gray-500">Version 1.2</span>
              <span className="text-gray-500">Last Updated: Jan 2024</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Help Button */}
      <motion.button
        whileHover={{ scale: 1.1, rotate: 10 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setShowHelp(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-2xl hover:shadow-red-500/30 z-40 flex items-center justify-center"
      >
        <HelpCircle size={24} />
      </motion.button>

      {/* Confirm Modal */}
      <AnimatePresence>
        {showConfirm && (
          <Modal onClose={() => setShowConfirm(false)}>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-rose-500 rounded-lg flex items-center justify-center">
                  <AlertTriangle size={20} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">Confirm Acceptance</h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                All payments are strictly non-refundable. Do you understand and agree
                to continue with bookings?
              </p>
              <div className="flex justify-end gap-3 pt-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowConfirm(false)}
                  className="px-4 py-2 rounded-lg border border-white/10 bg-white/5 text-gray-300 hover:bg-white/10 transition-colors"
                >
                  Review Again
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setAgreed(true);
                    setShowConfirm(false);
                  }}
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-red-600 to-rose-600 text-white hover:from-red-700 hover:to-rose-700 transition-all duration-300"
                >
                  I Understand & Agree
                </motion.button>
              </div>
            </div>
          </Modal>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showHelp && (
          <Modal onClose={() => setShowHelp(false)}>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-rose-500 rounded-lg flex items-center justify-center">
                  <HelpCircle size={20} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">Refund Policy Help</h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Once a booking is confirmed, PlacementTutor does not offer refunds
                under any circumstances. This applies to all mentor services and
                session types.
              </p>
              <div className="pt-4 border-t border-white/10">
                <h4 className="font-semibold text-white mb-2">Need Assistance?</h4>
                <p className="text-red-400">support@placementtutor.com</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowHelp(false)}
                className="w-full mt-4 py-3 bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-xl font-medium hover:from-red-700 hover:to-rose-700 transition-all duration-300"
              >
                Understood
              </motion.button>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
};

const PolicyCard = ({ icon, title, items, color, border }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    whileHover={{ y: -5, scale: 1.02 }}
    className={`relative group`}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-rose-500 rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
    <div className={`relative rounded-2xl bg-gradient-to-br from-[#1f2937] to-[#111827] p-6 border ${border} shadow-xl hover:shadow-red-500/10 transition-all duration-300`}>
      <div className="flex items-center gap-3 mb-4">
        <div className={`p-2 rounded-lg bg-gradient-to-br ${color}`}>
          {icon}
        </div>
        <h4 className="text-lg font-semibold text-white">{title}</h4>
      </div>
      <ul className="space-y-2 text-gray-300 text-sm">
        {items.map((i, idx) => (
          <motion.li
            key={idx}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="flex items-start gap-2"
          >
            <motion.div
              whileHover={{ scale: 1.2 }}
              className={`w-2 h-2 rounded-full bg-gradient-to-br ${color} flex-shrink-0 mt-2`}
            />
            <span>{i}</span>
          </motion.li>
        ))}
      </ul>
    </div>
  </motion.div>
);

const Badge = ({ label }) => (
  <motion.span
    whileHover={{ y: -2 }}
    className="px-4 py-2 rounded-full text-sm bg-gradient-to-r from-red-500/10 to-rose-500/10 border border-red-500/20 text-red-300 hover:border-red-500/40 transition-colors cursor-pointer"
  >
    {label}
  </motion.span>
);

const Modal = ({ children, onClose }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-50 flex items-center justify-center p-4"
  >
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 bg-black/70 backdrop-blur-md"
      onClick={onClose}
    />

    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      transition={{ type: "spring", damping: 25, stiffness: 300 }}
      className="relative w-full max-w-md bg-gradient-to-b from-[#1f2937] to-[#111827] rounded-2xl shadow-2xl overflow-hidden z-10 border border-white/10"
    >
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-rose-500"></div>
      <button
        onClick={onClose}
        className="absolute right-4 top-4 z-20 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors group"
      >
        <X size={20} className="text-gray-300 group-hover:text-white" />
      </button>
      <div className="p-6">{children}</div>
    </motion.div>
  </motion.div>
);

export default RefundAndCancellation;