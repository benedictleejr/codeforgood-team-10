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
import { Calendar, Clock, Bell, User } from "lucide-react";
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

export default function MenteePage() {
  const router = useRouter();
  const [meetingView, setMeetingView] = useState<"upcoming" | "past">(
    "upcoming"
  );
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [mentor, setMentor] = useState<Profile | null>(null);

  // Hardcoded mentee data - replace with API call later
  const menteeData = {
    id: "mentee-456",
    name: "Alex Chen",
    email: "alex.chen@student.edu",
    current_company: "Student",
    job_role: "Computer Science Student",
    skills: "Python, JavaScript, Data Structures, Algorithms",
    academic_bg: "Computer Science, MIT",
    profileImage:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    skills_gap: "System Design, Leadership, Industry Experience",
    aspirations: "Software Engineering, Tech Leadership",
  };

  // Mock data - replace with actual API calls
  useEffect(() => {
    // TODO: Replace with actual Supabase API calls
    fetchNotifications();
    fetchMeetings();
    fetchMentor();
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
        title: "Mentor Assigned",
        description:
          "You have been matched with Sarah Johnson for software engineering mentorship",
        event_date: null,
      },
      {
        id: 2,
        created_at: "2024-01-14T14:30:00Z",
        title: "Upcoming Meeting Reminder",
        description:
          "You have a meeting with Sarah Johnson tomorrow at 2:00 PM",
        event_date: "2024-01-16T14:00:00Z",
      },
      {
        id: 3,
        created_at: "2024-01-13T09:00:00Z",
        title: "Profile Review",
        description: "Your mentor has reviewed your profile and left feedback",
        event_date: "2024-01-13T09:00:00Z",
      },
    ];
    setNotifications(mockNotifications);
  };

  const fetchMeetings = async () => {
    // TODO: Implement Supabase API call
    // const { data, error } = await supabase
    //   .from('meetings')
    //   .select('*')
    //   .or(`mentor_id.eq.${menteeId},mentee_id.eq.${menteeId}`)
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
        mentee_id: "mentee-456",
        session_date: "2024-01-10",
        session_time: "16:00",
        topics: "System design discussion, Resume review",
        school: "MIT",
      },
      {
        id: "meeting-3",
        mentor_id: "mentor-123",
        mentee_id: "mentee-456",
        session_date: "2024-01-05",
        session_time: "15:00",
        topics: "Introduction meeting, Goal setting",
        school: "MIT",
      },
    ];
    setMeetings(mockMeetings);
  };

  const fetchMentor = async () => {
    // TODO: Implement Supabase API call to get mentor associated with this mentee
    // const { data, error } = await supabase
    //   .from('profiles')
    //   .select('*')
    //   .eq('id', mentorId)
    //   .single();

    // Mock data for now
    const mockMentor: Profile = {
      id: "mentor-123",
      name: "Sarah Johnson",
      email: "sarah.johnson@company.com",
      current_company: "Google",
      job_role: "Senior Software Engineer",
      skills: "React, TypeScript, System Design, Leadership",
      academic_bg: "Computer Science, Stanford University",
    };
    setMentor(mockMentor);
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

  const handleMentorClick = (mentorId: string) => {
    // TODO: Navigate to mentor profile or chat
    console.log("Navigate to mentor:", mentorId);
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
                  src={menteeData.profileImage}
                  alt={menteeData.name}
                />
                <AvatarFallback className="text-lg">
                  {menteeData.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <CardTitle className="text-2xl">{menteeData.name}</CardTitle>
                <CardDescription className="text-lg">
                  {menteeData.job_role}
                </CardDescription>
                <p className="text-sm text-muted-foreground mt-1">
                  {menteeData.email}
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <h4 className="font-semibold mb-2">Academic Background</h4>
                <p className="text-sm text-muted-foreground">
                  {menteeData.academic_bg}
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Current Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {menteeData.skills.split(", ").map((skill, index) => (
                    <Badge key={index} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Areas to Develop</h4>
                <div className="flex flex-wrap gap-2">
                  {menteeData.skills_gap.split(", ").map((skill, index) => (
                    <Badge key={index} variant="outline">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-4">
              <h4 className="font-semibold mb-2">Career Aspirations</h4>
              <p className="text-sm text-muted-foreground">
                {menteeData.aspirations}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Half - Mentor and Meetings */}
          <div className="space-y-6">
            {/* Current Mentor */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  My Mentor
                </CardTitle>
              </CardHeader>
              <CardContent>
                {mentor ? (
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Mentor:</p>
                    <Button
                      variant="outline"
                      onClick={() => handleMentorClick(mentor.id)}
                      className="h-auto p-3 w-full justify-start"
                    >
                      <div className="text-left">
                        <div className="font-medium">{mentor.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {mentor.job_role} at {mentor.current_company}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          Expertise:{" "}
                          {mentor.skills.split(", ").slice(0, 3).join(", ")}
                        </div>
                      </div>
                    </Button>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    No mentor assigned yet
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
