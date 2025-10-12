import sql from '@/app/api/utils/sql';

export async function POST(request) {
  try {
    const { username, password, role } = await request.json();

    if (!username || !password || !role) {
      return Response.json({ error: 'Username, password, and role are required' }, { status: 400 });
    }

    // For demo purposes, we'll use simple password checking
    // In production, use proper password hashing with argon2
    const demoCredentials = {
      'student123': { password: 'demo123', role: 'student' },
      'prof.sharma': { password: 'demo123', role: 'faculty' },
      'admin': { password: 'demo123', role: 'admin' }
    };

    const user = demoCredentials[username];
    
    if (!user || user.password !== password || user.role !== role) {
      return Response.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Get user details from database
    let userDetails;
    try {
      const userRecord = await sql`
        SELECT u.*, 
               CASE 
                 WHEN u.role = 'student' THEN s.student_id
                 WHEN u.role = 'faculty' THEN f.employee_id
                 ELSE u.username
               END as identifier,
               CASE 
                 WHEN u.role = 'student' THEN s.first_name || ' ' || s.last_name
                 WHEN u.role = 'faculty' THEN f.first_name || ' ' || f.last_name
                 ELSE 'Administrator'
               END as full_name,
               CASE 
                 WHEN u.role = 'student' THEN d1.name
                 WHEN u.role = 'faculty' THEN d2.name
                 ELSE 'IT Administration'
               END as department_name
        FROM users u
        LEFT JOIN students s ON u.id = s.user_id
        LEFT JOIN faculty f ON u.id = f.user_id
        LEFT JOIN departments d1 ON s.department_id = d1.id
        LEFT JOIN departments d2 ON f.department_id = d2.id
        WHERE u.username = ${username} AND u.role = ${role}
      `;

      if (userRecord.length === 0) {
        return Response.json({ error: 'User not found' }, { status: 401 });
      }

      userDetails = userRecord[0];
    } catch (dbError) {
      console.error('Database error:', dbError);
      // Fallback to mock data if database fails
      userDetails = {
        id: 1,
        username: username,
        role: role,
        identifier: username,
        full_name: role === 'student' ? 'Rahul Sharma' : 
                   role === 'faculty' ? 'Prof. Anjali Sharma' : 'Dr. Rajesh Kumar',
        department_name: role === 'student' ? 'Computer Engineering' : 
                        role === 'faculty' ? 'Computer Engineering' : 'IT Administration'
      };
    }

    // Create a simple token (in production, use JWT)
    const token = `demo_token_${userDetails.id}_${Date.now()}`;

    return Response.json({
      success: true,
      token: token,
      user: {
        id: userDetails.id,
        username: userDetails.username,
        role: userDetails.role,
        name: userDetails.full_name,
        identifier: userDetails.identifier,
        department: userDetails.department_name
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}