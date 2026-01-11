
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { 
//   Card, 
//   Tag, 
//   Button, 
//   Modal, 
//   notification, 
//   Divider,
//   Alert,
//   Badge,
//   Tooltip,
//   Space,
//   Collapse
// } from 'antd';
// import {
//   FileTextOutlined,
//   CheckCircleOutlined,
//   ExclamationCircleOutlined,
//   LockOutlined,
//   DollarOutlined,
//   CalendarOutlined,
//   UserOutlined,
//   WarningOutlined,
//   SafetyOutlined,
//   GlobalOutlined,
//   BookOutlined,
//   TeamOutlined,
//   ClockCircleOutlined,
//   InfoCircleOutlined,
//   ArrowRightOutlined,
//   DownloadOutlined,
//   PrinterOutlined,
//   QuestionCircleOutlined,
//   BankOutlined,
//   AuditOutlined,
//   SettingOutlined,
//   FileProtectOutlined,
//   CrownOutlined,
//   LineChartOutlined
// } from '@ant-design/icons';

// const { Panel } = Collapse;

// const TermsAndConditions = () => {
//   const navigate = useNavigate();
//   const [accepted, setAccepted] = useState(false);
//   const [activeTerm, setActiveTerm] = useState(0);
//   const [showDetails, setShowDetails] = useState(false);
//   const [agreementModal, setAgreementModal] = useState(false);

//   const terms = [
//     {
//       id: 1,
//       icon: <BookOutlined />,
//       title: "Description of Service",
//       content: "PlacementTutor is an online mentorship and consultation booking platform that allows users to book sessions with mentors and make payments online.",
//       color: "blue",
//       gradient: "from-blue-500/10 to-cyan-500/10"
//     },
//     {
//       id: 2,
//       icon: <DollarOutlined />,
//       title: "Pricing & Payments",
//       content: "All payments are processed securely through Razorpay. Prices are displayed before checkout and may change without prior notice.",
//       color: "purple",
//       gradient: "from-purple-500/10 to-pink-500/10"
//     },
//     {
//       id: 3,
//       icon: <CalendarOutlined />,
//       title: "Booking & Rescheduling",
//       content: "Bookings are subject to mentor availability. Rescheduling requests must be made according to platform rules and mentor approval.",
//       color: "orange",
//       gradient: "from-orange-500/10 to-amber-500/10"
//     },
//     {
//       id: 4,
//       icon: <WarningOutlined />,
//       title: "Refund Policy",
//       content: "Payments are generally non-refundable. However, refunds may be issued in case of mentor cancellation, duplicate payment, or technical failure, as per platform discretion.",
//       color: "red",
//       gradient: "from-red-500/10 to-rose-500/10",
//       highlight: true
//     },
//     {
//       id: 5,
//       icon: <BankOutlined />,
//       title: "Payment Failure",
//       content: "In case of payment failure where amount is debited, Razorpay will automatically process refund within 5–7 working days.",
//       color: "indigo",
//       gradient: "from-indigo-500/10 to-violet-500/10"
//     },
//     {
//       id: 6,
//       icon: <TeamOutlined />,
//       title: "User Responsibilities",
//       content: "Users agree to provide accurate information and must not misuse platform for illegal, fraudulent, or abusive activities.",
//       color: "teal",
//       gradient: "from-teal-500/10 to-cyan-500/10"
//     },
//     {
//       id: 7,
//       icon: <FileProtectOutlined />,
//       title: "Limitation of Liability",
//       content: "PlacementTutor acts only as a facilitator. Not responsible for advice, quality, or outcome of mentorship sessions.",
//       color: "gray",
//       gradient: "from-gray-500/10 to-slate-500/10"
//     },
//     {
//       id: 8,
//       icon: <SettingOutlined />,
//       title: "Account Suspension",
//       content: "We reserve right to suspend or terminate accounts that violate terms or misuse the platform.",
//       color: "yellow",
//       gradient: "from-yellow-500/10 to-amber-500/10"
//     },
//     {
//       id: 9,
//       icon: <CrownOutlined />,
//       title: "Intellectual Property",
//       content: "All content, branding, and features are intellectual property of PlacementTutor and may not be reused without permission.",
//       color: "pink",
//       gradient: "from-pink-500/10 to-rose-500/10"
//     },
//     {
//       id: 10,
//       icon: <SafetyOutlined />,
//       title: "Privacy Policy",
//       content: "User data is collected and processed in accordance with our Privacy Policy. By using this platform, you consent to such data usage.",
//       color: "green",
//       gradient: "from-green-500/10 to-emerald-500/10",
//       highlight: true
//     }
//   ];

//   const confirmAccept = () => {
//     setAccepted(true);
//     setAgreementModal(false);
    
//     notification.success({
//       message: 'Terms Accepted',
//       description: 'Redirecting to home page...',
//       placement: 'bottomRight',
//       className: 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-sm',
//       icon: <CheckCircleOutlined className="text-green-400" />
//     });
    
//     // Redirect to home page after 2 seconds
//     setTimeout(() => {
//       navigate('/');
//     }, 2000);
//   };

//   const legalPoints = [
//     "Legally binding agreement between you and PlacementTutor",
//     "Terms may be updated periodically",
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
//       <div className="fixed inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-blue-500/5 to-transparent"></div>
//         <div className="hidden md:block absolute top-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse"></div>
//         <div className="hidden md:block absolute bottom-1/4 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
//       </div>

//       <div className="relative z-10 max-w-6xl mx-auto p-4 md:p-8">
//         <div className="text-center mb-8 md:mb-12 pt-4 md:pt-8">
//           <div className="inline-flex items-center justify-center p-3 md:p-4 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-2xl md:rounded-3xl mb-4 md:mb-6">
//             <div className="relative">
//               <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg md:shadow-2xl">
//                 <FileTextOutlined className="text-2xl md:text-3xl text-white" />
//               </div>
//               <div className="absolute -top-1 -right-1 md:-top-2 md:-right-2 w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center shadow-md md:shadow-lg animate-ping">
//                 <FileProtectOutlined className="text-white text-xs" />
//               </div>
//             </div>
//           </div>
          
//           <h1 className="text-2xl md:text-4xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2 md:mb-4 px-2">
//             Terms & Conditions
//           </h1>
          
//           <p className="text-base md:text-xl text-gray-600 max-w-3xl mx-auto mb-4 md:mb-6 px-2">
//             Legal agreement governing your use of PlacementTutor platform and services
//           </p>
          
//           <div className="flex flex-wrap justify-center gap-2 md:gap-3 mt-4 md:mt-6 px-2">
//             <Tag icon={<LockOutlined />} color="red" className="px-3 py-1 md:px-5 md:py-2 text-sm md:text-base rounded-full animate-pulse">
//               Legally Binding
//             </Tag>
//             <Tag icon={<SafetyOutlined />} color="blue" className="px-3 py-1 md:px-5 md:py-2 text-sm md:text-base rounded-full">
//               Required Acceptance
//             </Tag>
//           </div>
//         </div>

//         <div className="mb-6 md:mb-8 px-2">
//           <Alert
//             message={
//               <div className="flex items-start md:items-center">
//                 <ExclamationCircleOutlined className="text-amber-500 text-lg md:text-xl mr-2 md:mr-3 flex-shrink-0 mt-0.5 md:mt-0" />
//                 <div>
//                   <div className="font-bold text-sm md:text-base">Important Notice</div>
//                   <div className="text-xs md:text-sm">By accessing or using PlacementTutor, you agree to be bound by these Terms & Conditions</div>
//                 </div>
//               </div>
//             }
//             type="warning"
//             showIcon={false}
//             className="rounded-xl md:rounded-2xl border border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50"
//           />
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8 mb-8 md:mb-12">
//           <div className="lg:col-span-2 space-y-4 md:space-y-6 px-2 md:px-0">
//             {terms.map((term, index) => (
//               <div
//                 key={term.id}
//                 className={`term-section p-4 md:p-6 rounded-xl md:rounded-2xl border border-gray-200/50 md:border-2 bg-gradient-to-br ${term.gradient} transform transition-all duration-500 hover:scale-[1.02] hover:shadow-lg md:hover:shadow-xl cursor-pointer ${activeTerm === index ? 'ring-1 md:ring-2 ring-blue-500' : ''}`}
//                 onClick={() => setActiveTerm(index)}
//                 onMouseEnter={() => setActiveTerm(index)}
//               >
//                 <div className="flex items-start space-x-3 md:space-x-4">
//                   <div className={`flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-lg md:rounded-xl bg-${term.color}-100 flex items-center justify-center`}>
//                     <div className={`text-${term.color}-600 text-lg md:text-xl`}>
//                       {term.icon}
//                     </div>
//                   </div>
                  
//                   <div className="flex-grow min-w-0">
//                     <div className="flex flex-col md:flex-row md:items-center justify-between mb-1 md:mb-2 gap-1">
//                       <h3 className="text-lg md:text-xl font-bold text-gray-900 truncate">
//                         {term.id}. {term.title}
//                       </h3>
//                       {term.highlight && (
//                         <Badge color="red" text="Important" className="text-xs md:text-sm animate-pulse" />
//                       )}
//                     </div>
                    
//                     <p className="text-gray-700 text-sm md:text-base mb-3 md:mb-4 line-clamp-2 md:line-clamp-none">
//                       {term.content}
//                     </p>
                    
//                     <div className="flex flex-wrap items-center gap-1 md:gap-3">
//                       <div className={`w-2 h-2 rounded-full bg-${term.color}-500`}></div>
//                       <span className="text-xs md:text-sm text-gray-500">Section {term.id}</span>
//                       <span className="text-xs md:text-sm text-gray-500 hidden md:inline">•</span>
//                       <span className="text-xs md:text-sm text-gray-500">Legal requirement</span>
//                     </div>
//                   </div>
//                 </div>
                
//                 {activeTerm === index && (
//                   <div className="mt-3 md:mt-4 pt-3 md:pt-4 border-t border-gray-200 flex items-center justify-between">
//                     <div className="flex items-center space-x-1 md:space-x-2 text-blue-600">
//                       <InfoCircleOutlined className="text-sm md:text-base" />
//                       <span className="text-xs md:text-sm">Currently viewing</span>
//                     </div>
//                     <Button
//                       type="link"
//                       size="small"
//                       onClick={() => setShowDetails(true)}
//                       className="text-gray-600 hover:text-blue-600 text-xs md:text-sm"
//                     >
//                       More details
//                     </Button>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>

//           <div className="space-y-4 md:space-y-6 px-2 md:px-0">
//             <Card className="rounded-xl md:rounded-2xl border-0 shadow-lg md:shadow-xl bg-gradient-to-br from-gray-900 to-gray-800 text-white">
//               <div className="p-4 md:p-6">
//                 <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4 flex items-center">
//                   <AuditOutlined className="mr-2 md:mr-3 text-blue-400" />
//                   Quick Summary
//                 </h3>
                
//                 <ul className="space-y-2 md:space-y-3">
//                   {[
//                     "Non-refundable payments",
//                     "Secure Razorpay processing",
//                     "Mentor availability subject",
//                     "Platform rules compliance",
//                     "Intellectual property protection"
//                   ].map((point, index) => (
//                     <li key={index} className="flex items-start space-x-2 md:space-x-3">
//                       <CheckCircleOutlined className="text-green-400 mt-0.5 md:mt-0 flex-shrink-0" />
//                       <span className="text-gray-300 text-sm md:text-base">{point}</span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </Card>

//             <Card className="rounded-xl md:rounded-2xl border-0 shadow-lg md:shadow-xl bg-gradient-to-br from-white to-blue-50/50">
//               <div className="p-4 md:p-6">
//                 <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4 flex items-center">
//                   <ClockCircleOutlined className="mr-2 md:mr-3 text-purple-500" />
//                   Legal Journey
//                 </h3>
                
//                 <div className="space-y-3 md:space-y-4">
//                   <div className="flex items-center space-x-2 md:space-x-3">
//                     <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
//                       <span className="text-blue-600 font-bold text-xs md:text-sm">1</span>
//                     </div>
//                     <div className="min-w-0">
//                       <div className="font-semibold text-gray-900 text-sm md:text-base truncate">Read Terms</div>
//                       <div className="text-xs md:text-sm text-gray-500">Understand all sections</div>
//                     </div>
//                   </div>
                  
//                   <div className="flex items-center space-x-2 md:space-x-3">
//                     <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
//                       <span className="text-green-600 font-bold text-xs md:text-sm">2</span>
//                     </div>
//                     <div className="min-w-0">
//                       <div className="font-semibold text-gray-900 text-sm md:text-base truncate">Accept Terms</div>
//                       <div className="text-xs md:text-sm text-gray-500">Required to proceed</div>
//                     </div>
//                   </div>
                  
//                   <div className="flex items-center space-x-2 md:space-x-3">
//                     <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
//                       <span className="text-purple-600 font-bold text-xs md:text-sm">3</span>
//                     </div>
//                     <div className="min-w-0">
//                       <div className="font-semibold text-gray-900 text-sm md:text-base truncate">Full Access</div>
//                       <div className="text-xs md:text-sm text-gray-500">Unlock all features</div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </Card>

//             {/* Print & Download Tools */}
//             <Card className="rounded-xl md:rounded-2xl border-0 shadow-lg md:shadow-xl bg-gradient-to-br from-white to-gray-50">
//               <div className="p-4 md:p-6">
//                 <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4 flex items-center">
//                   <PrinterOutlined className="mr-2 md:mr-3 text-blue-500" />
//                   Tools
//                 </h3>
                
//                 <div className="space-y-2 md:space-y-3">
//                   <Button
//                     icon={<PrinterOutlined />}
//                     block
//                     onClick={() => window.print()}
//                     className="border-blue-200 hover:border-blue-500 text-blue-600 hover:text-blue-700 h-10 md:h-auto"
//                     size="middle"
//                   >
//                     <span className="hidden sm:inline">Print Terms</span>
//                     <span className="sm:hidden">Print</span>
//                   </Button>
                  
//                   <Button
//                     icon={<DownloadOutlined />}
//                     block
//                     className="border-gray-200 hover:border-gray-400 text-gray-600 hover:text-gray-800 h-10 md:h-auto"
//                     size="middle"
//                   >
//                     <span className="hidden sm:inline">Download PDF</span>
//                     <span className="sm:hidden">Download</span>
//                   </Button>
//                 </div>
//               </div>
//             </Card>
//           </div>
//         </div>

//         <Card className="rounded-xl md:rounded-3xl border-0 shadow-lg md:shadow-2xl mb-8 md:mb-12 bg-gradient-to-br from-white to-gray-50/50 backdrop-blur-sm">
//           <div className="p-4 md:p-6">
//             <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6 flex items-center">
//               <LineChartOutlined className="text-blue-500 mr-2 md:mr-3" />
//               Legal Framework & Key Points
//             </h2>
            
//             <Collapse
//               bordered={false}
//               className="bg-transparent"
//               expandIconPosition="end"
//               defaultActiveKey={['1']}
//             >
//               <Panel
//                 header="Binding Legal Agreement"
//                 key="1"
//                 className="mb-3 md:mb-4 rounded-xl md:rounded-2xl bg-white shadow-md md:shadow-lg border border-gray-200 hover:shadow-lg md:hover:shadow-xl transition-shadow duration-300"
//               >
//                 <div className="p-3 md:p-4 space-y-3 md:space-y-4">
//                   <ul className="space-y-2 md:space-y-3">
//                     {legalPoints.map((point, index) => (
//                       <li key={index} className="flex items-start space-x-2 md:space-x-3">
//                         <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
//                         <span className="text-gray-700 text-sm md:text-base">{point}</span>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               </Panel>
              
//               <Panel
//                 header="Platform Rules & Regulations"
//                 key="2"
//                 className="mb-3 md:mb-4 rounded-xl md:rounded-2xl bg-white shadow-md md:shadow-lg border border-gray-200 hover:shadow-lg md:hover:shadow-xl transition-shadow duration-300"
//               >
//                 <div className="p-3 md:p-4 text-gray-700 text-sm md:text-base">
//                   <p>
//                     Users must comply with all platform rules, including proper conduct during sessions, 
//                     timely payments, and respectful communication with mentors and staff.
//                   </p>
//                 </div>
//               </Panel>
//             </Collapse>
//           </div>
//         </Card>

//         {/* Fixed Bottom Bar for Mobile */}
//         <div className="fixed bottom-0 left-0 right-0 md:hidden bg-white border-t border-gray-200 shadow-2xl p-4 z-50">
//           <Button
//             type="primary"
//             block
//             size="large"
//             onClick={() => setAgreementModal(true)}
//             className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 border-0 h-12 text-base font-semibold"
//             disabled={accepted}
//           >
//             {accepted ? (
//               <>
//                 <CheckCircleOutlined /> Accepted ✓
//               </>
//             ) : (
//               <>
//                 Accept Terms & Conditions <ArrowRightOutlined />
//               </>
//             )}
//           </Button>
//         </div>

//         {/* Desktop Acceptance Button */}
//         <div className="hidden md:block">
//           <Card className="rounded-3xl border-0 shadow-2xl bg-gradient-to-r from-blue-50/80 via-white to-cyan-50/80 backdrop-blur-sm mb-12">
//             <div className="p-8 text-center">
//               <div className="max-w-2xl mx-auto">
//                 <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center justify-center">
//                   <SafetyOutlined className="mr-3 text-blue-500" />
//                   Ready to Accept Terms?
//                 </h3>
                
//                 <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
//                   <div className="text-left">
//                     <div className="flex items-center space-x-2 mb-2">
//                       <CheckCircleOutlined className="text-green-500" />
//                       <span className="text-gray-700">Read all terms above</span>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <CheckCircleOutlined className="text-green-500" />
//                       <span className="text-gray-700">Understand legal obligations</span>
//                     </div>
//                   </div>
                  
//                   <Divider type="vertical" className="hidden sm:block h-10" />
//                   <Divider className="sm:hidden" />
                  
//                   <Button
//                     type="primary"
//                     size="large"
//                     onClick={() => setAgreementModal(true)}
//                     className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 border-0 px-8 h-12 text-base font-semibold"
//                     disabled={accepted}
//                   >
//                     {accepted ? (
//                       <>
//                         <CheckCircleOutlined /> Terms Accepted ✓
//                       </>
//                     ) : (
//                       <>
//                         I Accept All Terms <ArrowRightOutlined className="ml-2" />
//                       </>
//                     )}
//                   </Button>
//                 </div>
                
//                 <p className="text-gray-500 text-sm mt-4">
//                   By accepting, you agree to all Terms & Conditions listed above
//                 </p>
//               </div>
//             </div>
//           </Card>
//         </div>
//       </div>

//       {/* Fixed Help Button */}
//       <div className="fixed bottom-6 right-6 z-50">
//         <Tooltip title="Legal Help" color="blue">
//           <Button
//             type="primary"
//             shape="circle"
//             size={window.innerWidth < 768 ? "large" : "large"}
//             icon={<QuestionCircleOutlined />}
//             className="bg-gradient-to-br from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 border-0 shadow-2xl animate-bounce"
//             onClick={() => setShowDetails(true)}
//           />
//         </Tooltip>
//       </div>

//       {/* Modal for Agreement */}
//       <Modal
//         title={
//           <div className="flex items-center space-x-2 md:space-x-3">
//             <FileProtectOutlined className="text-xl md:text-2xl text-blue-500" />
//             <span className="text-lg md:text-xl font-bold">Accept Terms & Conditions</span>
//           </div>
//         }
//         open={agreementModal}
//         onCancel={() => setAgreementModal(false)}
//         footer={[
//           <Button key="cancel" onClick={() => setAgreementModal(false)} className="h-10 md:h-auto">
//             Cancel
//           </Button>,
//           <Button
//             key="accept"
//             type="primary"
//             onClick={confirmAccept}
//             className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 border-0 h-10 md:h-auto"
//           >
//             I Accept All Terms
//           </Button>
//         ]}
//         className="rounded-xl md:rounded-2xl"
//         width={window.innerWidth < 768 ? "90%" : 600}
//       >
//         <div className="space-y-4 md:space-y-6 py-3 md:py-4">
//           <Alert
//             message="Legal Binding Agreement"
//             description="By accepting, you enter into a legally binding contract with PlacementTutor."
//             type="warning"
//             showIcon
//             className="bg-amber-50 border-amber-200"
//           />
          
//           <div className="p-3 md:p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg md:rounded-xl border border-blue-200">
//             <h4 className="font-bold text-gray-900 mb-2 md:mb-3 text-sm md:text-base">What you're agreeing to:</h4>
//             <ul className="space-y-1 md:space-y-2 text-gray-700 text-sm md:text-base">
//               <li className="flex items-start space-x-2">
//                 <ExclamationCircleOutlined className="text-blue-500 mt-0.5 md:mt-1 flex-shrink-0" />
//                 <span>Non-refundable payment policy</span>
//               </li>
//               <li className="flex items-start space-x-2">
//                 <ExclamationCircleOutlined className="text-blue-500 mt-0.5 md:mt-1 flex-shrink-0" />
//                 <span>Compliance with all platform rules</span>
//               </li>
//               <li className="flex items-start space-x-2">
//                 <ExclamationCircleOutlined className="text-blue-500 mt-0.5 md:mt-1 flex-shrink-0" />
//                 <span>Acceptance of liability limitations</span>
//               </li>
//               <li className="flex items-start space-x-2">
//                 <ExclamationCircleOutlined className="text-blue-500 mt-0.5 md:mt-1 flex-shrink-0" />
//                 <span>Indian law as governing jurisdiction</span>
//               </li>
//             </ul>
//           </div>
          
//           <p className="text-gray-700 text-xs md:text-sm">
//             I confirm that I have read, understood, and agree to be bound by all Terms & Conditions.
//           </p>
//         </div>
//       </Modal>

//       {/* Modal for Terms Details */}
//       <Modal
//         title={
//           <div className="flex items-center space-x-2 md:space-x-3">
//             <InfoCircleOutlined className="text-xl md:text-2xl text-blue-500" />
//             <span className="text-lg md:text-xl font-bold">Terms Details</span>
//           </div>
//         }
//         open={showDetails}
//         onCancel={() => setShowDetails(false)}
//         footer={[
//           <Button key="close" onClick={() => setShowDetails(false)} className="h-10 md:h-auto">
//             Close
//           </Button>
//         ]}
//         className="rounded-xl md:rounded-2xl"
//         width={window.innerWidth < 768 ? "90%" : 700}
//       >
//         <div className="space-y-3 md:space-y-4">
//           <Alert
//             message="Legal Interpretation"
//             description="For complete understanding, consult with legal counsel if needed."
//             type="info"
//             showIcon
//           />
          
//           <div className="space-y-3 md:space-y-4">
//             {terms.filter(t => t.id === activeTerm + 1).map(term => (
//               <div key={term.id} className="p-3 md:p-4 rounded-lg md:rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50">
//                 <h4 className="font-bold text-gray-900 text-base md:text-lg mb-1 md:mb-2">
//                   {term.id}. {term.title}
//                 </h4>
//                 <p className="text-gray-700 text-sm md:text-base">{term.content}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </Modal>
//     </div>
//   );
// };

// export default TermsAndConditions;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText,
  CheckCircle,
  AlertTriangle,
  Lock,
  CreditCard,
  Calendar,
  User,
  AlertCircle,
  Shield,
  Globe,
  BookOpen,
  Users,
  Clock,
  Info,
  ArrowRight,
  Download,
  Printer,
  HelpCircle,
  Building,
  Settings,
  Crown,
  TrendingUp,
  ChevronDown,
  Eye,
  EyeOff,
  Sparkles,
  X,
} from 'lucide-react';

const TermsAndConditions = () => {
  const navigate = useNavigate();
  const [accepted, setAccepted] = useState(false);
  const [activeTerm, setActiveTerm] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  const [agreementModal, setAgreementModal] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  const terms = [
    {
      id: 1,
      icon: <BookOpen />,
      title: "Description of Service",
      content: "PlacementTutor is an online mentorship and consultation booking platform that allows users to book sessions with mentors and make payments online.",
      color: "from-blue-500/10 to-cyan-500/10",
      border: "border-blue-500/20",
      iconColor: "text-blue-400"
    },
    {
      id: 2,
      icon: <CreditCard />,
      title: "Pricing & Payments",
      content: "All payments are processed securely through Razorpay. Prices are displayed before checkout and may change without prior notice.",
      color: "from-purple-500/10 to-pink-500/10",
      border: "border-purple-500/20",
      iconColor: "text-purple-400"
    },
    {
      id: 3,
      icon: <Calendar />,
      title: "Booking & Rescheduling",
      content: "Bookings are subject to mentor availability. Rescheduling requests must be made according to platform rules and mentor approval.",
      color: "from-orange-500/10 to-amber-500/10",
      border: "border-orange-500/20",
      iconColor: "text-orange-400"
    },
    {
      id: 4,
      icon: <AlertCircle />,
      title: "Refund Policy",
      content: "Payments are generally non-refundable. However, refunds may be issued in case of mentor cancellation, duplicate payment, or technical failure, as per platform discretion.",
      color: "from-red-500/10 to-rose-500/10",
      border: "border-red-500/20",
      iconColor: "text-red-400",
      highlight: true
    },
    {
      id: 5,
      icon: <Building />,
      title: "Payment Failure",
      content: "In case of payment failure where amount is debited, Razorpay will automatically process refund within 5–7 working days.",
      color: "from-indigo-500/10 to-violet-500/10",
      border: "border-indigo-500/20",
      iconColor: "text-indigo-400"
    },
    {
      id: 6,
      icon: <Users />,
      title: "User Responsibilities",
      content: "Users agree to provide accurate information and must not misuse platform for illegal, fraudulent, or abusive activities.",
      color: "from-teal-500/10 to-cyan-500/10",
      border: "border-teal-500/20",
      iconColor: "text-teal-400"
    },
    {
      id: 7,
      icon: <FileText />,
      title: "Limitation of Liability",
      content: "PlacementTutor acts only as a facilitator. Not responsible for advice, quality, or outcome of mentorship sessions.",
      color: "from-gray-500/10 to-slate-500/10",
      border: "border-gray-500/20",
      iconColor: "text-gray-400"
    },
    {
      id: 8,
      icon: <Settings />,
      title: "Account Suspension",
      content: "We reserve right to suspend or terminate accounts that violate terms or misuse the platform.",
      color: "from-yellow-500/10 to-amber-500/10",
      border: "border-yellow-500/20",
      iconColor: "text-yellow-400"
    },
    {
      id: 9,
      icon: <Crown />,
      title: "Intellectual Property",
      content: "All content, branding, and features are intellectual property of PlacementTutor and may not be reused without permission.",
      color: "from-pink-500/10 to-rose-500/10",
      border: "border-pink-500/20",
      iconColor: "text-pink-400"
    },
    {
      id: 10,
      icon: <Shield />,
      title: "Privacy Policy",
      content: "User data is collected and processed in accordance with our Privacy Policy. By using this platform, you consent to such data usage.",
      color: "from-green-500/10 to-emerald-500/10",
      border: "border-green-500/20",
      iconColor: "text-green-400",
      highlight: true
    }
  ];

  const FloatingElements = () => (
    <div className="fixed inset-0 pointer-events-none z-0">
      {Array.from({ length: 10 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-4 h-4 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-full"
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
            className="absolute h-[1px] bg-gradient-to-r from-blue-500/50 to-transparent rounded-full"
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

  const confirmAccept = () => {
    setAccepted(true);
    setAgreementModal(false);
    
    // Redirect to home page after 2 seconds
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  const legalPoints = [
    "Legally binding agreement between you and PlacementTutor",
    "Terms may be updated periodically",
    "Indian law as governing jurisdiction",
    "Platform rules compliance mandatory",
  ];

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
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => window.history.back()}
          >
            <motion.div
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.5 }}
              className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center"
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
            onClick={() => setAgreementModal(true)}
            className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-6 py-2.5 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-blue-500/30"
            disabled={accepted}
          >
            {accepted ? 'Terms Accepted ✓' : 'Accept Terms'}
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
            <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full"></div>
            <span className="text-blue-400 font-semibold uppercase tracking-wider text-sm">
              Terms & Conditions
            </span>
            <div className="w-2 h-8 bg-gradient-to-b from-cyan-500 to-blue-500 rounded-full"></div>
          </div>
          
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-600 shadow-2xl shadow-blue-500/20">
            <FileText className="h-10 w-10 text-white" />
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Terms & Conditions
          </h1>
          <p className="mt-4 text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Legal agreement governing your use of <span className="text-blue-300 font-semibold">PlacementTutor</span> platform and services
          </p>

          <div className="mt-8 flex justify-center gap-3 flex-wrap">
            <Badge label="Legally Binding" />
            <Badge label="Required Acceptance" />
            <Badge label="Legal Contract" />
            <Badge label="Platform Rules" />
          </div>
        </motion.div>

        {/* Important Notice */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 rounded-2xl bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/20 p-6 flex gap-4 backdrop-blur-sm"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex-shrink-0"
          >
            <AlertTriangle className="h-6 w-6 text-white" />
          </motion.div>
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Important Notice
            </h2>
            <p className="text-gray-300 leading-relaxed">
              By accessing or using <span className="text-amber-300 font-semibold">PlacementTutor</span>, you agree to be bound by these Terms & Conditions.
            </p>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Main Terms Section */}
          <div className="lg:col-span-2 space-y-6">
            {terms.map((term, index) => (
              <motion.div
                key={term.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className={`relative group cursor-pointer ${activeTerm === index ? 'ring-2 ring-blue-500' : ''}`}
                onClick={() => setActiveTerm(index)}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                <div className={`relative rounded-2xl bg-gradient-to-br from-[#1f2937] to-[#111827] p-6 border ${term.border} shadow-xl hover:shadow-blue-500/10 transition-all duration-300`}>
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${term.color} flex-shrink-0`}>
                      <div className={term.iconColor}>
                        {term.icon}
                      </div>
                    </div>
                    
                    <div className="flex-grow min-w-0">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-xl font-bold text-white truncate">
                          {term.id}. {term.title}
                        </h3>
                        {term.highlight && (
                          <motion.div
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-red-500/10 to-rose-500/10 border border-red-500/20 text-red-300"
                          >
                            Important
                          </motion.div>
                        )}
                      </div>
                      
                      <p className="text-gray-300 mb-4">
                        {term.content}
                      </p>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500"></div>
                          <span>Section {term.id}</span>
                        </div>
                        <span>•</span>
                        <span>Legal requirement</span>
                      </div>
                    </div>
                  </div>
                  
                  {activeTerm === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2 text-blue-400">
                        <Info size={16} />
                        <span className="text-sm">Currently viewing</span>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setShowDetails(true)}
                        className="text-blue-400 hover:text-blue-300 text-sm transition-colors"
                      >
                        More details
                      </motion.button>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl bg-gradient-to-br from-[#1f2937] to-[#111827] p-6 border border-white/10 shadow-xl"
            >
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                <Building className="text-blue-400" />
                Quick Summary
              </h3>
              
              <ul className="space-y-3">
                {[
                  "Non-refundable payments",
                  "Secure Razorpay processing",
                  "Mentor availability subject",
                  "Platform rules compliance",
                  "Intellectual property protection"
                ].map((point, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle className="text-green-400 mt-1 flex-shrink-0" size={16} />
                    <span className="text-gray-300">{point}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Legal Journey */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl bg-gradient-to-br from-[#1f2937] to-[#111827] p-6 border border-white/10 shadow-xl"
            >
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                <Clock className="text-purple-400" />
                Legal Journey
              </h3>
              
              <div className="space-y-4">
                {[
                  { step: "1", title: "Read Terms", desc: "Understand all sections" },
                  { step: "2", title: "Accept Terms", desc: "Required to proceed" },
                  { step: "3", title: "Full Access", desc: "Unlock all features" }
                ].map((item, index) => (
                  <motion.div
                    key={item.step}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-4"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 flex items-center justify-center flex-shrink-0">
                      <span className="font-bold text-white">{item.step}</span>
                    </div>
                    <div className="min-w-0">
                      <div className="font-semibold text-white truncate">{item.title}</div>
                      <div className="text-sm text-gray-400">{item.desc}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Tools */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl bg-gradient-to-br from-[#1f2937] to-[#111827] p-6 border border-white/10 shadow-xl"
            >
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                <Printer className="text-blue-400" />
                Tools
              </h3>
              
              <div className="space-y-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => window.print()}
                  className="w-full py-3 rounded-xl border border-blue-500/20 text-blue-400 hover:border-blue-500/40 hover:text-blue-300 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Printer size={18} />
                  Print Terms
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 rounded-xl border border-gray-500/20 text-gray-400 hover:border-gray-500/40 hover:text-gray-300 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Download size={18} />
                  Download PDF
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Legal Framework */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl bg-gradient-to-br from-[#1f2937] to-[#111827] p-8 border border-white/10 mb-12 shadow-xl"
        >
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <TrendingUp className="text-blue-400" />
            Legal Framework & Key Points
          </h2>
          
          <div className="space-y-4">
            {[
              {
                title: "Binding Legal Agreement",
                points: legalPoints
              },
              {
                title: "Platform Rules & Regulations",
                content: "Users must comply with all platform rules, including proper conduct during sessions, timely payments, and respectful communication with mentors and staff."
              }
            ].map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="rounded-xl bg-gradient-to-br from-white/5 to-transparent p-6 border border-white/10 hover:shadow-lg transition-shadow duration-300"
              >
                <h3 className="text-lg font-semibold text-white mb-4">{section.title}</h3>
                {section.points ? (
                  <ul className="space-y-2">
                    {section.points.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-gray-300">
                        <div className="w-2 h-2 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 mt-2 flex-shrink-0"></div>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-300">{section.content}</p>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Acceptance Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl bg-gradient-to-br from-[#1f2937] to-[#111827] p-8 border border-white/10 shadow-2xl"
        >
          <div className="text-center">
            <div className="max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center justify-center gap-3">
                <Shield className="text-blue-400" />
                Ready to Accept Terms?
              </h3>
              
              <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                <div className="text-left">
                  <div className="flex items-center gap-3 mb-3">
                    <CheckCircle className="text-green-400" />
                    <span className="text-gray-300">Read all terms above</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="text-green-400" />
                    <span className="text-gray-300">Understand legal obligations</span>
                  </div>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setAgreementModal(true)}
                  disabled={accepted}
                  className={`px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg flex items-center gap-3 group relative overflow-hidden ${
                    accepted
                      ? 'bg-gradient-to-r from-gray-600 to-gray-700 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 hover:shadow-blue-500/30'
                  }`}
                >
                  {accepted ? (
                    <>
                      <CheckCircle size={22} />
                      Terms Accepted ✓
                    </>
                  ) : (
                    <>
                      I Accept All Terms
                      <ArrowRight
                        size={22}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </>
                  )}
                </motion.button>
              </div>
              
              <p className="text-gray-400 text-sm mt-4">
                By accepting, you agree to all Terms & Conditions listed above
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Help Button */}
      <motion.button
        whileHover={{ scale: 1.1, rotate: 10 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setShowHelp(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-2xl hover:shadow-blue-500/30 z-40 flex items-center justify-center"
      >
        <HelpCircle size={24} />
      </motion.button>

      {/* Agreement Modal */}
      <AnimatePresence>
        {agreementModal && (
          <Modal onClose={() => setAgreementModal(false)}>
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                  <FileText size={20} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">Accept Terms & Conditions</h3>
              </div>
              
              <div className="rounded-lg bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="text-amber-400 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-white">Legal Binding Agreement</div>
                    <div className="text-sm text-gray-300 mt-1">By accepting, you enter into a legally binding contract with PlacementTutor.</div>
                  </div>
                </div>
              </div>
              
              <div className="rounded-lg bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 p-4">
                <h4 className="font-bold text-white mb-3">What you're agreeing to:</h4>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start gap-3">
                    <AlertCircle className="text-blue-400 mt-1 flex-shrink-0" size={16} />
                    <span>Non-refundable payment policy</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <AlertCircle className="text-blue-400 mt-1 flex-shrink-0" size={16} />
                    <span>Compliance with all platform rules</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <AlertCircle className="text-blue-400 mt-1 flex-shrink-0" size={16} />
                    <span>Acceptance of liability limitations</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <AlertCircle className="text-blue-400 mt-1 flex-shrink-0" size={16} />
                    <span>Indian law as governing jurisdiction</span>
                  </li>
                </ul>
              </div>
              
              <p className="text-gray-300 text-sm">
                I confirm that I have read, understood, and agree to be bound by all Terms & Conditions.
              </p>
              
              <div className="flex justify-end gap-3 pt-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setAgreementModal(false)}
                  className="px-4 py-2 rounded-lg border border-white/10 bg-white/5 text-gray-300 hover:bg-white/10 transition-colors"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={confirmAccept}
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:from-blue-700 hover:to-cyan-700 transition-all duration-300"
                >
                  I Accept All Terms
                </motion.button>
              </div>
            </div>
          </Modal>
        )}
      </AnimatePresence>

      {/* Help Modal */}
      <AnimatePresence>
        {showHelp && (
          <Modal onClose={() => setShowHelp(false)}>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                  <HelpCircle size={20} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">Legal Help</h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                For complete understanding of these Terms & Conditions, consult with legal counsel if needed.
                All terms are legally binding and enforceable under Indian law.
              </p>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowHelp(false)}
                className="w-full mt-4 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-medium hover:from-blue-700 hover:to-cyan-700 transition-all duration-300"
              >
                Understood
              </motion.button>
            </div>
          </Modal>
        )}
      </AnimatePresence>

      {/* Details Modal */}
      <AnimatePresence>
        {showDetails && (
          <Modal onClose={() => setShowDetails(false)}>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                  <Info size={20} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">Terms Details</h3>
              </div>
              
              <div className="rounded-lg bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 p-4">
                <div className="flex items-start gap-3">
                  <Info className="text-blue-400 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-white">Legal Interpretation</div>
                    <div className="text-sm text-gray-300 mt-1">For complete understanding, consult with legal counsel if needed.</div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                {terms.filter(t => t.id === activeTerm + 1).map(term => (
                  <div key={term.id} className="rounded-lg bg-gradient-to-br from-[#1f2937] to-[#111827] p-4 border border-white/10">
                    <h4 className="font-bold text-white text-lg mb-2">
                      {term.id}. {term.title}
                    </h4>
                    <p className="text-gray-300">{term.content}</p>
                  </div>
                ))}
              </div>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowDetails(false)}
                className="w-full py-3 border border-white/10 bg-white/5 text-gray-300 hover:bg-white/10 transition-colors rounded-xl"
              >
                Close
              </motion.button>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
};

const Badge = ({ label }) => (
  <motion.span
    whileHover={{ y: -2 }}
    className="px-4 py-2 rounded-full text-sm bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 text-blue-300 hover:border-blue-500/40 transition-colors cursor-pointer"
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
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-500"></div>
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

export default TermsAndConditions;