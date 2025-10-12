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
  Users,
  MapPin,
  Star,
  Eye,
  Filter,
  Grid3X3,
  List,
  BookMarked,
  Timer,
  Target,
  TrendingUp,
  Activity
} from 'lucide-react';

export default function StudentCourses() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [coursesData, setCoursesData] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [filterType, setFilterType] = useState('all'); // 'all', 'core', 'elective', 'lab'
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load user data from localStorage
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }

    // Fetch courses data
    fetchCoursesData();
  }, []);

  const fetchCoursesData = async () => {
    try {
      const token = localStorage.getItem('userToken');
      const response = await fetch('/api/student/courses', {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        const data = await response.json();
        setCoursesData(data);
      }
    } catch (error) {
      console.error('Error fetching courses data:', error);
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
    { icon: BookOpen, label: 'My Courses', active: true, path: '/dashboard/student/courses' },
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
    summary: {
      totalCourses: 6,
      totalCredits: 22,
      completedCredits: 18,
      currentSemester: 6
    },
    courses: [
      {
        id: 1,
        code: 'CS601',
        name: 'Data Structures & Algorithms',
        type: 'core',
        credits: 4,
        faculty: 'Prof. A. Kumar',
        schedule: 'Mon, Wed, Fri - 09:00 AM',
        room: 'Room 301',
        attendance: 92,
        grade: 'A',
        assignments: 3,
        completedAssignments: 2,
        nextClass: '2024-10-14 09:00',
        syllabus: '/syllabus/cs601.pdf',
        description: 'Advanced data structures, algorithms analysis, and implementation techniques.',
        color: 'bg-[#1e3a8a]',
        progress: 75
      },
      {
        id: 2,
        code: 'CS602',
        name: 'Database Management Systems',
        type: 'core',
        credits: 4,
        faculty: 'Prof. S. Sharma',
        schedule: 'Tue, Thu - 11:00 AM',
        room: 'Room 205',
        attendance: 86,
        grade: 'A+',
        assignments: 4,
        completedAssignments: 4,
        nextClass: '2024-10-15 11:00',
        syllabus: '/syllabus/cs602.pdf',
        description: 'Database design, SQL, transactions, and database management concepts.',
        color: 'bg-[#059669]',
        progress: 80
      },
      {
        id: 3,
        code: 'CS603',
        name: 'Software Engineering',
        type: 'core',
        credits: 3,
        faculty: 'Dr. R. Patel',
        schedule: 'Mon, Wed - 02:00 PM',
        room: 'Room 401',
        attendance: 88,
        grade: 'B+',
        assignments: 2,
        completedAssignments: 1,
        nextClass: '2024-10-14 14:00',
        syllabus: '/syllabus/cs603.pdf',
        description: 'Software development lifecycle, design patterns, and project management.',
        color: 'bg-[#7c3aed]',
        progress: 65
      },
      {
        id: 4,
        code: 'CS604',
        name: 'Computer Networks',
        type: 'core',
        credits: 4,
        faculty: 'Prof. M. Singh',
        schedule: 'Tue, Thu, Sat - 03:30 PM',
        room: 'Room 302',
        attendance: 84,
        grade: 'A',
        assignments: 3,
        completedAssignments: 2,
        nextClass: '2024-10-15 15:30',
        syllabus: '/syllabus/cs604.pdf',
        description: 'Network protocols, architecture, security, and network programming.',
        color: 'bg-[#dc2626]',
        progress: 70
      },
      {
        id: 5,
        code: 'CS605L',
        name: 'Database Lab',
        type: 'lab',
        credits: 2,
        faculty: 'Prof. S. Sharma',
        schedule: 'Fri - 02:00 PM',
        room: 'Lab 1',
        attendance: 95,
        grade: 'A+',
        assignments: 5,
        completedAssignments: 4,
        nextClass: '2024-10-18 14:00',
        syllabus: '/syllabus/cs605l.pdf',
        description: 'Hands-on database implementation and query optimization.',
        color: 'bg-[#f59e0b]',
        progress: 85
      },
      {
        id: 6,
        code: 'PE601',
        name: 'Machine Learning',
        type: 'elective',
        credits: 3,
        faculty: 'Dr. P. Gupta',
        schedule: 'Wed, Fri - 04:00 PM',
        room: 'Room 501',
        attendance: 90,
        grade: 'A',
        assignments: 4,
        completedAssignments: 3,
        nextClass: '2024-10-16 16:00',
        syllabus: '/syllabus/pe601.pdf',
        description: 'Introduction to machine learning algorithms and applications.',
        color: 'bg-[#0891b2]',
        progress: 78
      }
    ]
  };

  const displayData = coursesData || defaultData;
  const currentUser = userData || defaultData.student;

  const getCourseTypeColor = (type) => {
    switch (type) {
      case 'core':
        return 'bg-[#dbeafe] text-[#1e3a8a] border-[#bfdbfe]';
      case 'elective':
        return 'bg-[#dcfce7] text-[#16a34a] border-[#bbf7d0]';
      case 'lab':
        return 'bg-[#fef3c7] text-[#f59e0b] border-[#fed7aa]';
      default:
        return 'bg-[#f1f5f9] text-[#64748b] border-[#e2e8f0]';
    }
  };

  const getGradeColor = (grade) => {
    if (grade.includes('A')) return 'text-[#16a34a]';
    if (grade.includes('B')) return 'text-[#f59e0b]';
    if (grade.includes('C')) return 'text-[#dc2626]';
    return 'text-[#64748b]';
  };

  const filteredCourses = filterType === 'all' 
    ? displayData.courses 
    : displayData.courses.filter(course => course.type === filterType);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-[#1e3a8a] rounded-full flex items-center justify-center animate-pulse mb-4 mx-auto">
            <BookOpen size={32} className="text-white" />
          </div>
          <p className="text-[#6b7280]">Loading courses...</p>
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
              <BookOpen size={20} className="text-[#1e3a8a]" />
              <h1 className="text-xl font-bold text-[#1e293b]">My Courses</h1>
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
            <span className="text-[#1e293b] font-medium">My Courses</span>
          </div>

          {/* Course Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl border border-[#e2e8f0] shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#64748b] mb-1">Total Courses</p>
                  <p className="text-2xl font-bold text-[#1e293b]">{displayData.summary.totalCourses}</p>
                  <p className="text-xs text-[#16a34a] mt-1">This Semester</p>
                </div>
                <div className="w-12 h-12 bg-[#dbeafe] rounded-lg flex items-center justify-center">
                  <BookOpen size={24} className="text-[#1e3a8a]" />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-[#e2e8f0] shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#64748b] mb-1">Total Credits</p>
                  <p className="text-2xl font-bold text-[#1e293b]">{displayData.summary.totalCredits}</p>
                  <p className="text-xs text-[#64748b] mt-1">Enrolled Credits</p>
                </div>
                <div className="w-12 h-12 bg-[#dcfce7] rounded-lg flex items-center justify-center">
                  <Award size={24} className="text-[#16a34a]" />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-[#e2e8f0] shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#64748b] mb-1">Avg Attendance</p>
                  <p className="text-2xl font-bold text-[#1e293b]">89%</p>
                  <p className="text-xs text-[#16a34a] mt-1">Above Target</p>
                </div>
                <div className="w-12 h-12 bg-[#fef3c7] rounded-lg flex items-center justify-center">
                  <Target size={24} className="text-[#f59e0b]" />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-[#e2e8f0] shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#64748b] mb-1">Current Semester</p>
                  <p className="text-2xl font-bold text-[#1e293b]">{displayData.summary.currentSemester}</p>
                  <p className="text-xs text-[#64748b] mt-1">6th Semester</p>
                </div>
                <div className="w-12 h-12 bg-[#f3e8ff] rounded-lg flex items-center justify-center">
                  <GraduationCap size={24} className="text-[#7c3aed]" />
                </div>
              </div>
            </div>
          </div>

          {/* Filters and View Toggle */}
          <div className="bg-white rounded-xl border border-[#e2e8f0] shadow-sm mb-8">
            <div className="p-6 border-b border-[#e2e8f0]">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Filter size={16} className="text-[#64748b]" />
                    <select 
                      value={filterType}
                      onChange={(e) => setFilterType(e.target.value)}
                      className="text-sm border border-[#e2e8f0] rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#1e3a8a] focus:border-[#1e3a8a]"
                    >
                      <option value="all">All Courses</option>
                      <option value="core">Core Courses</option>
                      <option value="elective">Electives</option>
                      <option value="lab">Lab Courses</option>
                    </select>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-[#64748b]">View:</span>
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-[#1e3a8a] text-white' : 'bg-[#f8fafc] text-[#64748b] hover:bg-[#f1f5f9]'}`}
                  >
                    <Grid3X3 size={16} />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-[#1e3a8a] text-white' : 'bg-[#f8fafc] text-[#64748b] hover:bg-[#f1f5f9]'}`}
                  >
                    <List size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Courses Grid/List */}
            <div className="p-6">
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCourses.map((course, index) => (
                    <div key={index} className="border border-[#e2e8f0] rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                      <div className={`h-3 ${course.color}`}></div>
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="font-bold text-[#1e293b] mb-1">{course.code}</h3>
                            <h4 className="text-sm font-medium text-[#64748b] mb-2">{course.name}</h4>
                            <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium border ${getCourseTypeColor(course.type)}`}>
                              {course.type.charAt(0).toUpperCase() + course.type.slice(1)}
                            </span>
                          </div>
                          <div className="text-right">
                            <p className={`text-lg font-bold ${getGradeColor(course.grade)}`}>{course.grade}</p>
                            <p className="text-xs text-[#64748b]">{course.credits} Credits</p>
                          </div>
                        </div>
                        
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center text-xs text-[#64748b]">
                            <Users size={12} className="mr-1" />
                            {course.faculty}
                          </div>
                          <div className="flex items-center text-xs text-[#64748b]">
                            <Clock size={12} className="mr-1" />
                            {course.schedule}
                          </div>
                          <div className="flex items-center text-xs text-[#64748b]">
                            <MapPin size={12} className="mr-1" />
                            {course.room}
                          </div>
                        </div>

                        <div className="space-y-2 mb-4">
                          <div className="flex justify-between text-xs">
                            <span className="text-[#64748b]">Attendance</span>
                            <span className="font-medium text-[#1e293b]">{course.attendance}%</span>
                          </div>
                          <div className="w-full bg-[#f1f5f9] rounded-full h-1.5">
                            <div
                              className={`h-1.5 rounded-full ${
                                course.attendance >= 85 ? 'bg-[#16a34a]' :
                                course.attendance >= 75 ? 'bg-[#f59e0b]' : 'bg-[#dc2626]'
                              }`}
                              style={{ width: `${course.attendance}%` }}
                            ></div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-xs text-[#64748b] mb-4">
                          <span>Assignments: {course.completedAssignments}/{course.assignments}</span>
                          <span>Progress: {course.progress}%</span>
                        </div>

                        <div className="flex space-x-2">
                          <button className="flex-1 bg-[#1e3a8a] text-white text-xs py-2 px-3 rounded-lg hover:bg-[#1e40af] transition-colors">
                            View Details
                          </button>
                          <button className="px-3 py-2 border border-[#e2e8f0] rounded-lg hover:bg-[#f8fafc] transition-colors">
                            <Download size={12} className="text-[#64748b]" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredCourses.map((course, index) => (
                    <div key={index} className="border border-[#e2e8f0] rounded-lg p-6 hover:shadow-lg transition-shadow">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className={`w-4 h-16 rounded ${course.color}`}></div>
                          <div>
                            <div className="flex items-center space-x-3 mb-1">
                              <h3 className="font-bold text-[#1e293b]">{course.code}</h3>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getCourseTypeColor(course.type)}`}>
                                {course.type.charAt(0).toUpperCase() + course.type.slice(1)}
                              </span>
                              <span className={`text-lg font-bold ${getGradeColor(course.grade)}`}>{course.grade}</span>
                            </div>
                            <h4 className="font-medium text-[#1e293b] mb-1">{course.name}</h4>
                            <div className="flex items-center space-x-4 text-sm text-[#64748b]">
                              <span className="flex items-center">
                                <Users size={14} className="mr-1" />
                                {course.faculty}
                              </span>
                              <span className="flex items-center">
                                <Clock size={14} className="mr-1" />
                                {course.schedule}
                              </span>
                              <span className="flex items-center">
                                <MapPin size={14} className="mr-1" />
                                {course.room}
                              </span>
                              <span>{course.credits} Credits</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-6">
                          <div className="text-center">
                            <p className="text-xs text-[#64748b] mb-1">Attendance</p>
                            <p className="font-bold text-[#1e293b]">{course.attendance}%</p>
                          </div>
                          <div className="text-center">
                            <p className="text-xs text-[#64748b] mb-1">Assignments</p>
                            <p className="font-bold text-[#1e293b]">{course.completedAssignments}/{course.assignments}</p>
                          </div>
                          <div className="text-center">
                            <p className="text-xs text-[#64748b] mb-1">Progress</p>
                            <p className="font-bold text-[#1e293b]">{course.progress}%</p>
                          </div>
                          <div className="flex space-x-2">
                            <button className="bg-[#1e3a8a] text-white text-sm py-2 px-4 rounded-lg hover:bg-[#1e40af] transition-colors">
                              View Details
                            </button>
                            <button className="p-2 border border-[#e2e8f0] rounded-lg hover:bg-[#f8fafc] transition-colors">
                              <Download size={16} className="text-[#64748b]" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}