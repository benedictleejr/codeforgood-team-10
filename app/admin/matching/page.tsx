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
import {
  Loader2,
  Users,
  UserCheck,
  Edit3,
  Check,
  CheckCircle,
} from "lucide-react";

// Types
interface Profile {
  id: string;
  name: string;
  email: string;
  current_company: string;
  job_role: string;
  skills: string;
  academic_bg: string;
  profileImage?: string;
  skills_gap?: string;
  aspirations?: string;
}

interface Match {
  id: string;
  mentee: Profile;
  mentor: Profile;
  compatibilityScore: number;
  approved: boolean;
}

export default function AdminMatchingPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [showMatches, setShowMatches] = useState(false);
  const [matches, setMatches] = useState<Match[]>([]);

  // Dummy mentees data
  const mentees: Profile[] = [
    {
      id: "mentee-1",
      name: "Alice Chen",
      email: "alice.chen@mit.edu",
      current_company: "Student",
      job_role: "Computer Science Student",
      skills: "Python, Java, Data Structures",
      academic_bg: "Computer Science, MIT",
      profileImage:
        "https://images.unsplash.com/photo-1494790108755-2616b612b789?w=150&h=150&fit=crop&crop=face",
      skills_gap: "System Design, Machine Learning",
      aspirations: "Software Engineering at FAANG",
    },
    {
      id: "mentee-2",
      name: "Marcus Rodriguez",
      email: "marcus.r@stanford.edu",
      current_company: "Student",
      job_role: "CS & Business Student",
      skills: "JavaScript, React, SQL",
      academic_bg: "Computer Science & Business, Stanford",
      profileImage:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      skills_gap: "Backend Development, Cloud Computing",
      aspirations: "Tech Startup Founder",
    },
    {
      id: "mentee-3",
      name: "Priya Patel",
      email: "priya.p@berkeley.edu",
      current_company: "Student",
      job_role: "Data Science Student",
      skills: "Python, R, Statistics, SQL",
      academic_bg: "Data Science, UC Berkeley",
      profileImage:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      skills_gap: "Machine Learning Engineering, MLOps",
      aspirations: "AI/ML Engineer",
    },
    {
      id: "mentee-4",
      name: "David Kim",
      email: "david.kim@cmu.edu",
      current_company: "Student",
      job_role: "Software Engineering Student",
      skills: "C++, Python, Algorithms",
      academic_bg: "Software Engineering, CMU",
      profileImage:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      skills_gap: "Distributed Systems, DevOps",
      aspirations: "Senior Software Engineer",
    },
    {
      id: "mentee-5",
      name: "Sarah Wilson",
      email: "sarah.w@caltech.edu",
      current_company: "Student",
      job_role: "Computer Engineering Student",
      skills: "Java, C, Hardware Design",
      academic_bg: "Computer Engineering, Caltech",
      profileImage:
        "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face",
      skills_gap: "Software Architecture, Leadership",
      aspirations: "Technical Lead",
    },
    {
      id: "mentee-6",
      name: "Alex Thompson",
      email: "alex.t@ucla.edu",
      current_company: "Student",
      job_role: "CS & Math Student",
      skills: "Python, MATLAB, Algorithms",
      academic_bg: "Computer Science & Mathematics, UCLA",
      profileImage:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      skills_gap: "Web Development, Project Management",
      aspirations: "Full Stack Developer",
    },
  ];

  // Dummy mentors data
  const mentors: Profile[] = [
    {
      id: "mentor-1",
      name: "Dr. Sarah Johnson",
      email: "sarah.johnson@google.com",
      current_company: "Google",
      job_role: "Senior Software Engineer",
      skills: "System Design, Python, Leadership, Machine Learning",
      academic_bg: "PhD Computer Science, Stanford",
      profileImage:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face",
    },
    {
      id: "mentor-2",
      name: "Michael Chen",
      email: "michael.chen@meta.com",
      current_company: "Meta",
      job_role: "Engineering Manager",
      skills: "Full Stack Development, Team Leadership, React, Node.js",
      academic_bg: "MS Computer Science, MIT",
      profileImage:
        "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=150&h=150&fit=crop&crop=face",
    },
    {
      id: "mentor-3",
      name: "Jennifer Liu",
      email: "jennifer.liu@amazon.com",
      current_company: "Amazon",
      job_role: "Principal Engineer",
      skills: "Distributed Systems, Cloud Architecture, Java, DevOps",
      academic_bg: "MS Software Engineering, Carnegie Mellon",
      profileImage:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face",
    },
  ];

  const generateMatches = () => {
    setIsLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      // Generate matches with compatibility scores
      const generatedMatches: Match[] = [
        {
          id: "match-1",
          mentee: mentees[0], // Alice Chen
          mentor: mentors[0], // Dr. Sarah Johnson
          compatibilityScore: 8.5,
          approved: false,
        },
        {
          id: "match-2",
          mentee: mentees[2], // Priya Patel
          mentor: mentors[0], // Dr. Sarah Johnson
          compatibilityScore: 9.2,
          approved: false,
        },
        {
          id: "match-3",
          mentee: mentees[1], // Marcus Rodriguez
          mentor: mentors[1], // Michael Chen
          compatibilityScore: 7.8,
          approved: false,
        },
        {
          id: "match-4",
          mentee: mentees[5], // Alex Thompson
          mentor: mentors[1], // Michael Chen
          compatibilityScore: 6.3,
          approved: false,
        },
        {
          id: "match-5",
          mentee: mentees[3], // David Kim
          mentor: mentors[2], // Jennifer Liu
          compatibilityScore: 4.2,
          approved: false,
        },
        {
          id: "match-6",
          mentee: mentees[4], // Sarah Wilson
          mentor: mentors[2], // Jennifer Liu
          compatibilityScore: 7.1,
          approved: false,
        },
      ];

      // Sort by compatibility score ascending
      generatedMatches.sort(
        (a, b) => a.compatibilityScore - b.compatibilityScore
      );

      setMatches(generatedMatches);
      setIsLoading(false);
      setShowMatches(true);
    }, 2000);
  };

  const approveMatch = (matchId: string) => {
    setMatches(
      matches.map((match) =>
        match.id === matchId ? { ...match, approved: true } : match
      )
    );
  };

  const approveAllMatches = () => {
    setMatches(matches.map((match) => ({ ...match, approved: true })));
  };

  const editMatch = (matchId: string) => {
    console.log("Edit match:", matchId);
    // TODO: Implement edit functionality
  };

  const getScoreBackgroundColor = (score: number) => {
    if (score < 5) return "bg-red-50";
    if (score < 7) return "bg-yellow-50";
    return "bg-green-50";
  };

  const getScoreTextColor = (score: number) => {
    if (score < 5) return "text-red-700";
    if (score < 7) return "text-yellow-700";
    return "text-green-700";
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
          <h2 className="text-xl font-semibold">Generating Matches...</h2>
          <p className="text-muted-foreground">
            Please wait while we find the best mentor-mentee pairs
          </p>
        </div>
      </div>
    );
  }

  if (showMatches) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Matchings</h1>
            <Button
              onClick={approveAllMatches}
              className="bg-green-600 hover:bg-green-700"
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Approve All
            </Button>
          </div>

          {/* Matches Table */}
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left p-4 font-semibold">Mentee</th>
                      <th className="text-left p-4 font-semibold">Mentor</th>
                      <th className="text-left p-4 font-semibold">
                        Compatibility Score
                      </th>
                      <th className="text-center p-4 font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {matches.map((match) => (
                      <tr
                        key={match.id}
                        className={`border-b ${getScoreBackgroundColor(
                          match.compatibilityScore
                        )} ${match.approved ? "opacity-60" : ""}`}
                      >
                        {/* Mentee */}
                        <td className="p-4">
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage
                                src={match.mentee.profileImage}
                                alt={match.mentee.name}
                              />
                              <AvatarFallback>
                                {match.mentee.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">
                                {match.mentee.name}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {match.mentee.academic_bg.split(",")[1]?.trim()}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Mentor */}
                        <td className="p-4">
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage
                                src={match.mentor.profileImage}
                                alt={match.mentor.name}
                              />
                              <AvatarFallback>
                                {match.mentor.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">
                                {match.mentor.name}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {match.mentor.job_role} at{" "}
                                {match.mentor.current_company}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Compatibility Score */}
                        <td className="p-4">
                          <div
                            className={`font-bold text-lg ${getScoreTextColor(
                              match.compatibilityScore
                            )}`}
                          >
                            {match.compatibilityScore.toFixed(1)}
                          </div>
                        </td>

                        {/* Actions */}
                        <td className="p-4">
                          <div className="flex items-center justify-center space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => editMatch(match.id)}
                              disabled={match.approved}
                            >
                              <Edit3 className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => approveMatch(match.id)}
                              disabled={match.approved}
                              className={
                                match.approved
                                  ? "bg-green-100 text-green-700"
                                  : "hover:bg-green-50"
                              }
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold">Match Mentors to Mentees</h1>
          <Button
            onClick={generateMatches}
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3"
          >
            Generate Matchings
          </Button>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Half - Mentees */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <Users className="h-6 w-6" />
              Available Mentees ({mentees.length})
            </h2>
            <div className="space-y-4">
              {mentees.map((mentee) => (
                <Card key={mentee.id}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage
                          src={mentee.profileImage}
                          alt={mentee.name}
                        />
                        <AvatarFallback>
                          {mentee.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <CardTitle className="text-lg">{mentee.name}</CardTitle>
                        <CardDescription>{mentee.job_role}</CardDescription>
                        <p className="text-xs text-muted-foreground mt-1">
                          {mentee.academic_bg}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-3">
                      <div>
                        <h5 className="font-medium text-sm mb-1">Skills</h5>
                        <div className="flex flex-wrap gap-1">
                          {mentee.skills.split(", ").map((skill, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="text-xs"
                            >
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h5 className="font-medium text-sm mb-1">Seeking</h5>
                        <div className="flex flex-wrap gap-1">
                          {mentee.skills_gap
                            ?.split(", ")
                            .map((skill, index) => (
                              <Badge
                                key={index}
                                variant="outline"
                                className="text-xs"
                              >
                                {skill}
                              </Badge>
                            ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Right Half - Mentors */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <UserCheck className="h-6 w-6" />
              Available Mentors ({mentors.length})
            </h2>
            <div className="space-y-4">
              {mentors.map((mentor) => (
                <Card key={mentor.id}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage
                          src={mentor.profileImage}
                          alt={mentor.name}
                        />
                        <AvatarFallback>
                          {mentor.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <CardTitle className="text-lg">{mentor.name}</CardTitle>
                        <CardDescription>
                          {mentor.job_role} at {mentor.current_company}
                        </CardDescription>
                        <p className="text-xs text-muted-foreground mt-1">
                          {mentor.academic_bg}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div>
                      <h5 className="font-medium text-sm mb-1">Expertise</h5>
                      <div className="flex flex-wrap gap-1">
                        {mentor.skills.split(", ").map((skill, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="text-xs"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
