import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  BookOpen, 
  Calendar, 
  GraduationCap, 
  Bell, 
  User,
  BarChart3,
  Users,
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
  LogOut,
  Menu,
  X,
  Search,
  Plus,
  Upload,
  Download
} from 'lucide-react';

export default function FacultyDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [facultyData, setFacultyData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load user data from localStorage
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }

    // Fetch faculty data
    fetchFacultyData();
  }, []);

  const fetchFacultyData = async () => {
    try {
      const token = localStorage.getItem('userToken');
      const response = await fetch('/api/faculty/dashboard', {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        const data = await response.json();
        setFacultyData(data);
      }
    } catch (error) {
      console.error('Error fetching faculty data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', active: true, path: '/dashboard/faculty' },
    { icon: BookOpen, label: 'My Courses', active: false, path: '/dashboard/faculty/courses' },
    { icon: Users, label: 'Student Management', active: false, path: '/dashboard/faculty/students' },
    { icon: Calendar, label: 'Attendance', active: false, path: '/dashboard/faculty/attendance' },
    { icon: FileText, label: 'Assignments', active: false, path: '/dashboard/faculty/assignments' },
    { icon: BarChart3, label: 'Reports & Analytics', active: false, path: '/dashboard/faculty/reports' },
    { icon: Upload, label: 'Course Materials', active: false, path: '/dashboard/faculty/materials' },
    { icon: Bell, label: 'Notifications', active: false, path: '/dashboard/faculty/notifications' }
  ];

  // Mock data for demo purposes
  const defaultData = {
    faculty: {
      name: 'Prof. Anjali Sharma',
      employeeId: 'TCET-F-001',
      department: 'Computer Engineering',
      designation: 'Associate Professor',
      experience: '8 years',
      profileImage: null
    },
    courseStats: {
      totalCourses: 4,
      totalStudents: 180,
      pendingAssignments: 12,
      submissionsPending: 25
    },
    courses: [
      { 
        code: 'CE301', 
        name: 'Data Structures & Algorithms', 
        students: 45, 
        semester: '3rd Sem', 
        schedule: 'Mon, Wed, Fri - 10:00 AM',
        attendance: 88
      },
      { 
        code: 'CE501', 
        name: 'Database Management Systems', 
        students: 48, 
        semester: '5th Sem', 
        schedule: 'Tue, Thu - 2:00 PM',
        attendance: 92
      },
      { 
        code: 'CE601', 
        name: 'Software Engineering', 
        students: 42, 
        semester: '6th Sem', 
        schedule: 'Mon, Wed - 11:00 AM',
        attendance: 85
      },
      { 
        code: 'CE701', 
        name: 'Machine Learning', 
        students: 45, 
        semester: '7th Sem', 
        schedule: 'Tue, Fri - 3:00 PM',
        attendance: 90
      }
    ],
    recentActivities: [
      { activity: 'Uploaded DSA Assignment 4', course: 'CE301', time: '2 hours ago', type: 'upload' },
      { activity: 'Graded DBMS Mid-term Exams', course: 'CE501', time: '1 day ago', type: 'grade' },
      { activity: 'Updated SE Project Guidelines', course: 'CE601', time: '2 days ago', type: 'update' },
      { activity: 'Marked Attendance for ML Lab', course: 'CE701', time: '3 days ago', type: 'attendance' }
    ],
    upcomingTasks: [
      { task: 'Grade DSA Assignment 3', dueDate: '2024-10-15', priority: 'high', course: 'CE301' },
      { task: 'Prepare DBMS Lab Materials', dueDate: '2024-10-16', priority: 'medium', course: 'CE501' },
      { task: 'Review SE Project Proposals', dueDate: '2024-10-18', priority: 'high', course: 'CE601' },
      { task: 'Submit ML Course Progress Report', dueDate: '2024-10-20', priority: 'low', course: 'CE701' }
    ],
    announcements: [
      { title: 'Faculty Meeting - Curriculum Update', date: '2024-10-14', type: 'meeting' },
      { title: 'Mid-term Exam Schedule Released', date: '2024-10-12', type: 'exam' },
      { title: 'Research Paper Submission Deadline', date: '2024-10-20', type: 'deadline' }
    ]
  };

  const displayData = facultyData || defaultData;
  const currentUser = userData || defaultData.faculty;

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
              <p className="text-sm text-[#64748b]">{currentUser.employeeId}</p>
              <p className="text-xs text-[#64748b]">{currentUser.designation}</p>
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
            <h1 className="text-xl font-bold text-[#1e293b]">Faculty Dashboard</h1>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#6b7280]" />
              <input
                type="text"
                placeholder="Search courses, students..."
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
            <p className="text-[#64748b]">{currentUser.department} • {currentUser.experience} Experience</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl border border-[#e2e8f0] shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#64748b] mb-1">Total Courses</p>
                  <p className="text-2xl font-bold text-[#1e293b]">{displayData.courseStats.totalCourses}</p>
                </div>
                <div className="w-12 h-12 bg-[#dbeafe] rounded-lg flex items-center justify-center">
                  <BookOpen size={24} className="text-[#1e3a8a]" />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-[#e2e8f0] shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#64748b] mb-1">Total Students</p>
                  <p className="text-2xl font-bold text-[#1e293b]">{displayData.courseStats.totalStudents}</p>
                </div>
                <div className="w-12 h-12 bg-[#dcfce7] rounded-lg flex items-center justify-center">
                  <Users size={24} className="text-[#16a34a]" />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-[#e2e8f0] shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#64748b] mb-1">Pending Grading</p>
                  <p className="text-2xl font-bold text-[#1e293b]">{displayData.courseStats.submissionsPending}</p>
                </div>
                <div className="w-12 h-12 bg-[#fef3c7] rounded-lg flex items-center justify-center">
                  <Clock size={24} className="text-[#f59e0b]" />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-[#e2e8f0] shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#64748b] mb-1">Active Assignments</p>
                  <p className="text-2xl font-bold text-[#1e293b]">{displayData.courseStats.pendingAssignments}</p>
                </div>
                <div className="w-12 h-12 bg-[#f3e8ff] rounded-lg flex items-center justify-center">
                  <FileText size={24} className="text-[#7c3aed]" />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* My Courses */}
            <div className="lg:col-span-2 bg-white rounded-xl border border-[#e2e8f0] shadow-sm overflow-hidden">
              <div className="p-6 border-b border-[#e2e8f0]">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-[#1e293b]">My Courses</h3>
                  <a href="/dashboard/faculty/courses" className="text-[#1e3a8a] hover:text-[#1e40af] text-sm">
                    View All
                  </a>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {displayData.courses.map((course, index) => (
                    <div key={index} className="p-4 bg-[#f8fafc] rounded-lg border border-[#e2e8f0]">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-semibold text-[#1e293b]">{course.name}</h4>
                          <p className="text-sm text-[#64748b]">{course.code} • {course.semester}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-[#1e293b]">{course.students} students</p>
                          <div className="flex items-center mt-1">
                            <div className={`w-2 h-2 rounded-full mr-2 ${
                              course.attendance >= 90 ? 'bg-[#16a34a]' :
                              course.attendance >= 80 ? 'bg-[#f59e0b]' : 'bg-[#dc2626]'
                            }`}></div>
                            <span className="text-xs text-[#64748b]">{course.attendance}% attendance</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-[#64748b]">{course.schedule}</span>
                        <div className="flex space-x-2">
                          <button className="px-3 py-1 bg-[#1e3a8a] text-white rounded-md hover:bg-[#1e40af] transition-colors text-xs">
                            Manage
                          </button>
                          <button className="px-3 py-1 bg-[#f1f5f9] text-[#1e3a8a] rounded-md hover:bg-[#e2e8f0] transition-colors text-xs">
                            Attendance
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Upcoming Tasks */}
            <div className="bg-white rounded-xl border border-[#e2e8f0] shadow-sm overflow-hidden">
              <div className="p-6 border-b border-[#e2e8f0]">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-[#1e293b]">Upcoming Tasks</h3>
                  <button className="p-1 bg-[#1e3a8a] text-white rounded-md hover:bg-[#1e40af]">
                    <Plus size={16} />
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {displayData.upcomingTasks.map((task, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className={`w-3 h-3 rounded-full mt-1.5 ${
                        task.priority === 'high' ? 'bg-[#dc2626]' :
                        task.priority === 'medium' ? 'bg-[#f59e0b]' : 'bg-[#16a34a]'
                      }`}></div>
                      <div className="flex-1">
                        <p className="font-medium text-[#1e293b] text-sm">{task.task}</p>
                        <p className="text-xs text-[#64748b]">{task.course}</p>
                        <p className="text-xs text-[#64748b] mt-1">Due: {task.dueDate}</p>
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
                        activity.type === 'upload' ? 'bg-[#dbeafe] text-[#1e3a8a]' :
                        activity.type === 'grade' ? 'bg-[#fef3c7] text-[#f59e0b]' :
                        activity.type === 'update' ? 'bg-[#dcfce7] text-[#16a34a]' :
                        'bg-[#f3e8ff] text-[#7c3aed]'
                      }`}>
                        {activity.type === 'upload' && <Upload size={16} />}
                        {activity.type === 'grade' && <CheckCircle size={16} />}
                        {activity.type === 'update' && <FileText size={16} />}
                        {activity.type === 'attendance' && <Calendar size={16} />}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-[#1e293b] text-sm">{activity.activity}</p>
                        <p className="text-xs text-[#64748b]">{activity.course} • {activity.time}</p>
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
                    <Upload size={20} className="text-[#1e3a8a] mx-auto mb-2" />
                    <p className="text-xs text-[#64748b]">Upload Material</p>
                  </button>
                  <button className="p-4 bg-[#f8fafc] border border-[#e2e8f0] rounded-lg hover:bg-[#f1f5f9] transition-colors text-center">
                    <Calendar size={20} className="text-[#1e3a8a] mx-auto mb-2" />
                    <p className="text-xs text-[#64748b]">Take Attendance</p>
                  </button>
                  <button className="p-4 bg-[#f8fafc] border border-[#e2e8f0] rounded-lg hover:bg-[#f1f5f9] transition-colors text-center">
                    <FileText size={20} className="text-[#1e3a8a] mx-auto mb-2" />
                    <p className="text-xs text-[#64748b]">Create Assignment</p>
                  </button>
                  <button className="p-4 bg-[#f8fafc] border border-[#e2e8f0] rounded-lg hover:bg-[#f1f5f9] transition-colors text-center">
                    <BarChart3 size={20} className="text-[#1e3a8a] mx-auto mb-2" />
                    <p className="text-xs text-[#64748b]">View Reports</p>
                  </button>
                </div>
              </div>
            </div>

            {/* Announcements */}
            <div className="bg-white rounded-xl border border-[#e2e8f0] shadow-sm overflow-hidden">
              <div className="p-6 border-b border-[#e2e8f0]">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-[#1e293b]">Announcements</h3>
                  <a href="/dashboard/faculty/notifications" className="text-[#1e3a8a] hover:text-[#1e40af] text-sm">
                    View All
                  </a>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {displayData.announcements.map((announcement, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        announcement.type === 'meeting' ? 'bg-[#1e3a8a]' :
                        announcement.type === 'exam' ? 'bg-[#dc2626]' : 'bg-[#f59e0b]'
                      }`}></div>
                      <div className="flex-1">
                        <p className="font-medium text-[#1e293b] text-sm">{announcement.title}</p>
                        <p className="text-xs text-[#64748b]">{announcement.date}</p>
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