"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PlusCircle, Trash2, Upload } from "lucide-react"

interface Certification {
  id: string
  title: string
  institution: string
  year: string
  file?: File | null
}

export default function CertificationsPage() {
  const [certifications, setCertifications] = useState<Certification[]>([
    {
      id: "1",
      title: "",
      institution: "",
      year: "",
      file: null,
    },
  ])

  const addCertification = () => {
    setCertifications([
      ...certifications,
      {
        id: Date.now().toString(),
        title: "",
        institution: "",
        year: "",
        file: null,
      },
    ])
  }

  const removeCertification = (id: string) => {
    if (certifications.length === 1) return
    setCertifications(certifications.filter((cert) => cert.id !== id))
  }

  const updateCertification = (id: string, field: keyof Certification, value: string | File | null) => {
    setCertifications(certifications.map((cert) => (cert.id === id ? { ...cert, [field]: value } : cert)))
  }

  const handleFileChange = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      updateCertification(id, "file", e.target.files[0])
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Save certification data and proceed
    window.location.href = "/profile/experience"
  }

  // Generate years for dropdown
  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 30 }, (_, i) => (currentYear - i).toString())

  return (
    <div className="container mx-auto max-w-3xl py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold">Certifications</h1>
        <p className="mt-2 text-gray-600">Add your professional certifications</p>
      </div>

      <form onSubmit={handleSubmit}>
        {certifications.map((cert, index) => (
          <Card key={cert.id} className="mb-6">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xl">Certification #{index + 1}</CardTitle>
              {certifications.length > 1 && (
                <Button type="button" variant="ghost" size="icon" onClick={() => removeCertification(cert.id)}>
                  <Trash2 className="h-5 w-5 text-red-500" />
                </Button>
              )}
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor={`title-${cert.id}`}>Certification Title</Label>
                <Input
                  id={`title-${cert.id}`}
                  value={cert.title}
                  onChange={(e) => updateCertification(cert.id, "title", e.target.value)}
                  placeholder="AWS Certified Solutions Architect"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`institution-${cert.id}`}>Issuing Institution</Label>
                <Input
                  id={`institution-${cert.id}`}
                  value={cert.institution}
                  onChange={(e) => updateCertification(cert.id, "institution", e.target.value)}
                  placeholder="Amazon Web Services"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`year-${cert.id}`}>Year</Label>
                <Select value={cert.year} onValueChange={(value) => updateCertification(cert.id, "year", value)}>
                  <SelectTrigger id={`year-${cert.id}`}>
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
                <Label htmlFor={`file-${cert.id}`}>Upload Certificate (Optional)</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id={`file-${cert.id}`}
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileChange(cert.id, e)}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => document.getElementById(`file-${cert.id}`)?.click()}
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    {cert.file ? cert.file.name : "Choose File"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        <Button type="button" variant="outline" className="mb-6 w-full" onClick={addCertification}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add More Certification
        </Button>

        <div className="flex justify-end gap-4">
          <Button type="submit">Save & Continue</Button>
        </div>
      </form>
    </div>
  )
}
