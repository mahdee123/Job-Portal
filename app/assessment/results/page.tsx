import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import { Award, BookOpen, BriefcaseBusiness, ChevronRight, TrendingUp } from "lucide-react"

export default function AssessmentResultsPage() {
  // Sample assessment results
  const results = {
    overallScore: 78,
    level: "Mid-level",
    strengths: ["JavaScript", "React", "UI/UX Design"],
    weaknesses: ["Data Structures", "System Design"],
    recommendedJobs: ["Frontend Developer", "UI Developer", "React Developer"],
    skillScores: [
      { skill: "JavaScript", score: 85 },
      { skill: "React", score: 82 },
      { skill: "HTML/CSS", score: 90 },
      { skill: "UI/UX Design", score: 75 },
      { skill: "Node.js", score: 65 },
      { skill: "Data Structures", score: 60 },
    ],
  }

  return (
    <div className="container mx-auto max-w-4xl py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold">Your Assessment Results</h1>
        <p className="mt-2 text-gray-600">Based on your answers, we've analyzed your skills and expertise</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-blue-600" />
              Overall Performance
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="relative mx-auto mb-4 h-36 w-36">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-4xl font-bold">{results.overallScore}%</span>
              </div>
              <svg className="h-full w-full" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="none" stroke="#e2e8f0" strokeWidth="10" />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="10"
                  strokeDasharray={`${results.overallScore * 2.83} 283`}
                  strokeLinecap="round"
                  transform="rotate(-90 50 50)"
                />
              </svg>
            </div>
            <div className="mt-4 text-xl font-semibold text-blue-600">{results.level}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <BriefcaseBusiness className="h-5 w-5 text-blue-600" />
              Recommended Jobs
            </CardTitle>
            <CardDescription>Based on your skills and experience</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {results.recommendedJobs.map((job, index) => (
                <li key={index} className="flex items-center gap-2 rounded-lg bg-blue-50 p-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                    {index + 1}
                  </div>
                  <span className="font-medium">{job}</span>
                  <ChevronRight className="ml-auto h-5 w-5 text-blue-600" />
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/dashboard">View Job Matches</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              Skill Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {results.skillScores.map((item) => (
                <div key={item.skill} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{item.skill}</span>
                    <span className="text-sm text-gray-500">{item.score}%</span>
                  </div>
                  <Progress value={item.score} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-blue-600" />
              Strengths & Areas to Improve
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="mb-2 font-semibold text-green-600">Strengths</h3>
                <ul className="list-inside list-disc space-y-1 pl-2">
                  {results.strengths.map((strength, index) => (
                    <li key={index} className="text-sm">
                      {strength}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="mb-2 font-semibold text-amber-600">Areas to Improve</h3>
                <ul className="list-inside list-disc space-y-1 pl-2">
                  {results.weaknesses.map((weakness, index) => (
                    <li key={index} className="text-sm">
                      {weakness}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" asChild className="w-full">
              <Link href="/dashboard/skills">View Learning Recommendations</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="mt-8 flex justify-center">
        <Button asChild size="lg" className="px-8">
          <Link href="/dashboard">Go to Dashboard</Link>
        </Button>
      </div>
    </div>
  )
}
