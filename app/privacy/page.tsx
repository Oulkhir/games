import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Shield, Eye, Cookie, Mail } from "lucide-react"

export const metadata = {
  title: "Privacy Policy - Classic Games Hub",
  description:
    "Learn how Classic Games Hub collects, uses, and protects your personal information. Our commitment to your privacy and data security.",
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/" className="flex items-center space-x-2">
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Games</span>
                </Link>
              </Button>
              <div className="h-6 w-px bg-gray-300 dark:bg-gray-600" />
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">Privacy Policy</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Hero Section */}
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Privacy Policy</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
            </p>
          </div>

          {/* Privacy Overview */}
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="w-5 h-5 text-blue-600" />
                Our Commitment to Your Privacy
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300">
                At Classic Games Hub, we are committed to protecting your privacy and ensuring the security of your
                personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your
                information when you visit our website and use our games.
              </p>
            </CardContent>
          </Card>

          {/* Information We Collect */}
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Information We Collect</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Automatically Collected Information
                </h3>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1">
                  <li>IP address and general location information</li>
                  <li>Browser type and version</li>
                  <li>Operating system information</li>
                  <li>Pages visited and time spent on our site</li>
                  <li>Game scores and progress (stored locally on your device)</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Information You Provide</h3>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1">
                  <li>Contact information when you reach out to us</li>
                  <li>Feedback and suggestions you submit</li>
                  <li>Any other information you voluntarily provide</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* How We Use Information */}
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>How We Use Your Information</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
                <li>To provide and maintain our gaming services</li>
                <li>To improve our website and game performance</li>
                <li>To analyze usage patterns and optimize user experience</li>
                <li>To respond to your inquiries and provide customer support</li>
                <li>To display relevant advertisements through Google AdSense</li>
                <li>To comply with legal obligations and protect our rights</li>
              </ul>
            </CardContent>
          </Card>

          {/* Cookies and Tracking */}
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cookie className="w-5 h-5 text-orange-600" />
                Cookies and Tracking Technologies
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 dark:text-gray-300">
                We use cookies and similar tracking technologies to enhance your browsing experience:
              </p>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Essential Cookies</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Required for basic website functionality, including game state preservation and user preferences.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Analytics Cookies</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Help us understand how visitors interact with our website to improve performance and user experience.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Advertising Cookies</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Used by Google AdSense to display relevant advertisements and measure ad performance.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Third-Party Services */}
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Third-Party Services</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Google AdSense</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  We use Google AdSense to display advertisements. Google may use cookies to serve ads based on your
                  visits to our site and other sites on the Internet. You can opt out of personalized advertising by
                  visiting Google's Ad Settings.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Analytics Services</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  We may use analytics services to better understand how our website is used and to improve our
                  services.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Data Security */}
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Data Security</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300">
                We implement appropriate technical and organizational security measures to protect your personal
                information against unauthorized access, alteration, disclosure, or destruction. However, no method of
                transmission over the Internet or electronic storage is 100% secure.
              </p>
            </CardContent>
          </Card>

          {/* Your Rights */}
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Your Rights and Choices</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
                <li>You can disable cookies in your browser settings</li>
                <li>You can opt out of personalized advertising</li>
                <li>You can request information about data we collect</li>
                <li>You can request deletion of your personal information</li>
                <li>You can contact us with privacy-related questions</li>
              </ul>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <CardContent className="text-center py-8">
              <Mail className="w-12 h-12 mx-auto mb-4 opacity-90" />
              <h3 className="text-2xl font-bold mb-4">Questions About Privacy?</h3>
              <p className="mb-6 opacity-90">
                If you have any questions about this Privacy Policy or our data practices, please contact us.
              </p>
              <Button asChild variant="secondary">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Updates Notice */}
          <Card className="bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800">
            <CardContent className="py-4">
              <p className="text-yellow-800 dark:text-yellow-200 text-sm">
                <strong>Policy Updates:</strong> We may update this Privacy Policy from time to time. We will notify you
                of any changes by posting the new Privacy Policy on this page with an updated "Last updated" date.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
