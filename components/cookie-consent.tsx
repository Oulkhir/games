"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Cookie, X, Settings } from "lucide-react"
import Link from "next/link"

export default function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false)
  const [showDetails, setShowDetails] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent")
    if (!consent) {
      setShowConsent(true)
    }
  }, [])

  const acceptAll = () => {
    localStorage.setItem("cookie-consent", "accepted")
    setShowConsent(false)
  }

  const acceptEssential = () => {
    localStorage.setItem("cookie-consent", "essential-only")
    setShowConsent(false)
  }

  const rejectAll = () => {
    localStorage.setItem("cookie-consent", "rejected")
    setShowConsent(false)
  }

  if (!showConsent) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
      <Card className="max-w-4xl mx-auto bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-2 border-blue-200 dark:border-blue-800">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                <Cookie className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">We Use Cookies</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our
                traffic. By clicking "Accept All", you consent to our use of cookies.
              </p>

              {showDetails && (
                <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Cookie Types:</h4>
                  <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                    <li>
                      <strong>Essential:</strong> Required for basic website functionality
                    </li>
                    <li>
                      <strong>Analytics:</strong> Help us understand how you use our site
                    </li>
                    <li>
                      <strong>Advertising:</strong> Used to show relevant ads via Google AdSense
                    </li>
                  </ul>
                  <div className="mt-3">
                    <Link href="/privacy" className="text-blue-600 dark:text-blue-400 hover:underline text-sm">
                      Read our Privacy Policy
                    </Link>
                  </div>
                </div>
              )}

              <div className="flex flex-wrap gap-2">
                <Button onClick={acceptAll} size="sm" className="bg-blue-600 hover:bg-blue-700">
                  Accept All
                </Button>
                <Button onClick={acceptEssential} variant="outline" size="sm">
                  Essential Only
                </Button>
                <Button onClick={rejectAll} variant="ghost" size="sm">
                  Reject All
                </Button>
                <Button
                  onClick={() => setShowDetails(!showDetails)}
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <Settings className="w-3 h-3" />
                  {showDetails ? "Hide" : "Details"}
                </Button>
              </div>
            </div>

            <Button onClick={() => setShowConsent(false)} variant="ghost" size="sm" className="flex-shrink-0">
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
