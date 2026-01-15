"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { BarChart, BookOpen, BriefcaseBusiness, Calendar, Home, MessageSquare, Settings, User } from "lucide-react"

interface NavItem {
  title: string
  href: string
  icon: React.ReactNode
}

export default function DashboardNav() {
  const pathname = usePathname()

  const navItems: NavItem[] = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: <Home className="h-5 w-5" />,
    },
    {
      title: "Jobs",
      href: "/dashboard/jobs",
      icon: <BriefcaseBusiness className="h-5 w-5" />,
    },
    {
      title: "Interviews",
      href: "/dashboard/interviews",
      icon: <Calendar className="h-5 w-5" />,
    },
    {
      title: "Skill Growth",
      href: "/dashboard/skills",
      icon: <BookOpen className="h-5 w-5" />,
    },
    {
      title: "Messages",
      href: "/dashboard/messages",
      icon: <MessageSquare className="h-5 w-5" />,
    },
    {
      title: "Analytics",
      href: "/dashboard/analytics",
      icon: <BarChart className="h-5 w-5" />,
    },
    {
      title: "Profile",
      href: "/dashboard/profile",
      icon: <User className="h-5 w-5" />,
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ]

  return (
    <div className="hidden border-r md:block">
      <ScrollArea className="h-[calc(100vh-4rem)] w-56">
        <div className="px-3 py-4">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">Navigation</h2>
          <div className="space-y-1">
            {navItems.map((item) => (
              <Button
                key={item.href}
                variant="ghost"
                asChild
                className={cn("w-full justify-start", pathname === item.href && "bg-accent")}
              >
                <Link href={item.href}>
                  {item.icon}
                  <span className="ml-2">{item.title}</span>
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}
