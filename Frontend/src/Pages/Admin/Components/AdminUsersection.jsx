
// import React, { useState, useEffect } from 'react';
// import { 
//   Table, 
//   Button, 
//   Tag, 
//   message,
//   Space,
//   Modal,
//   Avatar,
//   Input,
//   Dropdown,
//   Menu,
//   Popconfirm,
//   Empty,
//   Typography,
//   Select,
//   DatePicker,
//   Badge,
//   Tooltip,
//   notification,
//   Card,
//   Alert,
//   Statistic
// } from 'antd';
// import { 
//   UserOutlined, 
//   MailOutlined, 
//   PhoneOutlined, 
//   CalendarOutlined,
//   DeleteOutlined,
//   SearchOutlined,
//   FilterOutlined,
//   EyeOutlined,
//   MoreOutlined,
//   CloseCircleOutlined,
//   CheckCircleOutlined,
//   ClockCircleOutlined,
//   ExclamationCircleOutlined,
//   SyncOutlined,
//   LockOutlined,
//   EditOutlined,
//   DownloadOutlined,
//   TeamOutlined,
//   UserAddOutlined,
//   SafetyOutlined
// } from '@ant-design/icons';
// import { apiConnector } from "../../../Service/apiConnector";
// import { adminEndpoints } from "../../../Service/apis";

// const { Title, Text } = Typography;
// const { Option } = Select;
// const { RangePicker } = DatePicker;

// const AdminUsersection = () => {
//   const [users, setUsers] = useState([]);
//   const [filteredUsers, setFilteredUsers] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [deleteLoading, setDeleteLoading] = useState(false);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [previewModal, setPreviewModal] = useState(false);
  
//   // Filters
//   const [searchText, setSearchText] = useState('');
//   const [statusFilter, setStatusFilter] = useState('all');
//   const [roleFilter, setRoleFilter] = useState('all');
//   const [dateRange, setDateRange] = useState([]);

//   // Pagination
//   const [pagination, setPagination] = useState({
//     current: 1,
//     pageSize: 10,
//     total: 0
//   });

//   // Fetch users
//   const fetchUsers = async (page = 1, pageSize = 10) => {
//     setLoading(true);
//     try {
//       const response = await apiConnector(
//         "GET", 
//         adminEndpoints.ALL_USERS_DETAILED,
//         null,
//         null,
//         { page, limit: pageSize }
//       );
      
//       console.log("Users response:", response.data);
      
//       let usersData = [];
//       let totalCount = 0;
      
//       if (response.data?.val) {
//         usersData = response.data.val;
//         totalCount = response.data.count || usersData.length;
//       } else if (response.data?.data) {
//         usersData = response.data.data;
//         totalCount = response.data.total || response.data.count || usersData.length;
//       } else if (Array.isArray(response.data)) {
//         usersData = response.data;
//         totalCount = usersData.length;
//       }
      
//       const formattedUsers = Array.isArray(usersData) ? usersData.map(user => ({
//         ...user,
//         displayName: user.username || user.email?.split('@')[0] || 'User',
//         joinedDate: user.createdAt ? new Date(user.createdAt) : new Date(),
//         status: user.isActive !== false ? 'active' : 'inactive'
//       })) : [];
      
//       setUsers(formattedUsers);
//       setFilteredUsers(formattedUsers);
//       setPagination({
//         current: page,
//         pageSize,
//         total: totalCount
//       });
      
//       notification.success({
//         message: 'Users Loaded',
//         description: `Successfully loaded ${formattedUsers.length} users`,
//         placement: 'bottomRight',
//         className: 'bg-gradient-to-r from-indigo-500/20 to-purple-500/20'
//       });
//     } catch (error) {
//       console.error("Error fetching users:", error);
//       notification.error({
//         message: 'Failed to Load',
//         description: 'Unable to fetch users',
//         placement: 'bottomRight',
//         className: 'bg-gradient-to-r from-red-500/20 to-rose-500/20'
//       });
//       setUsers([]);
//       setFilteredUsers([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Apply filters
//   useEffect(() => {
//     let filtered = [...users];

//     // Search filter
//     if (searchText) {
//       const searchTerm = searchText.toLowerCase();
//       filtered = filtered.filter(user => 
//         (user.email && user.email.toLowerCase().includes(searchTerm)) ||
//         (user.username && user.username.toLowerCase().includes(searchTerm)) ||
//         (user.displayName && user.displayName.toLowerCase().includes(searchTerm)) ||
//         (user.phone && user.phone.toLowerCase().includes(searchTerm))
//       );
//     }

//     // Status filter
//     if (statusFilter !== 'all') {
//       filtered = filtered.filter(user => 
//         statusFilter === 'active' ? user.isActive !== false : user.isActive === false
//       );
//     }

//     // Role filter
//     if (roleFilter !== 'all') {
//       filtered = filtered.filter(user => user.role === roleFilter);
//     }

//     // Date range filter
//     if (dateRange && dateRange.length === 2) {
//       const [start, end] = dateRange;
//       filtered = filtered.filter(user => {
//         if (!user.createdAt) return false;
//         const userDate = new Date(user.createdAt);
//         return userDate >= start && userDate <= end;
//       });
//     }

//     setFilteredUsers(filtered);
//   }, [users, searchText, statusFilter, roleFilter, dateRange]);

//   // Format date
//   const formatDate = (dateString) => {
//     if (!dateString) return 'N/A';
//     try {
//       const date = new Date(dateString);
//       const now = new Date();
//       const diffTime = Math.abs(now - date);
//       const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
//       if (diffDays === 0) return 'Today';
//       if (diffDays === 1) return 'Yesterday';
//       if (diffDays < 7) return `${diffDays} days ago`;
      
//       return date.toLocaleDateString('en-US', {
//         month: 'short',
//         day: 'numeric',
//         year: 'numeric'
//       });
//     } catch {
//       return 'Invalid Date';
//     }
//   };

//   // Delete user
//   const deleteUser = async (userId, userName) => {
//     setDeleteLoading(true);
//     try {
//       // First check if user can be deleted
//       const userToDelete = users.find(user => user._id === userId);
      
//       if (userToDelete?.role === "ADMIN") {
//         notification.error({
//           message: 'Cannot Delete Admin',
//           description: 'Admin accounts require special permissions',
//           placement: 'bottomRight',
//           className: 'bg-gradient-to-r from-red-500/20 to-rose-500/20'
//         });
//         return;
//       }

//       // Call delete endpoint
//       await apiConnector("DELETE", adminEndpoints.DELETE_USER(userId));
      
//       // Update local state
//       setUsers(prev => prev.filter(user => user._id !== userId));
//       setFilteredUsers(prev => prev.filter(user => user._id !== userId));
      
//       notification.success({
//         message: 'User Deleted',
//         description: `${userName} has been removed from the system`,
//         placement: 'bottomRight',
//         className: 'bg-gradient-to-r from-green-500/20 to-emerald-500/20'
//       });
//     } catch (error) {
//       console.error("Delete error:", error);
      
//       // Handle specific error messages from backend
//       if (error.response?.data?.message) {
//         notification.error({
//           message: 'Delete Failed',
//           description: error.response.data.message,
//           placement: 'bottomRight',
//           className: 'bg-gradient-to-r from-red-500/20 to-rose-500/20'
//         });
//       } else {
//         notification.error({
//           message: 'Delete Failed',
//           description: 'Failed to delete user. Please try again.',
//           placement: 'bottomRight',
//           className: 'bg-gradient-to-r from-red-500/20 to-rose-500/20'
//         });
//       }
//     } finally {
//       setDeleteLoading(false);
//     }
//   };

//   // Show user preview
//   const showUserPreview = (user) => {
//     setSelectedUser(user);
//     setPreviewModal(true);
//   };

  
 

//   // Table columns
//   const columns = [
//     {
//       title: 'USER',
//       key: 'user',
//       width: 300,
//       render: (_, user) => (
//         <div className="flex items-center space-x-3 group cursor-pointer" onClick={() => showUserPreview(user)}>
//           <div className="relative">
//             <Avatar 
//               size={48} 
//               className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-semibold border-2 border-white shadow-lg group-hover:scale-110 transition-all duration-300"
//               icon={<UserOutlined />}
//             >
//               {user.displayName?.[0]?.toUpperCase()}
//             </Avatar>
//             {user.role === "ADMIN" && (
//               <div className="absolute -top-1 -right-1">
//                 <SafetyOutlined className="text-yellow-500 bg-white rounded-full p-1" />
//               </div>
//             )}
//           </div>
//           <div className="flex flex-col">
//             <span className="font-bold text-gray-100 group-hover:text-white transition-colors">
//               {user.displayName}
//             </span>
//             <div className="flex items-center space-x-2 mt-1">
//               {user.username }
//               <Tag color={user.role === "ADMIN" ? "gold" : user.role === "MENTOR" ? "purple" : "cyan"} className="text-xs">
//                 {user.role || "USER"}
//               </Tag>
//             </div>
//           </div>
//         </div>
//       ),
//     },
//     {
//       title: 'CONTACT',
//       key: 'contact',
//       width: 280,
//       render: (_, user) => (
//         <div className="space-y-2">
//           <div className="flex items-center space-x-2 group">
//             <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
//               <MailOutlined className="text-blue-400" />
//             </div>
//             <a 
//               href={`mailto:${user.email}`} 
//               className="text-gray-300 hover:text-blue-400 transition-colors truncate hover:underline"
//               title={user.email}
//             >
//               {user.email}
//             </a>
//           </div>
//           {user.phone && (
//             <div className="flex items-center space-x-2 group">
//               <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
//                 <PhoneOutlined className="text-green-400" />
//               </div>
//               <a 
//                 href={`tel:${user.phone}`} 
//                 className="text-gray-300 hover:text-green-400 transition-colors hover:underline"
//               >
//                 {user.phone}
//               </a>
//             </div>
//           )}
//         </div>
//       ),
//     },
//     {
//       title: 'JOINED',
//       key: 'joined',
//       width: 180,
//       render: (_, user) => (
//         <div className="flex items-center space-x-3">
//           <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
//             <CalendarOutlined className="text-orange-400" />
//           </div>
//           <div className="flex flex-col">
//             <span className="font-semibold text-gray-100">
//               {formatDate(user.createdAt)}
//             </span>
//             <span className="text-xs text-gray-400">
//               {new Date(user.createdAt).toLocaleDateString()}
//             </span>
//           </div>
//         </div>
//       ),
//       sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
//     },
//     {
//       title: 'ACTIONS',
//       key: 'action',
//       width: 180,
//       fixed: 'right',
//       render: (_, user) => (
//         <div className="flex items-center space-x-2">
//           <Tooltip title="Quick Preview">
//             <Button
//               type="primary"
//               icon={<EyeOutlined />}
//               size="small"
//               className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 border-0 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
//               onClick={() => showUserPreview(user)}
//             />
//           </Tooltip>
          
//           <Dropdown
//             overlay={
//               <Menu className="rounded-xl shadow-2xl border border-white/10 bg-gray-900 py-2">
//                 <Menu.Item 
//                   key="view" 
//                   icon={<EyeOutlined className="text-blue-400" />}
//                   className="hover:bg-white/10 !py-3"
//                   onClick={() => showUserPreview(user)}
//                 >
//                   View Details
//                 </Menu.Item>
//                 <Menu.Item 
//                   key="edit" 
//                   icon={<EditOutlined className="text-green-400" />}
//                   className="hover:bg-white/10 !py-3"
//                   onClick={() => notification.info({ message: 'Edit functionality coming soon!' })}
//                 >
//                   Edit User
//                 </Menu.Item>
//                 <Menu.Item 
//                   key="email" 
//                   icon={<MailOutlined className="text-orange-400" />}
//                   className="hover:bg-white/10 !py-3"
//                   onClick={() => window.location.href = `mailto:${user.email}`}
//                 >
//                   Send Email
//                 </Menu.Item>
//                 <Menu.Divider className="bg-white/10" />
                
//                 <Popconfirm
//                   title={
//                     <div className="max-w-sm">
//                       <div className="flex items-center space-x-3 mb-3">
//                         <ExclamationCircleOutlined className="text-red-400 text-xl" />
//                         <div>
//                           <div className="font-bold text-gray-100">Delete User</div>
//                           <div className="text-gray-400 text-sm">This action cannot be undone</div>
//                         </div>
//                       </div>
//                       <p className="text-gray-300">
//                         Are you sure you want to delete <strong className="text-white">{user.displayName}</strong>?
//                       </p>
//                       {user.role === "ADMIN" && (
//                         <Alert
//                           message="Admin Account Protected"
//                           description="Admin accounts require special permissions to delete"
//                           type="warning"
//                           showIcon
//                           className="mt-3 bg-yellow-500/10 border-yellow-500/20"
//                         />
//                       )}
//                     </div>
//                   }
//                   onConfirm={() => deleteUser(user._id, user.displayName)}
//                   okText="Delete"
//                   cancelText="Cancel"
//                   okType="danger"
//                   disabled={user.role === "ADMIN" || deleteLoading}
//                   icon={null}
//                   overlayClassName="bg-gray-900 border border-white/10 rounded-xl"
//                 >
//                   <Menu.Item 
//                     key="delete" 
//                     icon={<DeleteOutlined className="text-red-400" />}
//                     danger
//                     disabled={user.role === "ADMIN" || deleteLoading}
//                     className={`hover:bg-red-500/10 !py-3 ${user.role === "ADMIN" ? 'opacity-50 cursor-not-allowed' : ''}`}
//                   >
//                     {deleteLoading ? 'Deleting...' : 'Delete User'}
//                   </Menu.Item>
//                 </Popconfirm>
//               </Menu>
//             }
//             trigger={['click']}
//             placement="bottomRight"
//           >
//             <Button
//               type="default"
//               icon={<MoreOutlined />}
//               size="small"
//               className="border-white/20 hover:border-indigo-500 hover:text-indigo-400 bg-white/5 hover:scale-105 transition-all duration-300"
//             />
//           </Dropdown>
          
//           <Popconfirm
//             title="Delete this user?"
//             description="This action cannot be undone."
//             onConfirm={() => deleteUser(user._id, user.displayName)}
//             okText="Delete"
//             cancelText="Cancel"
//             okType="danger"
//             disabled={user.role === "ADMIN" || deleteLoading}
//             overlayClassName="bg-gray-900 border border-white/10"
//           >
//             <Button
//               danger
//               icon={<DeleteOutlined />}
//               size="small"
//               loading={deleteLoading}
//               disabled={user.role === "ADMIN"}
//               className={`border-red-500/20 hover:border-red-500 ${user.role === "ADMIN" ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 transition-transform'}`}
//             />
//           </Popconfirm>
//         </div>
//       ),
//     },
//   ];

//   // Handle table change
//   const handleTableChange = (pagination, filters, sorter) => {
//     fetchUsers(pagination.current, pagination.pageSize);
//   };

//   // Reset filters
//   const resetFilters = () => {
//     setSearchText('');
//     setStatusFilter('all');
//     setRoleFilter('all');
//     setDateRange([]);
//     notification.info({
//       message: 'Filters Reset',
//       description: 'All filters have been cleared',
//       placement: 'bottomRight'
//     });
//   };

//   // Export users
//   const exportUsers = () => {
//     const dataStr = JSON.stringify(filteredUsers, null, 2);
//     const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
//     const exportFileDefaultName = `users_export_${new Date().toISOString().split('T')[0]}.json`;
    
//     const linkElement = document.createElement('a');
//     linkElement.setAttribute('href', dataUri);
//     linkElement.setAttribute('download', exportFileDefaultName);
//     linkElement.click();
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#111827] via-[#0b1220] to-[#1a1f36] p-4 md:p-6">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="mb-8">
//           <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6">
//             <div>
//               <Title level={2} className="!mb-2 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">
//                 User Management
//               </Title>
//               <Text className="text-gray-400">
//                 Manage all platform users with advanced controls
//               </Text>
//             </div>
//             <Space className="mt-4 lg:mt-0" size="middle">
//               <Button 
//                 icon={<DownloadOutlined />}
//                 onClick={exportUsers}
//                 className="bg-white/10 hover:bg-white/20 border-white/20 text-white hover:scale-105 transition-all duration-300"
//               >
//                 Export
//               </Button>
//               <Button 
//                 icon={<SyncOutlined spin={loading} />}
//                 onClick={() => fetchUsers()}
//                 className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 border-0 text-white hover:scale-105 transition-all duration-300"
//               >
//                 Refresh
//               </Button>
//             </Space>
//           </div>

//           {/* Stats Cards */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
//             <Card className="rounded-xl border border-white/10 bg-gradient-to-br from-[#111827] to-[#0b1220] shadow-2xl">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <Text className="text-gray-400">Total Users</Text>
//                   <div className="text-2xl font-bold text-white">{users.length}</div>
//                   <div className="text-sm text-gray-400 mt-1">Across platform</div>
//                 </div>
//                 <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 flex items-center justify-center">
//                   <TeamOutlined className="text-2xl text-blue-400" />
//                 </div>
//               </div>
//             </Card>
            
            
//             <Card className="rounded-xl border border-white/10 bg-gradient-to-br from-[#111827] to-[#0b1220] shadow-2xl">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <Text className="text-gray-400">New Today</Text>
//                   <div className="text-2xl font-bold text-orange-400">
//                     {users.filter(u => {
//                       const today = new Date().toDateString();
//                       return new Date(u.createdAt).toDateString() === today;
//                     }).length}
//                   </div>
//                   <div className="text-sm text-gray-400 mt-1">Registered today</div>
//                 </div>
//                 <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-500/20 to-amber-500/20 flex items-center justify-center">
//                   <UserAddOutlined className="text-2xl text-orange-400" />
//                 </div>
//               </div>
//             </Card>
            
//             <Card className="rounded-xl border border-white/10 bg-gradient-to-br from-[#111827] to-[#0b1220] shadow-2xl">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <Text className="text-gray-400">Admin Users</Text>
//                   <div className="text-2xl font-bold text-yellow-400">
//                     {users.filter(u => u.role === "ADMIN").length}
//                   </div>
//                   <div className="text-sm text-gray-400 mt-1">With admin rights</div>
//                 </div>
//                 <div className="w-12 h-12 rounded-full bg-gradient-to-r from-yellow-500/20 to-amber-500/20 flex items-center justify-center">
//                   <SafetyOutlined className="text-2xl text-yellow-400" />
//                 </div>
//               </div>
//             </Card>
//           </div>
//         </div>

//         {/* Filters Section */}
//         <Card className="rounded-xl border border-white/10 bg-gradient-to-br from-[#111827] to-[#0b1220] shadow-2xl mb-6">
//           <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
//             <Input
//               placeholder="Search by name, email, or phone..."
//               value={searchText}
//               onChange={e => setSearchText(e.target.value)}
//               className="w-full lg:w-96 bg-white/5 border-white/10 text-white placeholder-gray-400 hover:border-indigo-500 focus:border-indigo-500"
//               size="large"
//               allowClear
//               suffix={<SearchOutlined className="text-gray-400" />}
//             />
            
//             <div className="flex flex-col lg:flex-row gap-3">
//               <Select
//                 value={statusFilter}
//                 onChange={setStatusFilter}
//                 placeholder="Status"
//                 className="w-full lg:w-40"
//                 size="large"
//                 dropdownClassName="bg-gray-900 border border-white/10"
//               >
//                 <Option value="all">All Status</Option>
//                 <Option value="active">
//                   <Badge status="success" text="Active" />
//                 </Option>
//                 <Option value="inactive">
//                   <Badge status="error" text="Inactive" />
//                 </Option>
//               </Select>
              
//               <Select
//                 value={roleFilter}
//                 onChange={setRoleFilter}
//                 placeholder="Role"
//                 className="w-full lg:w-40"
//                 size="large"
//                 dropdownClassName="bg-gray-900 border border-white/10"
//               >
//                 <Option value="all">All Roles</Option>
//                 <Option value="ADMIN">
//                   <Tag color="gold">Admin</Tag>
//                 </Option>
//                 <Option value="MENTOR">
//                   <Tag color="purple">Mentor</Tag>
//                 </Option>
//                 <Option value="USER">
//                   <Tag color="cyan">User</Tag>
//                 </Option>
//               </Select>
              
//               <RangePicker
//                 value={dateRange}
//                 onChange={setDateRange}
//                 placeholder={['Start Date', 'End Date']}
//                 className="w-full lg:w-64 bg-white/5 border-white/10"
//                 size="large"
//                 popupClassName="bg-gray-900 border border-white/10"
//               />
              
//               <Button 
//                 onClick={resetFilters}
//                 icon={<FilterOutlined />}
//                 size="large"
//                 className="bg-white/10 hover:bg-white/20 border-white/10 text-white hover:scale-105 transition-all duration-300"
//               >
//                 Reset Filters
//               </Button>
//             </div>
//           </div>
          
//           {searchText && (
//             <div className="mt-4 flex items-center space-x-2 text-sm">
//               <Badge count={filteredUsers.length} showZero className="bg-indigo-500" />
//               <Text className="text-gray-400">
//                 Showing {filteredUsers.length} users matching "<Text className="text-white">{searchText}</Text>"
//               </Text>
//             </div>
//           )}
//         </Card>

//         {/* Table Section */}
//         <Card className="rounded-xl border border-white/10 bg-gradient-to-br from-[#111827] to-[#0b1220] shadow-2xl">
//           <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-6 space-y-4 lg:space-y-0">
//             <div>
//               <Title level={4} className="!mb-0 text-white">
//                 User Directory
//                 <Badge 
//                   count={filteredUsers.length} 
//                   showZero 
//                   className="ml-3 bg-gradient-to-r from-indigo-500 to-purple-500"
//                 />
//               </Title>
//               <Text className="text-gray-400">
//                 Manage users with full control
//               </Text>
//             </div>
//             <div className="flex items-center space-x-2">
//               <Text className="text-gray-400">
//                 Page {pagination.current} of {Math.ceil(pagination.total / pagination.pageSize)}
//               </Text>
//             </div>
//           </div>

//           <Table
//             columns={columns}
//             dataSource={filteredUsers}
//             loading={loading}
//             rowKey={record => record._id || record.id || record.email}
//             pagination={{
//               ...pagination,
//               showSizeChanger: true,
//               showQuickJumper: true,
//               showTotal: (total, range) => (
//                 <span className="text-gray-400">
//                   Showing <strong className="text-white">{range[0]}-{range[1]}</strong> of <strong className="text-white">{total}</strong> users
//                 </span>
//               ),
//               className: "bg-transparent text-white",
//             }}
//             onChange={handleTableChange}
//             scroll={{ x: 1300 }}
//             className="[&_.ant-table]:bg-transparent [&_.ant-table-thead>tr>th]:bg-white/5 [&_.ant-table-thead>tr>th]:text-gray-300 [&_.ant-table-thead>tr>th]:border-b-white/10 [&_.ant-table-tbody>tr>td]:border-b-white/5 [&_.ant-table-tbody>tr:hover>td]:bg-white/5"
//             locale={{
//               emptyText: (
//                 <Empty
//                   description={
//                     <div className="space-y-4">
//                       <div className="text-xl font-semibold text-white">No users found</div>
//                       {searchText ? (
//                         <div className="text-gray-400">
//                           Try adjusting your search criteria
//                         </div>
//                       ) : (
//                         <div className="text-gray-400">
//                           No users in the system yet
//                         </div>
//                       )}
//                     </div>
//                   }
//                   image={Empty.PRESENTED_IMAGE_SIMPLE}
//                   imageStyle={{ filter: 'grayscale(1) brightness(0.5)' }}
//                 >
//                   <Button 
//                     onClick={() => fetchUsers()} 
//                     loading={loading}
//                     className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 border-0 text-white"
//                   >
//                     Refresh Data
//                   </Button>
//                 </Empty>
//               )
//             }}
//           />
//         </Card>
//       </div>

//       {/* User Preview Modal */}
//       <Modal
//         title={
//           <div className="flex items-center space-x-3">
//             <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 flex items-center justify-center">
//               <UserOutlined className="text-blue-400" />
//             </div>
//             <div>
//               <div className="text-lg font-bold text-white">User Details</div>
//               {selectedUser && (
//                 <Badge 
//                   status={selectedUser.isActive !== false ? 'success' : 'error'}
//                   text={
//                     <span className={selectedUser.isActive !== false ? 'text-green-400' : 'text-red-400'}>
//                       {selectedUser.isActive !== false ? 'Active' : 'Inactive'}
//                     </span>
//                   }
//                   className="ml-0"
//                 />
//               )}
//             </div>
//           </div>
//         }
//         open={previewModal}
//         onCancel={() => setPreviewModal(false)}
//         footer={[
//           <Button key="close" onClick={() => setPreviewModal(false)} className="bg-white/10 hover:bg-white/20 border-white/20 text-white">
//             Close
//           </Button>,
//           <Button 
//             key="email" 
//             type="primary" 
//             onClick={() => window.location.href = `mailto:${selectedUser?.email}`}
//             className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 border-0"
//           >
//             <MailOutlined /> Send Email
//           </Button>,
//           <Popconfirm
//             key="delete"
//             title="Delete this user?"
//             onConfirm={() => {
//               deleteUser(selectedUser._id, selectedUser.displayName);
//               setPreviewModal(false);
//             }}
//             disabled={selectedUser?.role === "ADMIN"}
//             overlayClassName="bg-gray-900 border border-white/10"
//           >
//             <Button 
//               danger 
//               disabled={selectedUser?.role === "ADMIN"}
//               icon={<DeleteOutlined />}
//               className="border-red-500/20 hover:border-red-500"
//             >
//               Delete User
//             </Button>
//           </Popconfirm>
//         ]}
//         width={600}
//         className="[&_.ant-modal-content]:bg-gradient-to-b from-[#111827] to-[#0b1220] [&_.ant-modal-content]:border [&_.ant-modal-content]:border-white/10 [&_.ant-modal-header]:bg-transparent [&_.ant-modal-header]:border-b-white/10"
//       >
//         {selectedUser && (
//           <div className="space-y-6">
//             <div className="flex items-center space-x-4">
//               <Avatar 
//                 size={80} 
//                 className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-2xl shadow-xl"
//                 icon={<UserOutlined />}
//               >
//                 {selectedUser.displayName?.[0]}
//               </Avatar>
//               <div>
//                 <Title level={3} className="!mb-1 text-white">
//                   {selectedUser.displayName}
//                 </Title>
//                 <div className="flex items-center space-x-2">
//                   <Tag color={selectedUser.role === "ADMIN" ? "gold" : selectedUser.role === "MENTOR" ? "purple" : "cyan"}>
//                     {selectedUser.role || "USER"}
//                   </Tag>
//                   {selectedUser.username && (
//                     <Tag color="blue">@{selectedUser.username}</Tag>
//                   )}
//                 </div>
//               </div>
//             </div>
            
//             <div className="grid grid-cols-2 gap-4">
//               <div className="p-4 bg-white/5 rounded-lg border border-white/10">
//                 <div className="flex items-center space-x-2 mb-2">
//                   <MailOutlined className="text-blue-400" />
//                   <Text strong className="text-gray-300">Email</Text>
//                 </div>
//                 <a href={`mailto:${selectedUser.email}`} className="text-white hover:text-blue-400 transition-colors">
//                   {selectedUser.email}
//                 </a>
//               </div>
              
//               <div className="p-4 bg-white/5 rounded-lg border border-white/10">
//                 <div className="flex items-center space-x-2 mb-2">
//                   <PhoneOutlined className="text-green-400" />
//                   <Text strong className="text-gray-300">Phone</Text>
//                 </div>
//                 <div className="text-white">
//                   {selectedUser.phone || 'Not provided'}
//                 </div>
//               </div>
              
//               <div className="p-4 bg-white/5 rounded-lg border border-white/10">
//                 <div className="flex items-center space-x-2 mb-2">
//                   <CalendarOutlined className="text-orange-400" />
//                   <Text strong className="text-gray-300">Joined</Text>
//                 </div>
//                 <div className="text-white">{formatDate(selectedUser.createdAt)}</div>
//               </div>
              
//               <div className="p-4 bg-white/5 rounded-lg border border-white/10">
//                 <div className="flex items-center space-x-2 mb-2">
//                   <ClockCircleOutlined className="text-purple-400" />
//                   <Text strong className="text-gray-300">Status</Text>
//                 </div>
//                 <Badge
//                   status={selectedUser.isActive !== false ? 'success' : 'error'}
//                   text={
//                     <span className={selectedUser.isActive !== false ? 'text-green-400' : 'text-red-400'}>
//                       {selectedUser.isActive !== false ? 'Active' : 'Inactive'}
//                     </span>
//                   }
//                 />
//               </div>
//             </div>
            
//             <div className="p-4 bg-white/5 rounded-lg border border-white/10">
//               <div className="flex items-center space-x-2 mb-2">
//                 <SafetyOutlined className="text-yellow-400" />
//                 <Text strong className="text-gray-300">User ID</Text>
//               </div>
//               <code className="text-sm bg-white/5 px-3 py-2 rounded text-gray-300 font-mono block overflow-x-auto">
//                 {selectedUser._id}
//               </code>
//             </div>
            
//             {selectedUser.role === "ADMIN" && (
//               <Alert
//                 message="Admin Account Protected"
//                 description="This is an admin account with elevated permissions. Special authorization is required for modification."
//                 type="warning"
//                 showIcon
//                 className="bg-yellow-500/10 border-yellow-500/20"
//               />
//             )}
//           </div>
//         )}
//       </Modal>
//     </div>
//   );
// };

// export default AdminUsersection;

import React, { useState, useEffect } from 'react';
import { 
  EnvelopeIcon, 
  PhoneIcon, 
  CalendarIcon,
  TrashIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  EyeIcon,
  EllipsisVerticalIcon,
  XCircleIcon,
  CheckCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  ArrowPathIcon,
  LockClosedIcon,
  PencilIcon,
  ArrowDownTrayIcon,
  UserGroupIcon,
  UserPlusIcon,
  ShieldCheckIcon,
  ChevronUpDownIcon,
  ChevronDownIcon,
  UserCircleIcon
} from '@heroicons/react/24/outline';
import { apiConnector } from "../../../Service/apiConnector";
import { adminEndpoints } from "../../../Service/apis";

const AdminUsersection = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [previewModal, setPreviewModal] = useState(false);
  
  // Filters
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [roleFilter, setRoleFilter] = useState('all');
  const [dateRange, setDateRange] = useState(['', '']);

  // Pagination
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0
  });

  // Fetch users
  const fetchUsers = async (page = 1, pageSize = 10) => {
    setLoading(true);
    try {
      const response = await apiConnector(
        "GET", 
        adminEndpoints.ALL_USERS_DETAILED,
        null,
        null,
        { page, limit: pageSize }
      );
      
      let usersData = [];
      let totalCount = 0;
      
      if (response.data?.val) {
        usersData = response.data.val;
        totalCount = response.data.count || usersData.length;
      } else if (response.data?.data) {
        usersData = response.data.data;
        totalCount = response.data.total || response.data.count || usersData.length;
      } else if (Array.isArray(response.data)) {
        usersData = response.data;
        totalCount = usersData.length;
      }
      
      const formattedUsers = Array.isArray(usersData) ? usersData.map(user => ({
        ...user,
        displayName: user.username || user.email?.split('@')[0] || 'User',
        joinedDate: user.createdAt ? new Date(user.createdAt) : new Date(),
        status: user.isActive !== false ? 'active' : 'inactive'
      })) : [];
      
      setUsers(formattedUsers);
      setFilteredUsers(formattedUsers);
      setPagination({
        current: page,
        pageSize,
        total: totalCount
      });
      
      showNotification('success', 'Users Loaded', `Successfully loaded ${formattedUsers.length} users`);
    } catch (error) {
      console.error("Error fetching users:", error);
      showNotification('error', 'Failed to Load', 'Unable to fetch users');
      setUsers([]);
      setFilteredUsers([]);
    } finally {
      setLoading(false);
    }
  };

  // Apply filters
  useEffect(() => {
    let filtered = [...users];

    if (searchText) {
      const searchTerm = searchText.toLowerCase();
      filtered = filtered.filter(user => 
        (user.email && user.email.toLowerCase().includes(searchTerm)) ||
        (user.username && user.username.toLowerCase().includes(searchTerm)) ||
        (user.displayName && user.displayName.toLowerCase().includes(searchTerm)) ||
        (user.phone && user.phone.toLowerCase().includes(searchTerm))
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(user => 
        statusFilter === 'active' ? user.isActive !== false : user.isActive === false
      );
    }

    if (roleFilter !== 'all') {
      filtered = filtered.filter(user => user.role === roleFilter);
    }

    if (dateRange[0] && dateRange[1]) {
      filtered = filtered.filter(user => {
        if (!user.createdAt) return false;
        const userDate = new Date(user.createdAt);
        return userDate >= new Date(dateRange[0]) && userDate <= new Date(dateRange[1]);
      });
    }

    setFilteredUsers(filtered);
  }, [users, searchText, statusFilter, roleFilter, dateRange]);

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffTime = Math.abs(now - date);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays === 0) return 'Today';
      if (diffDays === 1) return 'Yesterday';
      if (diffDays < 7) return `${diffDays} days ago`;
      
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    } catch {
      return 'Invalid Date';
    }
  };

  // Delete user
  const deleteUser = async (userId, userName) => {
    setDeleteLoading(true);
    try {
      const userToDelete = users.find(user => user._id === userId);
      
      if (userToDelete?.role === "ADMIN") {
        showNotification('error', 'Cannot Delete Admin', 'Admin accounts require special permissions');
        return;
      }

      await apiConnector("DELETE", adminEndpoints.DELETE_USER(userId));
      
      setUsers(prev => prev.filter(user => user._id !== userId));
      setFilteredUsers(prev => prev.filter(user => user._id !== userId));
      
      showNotification('success', 'User Deleted', `${userName} has been removed from the system`);
    } catch (error) {
      console.error("Delete error:", error);
      showNotification('error', 'Delete Failed', error.response?.data?.message || 'Failed to delete user');
    } finally {
      setDeleteLoading(false);
    }
  };

  // Show notification
  const showNotification = (type, title, message) => {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `fixed bottom-4 right-4 z-50 p-4 rounded-xl shadow-2xl border-l-4 transform transition-all duration-300 translate-x-0 ${
      type === 'success' 
        ? 'bg-emerald-900/20 border-emerald-500' 
        : 'bg-rose-900/20 border-rose-500'
    } backdrop-blur-lg`;
    
    notification.innerHTML = `
      <div class="flex items-start space-x-3">
        <div class="flex-shrink-0">
          <div class="w-10 h-10 rounded-full ${
            type === 'success' ? 'bg-emerald-500/20' : 'bg-rose-500/20'
          } flex items-center justify-center">
            ${type === 'success' 
              ? '<svg class="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>'
              : '<svg class="w-5 h-5 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>'
            }
          </div>
        </div>
        <div>
          <h3 class="font-semibold text-white">${title}</h3>
          <p class="text-sm text-gray-300 mt-1">${message}</p>
        </div>
      </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  };

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'inactive': return 'bg-rose-500/20 text-rose-400 border-rose-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  // Get role color
  const getRoleColor = (role) => {
    switch (role) {
      case 'ADMIN': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'MENTOR': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      default: return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900 p-4 md:p-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-2">
                User Management
              </h1>
              <p className="text-gray-400">
                Manage all platform users with advanced controls
              </p>
            </div>
            <div className="flex space-x-3 mt-4 lg:mt-0">
              <button 
                onClick={() => {
                  const dataStr = JSON.stringify(filteredUsers, null, 2);
                  const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
                  const exportFileDefaultName = `users_export_${new Date().toISOString().split('T')[0]}.json`;
                  
                  const linkElement = document.createElement('a');
                  linkElement.setAttribute('href', dataUri);
                  linkElement.setAttribute('download', exportFileDefaultName);
                  linkElement.click();
                }}
                className="px-4 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-xl flex items-center space-x-2 transition-all duration-300 hover:scale-105"
              >
                <ArrowDownTrayIcon className="w-5 h-5" />
                <span>Export</span>
              </button>
              <button 
                onClick={() => fetchUsers()}
                className="px-4 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white rounded-xl flex items-center space-x-2 transition-all duration-300 hover:scale-105"
              >
                <ArrowPathIcon className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                <span>Refresh</span>
              </button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="rounded-xl border border-white/10 bg-gray-900/50 p-6 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Users</p>
                  <p className="text-2xl font-bold text-white">{users.length}</p>
                  <p className="text-sm text-gray-400 mt-1">Across platform</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <UserGroupIcon className="w-6 h-6 text-blue-400" />
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-gray-900/50 p-6 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Active Users</p>
                  <p className="text-2xl font-bold text-emerald-400">
                    {users.filter(u => u.isActive !== false).length}
                  </p>
                  <p className="text-sm text-gray-400 mt-1">Currently active</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <CheckCircleIcon className="w-6 h-6 text-emerald-400" />
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-gray-900/50 p-6 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">New Today</p>
                  <p className="text-2xl font-bold text-orange-400">
                    {users.filter(u => {
                      const today = new Date().toDateString();
                      return new Date(u.createdAt).toDateString() === today;
                    }).length}
                  </p>
                  <p className="text-sm text-gray-400 mt-1">Registered today</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center">
                  <UserPlusIcon className="w-6 h-6 text-orange-400" />
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-gray-900/50 p-6 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Admin Users</p>
                  <p className="text-2xl font-bold text-yellow-400">
                    {users.filter(u => u.role === "ADMIN").length}
                  </p>
                  <p className="text-sm text-gray-400 mt-1">With admin rights</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center">
                  <ShieldCheckIcon className="w-6 h-6 text-yellow-400" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters Section */}
        <div className="rounded-xl border border-white/10 bg-gray-900/50 p-6 backdrop-blur-sm mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="relative flex-1 max-w-lg">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, email, or phone..."
                value={searchText}
                onChange={e => setSearchText(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            
            <div className="flex flex-col lg:flex-row gap-3">
              <select
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
                className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
              
              <select
                value={roleFilter}
                onChange={e => setRoleFilter(e.target.value)}
                className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="all">All Roles</option>
                <option value="ADMIN">Admin</option>
                <option value="MENTOR">Mentor</option>
                <option value="USER">User</option>
              </select>
              
              <div className="flex gap-2">
                <input
                  type="date"
                  value={dateRange[0]}
                  onChange={e => setDateRange([e.target.value, dateRange[1]])}
                  className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Start Date"
                />
                <input
                  type="date"
                  value={dateRange[1]}
                  onChange={e => setDateRange([dateRange[0], e.target.value])}
                  className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="End Date"
                />
              </div>
              
              <button
                onClick={() => {
                  setSearchText('');
                  setStatusFilter('all');
                  setRoleFilter('all');
                  setDateRange(['', '']);
                  showNotification('info', 'Filters Reset', 'All filters have been cleared');
                }}
                className="px-4 py-3 bg-white/10 hover:bg-white/20 border border-white/10 text-white rounded-xl flex items-center space-x-2 transition-all duration-300 hover:scale-105"
              >
                <FunnelIcon className="w-5 h-5" />
                <span>Reset Filters</span>
              </button>
            </div>
          </div>
          
          {searchText && (
            <div className="mt-4 flex items-center space-x-2">
              <span className="px-2.5 py-0.5 bg-indigo-500 text-white text-sm rounded-full">
                {filteredUsers.length}
              </span>
              <p className="text-sm text-gray-400">
                Showing {filteredUsers.length} users matching "<span className="text-white">{searchText}</span>"
              </p>
            </div>
          )}
        </div>

        {/* Table Section */}
        <div className="rounded-xl border border-white/10 bg-gray-900/50 backdrop-blur-sm overflow-hidden">
          <div className="p-6 border-b border-white/10">
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center space-y-4 lg:space-y-0">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center space-x-2">
                  <span>User Directory</span>
                  <span className="px-2.5 py-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-sm rounded-full">
                    {filteredUsers.length}
                  </span>
                </h2>
                <p className="text-gray-400">Manage users with full control</p>
              </div>
              <div className="flex items-center space-x-2">
                <p className="text-gray-400">
                  Page {pagination.current} of {Math.ceil(pagination.total / pagination.pageSize)}
                </p>
              </div>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="py-4 px-6 text-left text-sm font-medium text-gray-400">USER</th>
                  <th className="py-4 px-6 text-left text-sm font-medium text-gray-400">CONTACT</th>
                  <th className="py-4 px-6 text-left text-sm font-medium text-gray-400">JOINED</th>
                  <th className="py-4 px-6 text-left text-sm font-medium text-gray-400">STATUS</th>
                  <th className="py-4 px-6 text-left text-sm font-medium text-gray-400">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="5" className="py-12 text-center">
                      <div className="flex flex-col items-center space-y-4">
                        <div className="w-12 h-12 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"></div>
                        <p className="text-gray-400">Loading users...</p>
                      </div>
                    </td>
                  </tr>
                ) : filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="py-16 text-center">
                      <div className="flex flex-col items-center space-y-4">
                        <UserGroupIcon className="w-16 h-16 text-gray-500" />
                        <div className="text-center">
                          <h3 className="text-xl font-semibold text-white mb-2">No users found</h3>
                          {searchText ? (
                            <p className="text-gray-400">Try adjusting your search criteria</p>
                          ) : (
                            <p className="text-gray-400">No users in the system yet</p>
                          )}
                        </div>
                        <button
                          onClick={() => fetchUsers()}
                          className="px-4 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white rounded-xl transition-all duration-300"
                        >
                          Refresh Data
                        </button>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user) => (
                    <tr key={user._id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-3">
                          <div className="relative">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                              {user.displayName?.[0]?.toUpperCase()}
                            </div>
                            {user.role === "ADMIN" && (
                              <div className="absolute -top-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center">
                                <ShieldCheckIcon className="w-3 h-3 text-yellow-500" />
                              </div>
                            )}
                          </div>
                          <div>
                            <p className="font-semibold text-white">{user.displayName}</p>
                            <div className="flex items-center space-x-2 mt-1">
                              <span className="text-sm text-gray-400">{user.username}</span>
                              <span className={`px-2 py-0.5 text-xs rounded-full border ${getRoleColor(user.role)}`}>
                                {user.role || "USER"}
                              </span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                              <EnvelopeIcon className="w-4 h-4 text-blue-400" />
                            </div>
                            <a
                              href={`mailto:${user.email}`}
                              className="text-gray-300 hover:text-blue-400 transition-colors truncate"
                              title={user.email}
                            >
                              {user.email}
                            </a>
                          </div>
                          {user.phone && (
                            <div className="flex items-center space-x-2">
                              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                                <PhoneIcon className="w-4 h-4 text-green-400" />
                              </div>
                              <a
                                href={`tel:${user.phone}`}
                                className="text-gray-300 hover:text-green-400 transition-colors"
                              >
                                {user.phone}
                              </a>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                            <CalendarIcon className="w-5 h-5 text-orange-400" />
                          </div>
                          <div>
                            <p className="font-semibold text-white">{formatDate(user.createdAt)}</p>
                            <p className="text-sm text-gray-400">
                              {new Date(user.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(user.status)}`}>
                          {user.isActive !== false ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => setSelectedUser(user) || setPreviewModal(true)}
                            className="p-2 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 rounded-lg text-white transition-all duration-300 hover:scale-105"
                            title="Quick Preview"
                          >
                            <EyeIcon className="w-4 h-4" />
                          </button>
                          
                          <div className="relative group">
                            <button className="p-2 border border-white/20 hover:border-indigo-500 hover:text-indigo-400 bg-white/5 rounded-lg transition-all duration-300 hover:scale-105">
                              <EllipsisVerticalIcon className="w-4 h-4" />
                            </button>
                            
                            <div className="absolute right-0 mt-2 w-48 py-2 bg-gray-900 border border-white/10 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-10">
                              <button
                                onClick={() => setSelectedUser(user) || setPreviewModal(true)}
                                className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-white/10 flex items-center space-x-2"
                              >
                                <EyeIcon className="w-4 h-4 text-blue-400" />
                                <span>View Details</span>
                              </button>
                              <button
                                onClick={() => showNotification('info', 'Coming Soon', 'Edit functionality coming soon!')}
                                className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-white/10 flex items-center space-x-2"
                              >
                                <PencilIcon className="w-4 h-4 text-green-400" />
                                <span>Edit User</span>
                              </button>
                              <button
                                onClick={() => window.location.href = `mailto:${user.email}`}
                                className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-white/10 flex items-center space-x-2"
                              >
                                <EnvelopeIcon className="w-4 h-4 text-orange-400" />
                                <span>Send Email</span>
                              </button>
                              <div className="border-t border-white/10 my-2"></div>
                              <button
                                onClick={() => deleteUser(user._id, user.displayName)}
                                disabled={user.role === "ADMIN" || deleteLoading}
                                className={`w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-red-500/10 flex items-center space-x-2 ${
                                  user.role === "ADMIN" ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                              >
                                <TrashIcon className="w-4 h-4" />
                                <span>{deleteLoading ? 'Deleting...' : 'Delete User'}</span>
                              </button>
                            </div>
                          </div>
                          
                          <button
                            onClick={() => {
                              if (!user.role === "ADMIN") {
                                if (confirm(`Are you sure you want to delete ${user.displayName}? This action cannot be undone.`)) {
                                  deleteUser(user._id, user.displayName);
                                }
                              }
                            }}
                            disabled={user.role === "ADMIN" || deleteLoading}
                            className={`p-2 border ${
                              user.role === "ADMIN" 
                                ? 'border-red-500/20 text-red-400/50 cursor-not-allowed' 
                                : 'border-red-500/20 text-red-400 hover:border-red-500 hover:scale-105'
                            } rounded-lg transition-all duration-300`}
                            title="Delete User"
                          >
                            <TrashIcon className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          {filteredUsers.length > 0 && (
            <div className="px-6 py-4 border-t border-white/10 flex items-center justify-between">
              <p className="text-sm text-gray-400">
                Showing <span className="font-semibold text-white">{(pagination.current - 1) * pagination.pageSize + 1}</span> to{' '}
                <span className="font-semibold text-white">
                  {Math.min(pagination.current * pagination.pageSize, filteredUsers.length)}
                </span> of{' '}
                <span className="font-semibold text-white">{filteredUsers.length}</span> users
              </p>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => fetchUsers(pagination.current - 1)}
                  disabled={pagination.current === 1}
                  className="px-3 py-1.5 border border-white/10 rounded-lg text-sm text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/10 transition-colors"
                >
                  Previous
                </button>
                <span className="text-sm text-gray-400">Page {pagination.current}</span>
                <button
                  onClick={() => fetchUsers(pagination.current + 1)}
                  disabled={pagination.current * pagination.pageSize >= pagination.total}
                  className="px-3 py-1.5 border border-white/10 rounded-lg text-sm text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/10 transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* User Preview Modal */}
      {previewModal && selectedUser && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen p-4">
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-black/70 backdrop-blur-sm"
              onClick={() => setPreviewModal(false)}
            ></div>
            
            {/* Modal */}
            <div className="relative w-full max-w-2xl bg-gradient-to-b from-gray-900 to-gray-950 border border-white/10 rounded-2xl shadow-2xl">
              {/* Header */}
              <div className="p-6 border-b border-white/10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                      <UserCircleIcon className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">User Details</h3>
                      <span className={`px-2 py-0.5 text-xs rounded-full border ${getStatusColor(selectedUser.status)}`}>
                        {selectedUser.isActive !== false ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setPreviewModal(false)}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <XCircleIcon className="w-5 h-5 text-gray-400" />
                  </button>
                </div>
              </div>
              
              {/* Body */}
              <div className="p-6">
                <div className="space-y-6">
                  {/* User Info */}
                  <div className="flex items-center space-x-4">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
                      {selectedUser.displayName?.[0]}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white mb-1">
                        {selectedUser.displayName}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        <span className={`px-3 py-1 rounded-full text-sm border ${getRoleColor(selectedUser.role)}`}>
                          {selectedUser.role || "USER"}
                        </span>
                        {selectedUser.username && (
                          <span className="px-3 py-1 rounded-full text-sm bg-blue-500/20 text-blue-400 border border-blue-500/30">
                            @{selectedUser.username}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Details Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                      <div className="flex items-center space-x-2 mb-2">
                        <EnvelopeIcon className="w-5 h-5 text-blue-400" />
                        <span className="font-semibold text-gray-300">Email</span>
                      </div>
                      <a
                        href={`mailto:${selectedUser.email}`}
                        className="text-white hover:text-blue-400 transition-colors break-all"
                      >
                        {selectedUser.email}
                      </a>
                    </div>
                    
                    <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                      <div className="flex items-center space-x-2 mb-2">
                        <PhoneIcon className="w-5 h-5 text-green-400" />
                        <span className="font-semibold text-gray-300">Phone</span>
                      </div>
                      <p className="text-white">
                        {selectedUser.phone || 'Not provided'}
                      </p>
                    </div>
                    
                    <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                      <div className="flex items-center space-x-2 mb-2">
                        <CalendarIcon className="w-5 h-5 text-orange-400" />
                        <span className="font-semibold text-gray-300">Joined</span>
                      </div>
                      <p className="text-white">{formatDate(selectedUser.createdAt)}</p>
                    </div>
                    
                    <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                      <div className="flex items-center space-x-2 mb-2">
                        <ClockIcon className="w-5 h-5 text-purple-400" />
                        <span className="font-semibold text-gray-300">Status</span>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm border ${getStatusColor(selectedUser.status)}`}>
                        {selectedUser.isActive !== false ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </div>
                  
                  {/* User ID */}
                  <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                    <div className="flex items-center space-x-2 mb-2">
                      <ShieldCheckIcon className="w-5 h-5 text-yellow-400" />
                      <span className="font-semibold text-gray-300">User ID</span>
                    </div>
                    <code className="text-sm bg-black/20 px-3 py-2 rounded-lg text-gray-300 font-mono block overflow-x-auto">
                      {selectedUser._id}
                    </code>
                  </div>
                  
                  {/* Admin Warning */}
                  {selectedUser.role === "ADMIN" && (
                    <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
                      <div className="flex items-start space-x-3">
                        <ExclamationTriangleIcon className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <h5 className="font-semibold text-yellow-300">Admin Account Protected</h5>
                          <p className="text-sm text-yellow-400/80 mt-1">
                            This is an admin account with elevated permissions. Special authorization is required for modification.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Footer */}
              <div className="p-6 border-t border-white/10 flex justify-end space-x-3">
                <button
                  onClick={() => setPreviewModal(false)}
                  className="px-4 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-xl transition-all duration-300"
                >
                  Close
                </button>
                <button
                  onClick={() => window.location.href = `mailto:${selectedUser.email}`}
                  className="px-4 py-2.5 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white rounded-xl flex items-center space-x-2 transition-all duration-300"
                >
                  <EnvelopeIcon className="w-5 h-5" />
                  <span>Send Email</span>
                </button>
                {selectedUser.role !== "ADMIN" && (
                  <button
                    onClick={() => {
                      if (confirm(`Are you sure you want to delete ${selectedUser.displayName}? This action cannot be undone.`)) {
                        deleteUser(selectedUser._id, selectedUser.displayName);
                        setPreviewModal(false);
                      }
                    }}
                    className="px-4 py-2.5 border border-red-500/20 text-red-400 hover:border-red-500 hover:bg-red-500/10 rounded-xl transition-all duration-300 flex items-center space-x-2"
                  >
                    <TrashIcon className="w-5 h-5" />
                    <span>Delete User</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsersection;