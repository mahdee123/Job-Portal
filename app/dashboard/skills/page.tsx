"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import DashboardNav from "@/components/dashboard-nav"
import { BookOpen, TrendingUp, Target, Award, Play, Clock, CheckCircle, Star, ExternalLink, Zap } from "lucide-react"

export default function SkillGrowthPage() {
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null)

  // Sample skill data
  const currentSkills = [
    { name: "JavaScript", level: 85, category: "Programming", trend: "+5" },
    { name: "React", level: 82, category: "Framework", trend: "+8" },
    { name: "TypeScript", level: 75, category: "Programming", trend: "+12" },
    { name: "Node.js", level: 70, category: "Backend", trend: "+3" },
    { name: "UI/UX Design", level: 65, category: "Design", trend: "+7" },
    { name: "Python", level: 60, category: "Programming", trend: "+15" },
  ]

  const recommendedSkills = [
    {
      name: "Next.js",
      reason: "High demand in React ecosystem",
      difficulty: "Medium",
      timeToLearn: "2-3 weeks",
      jobImpact: "High",
      priority: "High",
    },
    {
      name: "GraphQL",
      reason: "Growing API technology",
      difficulty: "Medium",
      timeToLearn: "3-4 weeks",
      jobImpact: "Medium",
      priority: "Medium",
    },
    {
      name: "Docker",
      reason: "Essential for DevOps",
      difficulty: "Hard",
      timeToLearn: "4-6 weeks",
      jobImpact: "High",
      priority: "Medium",
    },
  ]

  const learningPaths = [
    {
      id: "path1",
      title: "Full Stack JavaScript Developer",
      description: "Master modern JavaScript development from frontend to backend",
      duration: "12 weeks",
      difficulty: "Intermediate",
      skills: ["Advanced JavaScript", "React", "Node.js", "MongoDB", "Express"],
      progress: 35,
      enrolled: true,
    },
    {
      id: "path2",
      title: "Frontend Specialist",
      description: "Become an expert in modern frontend technologies",
      duration: "8 weeks",
      difficulty: "Beginner to Intermediate",
      skills: ["HTML5", "CSS3", "JavaScript", "React", "TypeScript"],
      progress: 0,
      enrolled: false,
    },
    {
      id: "path3",
      title: "UI/UX Design Fundamentals",
      description: "Learn design principles and user experience best practices",
      duration: "6 weeks",
      difficulty: "Beginner",
      skills: ["Design Principles", "Figma", "Prototyping", "User Research"],
      progress: 0,
      enrolled: false,
    },
  ]

  const courses = [
    {
      id: "course1",
      title: "Advanced React Patterns",
      provider: "Tech Academy",
      type: "Video Course",
      duration: "4 hours",
      rating: 4.8,
      price: "Free",
      thumbnail: "/placeholder.svg?height=100&width=150",
      url: "#",
      completed: false,
    },
    {
      id: "course2",
      title: "TypeScript Masterclass",
      provider: "Code School",
      type: "Interactive",
      duration: "6 hours",
      rating: 4.9,
      price: "$49",
      thumbnail: "/placeholder.svg?height=100&width=150",
      url: "#",
      completed: false,
    },
    {
      id: "course3",
      title: "Node.js Complete Guide",
      provider: "YouTube",
      type: "Video Series",
      duration: "8 hours",
      rating: 4.7,
      price: "Free",
      thumbnail: "/placeholder.svg?height=100&width=150",
      url: "#",
      completed: true,
    },
  ]

  const achievements = [
    {
      id: "ach1",
      title: "JavaScript Expert",
      description: "Completed advanced JavaScript assessment",
      icon: "🏆",
      date: "2024-05-10",
      points: 500,
    },
    {
      id: "ach2",
      title: "React Specialist",
      description: "Built 5 React projects",
      icon: "⚛️",
      date: "2024-05-08",
      points: 300,
    },
    {
      id: "ach3",
      title: "Learning Streak",
      description: "7 days of continuous learning",
      icon: "🔥",
      date: "2024-05-12",
      points: 100,
    },
  ]

  const practiceProjects = [
    {
      id: "proj1",
      title: "E-commerce Dashboard",
      description: "Build a React dashboard with charts and data visualization",
      difficulty: "Intermediate",
      estimatedTime: "2-3 hours",
      skills: ["React", "Chart.js", "API Integration"],
      completed: false,
    },
    {
      id: "proj2",
      title: "Task Management API",
      description: "Create a RESTful API with Node.js and Express",
      difficulty: "Beginner",
      estimatedTime: "1-2 hours",
      skills: ["Node.js", "Express", "MongoDB"],
      completed: true,
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
            <h2 className="text-2xl font-bold">Skill Growth</h2>
            <p className="text-gray-600">Track your progress and discover new learning opportunities</p>
          </div>

          {/* Quick Stats */}
          <div className="grid gap-4 md:grid-cols-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="text-2xl font-bold">{currentSkills.length}</p>
                    <p className="text-sm text-gray-500">Skills Tracked</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="text-2xl font-bold">12</p>
                    <p className="text-sm text-gray-500">Courses Completed</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-yellow-600" />
                  <div>
                    <p className="text-2xl font-bold">{achievements.length}</p>
                    <p className="text-sm text-gray-500">Achievements</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-orange-600" />
                  <div>
                    <p className="text-2xl font-bold">900</p>
                    <p className="text-sm text-gray-500">Learning Points</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="learning-paths">Learning Paths</TabsTrigger>
              <TabsTrigger value="courses">Courses</TabsTrigger>
              <TabsTrigger value="practice">Practice</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Current Skills */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Current Skills
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    {currentSkills.map((skill) => (
                      <div key={skill.name} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{skill.name}</span>
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary" className="text-xs">
                              {skill.category}
                            </Badge>
                            <span className="text-sm text-green-600 font-medium">{skill.trend}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Progress value={skill.level} className="flex-1" />
                          <span className="text-sm font-medium">{skill.level}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* AI Recommendations */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    AI Skill Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recommendedSkills.map((skill) => (
                      <div key={skill.name} className="border rounded-lg p-4">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-semibold text-lg">{skill.name}</h3>
                          <Badge
                            className={
                              skill.priority === "High"
                                ? "bg-red-500"
                                : skill.priority === "Medium"
                                  ? "bg-yellow-500"
                                  : "bg-green-500"
                            }
                          >
                            {skill.priority} Priority
                          </Badge>
                        </div>
                        <p className="text-gray-600 mb-3">{skill.reason}</p>
                        <div className="grid gap-2 md:grid-cols-3 text-sm">
                          <div>
                            <span className="font-medium">Difficulty:</span> {skill.difficulty}
                          </div>
                          <div>
                            <span className="font-medium">Time to Learn:</span> {skill.timeToLearn}
                          </div>
                          <div>
                            <span className="font-medium">Job Impact:</span> {skill.jobImpact}
                          </div>
                        </div>
                        <Button className="mt-3" size="sm">
                          Start Learning
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="learning-paths" className="space-y-4">
              {learningPaths.map((path) => (
                <Card key={path.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                      <div className="space-y-3 flex-1">
                        <div>
                          <h3 className="text-xl font-bold mb-1">{path.title}</h3>
                          <p className="text-gray-600 mb-2">{path.description}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {path.duration}
                            </div>
                            <Badge variant="outline">{path.difficulty}</Badge>
                          </div>
                        </div>

                        {path.enrolled && (
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium">Progress</span>
                              <span className="text-sm">{path.progress}%</span>
                            </div>
                            <Progress value={path.progress} />
                          </div>
                        )}

                        <div>
                          <h4 className="font-medium mb-2">Skills you'll learn:</h4>
                          <div className="flex flex-wrap gap-2">
                            {path.skills.map((skill) => (
                              <Badge key={skill} variant="secondary">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2 lg:min-w-[200px]">
                        {path.enrolled ? (
                          <Button className="w-full">Continue Learning</Button>
                        ) : (
                          <Button className="w-full">Enroll Now</Button>
                        )}
                        <Button variant="outline" className="w-full bg-transparent">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="courses" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {courses.map((course) => (
                  <Card key={course.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                          <img
                            src={course.thumbnail || "/placeholder.svg"}
                            alt={course.title}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        </div>

                        <div>
                          <h3 className="font-semibold mb-1">{course.title}</h3>
                          <p className="text-sm text-gray-600 mb-2">{course.provider}</p>

                          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                            <Clock className="h-4 w-4" />
                            {course.duration}
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              {course.rating}
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <Badge variant={course.type === "Video Course" ? "default" : "secondary"}>
                              {course.type}
                            </Badge>
                            <span className="font-semibold text-blue-600">{course.price}</span>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          {course.completed ? (
                            <Button variant="outline" className="flex-1 bg-transparent" disabled>
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Completed
                            </Button>
                          ) : (
                            <Button className="flex-1">
                              <Play className="mr-2 h-4 w-4" />
                              Start Course
                            </Button>
                          )}
                          <Button variant="outline" size="icon">
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="practice" className="space-y-4">
              {practiceProjects.map((project) => (
                <Card key={project.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                      <div className="space-y-3 flex-1">
                        <div>
                          <h3 className="text-xl font-bold mb-1">{project.title}</h3>
                          <p className="text-gray-600 mb-2">{project.description}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <Badge variant="outline">{project.difficulty}</Badge>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {project.estimatedTime}
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium mb-2">Skills practiced:</h4>
                          <div className="flex flex-wrap gap-2">
                            {project.skills.map((skill) => (
                              <Badge key={skill} variant="secondary">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2 lg:min-w-[200px]">
                        {project.completed ? (
                          <Button variant="outline" className="w-full bg-transparent" disabled>
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Completed
                          </Button>
                        ) : (
                          <Button className="w-full">Start Project</Button>
                        )}
                        <Button variant="outline" className="w-full bg-transparent">
                          View Instructions
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="achievements" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {achievements.map((achievement) => (
                  <Card key={achievement.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6 text-center">
                      <div className="text-4xl mb-3">{achievement.icon}</div>
                      <h3 className="font-bold text-lg mb-2">{achievement.title}</h3>
                      <p className="text-gray-600 mb-3">{achievement.description}</p>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">{new Date(achievement.date).toLocaleDateString()}</span>
                        <Badge className="bg-yellow-500">+{achievement.points} pts</Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
