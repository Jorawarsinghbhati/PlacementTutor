import { useEffect, useState } from "react";
import {
  ShieldCheck,
  Lock,
  Database,
  CreditCard,
  Globe,
  Settings,
  User,
  Download,
  Printer,
  HelpCircle,
  CheckCircle,
  Sparkles,
  ChevronDown,
  ArrowRight,
  Shield,
  BookOpen,
  FileText,
  ExternalLink,
  Eye,
  EyeOff,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const sections = [
  {
    title: "Information We Collect",
    icon: User,
    color: "from-blue-500 to-cyan-500",
    points: [
      "Name, email address and phone number",
      "Username and account role (User / Mentor)",
      "College and graduation year (optional)",
      "Bookings, session history and preferences",
      "Payment transaction references (no card data)",
    ],
  },
  {
    title: "How We Use Your Data",
    icon: Database,
    color: "from-purple-500 to-pink-500",
    points: [
      "Account creation and management",
      "Enable booking, rescheduling and sessions",
      "Send OTPs, confirmations and reminders",
      "Improve platform security and reliability",
    ],
  },
  {
    title: "Payments & Transactions",
    icon: CreditCard,
    color: "from-green-500 to-emerald-500",
    points: [
      "Payments processed securely via Razorpay",
      "We never store card or UPI details",
      "Only transaction IDs and payment status stored",
    ],
  },
  {
    title: "Data Security",
    icon: Lock,
    color: "from-orange-500 to-red-500",
    points: [
      "HTTPS encrypted communication",
      "OTP & OAuth-based authentication",
      "Strict internal access control",
      "Regular audits and backups",
    ],
  },
  {
    title: "Third-Party Services",
    icon: Globe,
    color: "from-indigo-500 to-purple-500",
    points: [
      "Google OAuth for authentication",
      "Razorpay for payment processing",
      "No selling of data to advertisers",
    ],
  },
  {
    title: "Cookies & Sessions",
    icon: Settings,
    color: "from-slate-500 to-gray-600",
    points: [
      "Essential cookies for login sessions",
      "Basic analytics for improvement",
      "Full control via browser settings",
    ],
  },
];

export default function PrivacyPolicy() {
  const [accepted, setAccepted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showHelp, setShowHelp] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrolled = document.documentElement.scrollTop;
      const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      setProgress((scrolled / height) * 100);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const FloatingElements = () => (
    <div className="fixed inset-0 pointer-events-none z-0">
      {Array.from({ length: 10 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-4 h-4 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-full"
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
            className="absolute h-[1px] bg-gradient-to-r from-indigo-500/50 to-transparent rounded-full"
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

      {/* Scroll Progress */}
      <div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 z-50"
        style={{ width: `${progress}%` }}
      />

      {/* Header */}
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
              className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center"
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
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-2.5 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-indigo-500/30"
          >
            Go Back
          </motion.button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-20 pt-32">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-2 h-8 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full"></div>
            <span className="text-indigo-400 font-semibold uppercase tracking-wider text-sm">
              Privacy & Security
            </span>
            <div className="w-2 h-8 bg-gradient-to-b from-purple-500 to-indigo-500 rounded-full"></div>
          </div>
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-2xl shadow-indigo-500/20">
            <ShieldCheck className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Privacy Policy
          </h1>
          <p className="mt-4 text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
            PlacementTutor respects your privacy. This policy explains what data
            we collect, how it's used, and how we keep it secure.
          </p>
          <div className="mt-8 flex justify-center gap-3 flex-wrap">
            <Badge label="Privacy-First" />
            <Badge label="Secure Payments" />
            <Badge label="Transparent Usage" />
          </div>
        </motion.div>

        {/* Sections Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 mb-20">
          {sections.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
              <div className="relative rounded-2xl bg-gradient-to-br from-[#1f2937] to-[#111827] p-6 border border-white/10 shadow-xl hover:shadow-indigo-500/10 transition-all duration-300">
                <div
                  className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${s.color} shadow-lg`}
                >
                  <s.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">
                  {s.title}
                </h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  {s.points.map((p, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="flex items-start gap-2"
                    >
                      <motion.div
                        whileHover={{ scale: 1.2 }}
                        className={`w-2 h-2 rounded-full bg-gradient-to-br ${s.color} flex-shrink-0 mt-2`}
                      />
                      <span>{p}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Details */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="bg-gradient-to-br from-[#1f2937] to-[#111827] rounded-2xl p-8 border border-white/10 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-semibold text-white flex items-center gap-3">
                <FileText className="text-indigo-400" />
                Detailed Information
              </h3>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowDetails(!showDetails)}
                className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition-colors"
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
                        Your Rights
                      </h4>
                      <ul className="space-y-2 text-gray-300">
                        <li>✓ Right to access your personal data</li>
                        <li>✓ Right to correct inaccurate data</li>
                        <li>✓ Right to request deletion of your data</li>
                        <li>✓ Right to data portability</li>
                        <li>✓ Right to object to data processing</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-white mb-3">
                        Data Retention
                      </h4>
                      <p className="text-gray-300">
                        We retain your personal data only for as long as
                        necessary to fulfill the purposes for which we collected
                        it, including for the purposes of satisfying any legal,
                        accounting, or reporting requirements.
                      </p>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-white mb-3">
                        Contact Information
                      </h4>
                      <p className="text-gray-300">
                        For any privacy-related questions or concerns, please
                        contact our Data Protection Officer at{" "}
                        <span className="text-indigo-400">
                          privacy@placementtutor.com
                        </span>
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Acceptance Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl bg-gradient-to-br from-[#1f2937] to-[#111827] p-8 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 mb-20 shadow-2xl"
        >
          <div>
            <h3 className="text-2xl font-semibold flex items-center gap-2 text-white">
              {accepted ? (
                <>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring" }}
                  >
                    <CheckCircle className="text-green-400" />
                  </motion.div>
                  Privacy Policy Accepted
                </>
              ) : (
                <>
                  <Shield className="text-indigo-400" />
                  Accept Privacy Policy
                </>
              )}
            </h3>
            <p className="text-gray-300 mt-2">
              {accepted
                ? "Thank you for accepting our Privacy Policy."
                : "Acceptance is required to continue using PlacementTutor."}
            </p>
          </div>

          <div className="flex gap-3 flex-wrap">
            {!accepted ? (
              <motion.button
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setAccepted(true)}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-indigo-500/30 flex items-center gap-2 group"
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
                onClick={() => setAccepted(false)}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-gray-600 to-gray-700 text-white hover:from-gray-700 hover:to-gray-800 transition-all duration-300 shadow-lg"
              >
                Revoke Acceptance
              </motion.button>
            )}
            <IconButton
              icon={Download}
              label="Download PDF"
              onClick={() => {
                const link = document.createElement("a");
                link.href = "/privacy-policy.pdf";
                link.download = "placementtutor-privacy-policy.pdf";
                link.click();
              }}
            />
            <IconButton
              icon={Printer}
              label="Print"
              onClick={() => window.print()}
            />
            <IconButton
              icon={ExternalLink}
              label="Terms"
              onClick={() => window.open("/terms", "_blank")}
            />
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
                className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center"
              >
                <ShieldCheck size={16} className="text-white" />
              </motion.div>
              <span>© {new Date().getFullYear()} PlacementTutor. All rights reserved.</span>
            </div>
        
          </div>
        </motion.div>
      </div>

      {/* Help Button */}
      <motion.button
        whileHover={{ scale: 1.1, rotate: 10 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setShowHelp(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-2xl hover:shadow-indigo-500/30 z-40 flex items-center justify-center"
      >
        <HelpCircle size={24} />
      </motion.button>

      <AnimatePresence>
        {showHelp && (
          <Modal onClose={() => setShowHelp(false)}>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <Shield size={20} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">
                  Your Privacy Rights
                </h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                You can access, update, or request deletion of your data by
                contacting PlacementTutor support. We're committed to protecting
                your privacy and will respond to your request within 30 days.
              </p>
              <div className="pt-4 border-t border-white/10">
                <h4 className="font-semibold text-white mb-2">Contact Support:</h4>
                <p className="text-indigo-400">privacy@placementtutor.com</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowHelp(false)}
                className="w-full mt-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-medium"
              >
                Got it, thanks!
              </motion.button>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
}

function Badge({ label }) {
  return (
    <motion.span
      whileHover={{ y: -2 }}
      className="px-4 py-2 rounded-full text-sm bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 text-indigo-300 hover:border-indigo-500/40 transition-colors cursor-pointer"
    >
      {label}
    </motion.span>
  );
}

function IconButton({ icon: Icon, label, onClick }) {
  return (
    <motion.button
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="p-3 rounded-xl border border-white/10 hover:border-indigo-500/30 bg-white/5 hover:bg-indigo-500/10 transition-all duration-300 group flex items-center gap-2"
    >
      <Icon className="h-5 w-5 text-gray-300 group-hover:text-indigo-300" />
      <span className="text-sm text-gray-300 group-hover:text-indigo-300 hidden md:inline">
        {label}
      </span>
    </motion.button>
  );
}

function Modal({ children, onClose }) {
  return (
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
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-20 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors group"
        >
          <span className="text-gray-300 group-hover:text-white text-xl">✕</span>
        </button>
        <div className="p-6">{children}</div>
      </motion.div>
    </motion.div>
  );
}