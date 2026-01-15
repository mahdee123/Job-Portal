"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import DashboardNav from "@/components/dashboard-nav"
import {
  Search,
  MapPin,
  BriefcaseBusiness,
  Clock,
  Star,
  Bookmark,
  BookmarkCheck,
  FlameIcon as Fire,
  Building,
  DollarSign,
} from "lucide-react"

export default function JobsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedFilters, setSelectedFilters] = useState({
    location: "Any location",
    salary: "",
    jobType: "Any type",
    experience: "Any level",
    workType: "Any type",
  })
  const [savedJobs, setSavedJobs] = useState<string[]>(["job1", "job3"])

  // Sample job data
  const allJobs = [
    {
      id: "job1",
      title: "Senior Frontend Developer",
      company: "TechCorp Inc.",
      location: "Remote",
      salary: "$90,000 - $120,000",
      jobType: "Full-time",
      experience: "Senior",
      workType: "Remote",
      matchPercentage: 95,
      postedDate: "2 days ago",
      isPerfectMatch: true,
      description: "We're looking for a Senior Frontend Developer to join our team...",
      requirements: ["5+ years React experience", "TypeScript", "Next.js"],
      benefits: ["Health Insurance", "401k", "Remote Work", "Flexible Hours"],
    },
    {
      id: "job2",
      title: "UI/UX Designer",
      company: "DesignHub",
      location: "New York, NY",
      salary: "$85,000 - $105,000",
      jobType: "Full-time",
      experience: "Mid-level",
      workType: "Hybrid",
      matchPercentage: 88,
      postedDate: "1 week ago",
      isPerfectMatch: false,
      description: "Join our design team to create amazing user experiences...",
      requirements: ["3+ years UI/UX experience", "Figma", "Design Systems"],
      benefits: ["Health Insurance", "Dental", "Vision", "Gym Membership"],
    },
    {
      id: "job3",
      title: "React Developer",
      company: "WebSolutions",
      location: "Chicago, IL",
      salary: "$80,000 - $100,000",
      jobType: "Full-time",
      experience: "Mid-level",
      workType: "Hybrid",
      matchPercentage: 82,
      postedDate: "3 days ago",
      isPerfectMatch: false,
      description: "Looking for a React Developer to build modern web applications...",
      requirements: ["3+ years React", "JavaScript", "REST APIs"],
      benefits: ["Health Insurance", "PTO", "Learning Budget"],
    },
    {
      id: "job4",
      title: "Junior Frontend Developer",
      company: "StartupXYZ",
      location: "San Francisco, CA",
      salary: "$65,000 - $80,000",
      jobType: "Full-time",
      experience: "Junior",
      workType: "Office",
      matchPercentage: 75,
      postedDate: "5 days ago",
      isPerfectMatch: false,
      description: "Great opportunity for a junior developer to grow...",
      requirements: ["1+ years experience", "React", "HTML/CSS"],
      benefits: ["Health Insurance", "Stock Options", "Free Lunch"],
    },
  ]

  const toggleSaveJob = (jobId: string) => {
    setSavedJobs((prev) => (prev.includes(jobId) ? prev.filter((id) => id !== jobId) : [...prev, jobId]))
  }

  const filteredJobs = allJobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesLocation = !selectedFilters.location || job.location.includes(selectedFilters.location)
    const matchesJobType = !selectedFilters.jobType || job.jobType === selectedFilters.jobType
    const matchesExperience = !selectedFilters.experience || job.experience === selectedFilters.experience
    const matchesWorkType = !selectedFilters.workType || job.workType === selectedFilters.workType

    return matchesSearch && matchesLocation && matchesJobType && matchesExperience && matchesWorkType
  })

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
            <h2 className="text-2xl font-bold">Job Search</h2>
            <p className="text-gray-600">Find your perfect job match</p>
          </div>

          {/* Search and Filters */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Search & Filter Jobs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="search">Search Jobs</Label>
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                      id="search"
                      placeholder="Job title, company..."
                      className="pl-8"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Location</Label>
                  <Select
                    value={selectedFilters.location}
                    onValueChange={(value) => setSelectedFilters((prev) => ({ ...prev, location: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Any location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Any location">Any location</SelectItem>
                      <SelectItem value="Remote">Remote</SelectItem>
                      <SelectItem value="New York">New York</SelectItem>
                      <SelectItem value="San Francisco">San Francisco</SelectItem>
                      <SelectItem value="Chicago">Chicago</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Experience Level</Label>
                  <Select
                    value={selectedFilters.experience}
                    onValueChange={(value) => setSelectedFilters((prev) => ({ ...prev, experience: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Any level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Any level">Any level</SelectItem>
                      <SelectItem value="Junior">Junior</SelectItem>
                      <SelectItem value="Mid-level">Mid-level</SelectItem>
                      <SelectItem value="Senior">Senior</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Work Type</Label>
                  <Select
                    value={selectedFilters.workType}
                    onValueChange={(value) => setSelectedFilters((prev) => ({ ...prev, workType: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Any type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Any type">Any type</SelectItem>
                      <SelectItem value="Remote">Remote</SelectItem>
                      <SelectItem value="Hybrid">Hybrid</SelectItem>
                      <SelectItem value="Office">Office</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Job Type</Label>
                  <Select
                    value={selectedFilters.jobType}
                    onValueChange={(value) => setSelectedFilters((prev) => ({ ...prev, jobType: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Any type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Any type">Any type</SelectItem>
                      <SelectItem value="Full-time">Full-time</SelectItem>
                      <SelectItem value="Part-time">Part-time</SelectItem>
                      <SelectItem value="Contract">Contract</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-end">
                  <Button
                    variant="outline"
                    onClick={() =>
                      setSelectedFilters({
                        location: "Any location",
                        salary: "",
                        jobType: "Any type",
                        experience: "Any level",
                        workType: "Any type",
                      })
                    }
                  >
                    Clear Filters
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="all" className="space-y-4">
            <TabsList>
              <TabsTrigger value="all">All Jobs ({filteredJobs.length})</TabsTrigger>
              <TabsTrigger value="saved">Saved Jobs ({savedJobs.length})</TabsTrigger>
              <TabsTrigger value="applied">Applied Jobs</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              {filteredJobs.map((job) => (
                <Card key={job.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                      <div className="space-y-3 flex-1">
                        <div className="flex items-start gap-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="text-xl font-bold">{job.title}</h3>
                              {job.isPerfectMatch && (
                                <Badge className="bg-orange-500 text-white">
                                  <Fire className="mr-1 h-3 w-3" /> Perfect Match
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-2 text-gray-600 mb-2">
                              <Building className="h-4 w-4" />
                              {job.company}
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => toggleSaveJob(job.id)}
                            className="text-gray-500 hover:text-blue-600"
                          >
                            {savedJobs.includes(job.id) ? (
                              <BookmarkCheck className="h-5 w-5 fill-blue-600 text-blue-600" />
                            ) : (
                              <Bookmark className="h-5 w-5" />
                            )}
                          </Button>
                        </div>

                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {job.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <DollarSign className="h-4 w-4" />
                            {job.salary}
                          </div>
                          <div className="flex items-center gap-1">
                            <BriefcaseBusiness className="h-4 w-4" />
                            {job.jobType}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {job.postedDate}
                          </div>
                        </div>

                        <p className="text-gray-600 line-clamp-2">{job.description}</p>

                        <div className="flex flex-wrap gap-2">
                          {job.requirements.slice(0, 3).map((req, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {req}
                            </Badge>
                          ))}
                          {job.requirements.length > 3 && (
                            <Badge variant="secondary" className="text-xs">
                              +{job.requirements.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-3 lg:min-w-[200px]">
                        <div className="flex items-center gap-1 rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
                          <Star className="h-4 w-4 fill-blue-500 text-blue-500" />
                          {job.matchPercentage}% Match
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                          <Button size="sm">Apply Now</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {filteredJobs.length === 0 && (
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium text-gray-900">No jobs found</h3>
                  <p className="mt-2 text-gray-500">Try adjusting your search criteria</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="saved" className="space-y-4">
              {allJobs
                .filter((job) => savedJobs.includes(job.id))
                .map((job) => (
                  <Card key={job.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                        <div className="space-y-3 flex-1">
                          <div className="flex items-start gap-3">
                            <div className="flex-1">
                              <h3 className="text-xl font-bold mb-1">{job.title}</h3>
                              <div className="flex items-center gap-2 text-gray-600 mb-2">
                                <Building className="h-4 w-4" />
                                {job.company}
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => toggleSaveJob(job.id)}
                              className="text-blue-600"
                            >
                              <BookmarkCheck className="h-5 w-5 fill-blue-600" />
                            </Button>
                          </div>

                          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              {job.location}
                            </div>
                            <div className="flex items-center gap-1">
                              <DollarSign className="h-4 w-4" />
                              {job.salary}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {job.postedDate}
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col items-end gap-3">
                          <div className="flex items-center gap-1 rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
                            <Star className="h-4 w-4 fill-blue-500 text-blue-500" />
                            {job.matchPercentage}% Match
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                            <Button size="sm">Apply Now</Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

              {savedJobs.length === 0 && (
                <div className="text-center py-12">
                  <Bookmark className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-4 text-lg font-medium text-gray-900">No saved jobs</h3>
                  <p className="mt-2 text-gray-500">Jobs you save will appear here</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="applied" className="space-y-4">
              <div className="text-center py-12">
                <BriefcaseBusiness className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-4 text-lg font-medium text-gray-900">No applications yet</h3>
                <p className="mt-2 text-gray-500">Jobs you apply to will appear here</p>
                <Button className="mt-4">Browse Jobs</Button>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
