import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BriefcaseBusiness, Calendar, Clock, FlameIcon as Fire, MapPin, MessageSquare, Star } from "lucide-react"
import DashboardNav from "@/components/dashboard-nav"

export default function DashboardPage() {
  // Sample job recommendations
  const recommendedJobs = [
    {
      id: "job1",
      title: "Senior Frontend Developer",
      company: "TechCorp Inc.",
      location: "Remote",
      salary: "$90,000 - $120,000",
      matchPercentage: 95,
      postedDate: "2 days ago",
      isPerfectMatch: true,
    },
    {
      id: "job2",
      title: "UI/UX Designer",
      company: "DesignHub",
      location: "New York, NY",
      salary: "$85,000 - $105,000",
      matchPercentage: 88,
      postedDate: "1 week ago",
      isPerfectMatch: false,
    },
    {
      id: "job3",
      title: "React Developer",
      company: "WebSolutions",
      location: "Hybrid - Chicago, IL",
      salary: "$80,000 - $100,000",
      matchPercentage: 82,
      postedDate: "3 days ago",
      isPerfectMatch: false,
    },
  ]

  // Sample applied jobs
  const appliedJobs = [
    {
      id: "applied1",
      title: "Frontend Engineer",
      company: "InnovateTech",
      status: "Interview Scheduled",
      appliedDate: "1 week ago",
      nextStep: "Technical Interview on May 5, 2023",
    },
    {
      id: "applied2",
      title: "UI Developer",
      company: "CreativeMinds",
      status: "Application Viewed",
      appliedDate: "2 weeks ago",
      nextStep: "Waiting for response",
    },
  ]

  // Sample upcoming interviews
  const upcomingInterviews = [
    {
      id: "interview1",
      company: "InnovateTech",
      position: "Frontend Engineer",
      date: "May 5, 2023",
      time: "10:00 AM",
      type: "Technical Interview",
      interviewer: "John Smith, Senior Engineer",
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-white">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-blue-600">AI Job Finder</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <MessageSquare className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Calendar className="h-5 w-5" />
            </Button>
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        <DashboardNav />

        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold">Welcome back, John!</h2>
            <p className="text-gray-600">Here's what's happening with your job search</p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Job Match Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-600">78%</div>
                <p className="text-sm text-gray-500">Mid-level Developer</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Applications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-600">2</div>
                <p className="text-sm text-gray-500">1 in progress</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Upcoming</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-600">1</div>
                <p className="text-sm text-gray-500">Interview on May 5</p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8">
            <Tabs defaultValue="recommended">
              <TabsList className="mb-4">
                <TabsTrigger value="recommended">Recommended Jobs</TabsTrigger>
                <TabsTrigger value="applied">Applied Jobs</TabsTrigger>
                <TabsTrigger value="interviews">Interviews</TabsTrigger>
              </TabsList>

              <TabsContent value="recommended">
                <div className="space-y-4">
                  {recommendedJobs.map((job) => (
                    <Card key={job.id}>
                      <CardContent className="p-6">
                        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <h3 className="text-xl font-bold">{job.title}</h3>
                              {job.isPerfectMatch && (
                                <Badge className="bg-orange-500 text-white">
                                  <Fire className="mr-1 h-3 w-3" /> Perfect Match
                                </Badge>
                              )}
                            </div>
                            <div className="text-gray-600">{job.company}</div>
                            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500">
                              <div className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                {job.location}
                              </div>
                              <div className="flex items-center gap-1">
                                <BriefcaseBusiness className="h-4 w-4" />
                                {job.salary}
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                {job.postedDate}
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-col items-end gap-2">
                            <div className="flex items-center gap-1 rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
                              <Star className="h-4 w-4 fill-blue-500 text-blue-500" />
                              {job.matchPercentage}% Match
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                Save
                              </Button>
                              <Button size="sm">Apply</Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                  <div className="flex justify-center">
                    <Button variant="outline">View More Jobs</Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="applied">
                <div className="space-y-4">
                  {appliedJobs.map((job) => (
                    <Card key={job.id}>
                      <CardContent className="p-6">
                        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                          <div className="space-y-2">
                            <h3 className="text-xl font-bold">{job.title}</h3>
                            <div className="text-gray-600">{job.company}</div>
                            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500">
                              <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                Applied {job.appliedDate}
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-col items-end gap-2">
                            <Badge className="bg-blue-500">{job.status}</Badge>
                            <div className="text-sm text-gray-600">{job.nextStep}</div>
                            <Button size="sm">View Details</Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="interviews">
                <div className="space-y-4">
                  {upcomingInterviews.map((interview) => (
                    <Card key={interview.id}>
                      <CardContent className="p-6">
                        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                          <div className="space-y-2">
                            <h3 className="text-xl font-bold">{interview.position}</h3>
                            <div className="text-gray-600">{interview.company}</div>
                            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500">
                              <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                {interview.date}, {interview.time}
                              </div>
                              <div>{interview.type}</div>
                            </div>
                            <div className="text-sm text-gray-600">With: {interview.interviewer}</div>
                          </div>

                          <div className="flex flex-col items-end gap-2">
                            <Button size="sm">Prepare</Button>
                            <Button variant="outline" size="sm">
                              Reschedule
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                  {upcomingInterviews.length === 0 && (
                    <div className="rounded-lg border border-dashed p-8 text-center">
                      <h3 className="text-lg font-medium">No upcoming interviews</h3>
                      <p className="mt-2 text-gray-500">When you get interview invitations, they will appear here</p>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}
