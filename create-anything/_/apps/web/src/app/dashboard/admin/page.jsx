import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  GraduationCap, 
  Bell, 
  User,
  BarChart3,
  Settings,
  FileText,
  Database,
  Shield,
  Calendar,
  BookOpen,
  Building2,
  UserCheck,
  AlertTriangle,
  TrendingUp,
  LogOut,
  Menu,
  X,
  Search,
  Plus,
  Download,
  Upload,
  Eye
} from 'lucide-react';

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [adminData, setAdminData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load user data from localStorage
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }

    // Fetch admin data
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    try {
      const token = localStorage.getItem('userToken');
      const response = await fetch('/api/admin/dashboard', {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        const data = await response.json();
        setAdminData(data);
      }
    } catch (error) {
      console.error('Error fetching admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', active: true, path: '/dashboard/admin' },
    { icon: Users, label: 'User Management', active: false, path: '/dashboard/admin/users' },
    { icon: GraduationCap, label: 'Academic Management', active: false, path: '/dashboard/admin/academic' },
    { icon: BookOpen, label: 'Course Management', active: false, path: '/dashboard/admin/courses' },
    { icon: Building2, label: 'Department Management', active: false, path: '/dashboard/admin/departments' },
    { icon: BarChart3, label: 'Reports & Analytics', active: false, path: '/dashboard/admin/reports' },
    { icon: Database, label: 'System Data', active: false, path: '/dashboard/admin/data' },
    { icon: Settings, label: 'System Settings', active: false, path: '/dashboard/admin/settings' },
    { icon: Bell, label: 'Notifications', active: false, path: '/dashboard/admin/notifications' }
  ];

  // Mock data for demo purposes
  const defaultData = {
    admin: {
      name: 'Dr. Rajesh Kumar',
      employeeId: 'TCET-A-001',
      role: 'System Administrator',
      department: 'IT Administration',
      experience: '15 years',
      profileImage: null
    },
    systemStats: {
      totalStudents: 3240,
      totalFaculty: 180,
      totalCourses: 156,
      activeSessions: 245,
      pendingApprovals: 12,
      systemUptime: '99.8%',
      dataBackupStatus: 'Current',
      securityAlerts: 3
    },
    departmentStats: [
      { name: 'Computer Engineering', students: 890, faculty: 45, courses: 42 },
      { name: 'Electronics Engineering', students: 760, faculty: 38, courses: 38 },
      { name: 'Mechanical Engineering', students: 680, faculty: 32, courses: 35 },
      { name: 'Civil Engineering', students: 520, faculty: 28, courses: 28 },
      { name: 'Information Technology', students: 390, faculty: 37, courses: 13 }
    ],
    recentActivities: [
      { activity: 'New faculty registration approved', user: 'Dr. Priya Patel', time: '1 hour ago', type: 'approval' },
      { activity: 'Course curriculum updated', details: 'Machine Learning - CE701', time: '2 hours ago', type: 'update' },
      { activity: 'Student batch data imported', details: '2024-25 Academic Year', time: '4 hours ago', type: 'import' },
      { activity: 'Security alert resolved', details: 'Unauthorized access attempt', time: '6 hours ago', type: 'security' },
      { activity: 'System backup completed', details: 'Weekly automated backup', time: '1 day ago', type: 'system' }
    ],
    pendingApprovals: [
      { type: 'Faculty Registration', name: 'Prof. Amit Singh', department: 'Electronics', submitted: '2024-10-10', priority: 'medium' },
      { type: 'Course Addition', name: 'Advanced AI Topics', department: 'Computer', submitted: '2024-10-09', priority: 'low' },
      { type: 'Student Transfer', name: 'Neha Sharma', department: 'IT to Computer', submitted: '2024-10-08', priority: 'high' },
      { type: 'Department Budget', name: 'Lab Equipment Purchase', department: 'Mechanical', submitted: '2024-10-07', priority: 'high' }
    ],
    systemAlerts: [
      { type: 'Security', message: 'Multiple failed login attempts detected', severity: 'high', time: '30 min ago' },
      { type: 'Performance', message: 'Database response time increased', severity: 'medium', time: '2 hours ago' },
      { type: 'Backup', message: 'Backup verification completed successfully', severity: 'low', time: '1 day ago' }
    ],
    quickStats: [
      { label: 'Today\'s Logins', value: '1,247', change: '+5.2%', trend: 'up' },
      { label: 'Active Courses', value: '156', change: '+2', trend: 'up' },
      { label: 'New Registrations', value: '23', change: '-8%', trend: 'down' },
      { label: 'System Load', value: '67%', change: '+12%', trend: 'up' }
    ]
  };

  const displayData = adminData || defaultData;
  const currentUser = userData || defaultData.admin;

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-[#1e3a8a] rounded-full flex items-center justify-center animate-pulse mb-4 mx-auto">
            <Shield size={32} className="text-white" />
          </div>
          <p className="text-[#6b7280]">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-full bg-white border-r border-[#e2e8f0] z-50 transition-all duration-300 ease-in-out w-64 flex flex-col ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0`}
      >
        {/* Logo */}
        <div className="flex items-center h-16 px-6 border-b border-[#e2e8f0]">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-[#1e3a8a] rounded-lg flex items-center justify-center">
              <Shield size={20} className="text-white" />
            </div>
            <span className="text-[#1e293b] font-bold text-xl">TCET Admin</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="ml-auto md:hidden p-1 rounded hover:bg-[#f1f5f9]"
          >
            <X size={20} className="text-[#64748b]" />
          </button>
        </div>

        {/* User Profile */}
        <div className="p-6 border-b border-[#e2e8f0]">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-[#dc2626] rounded-full flex items-center justify-center">
              <Shield size={24} className="text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-[#1e293b]">{currentUser.name}</h3>
              <p className="text-sm text-[#64748b]">{currentUser.role}</p>
              <p className="text-xs text-[#64748b]">{currentUser.employeeId}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {menuItems.map((item, index) => (
            <a
              key={index}
              href={item.path}
              className={`flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-colors ${
                item.active
                  ? 'bg-[#dc2626] text-white'
                  : 'text-[#64748b] hover:bg-[#f1f5f9] hover:text-[#dc2626]'
              }`}
            >
              <item.icon size={20} className="mr-3" />
              {item.label}
            </a>
          ))}
        </nav>

        {/* Logout */}
        <div className="border-t border-[#e2e8f0] p-4">
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-3 text-sm font-medium text-[#dc2626] hover:bg-[#fef2f2] rounded-xl transition-colors"
          >
            <LogOut size={20} className="mr-3" />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="md:ml-64">
        {/* Top Bar */}
        <header className="h-16 bg-white border-b border-[#e2e8f0] flex items-center justify-between px-6">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden p-2 rounded hover:bg-[#f1f5f9]"
            >
              <Menu size={20} className="text-[#64748b]" />
            </button>
            <h1 className="text-xl font-bold text-[#1e293b]">System Administration</h1>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#6b7280]" />
              <input
                type="text"
                placeholder="Search users, courses..."
                className="pl-10 pr-4 py-2 bg-[#f8fafc] border border-[#e2e8f0] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#dc2626] focus:border-[#dc2626]"
              />
            </div>
            <button className="relative p-2 bg-[#f8fafc] rounded-lg hover:bg-[#f1f5f9]">
              <Bell size={20} className="text-[#64748b]" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#dc2626] rounded-full text-xs text-white flex items-center justify-center">
                {displayData.systemAlerts.length}
              </span>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          {/* Welcome Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-[#1e293b] mb-2">
              Welcome back, {currentUser.name}!
            </h2>
            <p className="text-[#64748b]">System Administrator • {currentUser.experience} Experience</p>
          </div>

          {/* System Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl border border-[#e2e8f0] shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#64748b] mb-1">Total Students</p>
                  <p className="text-2xl font-bold text-[#1e293b]">{displayData.systemStats.totalStudents.toLocaleString()}</p>
                </div>
                <div className="w-12 h-12 bg-[#dbeafe] rounded-lg flex items-center justify-center">
                  <GraduationCap size={24} className="text-[#1e3a8a]" />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-[#e2e8f0] shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#64748b] mb-1">Faculty Members</p>
                  <p className="text-2xl font-bold text-[#1e293b]">{displayData.systemStats.totalFaculty}</p>
                </div>
                <div className="w-12 h-12 bg-[#dcfce7] rounded-lg flex items-center justify-center">
                  <Users size={24} className="text-[#16a34a]" />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-[#e2e8f0] shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#64748b] mb-1">Active Courses</p>
                  <p className="text-2xl font-bold text-[#1e293b]">{displayData.systemStats.totalCourses}</p>
                </div>
                <div className="w-12 h-12 bg-[#fef3c7] rounded-lg flex items-center justify-center">
                  <BookOpen size={24} className="text-[#fbbf24]" />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-[#e2e8f0] shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#64748b] mb-1">System Uptime</p>
                  <p className="text-2xl font-bold text-[#16a34a]">{displayData.systemStats.systemUptime}</p>
                </div>
                <div className="w-12 h-12 bg-[#dcfce7] rounded-lg flex items-center justify-center">
                  <TrendingUp size={24} className="text-[#16a34a]" />
                </div>
              </div>
            </div>
          </div>

          {/* System Alerts */}
          {displayData.systemAlerts.length > 0 && (
            <div className="bg-white rounded-xl border border-[#e2e8f0] shadow-sm overflow-hidden mb-8">
              <div className="p-6 border-b border-[#e2e8f0] bg-[#fef2f2]">
                <div className="flex items-center space-x-2">
                  <AlertTriangle size={20} className="text-[#dc2626]" />
                  <h3 className="text-lg font-semibold text-[#dc2626]">System Alerts</h3>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {displayData.systemAlerts.map((alert, index) => (
                    <div key={index} className={`p-4 rounded-lg border-l-4 ${
                      alert.severity === 'high' ? 'border-[#dc2626] bg-[#fef2f2]' :
                      alert.severity === 'medium' ? 'border-[#f59e0b] bg-[#fef3c7]' :
                      'border-[#16a34a] bg-[#f0fdf4]'
                    }`}>
                      <div className="flex justify-between items-start">
                        <div>
                          <p className={`font-semibold ${
                            alert.severity === 'high' ? 'text-[#dc2626]' :
                            alert.severity === 'medium' ? 'text-[#f59e0b]' :
                            'text-[#16a34a]'
                          }`}>
                            {alert.type} Alert
                          </p>
                          <p className="text-sm text-[#374151] mt-1">{alert.message}</p>
                        </div>
                        <div className="text-right">
                          <span className="text-xs text-[#6b7280]">{alert.time}</span>
                          <button className="ml-3 p-1 text-[#6b7280] hover:text-[#374151]">
                            <Eye size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Department Overview */}
            <div className="lg:col-span-2 bg-white rounded-xl border border-[#e2e8f0] shadow-sm overflow-hidden">
              <div className="p-6 border-b border-[#e2e8f0]">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-[#1e293b]">Department Overview</h3>
                  <a href="/dashboard/admin/departments" className="text-[#1e3a8a] hover:text-[#1e40af] text-sm">
                    Manage All
                  </a>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {displayData.departmentStats.map((dept, index) => (
                    <div key={index} className="p-4 bg-[#f8fafc] rounded-lg border border-[#e2e8f0]">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-semibold text-[#1e293b]">{dept.name}</h4>
                          <div className="flex space-x-4 mt-2 text-sm text-[#64748b]">
                            <span>Students: {dept.students}</span>
                            <span>Faculty: {dept.faculty}</span>
                            <span>Courses: {dept.courses}</span>
                          </div>
                        </div>
                        <button className="px-4 py-2 bg-[#1e3a8a] text-white rounded-lg hover:bg-[#1e40af] text-sm">
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Pending Approvals */}
            <div className="bg-white rounded-xl border border-[#e2e8f0] shadow-sm overflow-hidden">
              <div className="p-6 border-b border-[#e2e8f0]">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-[#1e293b]">Pending Approvals</h3>
                  <span className="bg-[#dc2626] text-white text-xs px-2 py-1 rounded-full">
                    {displayData.pendingApprovals.length}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {displayData.pendingApprovals.map((approval, index) => (
                    <div key={index} className="p-3 bg-[#f8fafc] rounded-lg border border-[#e2e8f0]">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-medium text-[#1e293b] text-sm">{approval.type}</p>
                          <p className="text-xs text-[#64748b]">{approval.name}</p>
                        </div>
                        <div className={`px-2 py-1 rounded text-xs ${
                          approval.priority === 'high' ? 'bg-[#fee2e2] text-[#dc2626]' :
                          approval.priority === 'medium' ? 'bg-[#fef3c7] text-[#f59e0b]' :
                          'bg-[#f0fdf4] text-[#16a34a]'
                        }`}>
                          {approval.priority}
                        </div>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-[#64748b]">Submitted: {approval.submitted}</span>
                        <div className="flex space-x-2">
                          <button className="px-2 py-1 bg-[#16a34a] text-white rounded">Approve</button>
                          <button className="px-2 py-1 bg-[#dc2626] text-white rounded">Reject</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Activities */}
            <div className="bg-white rounded-xl border border-[#e2e8f0] shadow-sm overflow-hidden">
              <div className="p-6 border-b border-[#e2e8f0]">
                <h3 className="text-lg font-semibold text-[#1e293b]">Recent Activities</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {displayData.recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        activity.type === 'approval' ? 'bg-[#dcfce7] text-[#16a34a]' :
                        activity.type === 'update' ? 'bg-[#dbeafe] text-[#1e3a8a]' :
                        activity.type === 'import' ? 'bg-[#fef3c7] text-[#f59e0b]' :
                        activity.type === 'security' ? 'bg-[#fee2e2] text-[#dc2626]' :
                        'bg-[#f3e8ff] text-[#7c3aed]'
                      }`}>
                        {activity.type === 'approval' && <UserCheck size={16} />}
                        {activity.type === 'update' && <FileText size={16} />}
                        {activity.type === 'import' && <Upload size={16} />}
                        {activity.type === 'security' && <Shield size={16} />}
                        {activity.type === 'system' && <Database size={16} />}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-[#1e293b] text-sm">{activity.activity}</p>
                        {activity.user && <p className="text-xs text-[#64748b]">User: {activity.user}</p>}
                        {activity.details && <p className="text-xs text-[#64748b]">{activity.details}</p>}
                        <p className="text-xs text-[#64748b] mt-1">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl border border-[#e2e8f0] shadow-sm overflow-hidden">
              <div className="p-6 border-b border-[#e2e8f0]">
                <h3 className="text-lg font-semibold text-[#1e293b]">Quick Actions</h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-2 gap-4">
                  <button className="p-4 bg-[#f8fafc] border border-[#e2e8f0] rounded-lg hover:bg-[#f1f5f9] transition-colors text-center">
                    <Plus size={20} className="text-[#1e3a8a] mx-auto mb-2" />
                    <p className="text-xs text-[#64748b]">Add User</p>
                  </button>
                  <button className="p-4 bg-[#f8fafc] border border-[#e2e8f0] rounded-lg hover:bg-[#f1f5f9] transition-colors text-center">
                    <Database size={20} className="text-[#1e3a8a] mx-auto mb-2" />
                    <p className="text-xs text-[#64748b]">Backup Data</p>
                  </button>
                  <button className="p-4 bg-[#f8fafc] border border-[#e2e8f0] rounded-lg hover:bg-[#f1f5f9] transition-colors text-center">
                    <Download size={20} className="text-[#1e3a8a] mx-auto mb-2" />
                    <p className="text-xs text-[#64748b]">Export Report</p>
                  </button>
                  <button className="p-4 bg-[#f8fafc] border border-[#e2e8f0] rounded-lg hover:bg-[#f1f5f9] transition-colors text-center">
                    <Settings size={20} className="text-[#1e3a8a] mx-auto mb-2" />
                    <p className="text-xs text-[#64748b]">System Config</p>
                  </button>
                </div>
              </div>
            </div>

            {/* System Status */}
            <div className="bg-white rounded-xl border border-[#e2e8f0] shadow-sm overflow-hidden">
              <div className="p-6 border-b border-[#e2e8f0]">
                <h3 className="text-lg font-semibold text-[#1e293b]">System Status</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-[#64748b]">Database Status</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-[#16a34a] rounded-full"></div>
                      <span className="text-sm text-[#16a34a]">Online</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-[#64748b]">Backup Status</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-[#16a34a] rounded-full"></div>
                      <span className="text-sm text-[#16a34a]">Current</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-[#64748b]">Active Sessions</span>
                    <span className="text-sm text-[#1e293b]">{displayData.systemStats.activeSessions}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-[#64748b]">Security Alerts</span>
                    <span className={`text-sm ${displayData.systemStats.securityAlerts > 0 ? 'text-[#dc2626]' : 'text-[#16a34a]'}`}>
                      {displayData.systemStats.securityAlerts}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}