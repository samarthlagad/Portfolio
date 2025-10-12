import React, { useState } from 'react';
import { User, GraduationCap, Users, Shield, Eye, EyeOff, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const [selectedRole, setSelectedRole] = useState('student');
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [showDemo, setShowDemo] = useState(true);

  const roles = [
    {
      id: 'student',
      title: 'Student',
      icon: GraduationCap,
      description: 'Access academic records, attendance, and course materials',
      color: 'border-[#1e3a8a] bg-[#eff6ff] text-[#1e3a8a]',
      activeColor: 'border-[#1e3a8a] bg-[#1e3a8a] text-white'
    },
    {
      id: 'faculty',
      title: 'Faculty',
      icon: Users,
      description: 'Manage courses, track student progress, and submit attendance',
      color: 'border-[#1e3a8a] bg-[#eff6ff] text-[#1e3a8a]',
      activeColor: 'border-[#1e3a8a] bg-[#1e3a8a] text-white'
    },
    {
      id: 'admin',
      title: 'Administrator',
      icon: Shield,
      description: 'Full system access and management capabilities',
      color: 'border-[#1e3a8a] bg-[#eff6ff] text-[#1e3a8a]',
      activeColor: 'border-[#1e3a8a] bg-[#1e3a8a] text-white'
    }
  ];

  const demoCredentials = {
    student: { username: 'student123', password: 'demo123' },
    faculty: { username: 'prof.sharma', password: 'demo123' },
    admin: { username: 'admin', password: 'demo123' }
  };

  const handleDemoLogin = () => {
    const demo = demoCredentials[selectedRole];
    setCredentials(demo);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: credentials.username,
          password: credentials.password,
          role: selectedRole
        })
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('userToken', data.token);
        localStorage.setItem('userRole', selectedRole);
        localStorage.setItem('userData', JSON.stringify(data.user));
        
        // Redirect to appropriate dashboard
        window.location.href = `/dashboard/${selectedRole}`;
      } else {
        alert('Invalid credentials. Please try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1e3a8a] via-[#3b82f6] to-[#1e40af] flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-[#fbbf24] rounded-full flex items-center justify-center">
              <GraduationCap size={32} className="text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">TCET Portal</h1>
          <p className="text-[#bfdbfe] text-lg">Thakur College of Engineering & Technology</p>
          <p className="text-[#93c5fd] mt-1">Student Information & Management System</p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="grid md:grid-cols-2">
            {/* Role Selection */}
            <div className="p-8 bg-[#f8fafc] border-r border-[#e2e8f0]">
              <h2 className="text-2xl font-bold text-[#1e293b] mb-6">Select Your Role</h2>
              
              <div className="space-y-4">
                {roles.map((role) => {
                  const IconComponent = role.icon;
                  const isSelected = selectedRole === role.id;
                  
                  return (
                    <button
                      key={role.id}
                      onClick={() => setSelectedRole(role.id)}
                      className={`w-full p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                        isSelected ? role.activeColor : role.color
                      } hover:shadow-md`}
                    >
                      <div className="flex items-center mb-2">
                        <IconComponent size={24} className="mr-3" />
                        <h3 className="text-lg font-semibold">{role.title}</h3>
                      </div>
                      <p className={`text-sm ${isSelected ? 'text-white opacity-90' : 'text-[#64748b]'}`}>
                        {role.description}
                      </p>
                    </button>
                  );
                })}
              </div>

              {/* Demo Credentials */}
              {showDemo && (
                <div className="mt-6 p-4 bg-[#fef3c7] border border-[#fbbf24] rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-[#92400e]">Demo Credentials</h4>
                    <button
                      onClick={() => setShowDemo(false)}
                      className="text-[#92400e] hover:text-[#78350f]"
                    >
                      ×
                    </button>
                  </div>
                  <div className="text-sm text-[#92400e] space-y-1">
                    <p><span className="font-medium">Username:</span> {demoCredentials[selectedRole].username}</p>
                    <p><span className="font-medium">Password:</span> {demoCredentials[selectedRole].password}</p>
                  </div>
                  <button
                    onClick={handleDemoLogin}
                    className="mt-3 text-sm bg-[#fbbf24] text-white px-3 py-1 rounded-md hover:bg-[#f59e0b] transition-colors"
                  >
                    Use Demo Credentials
                  </button>
                </div>
              )}
            </div>

            {/* Login Form */}
            <div className="p-8">
              <h2 className="text-2xl font-bold text-[#1e293b] mb-6">
                Login as {roles.find(r => r.id === selectedRole)?.title}
              </h2>

              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-[#374151] mb-2">
                    Username / Student ID
                  </label>
                  <div className="relative">
                    <User size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#6b7280]" />
                    <input
                      type="text"
                      value={credentials.username}
                      onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                      className="w-full pl-10 pr-4 py-3 border border-[#d1d5db] rounded-xl focus:ring-2 focus:ring-[#1e3a8a] focus:border-[#1e3a8a] outline-none transition-colors"
                      placeholder="Enter your username"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#374151] mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={credentials.password}
                      onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                      className="w-full pl-4 pr-12 py-3 border border-[#d1d5db] rounded-xl focus:ring-2 focus:ring-[#1e3a8a] focus:border-[#1e3a8a] outline-none transition-colors"
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#6b7280] hover:text-[#374151]"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-[#d1d5db] text-[#1e3a8a] focus:ring-[#1e3a8a]" />
                    <span className="ml-2 text-sm text-[#6b7280]">Remember me</span>
                  </label>
                  <a href="#" className="text-sm text-[#1e3a8a] hover:text-[#1e40af]">
                    Forgot Password?
                  </a>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#1e3a8a] text-white py-3 px-4 rounded-xl hover:bg-[#1e40af] transition-colors flex items-center justify-center space-x-2 font-medium"
                >
                  <span>Sign In</span>
                  <ArrowRight size={20} />
                </button>
              </form>

              <div className="mt-6 text-center text-sm text-[#6b7280]">
                <p>Need help? Contact IT Support</p>
                <p className="text-[#1e3a8a]">support@tcet.ac.in | +91-XXXX-XXXXXX</p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-6 text-[#bfdbfe] text-sm">
          <p>&copy; 2024 Thakur College of Engineering & Technology. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}