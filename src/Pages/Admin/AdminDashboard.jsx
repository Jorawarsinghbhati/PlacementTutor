import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Table, Button, Tag, Statistic, Progress, message } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined, UserOutlined, DollarOutlined, CalendarOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { apiConnector } from "../../Service/apiConnector"; 
import { adminEndpoints } from '../../Service/apis'; 
const AdminDashboard = () => {
  const [dashboardStats, setDashboardStats] = useState(null);
  const [mentorRequests, setMentorRequests] = useState([]);
  const [loading, setLoading] = useState({
    stats: false,
    mentors: false
  });

  // Fetch Dashboard Stats
  const fetchDashboardStats = async () => {
    setLoading(prev => ({ ...prev, stats: true }));
    try {
      const response = await apiConnector(
        "GET", 
        adminEndpoints.ADMIN_DASHBOARD_STATS
      );
      const responsebabe=await apiConnector("GET",adminEndpoints.ALL_USERS_DETAILED);
      console.log("resposebabe",responsebabe.data);
      // const responsebaby=await apiConnector("GET",adminEndpoints.ALL_BOOKINGS_DETAILED);
      // console.log("resposebaby",responsebaby.data);
      console.log("Admin dashboard stats:", response.data);
      setDashboardStats(response.data);
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
      message.error("Failed to load dashboard statistics");
    } finally {
      setLoading(prev => ({ ...prev, stats: false }));
    }
  };

  // Fetch Mentor Requests
  const fetchMentorRequests = async () => {
    setLoading(prev => ({ ...prev, mentors: true }));
    try {
      const response = await apiConnector(
        "GET", 
        adminEndpoints.PENDING_MENTORS
      );
      setMentorRequests(response.data);
    } catch (error) {
      console.error("Error fetching mentor requests:", error);
      message.error("Failed to load mentor requests");
    } finally {
      setLoading(prev => ({ ...prev, mentors: false }));
    }
  };

  // Handle Mentor Approval/Rejection
  const handleMentorAction = async (mentorId, action) => {
    try {
      const endpoint = action === 'approve' 
        ? adminEndpoints.APPROVE_MENTOR 
        : adminEndpoints.REJECT_MENTOR;
      
      await apiConnector(
        "POST", 
        endpoint, 
        { mentorId }
      );
      
      // Refresh mentor requests
      fetchMentorRequests();
      
      // Show success message
      message.success(`Mentor ${action}d successfully!`);
    } catch (error) {
      console.error(`Error ${action}ing mentor:`, error);
      message.error(`Failed to ${action} mentor`);
    }
  };

  useEffect(() => {
    fetchDashboardStats();
    fetchMentorRequests();
  }, []);

  // Mentor Requests Table Columns
  const mentorColumns = [
    {
      title: 'Mentor Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <div>
          <strong>{text}</strong>
          <div style={{ fontSize: '12px', color: '#666' }}>{record.email}</div>
        </div>
      ),
    },
    {
      title: 'Expertise',
      dataIndex: 'expertise',
      key: 'expertise',
      render: (expertise) => (
        <Tag color="blue">{expertise}</Tag>
      ),
    },
    {
      title: 'Experience',
      dataIndex: 'experience',
      key: 'experience',
      render: (exp) => `${exp} years`,
    },
    {
      title: 'Applied Date',
      dataIndex: 'appliedDate',
      key: 'appliedDate',
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'pending' ? 'orange' : status === 'approved' ? 'green' : 'red'}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Documents',
      key: 'documents',
      render: (_, record) => (
        <Button 
          type="link" 
          onClick={() => window.open(record.resumeUrl, '_blank')}
        >
          View Resume
        </Button>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button
            type="primary"
            icon={<CheckCircleOutlined />}
            onClick={() => handleMentorAction(record.id, 'approve')}
            disabled={record.status !== 'pending'}
          >
            Approve
          </Button>
          <Button
            danger
            icon={<CloseCircleOutlined />}
            onClick={() => handleMentorAction(record.id, 'reject')}
            disabled={record.status !== 'pending'}
          >
            Reject
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div style={{ padding: '24px' }}>
      <h1>Admin Dashboard</h1>
      
      {/* Overview Section */}
      <div style={{ marginBottom: '24px' }}>
        <h2>Overview</h2>
        {dashboardStats && (
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} lg={6}>
              <Card loading={loading.stats}>
                <Statistic
                  title="Today's Bookings"
                  value={dashboardStats.overview.todaysBookings}
                  prefix={<CalendarOutlined />}
                  valueStyle={{ color: '#3f8600' }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card loading={loading.stats}>
                <Statistic
                  title="Total Bookings"
                  value={dashboardStats.overview.totalBookings}
                  prefix={<CalendarOutlined />}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card loading={loading.stats}>
                <Statistic
                  title="Total Revenue"
                  value={dashboardStats.overview.totalRevenue}
                  prefix={<DollarOutlined />}
                  valueStyle={{ color: '#1890ff' }}
                  suffix="$"
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card loading={loading.stats}>
                <Statistic
                  title="Total Users"
                  value={dashboardStats.overview.totalUsers}
                  prefix={<UserOutlined />}
                />
              </Card>
            </Col>
          </Row>
        )}
        
        {/* Popular Time Slot Card */}
        {dashboardStats?.popularTimeSlot && (
          <Card 
            title="Most Popular Time Slot" 
            style={{ marginTop: '16px' }}
            loading={loading.stats}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <ClockCircleOutlined style={{ fontSize: '24px', color: '#1890ff' }} />
              <div>
                <h3 style={{ margin: 0 }}>
                  {dashboardStats.popularTimeSlot.startTime} - {dashboardStats.popularTimeSlot.endTime}
                </h3>
                <p style={{ margin: '4px 0 0 0', color: '#666' }}>
                  {dashboardStats.popularTimeSlot.bookings} bookings this week
                </p>
              </div>
              <Progress 
                type="circle" 
                percent={Math.min(100, dashboardStats.popularTimeSlot.bookings * 20)} 
                width={60}
              />
            </div>
          </Card>
        )}
      </div>

      {/* Mentor Requests Section */}
      <div>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '16px'
        }}>
          <h2>Mentor Requests</h2>
          <Button 
            type="primary" 
            onClick={fetchMentorRequests}
            loading={loading.mentors}
          >
            Refresh
          </Button>
        </div>
        
        {mentorRequests.length > 0 ? (
          <Card>
            <Table
              columns={mentorColumns}
              dataSource={mentorRequests}
              loading={loading.mentors}
              rowKey="id"
              pagination={{ pageSize: 10 }}
              scroll={{ x: 1000 }}
            />
          </Card>
        ) : (
          <Card>
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <CheckCircleOutlined style={{ fontSize: '48px', color: '#52c41a' }} />
              <h3 style={{ marginTop: '16px' }}>No Pending Mentor Requests</h3>
              <p style={{ color: '#666' }}>All mentor requests have been processed.</p>
              <Button 
                type="primary" 
                onClick={fetchMentorRequests}
                loading={loading.mentors}
              >
                Check Again
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;