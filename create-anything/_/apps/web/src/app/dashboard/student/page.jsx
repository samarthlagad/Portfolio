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
  CheckCircle
} from 'lucide-react';

export default function StudentDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [academicData, setAcademicData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load user data from localStorage
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }

    // Fetch academic data
    fetchAcademicData();
  }, []);

  const fetchAcademicData = async () => {
    try {
      const token = localStorage.getItem('userToken');
      const response = await fetch('/api/student/dashboard', {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        const data = await response.json();
        setAcademicData(data);
      }
    } catch (error) {
      console.error('Error fetching academic data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', active: true, path: '/dashboard/student' },
    { icon: BookOpen, label: 'My Courses', active: false, path: '/dashboard/student/courses' },
    { icon: BarChart3, label: 'Academic Progress', active: false, path: '/dashboard/student/progress' },
    { icon: Calendar, label: 'Attendance', active: false, path: '/dashboard/student/attendance' },
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
    recentGrades: [
      { subject: 'Data Structures & Algorithms', grade: 'A', credits: 4 },
      { subject: 'Database Management Systems', grade: 'A+', credits: 4 },
      { subject: 'Software Engineering', grade: 'B+', credits: 3 },
      { subject: 'Computer Networks', grade: 'A', credits: 4 }
    ],
    upcomingAssignments: [
      { title: 'DSA Assignment 3', subject: 'Data Structures', dueDate: '2024-10-15', status: 'pending' },
      { title: 'DBMS Project', subject: 'Database Systems', dueDate: '2024-10-18', status: 'in-progress' },
      { title: 'SE Report', subject: 'Software Engineering', dueDate: '2024-10-20', status: 'pending' }
    ],
    attendanceStats: {
      overall: 87,
      subjects: [
        { name: 'DSA', attendance: 92 },
        { name: 'DBMS', attendance: 85 },
        { name: 'SE', attendance: 88 },
        { name: 'CN', attendance: 84 }
      ]
    },
    announcements: [
      { title: 'Mid-term Exam Schedule Released', date: '2024-10-12', type: 'exam' },
      { title: 'Library Timing Changes', date: '2024-10-10', type: 'notice' },
      { title: 'Industrial Visit - Tech Mahindra', date: '2024-10-08', type: 'event' }
    ]
  };

  const displayData = academicData || defaultData;
  const currentUser = userData || defaultData.student;

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-[#1e3a8a] rounded-full flex items-center justify-center animate-pulse mb-4 mx-auto">
            <GraduationCap size={32} className="text-white" />
          </div>
          <p className="text-[#6b7280]">Loading dashboard...</p>
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
            <h1 className="text-xl font-bold text-[#1e293b]">Dashboard</h1>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#6b7280]" />
              <input
                type="text"
                placeholder="Search..."
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
          {/* Welcome Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-[#1e293b] mb-2">
              Welcome back, {currentUser.name}!
            </h2>
            <p className="text-[#64748b]">{currentUser.semester} • CGPA: {currentUser.cgpa}</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl border border-[#e2e8f0] shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#64748b] mb-1">Overall Attendance</p>
                  <p className="text-2xl font-bold text-[#1e293b]">{displayData.attendanceStats.overall}%</p>
                </div>
                <div className="w-12 h-12 bg-[#dcfce7] rounded-lg flex items-center justify-center">
                  <CheckCircle size={24} className="text-[#16a34a]" />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-[#e2e8f0] shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#64748b] mb-1">Current CGPA</p>
                  <p className="text-2xl font-bold text-[#1e293b]">{currentUser.cgpa}</p>
                </div>
                <div className="w-12 h-12 bg-[#fef3c7] rounded-lg flex items-center justify-center">
                  <Award size={24} className="text-[#fbbf24]" />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-[#e2e8f0] shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#64748b] mb-1">Pending Assignments</p>
                  <p className="text-2xl font-bold text-[#1e293b]">{displayData.upcomingAssignments.length}</p>
                </div>
                <div className="w-12 h-12 bg-[#dbeafe] rounded-lg flex items-center justify-center">
                  <FileText size={24} className="text-[#1e3a8a]" />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-[#e2e8f0] shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#64748b] mb-1">Current Semester</p>
                  <p className="text-2xl font-bold text-[#1e293b]">6th</p>
                </div>
                <div className="w-12 h-12 bg-[#f3e8ff] rounded-lg flex items-center justify-center">
                  <GraduationCap size={24} className="text-[#7c3aed]" />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Grades */}
            <div className="bg-white rounded-xl border border-[#e2e8f0] shadow-sm overflow-hidden">
              <div className="p-6 border-b border-[#e2e8f0]">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-[#1e293b]">Recent Grades</h3>
                  <a href="/dashboard/student/results" className="text-[#1e3a8a] hover:text-[#1e40af] text-sm">
                    View All
                  </a>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {displayData.recentGrades.map((grade, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-[#1e293b]">{grade.subject}</p>
                        <p className="text-sm text-[#64748b]">{grade.credits} Credits</p>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                        grade.grade.includes('A') ? 'bg-[#dcfce7] text-[#16a34a]' :
                        grade.grade.includes('B') ? 'bg-[#fef3c7] text-[#f59e0b]' :
                        'bg-[#fee2e2] text-[#dc2626]'
                      }`}>
                        {grade.grade}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Upcoming Assignments */}
            <div className="bg-white rounded-xl border border-[#e2e8f0] shadow-sm overflow-hidden">
              <div className="p-6 border-b border-[#e2e8f0]">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-[#1e293b]">Upcoming Assignments</h3>
                  <a href="/dashboard/student/assignments" className="text-[#1e3a8a] hover:text-[#1e40af] text-sm">
                    View All
                  </a>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {displayData.upcomingAssignments.map((assignment, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-[#1e293b]">{assignment.title}</p>
                        <p className="text-sm text-[#64748b]">{assignment.subject}</p>
                      </div>
                      <div>
                        <p className="text-sm text-[#64748b]">Due: {assignment.dueDate}</p>
                        <div className={`text-xs px-2 py-1 rounded-full mt-1 ${
                          assignment.status === 'pending' ? 'bg-[#fef3c7] text-[#f59e0b]' :
                          assignment.status === 'in-progress' ? 'bg-[#dbeafe] text-[#1e3a8a]' :
                          'bg-[#dcfce7] text-[#16a34a]'
                        }`}>
                          {assignment.status.replace('-', ' ').toUpperCase()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Attendance Overview */}
            <div className="bg-white rounded-xl border border-[#e2e8f0] shadow-sm overflow-hidden">
              <div className="p-6 border-b border-[#e2e8f0]">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-[#1e293b]">Attendance Overview</h3>
                  <a href="/dashboard/student/attendance" className="text-[#1e3a8a] hover:text-[#1e40af] text-sm">
                    View Details
                  </a>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {displayData.attendanceStats.subjects.map((subject, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium text-[#1e293b]">{subject.name}</span>
                        <span className="text-sm text-[#64748b]">{subject.attendance}%</span>
                      </div>
                      <div className="w-full bg-[#f1f5f9] rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            subject.attendance >= 85 ? 'bg-[#16a34a]' :
                            subject.attendance >= 75 ? 'bg-[#f59e0b]' : 'bg-[#dc2626]'
                          }`}
                          style={{ width: `${subject.attendance}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Announcements */}
            <div className="bg-white rounded-xl border border-[#e2e8f0] shadow-sm overflow-hidden">
              <div className="p-6 border-b border-[#e2e8f0]">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-[#1e293b]">Recent Announcements</h3>
                  <a href="/dashboard/student/notifications" className="text-[#1e3a8a] hover:text-[#1e40af] text-sm">
                    View All
                  </a>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {displayData.announcements.map((announcement, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        announcement.type === 'exam' ? 'bg-[#dc2626]' :
                        announcement.type === 'event' ? 'bg-[#1e3a8a]' : 'bg-[#f59e0b]'
                      }`}></div>
                      <div className="flex-1">
                        <p className="font-medium text-[#1e293b]">{announcement.title}</p>
                        <p className="text-sm text-[#64748b]">{announcement.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}