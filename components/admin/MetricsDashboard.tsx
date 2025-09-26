"use client";

import React, { useEffect, useState } from "react";
import {
  Users,
  Video,
  MessageSquare,
  BarChart3,
  TrendingUp,
  AlertCircle,
  Star,
  Play,
  Download,
  Filter,
  Search,
  Settings,
  Phone,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { createClient } from "@/lib/supabase/client";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedPeriod, setSelectedPeriod] = useState("30d");
  const supabase = createClient();

  const [engagementData, setEngagementData] = useState<any[]>([]);
  const [matchingData, setMatchingData] = useState<any[]>([]);
  const [mentorEngagement, setMentorEngagement] = useState<any[]>([]);
  const [upcomingSessions, setUpcomingSessions] = useState<any[]>([]);
  const [meetings, setMeetings] = useState<any[]>([]);
  const [metrics, setMetrics] = useState({
  totalActivePairs: 0,
  sessionsThisMonth: 0,
  avgSatisfaction: 0,
  atRiskPairs: 0,
});

  useEffect(() => {
    const fetchData = async () => {
     const { data: meetings, error } = await supabase
      .from("meetings")
      .select(`
        id,
        session_date,
        session_time,
        mode,
        topics,
        mentor_rating,
        mentee_rating,
        mentor:profiles!meetings_mentor_id_fkey ( id, name, role ),
        mentee:profiles!meetings_mentee_id_fkey ( id, name, role )
      `)
      .order("session_date", { ascending: true });

      if (error) {
        console.error("Error fetching meetings:", error);
        return;
      }
      if (!meetings) return;

      // Sessions + avg satisfaction by month
      const monthlyStats: Record<string, { sessions: number; ratings: number[] }> = {};
      meetings.forEach((m) => {
        const month = new Date(m.session_date).toLocaleString("default", { month: "short" });
        if (!monthlyStats[month]) monthlyStats[month] = { sessions: 0, ratings: [] };
        monthlyStats[month].sessions++;
        if (m.mentor_rating) monthlyStats[month].ratings.push(m.mentor_rating);
      });
      setEngagementData(
        Object.entries(monthlyStats).map(([month, stats]) => ({
          month,
          sessions: stats.sessions,
          satisfaction: stats.ratings.length
            ? stats.ratings.reduce((a, b) => a + b, 0) / stats.ratings.length
            : 0,
        }))
      );

      // Matching success rate (demo logic — tweak to fit schema)
      setMatchingData([
        { name: "Successfully Matched", value: meetings.length, color: "#22c55e" },
        { name: "Pending Match", value: 3, color: "#f59e0b" },
        { name: "Unmatched", value: 1, color: "#ef4444" },
      ]);

      // Mentor engagement (sessions + avg rating)
      const mentorStats: Record<string, { sessions: number; ratings: number[] }> = {};
      meetings.forEach((m) => {
        const mentorName = m.mentor?.name || "Unknown Mentor";
        if (!mentorStats[mentorName]) mentorStats[mentorName] = { sessions: 0, ratings: [] };
        mentorStats[mentorName].sessions++;
        if (m.mentor_rating) mentorStats[mentorName].ratings.push(m.mentor_rating);
      });
      setMentorEngagement(
        Object.entries(mentorStats).map(([name, stats]) => ({
          name,
          sessions: stats.sessions,
          rating: stats.ratings.length
            ? stats.ratings.reduce((a, b) => a + b, 0) / stats.ratings.length
            : null,
          lastActive: "today", 
          status: "active", // derive based on recency
        }))
      );

      // Next 3 upcoming sessions
      setUpcomingSessions(
        meetings
          .filter((m) => new Date(m.session_date) >= new Date())
          .slice(0, 3)
          .map((m) => ({
            mentor: m.mentor?.name,
            mentee: m.mentee?.name,
            time: m.session_time,
            type: m.mode.toLowerCase() === "online" ? "video" : "chat",
          }))
      );

          // Total active pairs = unique mentor-mentee pairs
          const pairs = new Set(meetings.map((m) => `${m.mentor?.name}-${m.mentee?.name}`));
          const totalActivePairs = pairs.size;

          // Sessions this month
          const now = new Date();
          const sessionsThisMonth = meetings.filter((m) => {
            const d = new Date(m.session_date);
            return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
          }).length;

          // Avg satisfaction (mean of mentor+mentee ratings)
          const ratings: number[] = [];
          meetings.forEach((m) => {
            if (m.mentor_rating) ratings.push(m.mentor_rating);
            if (m.mentee_rating) ratings.push(m.mentee_rating);
          });
          const avgSatisfaction = ratings.length
            ? ratings.reduce((a, b) => a + b, 0) / ratings.length
            : 0;

          // At-risk pairs = last session > 30 days ago
          const THIRTY_DAYS = 1000 * 60 * 60 * 24 * 30;
          const recentPairs = new Set(
            meetings
              .filter((m) => new Date(m.session_date).getTime() >= Date.now() - THIRTY_DAYS)
              .map((m) => `${m.mentor?.name}-${m.mentee?.name}`)
          );
          const atRiskPairs = totalActivePairs - recentPairs.size;

          // Store in state
          setMetrics({
            totalActivePairs,
            sessionsThisMonth,
            avgSatisfaction,
            atRiskPairs,
          });

    };

    fetchData();
  }, [supabase]);

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Key Metrics Cards */}
<div className="grid grid-cols-1 md:grid-cols-4 gap-6">
  {/* Total Active Pairs */}
  <div className="bg-white p-6 rounded-lg shadow-sm border">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">Total Active Pairs</p>
        <p className="text-2xl font-bold text-gray-900">{metrics.totalActivePairs}</p>
      </div>
      <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
        <Users className="h-6 w-6 text-blue-600" />
      </div>
    </div>
  </div>

  {/* Sessions This Month */}
  <div className="bg-white p-6 rounded-lg shadow-sm border">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">Sessions This Month</p>
        <p className="text-2xl font-bold text-gray-900">{metrics.sessionsThisMonth}</p>
      </div>
      <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
        <Video className="h-6 w-6 text-green-600" />
      </div>
    </div>
  </div>

  {/* Avg Satisfaction */}
  <div className="bg-white p-6 rounded-lg shadow-sm border">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">Avg Satisfaction</p>
        <p className="text-2xl font-bold text-gray-900">{metrics.avgSatisfaction.toFixed(1)}</p>
      </div>
      <div className="h-12 w-12 bg-yellow-100 rounded-lg flex items-center justify-center">
        <Star className="h-6 w-6 text-yellow-600" />
      </div>
    </div>
  </div>

  {/* At-Risk Pairs */}
  <div className="bg-white p-6 rounded-lg shadow-sm border">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">At-Risk Pairs</p>
        <p className="text-2xl font-bold text-gray-900">{metrics.atRiskPairs}</p>
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
<div className="bg-white p-6 rounded-lg shadow-sm border">
  <h3 className="text-lg font-semibold mb-4">Recent Feedback</h3>
  <div className="space-y-4 max-h-64 overflow-y-auto">
        {meetings.slice(-5).map((m) => (
          <div key={m.id} className="p-3 border-b">
            <p className="text-sm font-medium text-gray-700">
              {m.mentor?.name} → {m.mentee?.name}
            </p>
            <p className="text-xs text-gray-500">{m.topics}</p>
            <blockquote className="mt-1 text-sm text-gray-600 italic">
              “{m.mentor_feedback}”
            </blockquote>
            <blockquote className="mt-1 text-sm text-gray-600 italic">
              — {m.mentee_feedback}
            </blockquote>
          </div>
        ))}
  </div>
</div>

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