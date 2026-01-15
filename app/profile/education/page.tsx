"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PlusCircle, Trash2 } from "lucide-react"

interface EducationEntry {
  id: string
  degree: string
  institute: string
  subject: string
  startYear: string
  endYear: string
  result: string
}

export default function EducationPage() {
  const [educationEntries, setEducationEntries] = useState<EducationEntry[]>([
    {
      id: "1",
      degree: "",
      institute: "",
      subject: "",
      startYear: "",
      endYear: "",
      result: "",
    },
  ])

  const addEducationEntry = () => {
    setEducationEntries([
      ...educationEntries,
      {
        id: Date.now().toString(),
        degree: "",
        institute: "",
        subject: "",
        startYear: "",
        endYear: "",
        result: "",
      },
    ])
  }

  const removeEducationEntry = (id: string) => {
    if (educationEntries.length === 1) return
    setEducationEntries(educationEntries.filter((entry) => entry.id !== id))
  }

  const updateEducationEntry = (id: string, field: keyof EducationEntry, value: string) => {
    setEducationEntries(educationEntries.map((entry) => (entry.id === id ? { ...entry, [field]: value } : entry)))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Save education data and proceed
    window.location.href = "/profile/certifications"
  }

  // Generate years for dropdown
  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 30 }, (_, i) => (currentYear - i).toString())

  return (
    <div className="container mx-auto max-w-3xl py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold">Education Background</h1>
        <p className="mt-2 text-gray-600">Tell us about your educational qualifications</p>
      </div>

      <form onSubmit={handleSubmit}>
        {educationEntries.map((entry, index) => (
          <Card key={entry.id} className="mb-6">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xl">Education #{index + 1}</CardTitle>
              {educationEntries.length > 1 && (
                <Button type="button" variant="ghost" size="icon" onClick={() => removeEducationEntry(entry.id)}>
                  <Trash2 className="h-5 w-5 text-red-500" />
                </Button>
              )}
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor={`degree-${entry.id}`}>Degree Name</Label>
                <Input
                  id={`degree-${entry.id}`}
                  value={entry.degree}
                  onChange={(e) => updateEducationEntry(entry.id, "degree", e.target.value)}
                  placeholder="Bachelor of Science"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`institute-${entry.id}`}>Institute</Label>
                <Input
                  id={`institute-${entry.id}`}
                  value={entry.institute}
                  onChange={(e) => updateEducationEntry(entry.id, "institute", e.target.value)}
                  placeholder="University Name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`subject-${entry.id}`}>Subject / Major</Label>
                <Input
                  id={`subject-${entry.id}`}
                  value={entry.subject}
                  onChange={(e) => updateEducationEntry(entry.id, "subject", e.target.value)}
                  placeholder="Computer Science"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-2">
                  <Label htmlFor={`startYear-${entry.id}`}>Start Year</Label>
                  <Select
                    value={entry.startYear}
                    onValueChange={(value) => updateEducationEntry(entry.id, "startYear", value)}
                  >
                    <SelectTrigger id={`startYear-${entry.id}`}>
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

                <div className="space-y-2">
                  <Label htmlFor={`endYear-${entry.id}`}>End Year</Label>
                  <Select
                    value={entry.endYear}
                    onValueChange={(value) => updateEducationEntry(entry.id, "endYear", value)}
                  >
                    <SelectTrigger id={`endYear-${entry.id}`}>
                      <SelectValue placeholder="Year" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Present">Present</SelectItem>
                      {years.map((year) => (
                        <SelectItem key={year} value={year}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor={`result-${entry.id}`}>Result / GPA</Label>
                <Input
                  id={`result-${entry.id}`}
                  value={entry.result}
                  onChange={(e) => updateEducationEntry(entry.id, "result", e.target.value)}
                  placeholder="3.8/4.0 or First Class"
                  required
                />
              </div>
            </CardContent>
          </Card>
        ))}

        <Button type="button" variant="outline" className="mb-6 w-full" onClick={addEducationEntry}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add More Education
        </Button>

        <div className="flex justify-end gap-4">
          <Button type="submit">Save & Continue</Button>
        </div>
      </form>
    </div>
  )
}
