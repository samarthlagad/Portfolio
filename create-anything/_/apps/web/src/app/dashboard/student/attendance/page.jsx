import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  BookOpen, 
  Calendar, 
  GraduationCap, 
  Bell, 
  User,
  BarChart3,
  Clock,
  Download,
  ChevronRight,
  LogOut,
  Menu,
  X,
  Search,
  Home,
  FileText,
  Award,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Filter,
  CalendarDays,
  TrendingUp,
  Eye
} from 'lucide-react';

export default function StudentAttendance() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [attendanceData, setAttendanceData] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState('all');
  const [selectedMonth, setSelectedMonth] = useState('current');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load user data from localStorage
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }

    // Fetch attendance data
    fetchAttendanceData();
  }, []);

  const fetchAttendanceData = async () => {
    try {
      const token = localStorage.getItem('userToken');
      const response = await fetch('/api/student/attendance', {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        const data = await response.json();
        setAttendanceData(data);
      }
    } catch (error) {
      console.error('Error fetching attendance data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', active: false, path: '/dashboard/student' },
    { icon: BookOpen, label: 'My Courses', active: false, path: '/dashboard/student/courses' },
    { icon: BarChart3, label: 'Academic Progress', active: false, path: '/dashboard/student/progress' },
    { icon: Calendar, label: 'Attendance', active: true, path: '/dashboard/student/attendance' },
    { icon: FileText, label: 'Assignments', active: false, path: '/dashboard/student/assignments' },
    { icon: Award, label: 'Results', active: false, path: '/dashboard/student/results' },
    { icon: Bell, label: 'Notifications', active: false, path: '/dashboard/student/notifications' }
  ];

  // Mock data for demo purposes
  const defaultData = {
    student: {
      name: 'Rahul Sharma',
      studentId: 'TCET2023001',
      branch: 'Computer Engineering',
      semester: '6th Semester',
      cgpa: '8.45',
      profileImage: null
    },
    overallStats: {
      totalClasses: 156,
      attended: 142,
      percentage: 91.0,
      target: 75,
      status: 'good'
    },
    courseStats: [
      { 
        code: 'CS601', 
        name: 'Data Structures & Algorithms', 
        attended: 28, 
        total: 32, 
        percentage: 87.5,
        status: 'good',
        faculty: 'Prof. A. Kumar'
      },
      { 
        code: 'CS602', 
        name: 'Database Management Systems', 
        attended: 26, 
        total: 30, 
        percentage: 86.7,
        status: 'good',
        faculty: 'Prof. S. Sharma'
      },
      { 
        code: 'CS603', 
        name: 'Software Engineering', 
        attended: 24, 
        total: 28, 
        percentage: 85.7,
        status: 'good',
        faculty: 'Dr. R. Patel'
      },
      { 
        code: 'CS604', 
        name: 'Computer Networks', 
        attended: 22, 
        total: 26, 
        percentage: 84.6,
        status: 'warning',
        faculty: 'Prof. M. Singh'
      },
      { 
        code: 'CS605', 
        name: 'Operating Systems', 
        attended: 20, 
        total: 25, 
        percentage: 80.0,
        status: 'warning',
        faculty: 'Dr. P. Gupta'
      }
    ],
    recentAttendance: [
      { date: '2024-10-11', course: 'CS601', status: 'present', time: '09:00 AM' },
      { date: '2024-10-11', course: 'CS602', status: 'present', time: '11:00 AM' },
      { date: '2024-10-10', course: 'CS603', status: 'present', time: '02:00 PM' },
      { date: '2024-10-10', course: 'CS604', status: 'absent', time: '03:30 PM' },
      { date: '2024-10-09', course: 'CS605', status: 'present', time: '10:00 AM' },
      { date: '2024-10-09', course: 'CS601', status: 'present', time: '01:00 PM' },
      { date: '2024-10-08', course: 'CS602', status: 'late', time: '11:00 AM' },
      { date: '2024-10-08', course: 'CS603', status: 'present', time: '02:00 PM' }
    ],
    monthlyTrend: [
      { month: 'Aug', percentage: 89 },
      { month: 'Sep', percentage: 87 },
      { month: 'Oct', percentage: 91 }
    ]
  };

  const displayData = attendanceData || defaultData;
  const currentUser = userData || defaultData.student;

  const getStatusColor = (status) => {
    switch (status) {
      case 'good':
        return 'bg-[#dcfce7] text-[#16a34a] border-[#bbf7d0]';
      case 'warning':
        return 'bg-[#fef3c7] text-[#f59e0b] border-[#fed7aa]';
      case 'danger':
        return 'bg-[#fee2e2] text-[#dc2626] border-[#fecaca]';
      default:
        return 'bg-[#f1f5f9] text-[#64748b] border-[#e2e8f0]';
    }
  };

  const getAttendanceStatusIcon = (status) => {
    switch (status) {
      case 'present':
        return <CheckCircle size={20} className="text-[#16a34a]" />;
      case 'absent':
        return <XCircle size={20} className="text-[#dc2626]" />;
      case 'late':
        return <Clock size={20} className="text-[#f59e0b]" />;
      default:
        return <AlertTriangle size={20} className="text-[#64748b]" />;
    }
  };

  const filteredCourses = selectedCourse === 'all' 
    ? displayData.courseStats 
    : displayData.courseStats.filter(course => course.code === selectedCourse);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-[#1e3a8a] rounded-full flex items-center justify-center animate-pulse mb-4 mx-auto">
            <Calendar size={32} className="text-white" />
          </div>
          <p className="text-[#6b7280]">Loading attendance data...</p>
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
              <GraduationCap size={20} className="text-white" />
            </div>
            <span className="text-[#1e293b] font-bold text-xl">TCET Portal</span>
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
            <div className="w-12 h-12 bg-[#1e3a8a] rounded-full flex items-center justify-center">
              <User size={24} className="text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-[#1e293b]">{currentUser.name}</h3>
              <p className="text-sm text-[#64748b]">{currentUser.studentId}</p>
              <p className="text-xs text-[#64748b]">{currentUser.branch}</p>
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
                  ? 'bg-[#1e3a8a] text-white'
                  : 'text-[#64748b] hover:bg-[#f1f5f9] hover:text-[#1e3a8a]'
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
            <div className="flex items-center space-x-2">
              <Calendar size={20} className="text-[#1e3a8a]" />
              <h1 className="text-xl font-bold text-[#1e293b]">Attendance</h1>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#6b7280]" />
              <input
                type="text"
                placeholder="Search courses..."
                className="pl-10 pr-4 py-2 bg-[#f8fafc] border border-[#e2e8f0] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] focus:border-[#1e3a8a]"
              />
            </div>
            <button className="p-2 bg-[#f8fafc] rounded-lg hover:bg-[#f1f5f9]">
              <Bell size={20} className="text-[#64748b]" />
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          {/* Breadcrumb */}
          <div className="flex items-center space-x-2 text-sm text-[#64748b] mb-6">
            <Home size={16} />
            <ChevronRight size={16} />
            <span>Dashboard</span>
            <ChevronRight size={16} />
            <span className="text-[#1e293b] font-medium">Attendance</span>
          </div>

          {/* Overall Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl border border-[#e2e8f0] shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#64748b] mb-1">Overall Attendance</p>
                  <p className="text-2xl font-bold text-[#1e293b]">{displayData.overallStats.percentage}%</p>
                  <p className="text-xs text-[#16a34a] mt-1">Above Target ({displayData.overallStats.target}%)</p>
                </div>
                <div className="w-12 h-12 bg-[#dcfce7] rounded-lg flex items-center justify-center">
                  <CheckCircle size={24} className="text-[#16a34a]" />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-[#e2e8f0] shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#64748b] mb-1">Classes Attended</p>
                  <p className="text-2xl font-bold text-[#1e293b]">{displayData.overallStats.attended}</p>
                  <p className="text-xs text-[#64748b] mt-1">out of {displayData.overallStats.totalClasses}</p>
                </div>
                <div className="w-12 h-12 bg-[#dbeafe] rounded-lg flex items-center justify-center">
                  <Calendar size={24} className="text-[#1e3a8a]" />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-[#e2e8f0] shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#64748b] mb-1">Classes Missed</p>
                  <p className="text-2xl font-bold text-[#1e293b]">{displayData.overallStats.totalClasses - displayData.overallStats.attended}</p>
                  <p className="text-xs text-[#dc2626] mt-1">{((displayData.overallStats.totalClasses - displayData.overallStats.attended) / displayData.overallStats.totalClasses * 100).toFixed(1)}% absence</p>
                </div>
                <div className="w-12 h-12 bg-[#fee2e2] rounded-lg flex items-center justify-center">
                  <XCircle size={24} className="text-[#dc2626]" />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-[#e2e8f0] shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#64748b] mb-1">Monthly Trend</p>
                  <p className="text-2xl font-bold text-[#1e293b]">+4%</p>
                  <p className="text-xs text-[#16a34a] mt-1">vs last month</p>
                </div>
                <div className="w-12 h-12 bg-[#f3e8ff] rounded-lg flex items-center justify-center">
                  <TrendingUp size={24} className="text-[#7c3aed]" />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Course-wise Attendance */}
            <div className="lg:col-span-2 bg-white rounded-xl border border-[#e2e8f0] shadow-sm overflow-hidden">
              <div className="p-6 border-b border-[#e2e8f0]">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-[#1e293b]">Course-wise Attendance</h3>
                  <div className="flex items-center space-x-2">
                    <Filter size={16} className="text-[#64748b]" />
                    <select 
                      value={selectedCourse}
                      onChange={(e) => setSelectedCourse(e.target.value)}
                      className="text-sm border border-[#e2e8f0] rounded-lg px-3 py-1 focus:ring-2 focus:ring-[#1e3a8a] focus:border-[#1e3a8a]"
                    >
                      <option value="all">All Courses</option>
                      {displayData.courseStats.map(course => (
                        <option key={course.code} value={course.code}>{course.code}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-6">
                  {filteredCourses.map((course, index) => (
                    <div key={index} className="border border-[#e2e8f0] rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-[#1e293b]">{course.name}</h4>
                          <p className="text-sm text-[#64748b]">{course.code} • {course.faculty}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-[#1e293b]">{course.percentage}%</p>
                          <p className="text-sm text-[#64748b]">{course.attended}/{course.total} classes</p>
                        </div>
                      </div>
                      <div className="w-full bg-[#f1f5f9] rounded-full h-2 mb-2">
                        <div
                          className={`h-2 rounded-full ${
                            course.percentage >= 85 ? 'bg-[#16a34a]' :
                            course.percentage >= 75 ? 'bg-[#f59e0b]' : 'bg-[#dc2626]'
                          }`}
                          style={{ width: `${course.percentage}%` }}
                        ></div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(course.status)}`}>
                          {course.status === 'good' ? 'Good Standing' : 
                           course.status === 'warning' ? 'Needs Attention' : 'At Risk'}
                        </span>
                        <button className="text-[#1e3a8a] hover:text-[#1e40af] text-sm flex items-center space-x-1">
                          <Eye size={16} />
                          <span>View Details</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Attendance */}
            <div className="bg-white rounded-xl border border-[#e2e8f0] shadow-sm overflow-hidden">
              <div className="p-6 border-b border-[#e2e8f0]">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-[#1e293b]">Recent Activity</h3>
                  <CalendarDays size={20} className="text-[#64748b]" />
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {displayData.recentAttendance.slice(0, 8).map((record, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {getAttendanceStatusIcon(record.status)}
                        <div>
                          <p className="text-sm font-medium text-[#1e293b]">{record.course}</p>
                          <p className="text-xs text-[#64748b]">{record.date} • {record.time}</p>
                        </div>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        record.status === 'present' ? 'bg-[#dcfce7] text-[#16a34a]' :
                        record.status === 'absent' ? 'bg-[#fee2e2] text-[#dc2626]' :
                        'bg-[#fef3c7] text-[#f59e0b]'
                      }`}>
                        {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                      </span>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-4 text-[#1e3a8a] hover:text-[#1e40af] text-sm font-medium">
                  View All Records
                </button>
              </div>
            </div>

            {/* Monthly Trend Chart */}
            <div className="lg:col-span-3 bg-white rounded-xl border border-[#e2e8f0] shadow-sm overflow-hidden">
              <div className="p-6 border-b border-[#e2e8f0]">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-[#1e293b]">Attendance Trend</h3>
                  <div className="flex items-center space-x-2">
                    <select className="text-sm border border-[#e2e8f0] rounded-lg px-3 py-1 focus:ring-2 focus:ring-[#1e3a8a] focus:border-[#1e3a8a]">
                      <option>Last 3 Months</option>
                      <option>Last 6 Months</option>
                      <option>Academic Year</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-end space-x-6 h-32">
                  {displayData.monthlyTrend.map((month, index) => (
                    <div key={index} className="flex flex-col items-center space-y-2">
                      <div 
                        className="w-12 bg-[#1e3a8a] rounded-t-lg transition-all duration-300"
                        style={{ height: `${month.percentage}%` }}
                      ></div>
                      <span className="text-sm font-medium text-[#64748b]">{month.month}</span>
                      <span className="text-xs text-[#1e293b] font-semibold">{month.percentage}%</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                  <div className="p-3 bg-[#dcfce7] rounded-lg">
                    <p className="text-sm text-[#16a34a] font-medium">Target: 75%</p>
                    <p className="text-xs text-[#15803d]">Minimum required</p>
                  </div>
                  <div className="p-3 bg-[#dbeafe] rounded-lg">
                    <p className="text-sm text-[#1e3a8a] font-medium">Current: 91%</p>
                    <p className="text-xs text-[#1e40af]">Well above target</p>
                  </div>
                  <div className="p-3 bg-[#fef3c7] rounded-lg">
                    <p className="text-sm text-[#f59e0b] font-medium">Goal: 95%</p>
                    <p className="text-xs text-[#d97706]">Excellence target</p>
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