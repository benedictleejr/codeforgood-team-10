"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Clock, Bell, Users } from "lucide-react";
import { useRouter } from "next/navigation";

// Types based on your database schema
interface Notification {
  id: number;
  created_at: string;
  title: string;
  description: string;
  event_date: string | null;
}

interface Meeting {
  id: string;
  mentor_id: string;
  mentee_id: string;
  session_date: string;
  session_time: string;
  topics: string;
  school: string;
}

interface Profile {
  id: string;
  name: string;
  email: string;
  current_company: string;
  job_role: string;
  skills: string;
  academic_bg: string;
}

export default function MentorPage() {
  const router = useRouter();
  const [meetingView, setMeetingView] = useState<"upcoming" | "past">(
    "upcoming"
  );
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [mentees, setMentees] = useState<Profile[]>([]);

  // Hardcoded mentor data - replace with API call later
  const mentorData = {
    id: "mentor-123",
    name: "Sarah Johnson",
    email: "sarah.johnson@company.com",
    current_company: "Google",
    job_role: "Senior Software Engineer",
    skills: "React, TypeScript, System Design, Leadership",
    academic_bg: "Computer Science, Stanford University",
    profileImage:
      "https://images.unsplash.com/photo-1494790108755-2616b612b789?w=150&h=150&fit=crop&crop=face",
  };

  // Mock data - replace with actual API calls
  useEffect(() => {
    // TODO: Replace with actual Supabase API calls
    fetchNotifications();
    fetchMeetings();
    fetchMentees();
  }, []);

  const fetchNotifications = async () => {
    // TODO: Implement Supabase API call
    // const { data, error } = await supabase
    //   .from('notifications')
    //   .select('*')
    //   .order('event_date', { ascending: true, nullsFirst: true });

    // Mock data for now
    const mockNotifications: Notification[] = [
      {
        id: 1,
        created_at: "2024-01-15T10:00:00Z",
        title: "New Mentee Matched",
        description:
          "You have been matched with Alex Chen for software engineering mentorship",
        event_date: null,
      },
      {
        id: 2,
        created_at: "2024-01-14T14:30:00Z",
        title: "Upcoming Meeting Reminder",
        description: "You have a meeting with John Doe tomorrow at 2:00 PM",
        event_date: "2024-01-16T14:00:00Z",
      },
    ];
    setNotifications(mockNotifications);
  };

  const fetchMeetings = async () => {
    // TODO: Implement Supabase API call
    // const { data, error } = await supabase
    //   .from('meetings')
    //   .select('*')
    //   .or(`mentor_id.eq.${mentorId},mentee_id.eq.${mentorId}`)
    //   .order('session_date', { ascending: false });

    // Mock data for now
    const mockMeetings: Meeting[] = [
      {
        id: "meeting-1",
        mentor_id: "mentor-123",
        mentee_id: "mentee-456",
        session_date: "2024-01-20",
        session_time: "14:00",
        topics: "Career guidance, Technical interview prep",
        school: "MIT",
      },
      {
        id: "meeting-2",
        mentor_id: "mentor-123",
        mentee_id: "mentee-789",
        session_date: "2024-01-10",
        session_time: "16:00",
        topics: "System design discussion",
        school: "Stanford",
      },
    ];
    setMeetings(mockMeetings);
  };

  const fetchMentees = async () => {
    // TODO: Implement Supabase API call to get mentees associated with this mentor
    // const { data, error } = await supabase
    //   .from('profiles')
    //   .select('*')
    //   .in('id', menteeIds);

    // Mock data for now
    const mockMentees: Profile[] = [
      {
        id: "mentee-456",
        name: "Alex Chen",
        email: "alex.chen@student.edu",
        current_company: "Student",
        job_role: "CS Student",
        skills: "Python, Data Structures",
        academic_bg: "Computer Science, MIT",
      },
      {
        id: "mentee-789",
        name: "Maria Rodriguez",
        email: "maria.r@student.edu",
        current_company: "Student",
        job_role: "CS Student",
        skills: "JavaScript, Web Development",
        academic_bg: "Computer Science, Stanford",
      },
    ];
    setMentees(mockMentees);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (timeStr: string) => {
    const [hour, minute] = timeStr.split(":");
    const hourNum = parseInt(hour);
    const ampm = hourNum >= 12 ? "PM" : "AM";
    const displayHour = hourNum % 12 || 12;
    return `${displayHour}:${minute} ${ampm}`;
  };

  const filteredMeetings = meetings.filter((meeting) => {
    const meetingDate = new Date(meeting.session_date);
    const now = new Date();
    now.setHours(0, 0, 0, 0);

    return meetingView === "upcoming" ? meetingDate >= now : meetingDate < now;
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleMeetingClick = (meetingId: string) => {
    router.push("/meeting");
  };

  const handleMenteeClick = (menteeId: string) => {
    // TODO: Navigate to mentee profile or chat
    console.log("Navigate to mentee:", menteeId);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Bio Section */}
        <Card className="w-full">
          <CardHeader>
            <div className="flex items-center space-x-4">
              <Avatar className="h-20 w-20">
                <AvatarImage
                  src={mentorData.profileImage}
                  alt={mentorData.name}
                />
                <AvatarFallback className="text-lg">
                  {mentorData.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <CardTitle className="text-2xl">{mentorData.name}</CardTitle>
                <CardDescription className="text-lg">
                  {mentorData.job_role} at {mentorData.current_company}
                </CardDescription>
                <p className="text-sm text-muted-foreground mt-1">
                  {mentorData.email}
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">Academic Background</h4>
                <p className="text-sm text-muted-foreground">
                  {mentorData.academic_bg}
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Skills & Expertise</h4>
                <div className="flex flex-wrap gap-2">
                  {mentorData.skills.split(", ").map((skill, index) => (
                    <Badge key={index} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Half - Mentees and Meetings */}
          <div className="space-y-6">
            {/* Current Mentees */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Current Mentees
                </CardTitle>
              </CardHeader>
              <CardContent>
                {mentees.length > 0 ? (
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Mentees:</p>
                    <div className="flex flex-wrap gap-2">
                      {mentees.map((mentee) => (
                        <Button
                          key={mentee.id}
                          variant="outline"
                          size="sm"
                          onClick={() => handleMenteeClick(mentee.id)}
                          className="h-auto p-2"
                        >
                          <div className="text-left">
                            <div className="font-medium">{mentee.name}</div>
                            <div className="text-xs text-muted-foreground">
                              {mentee.academic_bg.split(",")[1]?.trim()}
                            </div>
                          </div>
                        </Button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    No mentees assigned yet
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Meetings Section */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Meetings
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button
                      variant={
                        meetingView === "upcoming" ? "default" : "outline"
                      }
                      size="sm"
                      onClick={() => setMeetingView("upcoming")}
                    >
                      Upcoming
                    </Button>
                    <Button
                      variant={meetingView === "past" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setMeetingView("past")}
                    >
                      Past
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {filteredMeetings.length > 0 ? (
                  <div className="space-y-3">
                    {filteredMeetings.map((meeting) => (
                      <Card
                        key={meeting.id}
                        className="cursor-pointer hover:bg-muted/50 transition-colors"
                        onClick={() => handleMeetingClick(meeting.id)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <Calendar className="h-4 w-4" />
                                <span className="font-medium">
                                  {formatDate(meeting.session_date)}
                                </span>
                                <Clock className="h-4 w-4 ml-2" />
                                <span>{formatTime(meeting.session_time)}</span>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {meeting.topics}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    No {meetingView} meetings found
                  </p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Half - Notifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              {notifications.length > 0 ? (
                <div className="space-y-4">
                  {notifications.map((notification) => (
                    <Card
                      key={notification.id}
                      className="border-l-4 border-l-primary"
                    >
                      <CardContent className="p-4">
                        <div className="space-y-2">
                          <div className="flex items-start justify-between">
                            <h4 className="font-semibold text-sm">
                              {notification.title}
                            </h4>
                            <span className="text-xs text-muted-foreground">
                              {formatDate(notification.created_at)}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {notification.description}
                          </p>
                          {notification.event_date && (
                            <div className="flex items-center gap-1 mt-2">
                              <Calendar className="h-3 w-3" />
                              <span className="text-xs text-muted-foreground">
                                Event: {formatDate(notification.event_date)}
                              </span>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  No notifications
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
