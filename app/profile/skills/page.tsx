"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search } from "lucide-react"

// Skill categories with their respective skills
const skillCategories = [
  {
    id: "design",
    name: "Design",
    skills: [
      "UI/UX Design",
      "Graphic Design",
      "Web Design",
      "Product Design",
      "Figma",
      "Adobe XD",
      "Photoshop",
      "Illustrator",
    ],
  },
  {
    id: "development",
    name: "Development",
    skills: [
      "JavaScript",
      "React",
      "Node.js",
      "Python",
      "Java",
      "C#",
      "PHP",
      "Ruby",
      "Swift",
      "Kotlin",
      "HTML/CSS",
      "TypeScript",
    ],
  },
  {
    id: "business",
    name: "Business",
    skills: [
      "Project Management",
      "Business Analysis",
      "Product Management",
      "Agile",
      "Scrum",
      "Strategic Planning",
      "Stakeholder Management",
    ],
  },
  {
    id: "finance",
    name: "Finance",
    skills: [
      "Financial Analysis",
      "Accounting",
      "Budgeting",
      "Financial Planning",
      "Investment Analysis",
      "Risk Management",
    ],
  },
  {
    id: "healthcare",
    name: "Healthcare",
    skills: ["Patient Care", "Medical Coding", "Healthcare Administration", "Clinical Research", "Medical Records"],
  },
  {
    id: "marketing",
    name: "Marketing",
    skills: [
      "Digital Marketing",
      "Content Marketing",
      "SEO",
      "Social Media Marketing",
      "Email Marketing",
      "Brand Management",
      "Market Research",
    ],
  },
  {
    id: "data-ai",
    name: "Data & AI",
    skills: [
      "Data Analysis",
      "Machine Learning",
      "Data Science",
      "Big Data",
      "SQL",
      "Python",
      "R",
      "Tableau",
      "Power BI",
      "Natural Language Processing",
    ],
  },
  {
    id: "soft-skills",
    name: "Soft Skills",
    skills: [
      "Communication",
      "Leadership",
      "Teamwork",
      "Problem Solving",
      "Critical Thinking",
      "Time Management",
      "Adaptability",
      "Creativity",
    ],
  },
]

export default function SkillsPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [customSkill, setCustomSkill] = useState("")

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId],
    )
  }

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) => (prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]))
  }

  const addCustomSkill = () => {
    if (customSkill.trim() && !selectedSkills.includes(customSkill.trim())) {
      setSelectedSkills((prev) => [...prev, customSkill.trim()])
      setCustomSkill("")
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Save skills and proceed to assessment
    window.location.href = "/assessment"
  }

  // Filter skills based on search term
  const filteredSkills = skillCategories
    .flatMap((category) => category.skills)
    .filter((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className="container mx-auto max-w-4xl py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold">Skills Selection</h1>
        <p className="mt-2 text-gray-600">Select your skills to help us match you with the right jobs</p>
      </div>

      <form onSubmit={handleSubmit}>
        <Tabs defaultValue="categories" className="mb-8">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="categories">Skill Categories</TabsTrigger>
            <TabsTrigger value="skills">Specific Skills</TabsTrigger>
          </TabsList>

          <TabsContent value="categories" className="mt-6">
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {skillCategories.map((category) => (
                <Card
                  key={category.id}
                  className={`cursor-pointer transition-all ${
                    selectedCategories.includes(category.id) ? "border-blue-500 bg-blue-50" : ""
                  }`}
                  onClick={() => toggleCategory(category.id)}
                >
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{category.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500">
                      {category.skills.slice(0, 3).join(", ")}
                      {category.skills.length > 3 && "..."}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="skills" className="mt-6">
            <div className="mb-6 flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="text"
                  placeholder="Search skills..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder="Add custom skill"
                  value={customSkill}
                  onChange={(e) => setCustomSkill(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault()
                      addCustomSkill()
                    }
                  }}
                />
                <Button type="button" onClick={addCustomSkill}>
                  Add
                </Button>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Available Skills</CardTitle>
                <CardDescription>
                  Select the skills you possess. Selected skills: {selectedSkills.length}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3">
                  {searchTerm
                    ? filteredSkills.map((skill) => (
                        <div key={skill} className="flex items-center space-x-2">
                          <Checkbox
                            id={`skill-${skill}`}
                            checked={selectedSkills.includes(skill)}
                            onCheckedChange={() => toggleSkill(skill)}
                          />
                          <Label htmlFor={`skill-${skill}`} className="cursor-pointer">
                            {skill}
                          </Label>
                        </div>
                      ))
                    : selectedCategories.flatMap((categoryId) => {
                        const category = skillCategories.find((c) => c.id === categoryId)
                        return category
                          ? category.skills.map((skill) => (
                              <div key={skill} className="flex items-center space-x-2">
                                <Checkbox
                                  id={`skill-${skill}`}
                                  checked={selectedSkills.includes(skill)}
                                  onCheckedChange={() => toggleSkill(skill)}
                                />
                                <Label htmlFor={`skill-${skill}`} className="cursor-pointer">
                                  {skill}
                                </Label>
                              </div>
                            ))
                          : []
                      })}
                </div>

                {selectedSkills.length > 0 && (
                  <div className="mt-6">
                    <h3 className="mb-2 font-medium">Selected Skills:</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedSkills.map((skill) => (
                        <div
                          key={`selected-${skill}`}
                          className="flex items-center gap-1 rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800"
                        >
                          {skill}
                          <button
                            type="button"
                            className="ml-1 text-blue-600 hover:text-blue-800"
                            onClick={() => toggleSkill(skill)}
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-4">
          <Button type="submit" disabled={selectedSkills.length === 0}>
            Continue to Assessment
          </Button>
        </div>
      </form>
    </div>
  )
}
