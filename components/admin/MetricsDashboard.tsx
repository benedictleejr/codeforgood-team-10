import React, { useState } from 'react';
import { 
  Users, 
  Video, 
  MessageSquare, 
  BarChart3, 
  Calendar, 
  TrendingUp, 
  AlertCircle,
  Clock,
  Star,
  Filter,
  Search,
  Download,
  Play,
  Phone,
  Settings
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedPeriod, setSelectedPeriod] = useState('30d');

  const engagementData = [
    { month: 'Jan', sessions: 45, satisfaction: 4.2 },
    { month: 'Feb', sessions: 52, satisfaction: 4.1 },
    { month: 'Mar', sessions: 48, satisfaction: 4.3 },
    { month: 'Apr', sessions: 61, satisfaction: 4.4 },
    { month: 'May', sessions: 58, satisfaction: 4.2 },
    { month: 'Jun', sessions: 67, satisfaction: 4.5 }
  ];

  const matchingData = [
    { name: 'Successfully Matched', value: 75, color: '#22c55e' },
    { name: 'Pending Match', value: 15, color: '#f59e0b' },
    { name: 'Unmatched', value: 10, color: '#ef4444' }
  ];

  const mentorEngagement = [
    { name: 'Dr. Sarah Chen', sessions: 12, rating: 4.8, lastActive: '2 hours ago', status: 'active' },
    { name: 'Maria Rodriguez', sessions: 8, rating: 4.6, lastActive: '1 day ago', status: 'active' },
    { name: 'Jennifer Wong', sessions: 15, rating: 4.9, lastActive: '3 hours ago', status: 'active' },
    { name: 'Lisa Thompson', sessions: 6, rating: 4.3, lastActive: '5 days ago', status: 'inactive' }
  ];

  const upcomingSessions = [
    { mentor: 'Dr. Sarah Chen', mentee: 'Alice Kumar', time: '2:00 PM', type: 'video' },
    { mentor: 'Maria Rodriguez', mentee: 'Jenny Lim', time: '3:30 PM', type: 'chat' },
    { mentor: 'Jennifer Wong', mentee: 'Priya Patel', time: '4:15 PM', type: 'video' }
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Active Pairs</p>
              <p className="text-2xl font-bold text-gray-900">124</p>
              <p className="text-xs text-green-600">↑ 12% vs last month</p>
            </div>
            <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Sessions This Month</p>
              <p className="text-2xl font-bold text-gray-900">67</p>
              <p className="text-xs text-green-600">↑ 18% vs last month</p>
            </div>
            <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Video className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Satisfaction</p>
              <p className="text-2xl font-bold text-gray-900">4.5</p>
              <p className="text-xs text-green-600">↑ 0.2 vs last month</p>
            </div>
            <div className="h-12 w-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Star className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">At-Risk Pairs</p>
              <p className="text-2xl font-bold text-gray-900">8</p>
              <p className="text-xs text-red-600">↑ 3 vs last month</p>
            </div>
            <div className="h-12 w-12 bg-red-100 rounded-lg flex items-center justify-center">
              <AlertCircle className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Session Trends & Satisfaction</h3>
            <select className="text-sm border border-gray-300 rounded px-3 py-1">
              <option>Last 6 months</option>
              <option>Last year</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={engagementData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" domain={[0, 5]} />
              <Tooltip />
              <Bar yAxisId="left" dataKey="sessions" fill="#3b82f6" />
              <Line yAxisId="right" type="monotone" dataKey="satisfaction" stroke="#f59e0b" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold mb-4">Matching Success Rate</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={matchingData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({name, value}) => `${name}: ${value}%`}
              >
                {matchingData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Upcoming Sessions */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">Today's Upcoming Sessions</h3>
        <div className="space-y-3">
          {upcomingSessions.map((session, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                  {session.type === 'video' ? <Video className="h-5 w-5 text-blue-600" /> : <MessageSquare className="h-5 w-5 text-blue-600" />}
                </div>
                <div>
                  <p className="font-medium">{session.mentor} ↔ {session.mentee}</p>
                  <p className="text-sm text-gray-600">{session.time} • {session.type === 'video' ? 'Video Call' : 'Chat Session'}</p>
                </div>
              </div>
              <button className="text-blue-600 hover:bg-blue-50 p-2 rounded">
                <Play className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderMentorManagement = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Mentor Management</h2>
        <div className="flex space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg">
            <Download className="h-4 w-4" />
            <span>Export Report</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg">
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="p-4 border-b bg-gray-50">
          <div className="flex justify-between items-center">
            <div className="relative">
              <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search mentors..." 
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-64"
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mentor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sessions</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Active</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mentorEngagement.map((mentor, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-medium">{mentor.name.split(' ').map(n => n[0]).join('')}</span>
                      </div>
                      <div className="ml-3">
                        <p className="font-medium text-gray-900">{mentor.name}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{mentor.sessions}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 mr-1" />
                      <span className="text-sm text-gray-900">{mentor.rating}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{mentor.lastActive}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      mentor.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {mentor.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <Video className="h-4 w-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-900">
                        <MessageSquare className="h-4 w-4" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-900">
                        <Settings className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderCommunications = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Communications Hub</h2>
        <div className="flex space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg">
            <Video className="h-4 w-4" />
            <span>Start Meeting</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg">
            <MessageSquare className="h-4 w-4" />
            <span>New Chat</span>
          </button>
        </div>
      </div>

      {/* Active Sessions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold mb-4">Active Video Sessions</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
              <div>
                <p className="font-medium">Dr. Sarah Chen & Alice Kumar</p>
                <p className="text-sm text-gray-600">Started 23 min ago</p>
              </div>
              <div className="flex space-x-2">
                <button className="p-2 bg-green-600 text-white rounded-full hover:bg-green-700">
                  <Video className="h-4 w-4" />
                </button>
                <button className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700">
                  <Phone className="h-4 w-4" />
                </button>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
              <div>
                <p className="font-medium">Jennifer Wong & Priya Patel</p>
                <p className="text-sm text-gray-600">Started 8 min ago</p>
              </div>
              <div className="flex space-x-2">
                <button className="p-2 bg-green-600 text-white rounded-full hover:bg-green-700">
                  <Video className="h-4 w-4" />
                </button>
                <button className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700">
                  <Phone className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold mb-4">Recent Chat Activity</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg">
              <div className="h-10 w-10 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-purple-600 font-medium">MR</span>
              </div>
              <div className="flex-1">
                <p className="font-medium">Maria Rodriguez & Jenny Lim</p>
                <p className="text-sm text-gray-600">Last message: 2 min ago</p>
              </div>
              <div className="h-3 w-3 bg-green-500 rounded-full"></div>
            </div>

            <div className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg">
              <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-medium">LT</span>
              </div>
              <div className="flex-1">
                <p className="font-medium">Lisa Thompson & Sarah Ahmed</p>
                <p className="text-sm text-gray-600">Last message: 15 min ago</p>
              </div>
              <div className="h-3 w-3 bg-yellow-500 rounded-full"></div>
            </div>

            <div className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg">
              <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 font-medium">SC</span>
              </div>
              <div className="flex-1">
                <p className="font-medium">Dr. Sarah Chen & Alice Kumar</p>
                <p className="text-sm text-gray-600">Last message: 1 hour ago</p>
              </div>
              <div className="h-3 w-3 bg-gray-300 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Communication Analytics */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">Communication Analytics</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">156</div>
            <p className="text-sm text-gray-600">Total Messages Today</p>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">23</div>
            <p className="text-sm text-gray-600">Video Calls Today</p>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">1.2h</div>
            <p className="text-sm text-gray-600">Avg Session Duration</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="h-10 w-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">UWS Admin Dashboard</h1>
                <p className="text-sm text-gray-600">Mentorship Platform Management</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <select 
                value={selectedPeriod} 
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
              </select>
              
              <div className="h-8 w-8 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-gray-700">AD</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex space-x-8 py-4" aria-label="Tabs">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex items-center space-x-2 px-3 py-2 text-sm font-medium rounded-md ${
              activeTab === 'overview'
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <BarChart3 className="h-4 w-4" />
            <span>Overview</span>
          </button>
          
          <button
            onClick={() => setActiveTab('mentors')}
            className={`flex items-center space-x-2 px-3 py-2 text-sm font-medium rounded-md ${
              activeTab === 'mentors'
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Users className="h-4 w-4" />
            <span>Mentors & Mentees</span>
          </button>
          
          <button
            onClick={() => setActiveTab('communications')}
            className={`flex items-center space-x-2 px-3 py-2 text-sm font-medium rounded-md ${
              activeTab === 'communications'
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <MessageSquare className="h-4 w-4" />
            <span>Communications</span>
          </button>
          
          <button
            onClick={() => setActiveTab('analytics')}
            className={`flex items-center space-x-2 px-3 py-2 text-sm font-medium rounded-md ${
              activeTab === 'analytics'
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <TrendingUp className="h-4 w-4" />
            <span>Analytics</span>
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'mentors' && renderMentorManagement()}
        {activeTab === 'communications' && renderCommunications()}
        {activeTab === 'analytics' && renderOverview()} {/* Using same for now */}
      </div>
    </div>
  );
};

export default AdminDashboard;