"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import DashboardNav from "@/components/dashboard-nav"
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Eye,
  MousePointer,
  Calendar,
  Target,
  Award,
  Clock,
  Users,
  Building,
  MapPin,
} from "lucide-react"

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("30d")

  // Sample analytics data
  const overviewStats = [
    {
      title: "Profile Views",
      value: "1,247",
      change: "+12.5%",
      trend: "up",
      icon: Eye,
    },
    {
      title: "Job Applications",
      value: "23",
      change: "+8.3%",
      trend: "up",
      icon: MousePointer,
    },
    {
      title: "Interview Invites",
      value: "7",
      change: "+40.0%",
      trend: "up",
      icon: Calendar,
    },
    {
      title: "Response Rate",
      value: "30.4%",
      change: "-2.1%",
      trend: "down",
      icon: Target,
    },
  ]

  const applicationStats = [
    { status: "Applied", count: 23, percentage: 100, color: "bg-blue-500" },
    { status: "Viewed", count: 18, percentage: 78, color: "bg-green-500" },
    { status: "Interview", count: 7, percentage: 30, color: "bg-yellow-500" },
    { status: "Offer", count: 2, percentage: 9, color: "bg-purple-500" },
    { status: "Rejected", count: 8, percentage: 35, color: "bg-red-500" },
  ]

  const skillDemand = [
    { skill: "React", demand: 95, jobs: 156 },
    { skill: "JavaScript", demand: 92, jobs: 203 },
    { skill: "TypeScript", demand: 88, jobs: 134 },
    { skill: "Node.js", demand: 85, jobs: 98 },
    { skill: "Python", demand: 82, jobs: 87 },
    { skill: "UI/UX Design", demand: 78, jobs: 76 },
  ]

  const topCompanies = [
    { name: "TechCorp Inc.", applications: 3, views: 45, match: 95 },
    { name: "DesignHub", applications: 2, views: 32, match: 88 },
    { name: "WebSolutions", applications: 2, views: 28, match: 82 },
    { name: "StartupXYZ", applications: 1, views: 15, match: 75 },
    { name: "InnovateTech", applications: 1, views: 12, match: 70 },
  ]

  const locationInsights = [
    { location: "Remote", jobs: 89, avgSalary: "$95,000", applications: 8 },
    { location: "San Francisco, CA", jobs: 67, avgSalary: "$125,000", applications: 5 },
    { location: "New York, NY", jobs: 54, avgSalary: "$110,000", applications: 4 },
    { location: "Seattle, WA", jobs: 43, avgSalary: "$105,000", applications: 3 },
    { location: "Austin, TX", jobs: 32, avgSalary: "$90,000", applications: 3 },
  ]

  const weeklyActivity = [
    { week: "Week 1", applications: 3, views: 45, interviews: 1 },
    { week: "Week 2", applications: 5, views: 67, interviews: 2 },
    { week: "Week 3", applications: 8, views: 89, interviews: 2 },
    { week: "Week 4", applications: 7, views: 76, interviews: 2 },
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
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Analytics</h2>
              <p className="text-gray-600">Track your job search performance and insights</p>
            </div>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
                <SelectItem value="1y">Last year</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Overview Stats */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
            {overviewStats.map((stat) => (
              <Card key={stat.title}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">{stat.title}</p>
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <div
                        className={`flex items-center gap-1 text-sm ${
                          stat.trend === "up" ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {stat.trend === "up" ? (
                          <TrendingUp className="h-4 w-4" />
                        ) : (
                          <TrendingDown className="h-4 w-4" />
                        )}
                        {stat.change}
                      </div>
                    </div>
                    <stat.icon className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Tabs defaultValue="applications" className="space-y-4">
            <TabsList>
              <TabsTrigger value="applications">Applications</TabsTrigger>
              <TabsTrigger value="skills">Skills</TabsTrigger>
              <TabsTrigger value="companies">Companies</TabsTrigger>
              <TabsTrigger value="locations">Locations</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
            </TabsList>

            <TabsContent value="applications" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Application Funnel
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {applicationStats.map((stat) => (
                      <div key={stat.status} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{stat.status}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600">
                              {stat.count} ({stat.percentage}%)
                            </span>
                          </div>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className={`h-2 rounded-full ${stat.color}`} style={{ width: `${stat.percentage}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Weekly Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {weeklyActivity.map((week) => (
                      <div key={week.week} className="grid grid-cols-4 gap-4 p-3 border rounded-lg">
                        <div className="font-medium">{week.week}</div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-blue-600">{week.applications}</div>
                          <div className="text-xs text-gray-500">Applications</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-green-600">{week.views}</div>
                          <div className="text-xs text-gray-500">Profile Views</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-purple-600">{week.interviews}</div>
                          <div className="text-xs text-gray-500">Interviews</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="skills" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    Skill Demand Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {skillDemand.map((skill) => (
                      <div key={skill.skill} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{skill.skill}</span>
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary">{skill.jobs} jobs</Badge>
                            <span className="text-sm font-medium">{skill.demand}%</span>
                          </div>
                        </div>
                        <Progress value={skill.demand} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="companies" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building className="h-5 w-5" />
                    Top Companies
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topCompanies.map((company) => (
                      <div key={company.name} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <h3 className="font-medium">{company.name}</h3>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span>{company.applications} applications</span>
                            <span>{company.views} profile views</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-blue-600">{company.match}%</div>
                          <div className="text-xs text-gray-500">Match Score</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="locations" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Location Insights
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {locationInsights.map((location) => (
                      <div key={location.location} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <h3 className="font-medium">{location.location}</h3>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span>{location.jobs} jobs available</span>
                            <span>{location.applications} applications</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-green-600">{location.avgSalary}</div>
                          <div className="text-xs text-gray-500">Avg Salary</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="activity" className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="h-5 w-5" />
                      Recent Activity
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-2 border-l-4 border-blue-500 bg-blue-50">
                        <div className="text-sm">
                          <p className="font-medium">Applied to Senior Frontend Developer</p>
                          <p className="text-gray-600">TechCorp Inc. • 2 hours ago</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-2 border-l-4 border-green-500 bg-green-50">
                        <div className="text-sm">
                          <p className="font-medium">Profile viewed by DesignHub</p>
                          <p className="text-gray-600">Hiring Manager • 4 hours ago</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-2 border-l-4 border-purple-500 bg-purple-50">
                        <div className="text-sm">
                          <p className="font-medium">Interview scheduled</p>
                          <p className="text-gray-600">WebSolutions • 1 day ago</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Profile Performance
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">Profile Completeness</span>
                          <span className="text-sm">85%</span>
                        </div>
                        <Progress value={85} />
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">Skill Match Rate</span>
                          <span className="text-sm">78%</span>
                        </div>
                        <Progress value={78} />
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">Response Rate</span>
                          <span className="text-sm">30%</span>
                        </div>
                        <Progress value={30} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
