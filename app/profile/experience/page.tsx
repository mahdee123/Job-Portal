"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PlusCircle, Trash2 } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"

interface Experience {
  id: string
  company: string
  position: string
  responsibilities: string
  startMonth: string
  startYear: string
  endMonth: string
  endYear: string
  current: boolean
  workType: string
}

export default function ExperiencePage() {
  const [experiences, setExperiences] = useState<Experience[]>([
    {
      id: "1",
      company: "",
      position: "",
      responsibilities: "",
      startMonth: "",
      startYear: "",
      endMonth: "",
      endYear: "",
      current: false,
      workType: "",
    },
  ])

  const addExperience = () => {
    setExperiences([
      ...experiences,
      {
        id: Date.now().toString(),
        company: "",
        position: "",
        responsibilities: "",
        startMonth: "",
        startYear: "",
        endMonth: "",
        endYear: "",
        current: false,
        workType: "",
      },
    ])
  }

  const removeExperience = (id: string) => {
    if (experiences.length === 1) return
    setExperiences(experiences.filter((exp) => exp.id !== id))
  }

  const updateExperience = (id: string, field: keyof Experience, value: string | boolean) => {
    setExperiences(experiences.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp)))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Save experience data and proceed
    window.location.href = "/profile/skills"
  }

  // Generate years for dropdown
  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 30 }, (_, i) => (currentYear - i).toString())

  // Months for dropdown
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  return (
    <div className="container mx-auto max-w-3xl py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold">Work Experience</h1>
        <p className="mt-2 text-gray-600">Tell us about your work history (Optional)</p>
      </div>

      <form onSubmit={handleSubmit}>
        {experiences.map((exp, index) => (
          <Card key={exp.id} className="mb-6">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xl">Experience #{index + 1}</CardTitle>
              {experiences.length > 1 && (
                <Button type="button" variant="ghost" size="icon" onClick={() => removeExperience(exp.id)}>
                  <Trash2 className="h-5 w-5 text-red-500" />
                </Button>
              )}
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor={`company-${exp.id}`}>Company</Label>
                  <Input
                    id={`company-${exp.id}`}
                    value={exp.company}
                    onChange={(e) => updateExperience(exp.id, "company", e.target.value)}
                    placeholder="Company Name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`position-${exp.id}`}>Position</Label>
                  <Input
                    id={`position-${exp.id}`}
                    value={exp.position}
                    onChange={(e) => updateExperience(exp.id, "position", e.target.value)}
                    placeholder="Software Engineer"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor={`responsibilities-${exp.id}`}>Responsibilities</Label>
                <Textarea
                  id={`responsibilities-${exp.id}`}
                  value={exp.responsibilities}
                  onChange={(e) => updateExperience(exp.id, "responsibilities", e.target.value)}
                  placeholder="Describe your key responsibilities and achievements"
                  rows={3}
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Start Date</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Select
                      value={exp.startMonth}
                      onValueChange={(value) => updateExperience(exp.id, "startMonth", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Month" />
                      </SelectTrigger>
                      <SelectContent>
                        {months.map((month) => (
                          <SelectItem key={month} value={month}>
                            {month}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Select
                      value={exp.startYear}
                      onValueChange={(value) => updateExperience(exp.id, "startYear", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Year" />
                      </SelectTrigger>
                      <SelectContent>
                        {years.map((year) => (
                          <SelectItem key={year} value={year}>
                            {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>End Date</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Select
                      value={exp.endMonth}
                      onValueChange={(value) => updateExperience(exp.id, "endMonth", value)}
                      disabled={exp.current}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Month" />
                      </SelectTrigger>
                      <SelectContent>
                        {months.map((month) => (
                          <SelectItem key={month} value={month}>
                            {month}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Select
                      value={exp.endYear}
                      onValueChange={(value) => updateExperience(exp.id, "endYear", value)}
                      disabled={exp.current}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Year" />
                      </SelectTrigger>
                      <SelectContent>
                        {years.map((year) => (
                          <SelectItem key={year} value={year}>
                            {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id={`current-${exp.id}`}
                  checked={exp.current}
                  onCheckedChange={(checked) => updateExperience(exp.id, "current", checked === true)}
                />
                <Label htmlFor={`current-${exp.id}`}>I currently work here</Label>
              </div>

              <div className="space-y-2">
                <Label htmlFor={`workType-${exp.id}`}>Work Type</Label>
                <Select value={exp.workType} onValueChange={(value) => updateExperience(exp.id, "workType", value)}>
                  <SelectTrigger id={`workType-${exp.id}`}>
                    <SelectValue placeholder="Select work type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="remote">Remote</SelectItem>
                    <SelectItem value="hybrid">Hybrid</SelectItem>
                    <SelectItem value="office">Office</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        ))}

        <Button type="button" variant="outline" className="mb-6 w-full" onClick={addExperience}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add More Experience
        </Button>

        <div className="flex justify-end gap-4">
          <Button type="submit">Save & Continue</Button>
        </div>
      </form>
    </div>
  )
}
