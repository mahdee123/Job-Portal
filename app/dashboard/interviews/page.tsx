"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import DashboardNav from "@/components/dashboard-nav"
import {
  Calendar,
  Clock,
  Video,
  Phone,
  User,
  Building,
  CheckCircle,
  AlertCircle,
  Star,
  MessageSquare,
  FileText,
} from "lucide-react"

export default function InterviewsPage() {
  const [selectedInterview, setSelectedInterview] = useState<string | null>(null)
  const [notes, setNotes] = useState("")

  // Sample interview data
  const upcomingInterviews = [
    {
      id: "int1",
      company: "TechCorp Inc.",
      position: "Senior Frontend Developer",
      date: "2024-05-15",
      time: "10:00 AM",
      duration: "60 minutes",
      type: "Video Call",
      interviewer: "Sarah Johnson",
      interviewerRole: "Engineering Manager",
      interviewerAvatar: "/placeholder.svg?height=40&width=40",
      stage: "Technical Interview",
      meetingLink: "https://meet.google.com/abc-defg-hij",
      location: "Online",
      status: "confirmed",
      notes: "Prepare React and TypeScript questions. Review system design basics.",
      preparation: [
        "Review React hooks and state management",
        "Practice coding problems on LeetCode",
        "Prepare questions about the team and projects",
      ],
    },
    {
      id: "int2",
      company: "DesignHub",
      position: "UI/UX Designer",
      date: "2024-05-18",
      time: "2:00 PM",
      duration: "45 minutes",
      type: "Phone Call",
      interviewer: "Mike Chen",
      interviewerRole: "Design Director",
      interviewerAvatar: "/placeholder.svg?height=40&width=40",
      stage: "Portfolio Review",
      meetingLink: "+1-555-0123",
      location: "Phone",
      status: "pending",
      notes: "Portfolio presentation and design process discussion.",
      preparation: [
        "Prepare portfolio presentation",
        "Practice explaining design decisions",
        "Research company's design philosophy",
      ],
    },
  ]

  const pastInterviews = [
    {
      id: "past1",
      company: "WebSolutions",
      position: "React Developer",
      date: "2024-05-10",
      time: "11:00 AM",
      interviewer: "John Smith",
      interviewerRole: "Senior Developer",
      stage: "Technical Interview",
      status: "completed",
      feedback: "Great technical skills, good communication. Moving to final round.",
      rating: 4,
      nextSteps: "Final interview with CTO scheduled for next week",
    },
    {
      id: "past2",
      company: "StartupXYZ",
      position: "Frontend Developer",
      date: "2024-05-08",
      time: "3:00 PM",
      interviewer: "Lisa Wang",
      interviewerRole: "Tech Lead",
      stage: "Initial Screening",
      status: "completed",
      feedback: "Good fit for the role, but looking for more senior experience.",
      rating: 3,
      nextSteps: "Will keep profile for future opportunities",
    },
  ]

  const interviewRequests = [
    {
      id: "req1",
      company: "InnovateTech",
      position: "Full Stack Developer",
      requestDate: "2024-05-12",
      proposedDates: [
        { date: "2024-05-20", time: "10:00 AM" },
        { date: "2024-05-20", time: "2:00 PM" },
        { date: "2024-05-21", time: "11:00 AM" },
      ],
      interviewer: "Alex Rodriguez",
      interviewerRole: "CTO",
      stage: "Technical Interview",
      status: "pending_response",
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-white">
        <div className="container flex h-16 items-center justify-between px-4">
          <h1 className="text-xl font-bold text-blue-600">AI Job Finder</h1>
        </div>
      </header>

      <div className="flex flex-1">
        <DashboardNav />

        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold">Interviews</h2>
            <p className="text-gray-600">Manage your interview schedule and preparation</p>
          </div>

          {/* Quick Stats */}
          <div className="grid gap-4 md:grid-cols-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="text-2xl font-bold">{upcomingInterviews.length}</p>
                    <p className="text-sm text-gray-500">Upcoming</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="text-2xl font-bold">{pastInterviews.length}</p>
                    <p className="text-sm text-gray-500">Completed</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-orange-600" />
                  <div>
                    <p className="text-2xl font-bold">{interviewRequests.length}</p>
                    <p className="text-sm text-gray-500">Pending</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-600" />
                  <div>
                    <p className="text-2xl font-bold">4.2</p>
                    <p className="text-sm text-gray-500">Avg Rating</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="upcoming" className="space-y-4">
            <TabsList>
              <TabsTrigger value="upcoming">Upcoming ({upcomingInterviews.length})</TabsTrigger>
              <TabsTrigger value="requests">Requests ({interviewRequests.length})</TabsTrigger>
              <TabsTrigger value="past">Past Interviews ({pastInterviews.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming" className="space-y-4">
              {upcomingInterviews.map((interview) => (
                <Card key={interview.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                      <div className="space-y-3 flex-1">
                        <div className="flex items-start gap-3">
                          <div className="flex-1">
                            <h3 className="text-xl font-bold mb-1">{interview.position}</h3>
                            <div className="flex items-center gap-2 text-gray-600 mb-2">
                              <Building className="h-4 w-4" />
                              {interview.company}
                            </div>
                            <Badge className={interview.status === "confirmed" ? "bg-green-500" : "bg-yellow-500"}>
                              {interview.status === "confirmed" ? "Confirmed" : "Pending"}
                            </Badge>
                          </div>
                        </div>

                        <div className="grid gap-2 md:grid-cols-2">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Calendar className="h-4 w-4" />
                            {new Date(interview.date).toLocaleDateString("en-US", {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Clock className="h-4 w-4" />
                            {interview.time} ({interview.duration})
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            {interview.type === "Video Call" ? (
                              <Video className="h-4 w-4" />
                            ) : (
                              <Phone className="h-4 w-4" />
                            )}
                            {interview.type}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <User className="h-4 w-4" />
                            {interview.interviewer} - {interview.interviewerRole}
                          </div>
                        </div>

                        <div className="bg-blue-50 p-3 rounded-lg">
                          <p className="text-sm font-medium text-blue-800 mb-1">Stage: {interview.stage}</p>
                          <p className="text-sm text-blue-700">{interview.notes}</p>
                        </div>

                        <div>
                          <h4 className="font-medium mb-2">Preparation Checklist:</h4>
                          <ul className="space-y-1">
                            {interview.preparation.map((item, index) => (
                              <li key={index} className="flex items-center gap-2 text-sm">
                                <CheckCircle className="h-4 w-4 text-green-500" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2 lg:min-w-[200px]">
                        <Button className="w-full">
                          {interview.type === "Video Call" ? "Join Meeting" : "Call Now"}
                        </Button>
                        <Button variant="outline" className="w-full bg-transparent">
                          Reschedule
                        </Button>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" className="w-full bg-transparent">
                              <MessageSquare className="mr-2 h-4 w-4" />
                              Add Notes
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Interview Notes</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div>
                                <Label htmlFor="notes">Notes</Label>
                                <Textarea
                                  id="notes"
                                  placeholder="Add your preparation notes..."
                                  value={notes}
                                  onChange={(e) => setNotes(e.target.value)}
                                  rows={4}
                                />
                              </div>
                              <Button>Save Notes</Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {upcomingInterviews.length === 0 && (
                <div className="text-center py-12">
                  <Calendar className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-4 text-lg font-medium text-gray-900">No upcoming interviews</h3>
                  <p className="mt-2 text-gray-500">Your scheduled interviews will appear here</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="requests" className="space-y-4">
              {interviewRequests.map((request) => (
                <Card key={request.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                      <div className="space-y-3 flex-1">
                        <div>
                          <h3 className="text-xl font-bold mb-1">{request.position}</h3>
                          <div className="flex items-center gap-2 text-gray-600 mb-2">
                            <Building className="h-4 w-4" />
                            {request.company}
                          </div>
                          <Badge variant="outline" className="text-orange-600 border-orange-600">
                            Response Required
                          </Badge>
                        </div>

                        <div className="bg-orange-50 p-3 rounded-lg">
                          <p className="text-sm font-medium text-orange-800 mb-2">
                            Interview request received on {new Date(request.requestDate).toLocaleDateString()}
                          </p>
                          <p className="text-sm text-orange-700 mb-2">
                            Interviewer: {request.interviewer} - {request.interviewerRole}
                          </p>
                          <p className="text-sm text-orange-700">Stage: {request.stage}</p>
                        </div>

                        <div>
                          <h4 className="font-medium mb-2">Available Time Slots:</h4>
                          <div className="grid gap-2 md:grid-cols-3">
                            {request.proposedDates.map((slot, index) => (
                              <div
                                key={index}
                                className="p-2 border rounded-lg text-center hover:bg-blue-50 cursor-pointer"
                              >
                                <p className="text-sm font-medium">
                                  {new Date(slot.date).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                  })}
                                </p>
                                <p className="text-sm text-gray-600">{slot.time}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2 lg:min-w-[200px]">
                        <Button className="w-full">Accept & Schedule</Button>
                        <Button variant="outline" className="w-full bg-transparent">
                          Request Different Time
                        </Button>
                        <Button variant="outline" className="w-full text-red-600 hover:text-red-700 bg-transparent">
                          Decline
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {interviewRequests.length === 0 && (
                <div className="text-center py-12">
                  <AlertCircle className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-4 text-lg font-medium text-gray-900">No pending requests</h3>
                  <p className="mt-2 text-gray-500">Interview requests will appear here</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="past" className="space-y-4">
              {pastInterviews.map((interview) => (
                <Card key={interview.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                      <div className="space-y-3 flex-1">
                        <div>
                          <h3 className="text-xl font-bold mb-1">{interview.position}</h3>
                          <div className="flex items-center gap-2 text-gray-600 mb-2">
                            <Building className="h-4 w-4" />
                            {interview.company}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Calendar className="h-4 w-4" />
                            {new Date(interview.date).toLocaleDateString()} at {interview.time}
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">Rating:</span>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < interview.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        </div>

                        <div className="bg-gray-50 p-3 rounded-lg">
                          <p className="text-sm font-medium text-gray-800 mb-1">
                            Interviewer: {interview.interviewer} - {interview.interviewerRole}
                          </p>
                          <p className="text-sm text-gray-700 mb-2">Stage: {interview.stage}</p>
                          <p className="text-sm text-gray-700 mb-2">
                            <strong>Feedback:</strong> {interview.feedback}
                          </p>
                          <p className="text-sm text-gray-700">
                            <strong>Next Steps:</strong> {interview.nextSteps}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2 lg:min-w-[200px]">
                        <Badge className="w-fit bg-green-500">Completed</Badge>
                        <Button variant="outline" size="sm">
                          <FileText className="mr-2 h-4 w-4" />
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {pastInterviews.length === 0 && (
                <div className="text-center py-12">
                  <CheckCircle className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-4 text-lg font-medium text-gray-900">No past interviews</h3>
                  <p className="mt-2 text-gray-500">Completed interviews will appear here</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
