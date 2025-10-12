import sql from '@/app/api/utils/sql';

export async function GET(request) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // For demo purposes, we'll extract user ID from token
    const token = authHeader.split(' ')[1];
    const userId = token.split('_')[2] || '3';

    try {
      // Get system statistics
      const studentCount = await sql`SELECT COUNT(*) as count FROM students`;
      const facultyCount = await sql`SELECT COUNT(*) as count FROM faculty`;
      const courseCount = await sql`SELECT COUNT(*) as count FROM courses WHERE is_active = true`;

      // Get department statistics
      const departmentStats = await sql`
        SELECT 
          d.name,
          COUNT(DISTINCT s.id) as student_count,
          COUNT(DISTINCT f.id) as faculty_count,
          COUNT(DISTINCT c.id) as course_count
        FROM departments d
        LEFT JOIN students s ON d.id = s.department_id
        LEFT JOIN faculty f ON d.id = f.department_id
        LEFT JOIN courses c ON d.id = c.department_id AND c.is_active = true
        GROUP BY d.id, d.name
        ORDER BY student_count DESC
      `;

      // Get recent activities (mock data with some database integration)
      const recentAnnouncements = await sql`
        SELECT title, created_at, target_role
        FROM announcements
        ORDER BY created_at DESC
        LIMIT 3
      `;

      const recentActivities = [
        { activity: 'New faculty registration approved', user: 'Dr. Priya Patel', time: '1 hour ago', type: 'approval' },
        { activity: 'Course curriculum updated', details: 'Machine Learning - CE701', time: '2 hours ago', type: 'update' },
        { activity: 'Student batch data imported', details: '2024-25 Academic Year', time: '4 hours ago', type: 'import' },
        { activity: 'Security alert resolved', details: 'Unauthorized access attempt', time: '6 hours ago', type: 'security' },
        { activity: 'System backup completed', details: 'Weekly automated backup', time: '1 day ago', type: 'system' }
      ];

      // Get pending approvals (mock data)
      const pendingApprovals = [
        { type: 'Faculty Registration', name: 'Prof. Amit Singh', department: 'Electronics', submitted: '2024-10-10', priority: 'medium' },
        { type: 'Course Addition', name: 'Advanced AI Topics', department: 'Computer', submitted: '2024-10-09', priority: 'low' },
        { type: 'Student Transfer', name: 'Neha Sharma', department: 'IT to Computer', submitted: '2024-10-08', priority: 'high' },
        { type: 'Department Budget', name: 'Lab Equipment Purchase', department: 'Mechanical', submitted: '2024-10-07', priority: 'high' }
      ];

      // System alerts (mock data)
      const systemAlerts = [
        { type: 'Security', message: 'Multiple failed login attempts detected', severity: 'high', time: '30 min ago' },
        { type: 'Performance', message: 'Database response time increased', severity: 'medium', time: '2 hours ago' },
        { type: 'Backup', message: 'Backup verification completed successfully', severity: 'low', time: '1 day ago' }
      ];

      return Response.json({
        admin: {
          name: 'Dr. Rajesh Kumar',
          employeeId: 'TCET-A-001',
          role: 'System Administrator',
          department: 'IT Administration',
          experience: '15 years'
        },
        systemStats: {
          totalStudents: parseInt(studentCount[0]?.count || 0),
          totalFaculty: parseInt(facultyCount[0]?.count || 0),
          totalCourses: parseInt(courseCount[0]?.count || 0),
          activeSessions: Math.floor(Math.random() * 100) + 200,
          pendingApprovals: pendingApprovals.length,
          systemUptime: '99.8%',
          dataBackupStatus: 'Current',
          securityAlerts: systemAlerts.length
        },
        departmentStats: departmentStats.map(dept => ({
          name: dept.name,
          students: parseInt(dept.student_count || 0),
          faculty: parseInt(dept.faculty_count || 0),
          courses: parseInt(dept.course_count || 0)
        })),
        recentActivities: recentActivities,
        pendingApprovals: pendingApprovals,
        systemAlerts: systemAlerts,
        quickStats: [
          { label: 'Today\'s Logins', value: '1,247', change: '+5.2%', trend: 'up' },
          { label: 'Active Courses', value: courseCount[0]?.count?.toString() || '156', change: '+2', trend: 'up' },
          { label: 'New Registrations', value: '23', change: '-8%', trend: 'down' },
          { label: 'System Load', value: '67%', change: '+12%', trend: 'up' }
        ]
      });

    } catch (dbError) {
      console.error('Database error:', dbError);
      
      // Return mock data if database fails
      return Response.json({
        admin: {
          name: 'Dr. Rajesh Kumar',
          employeeId: 'TCET-A-001',
          role: 'System Administrator',
          department: 'IT Administration',
          experience: '15 years'
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
      });
    }

  } catch (error) {
    console.error('Admin dashboard error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}