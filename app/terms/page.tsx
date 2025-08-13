import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, FileText, AlertTriangle, Scale, Users } from "lucide-react"

export const metadata = {
  title: "Terms of Service - Classic Games Hub",
  description:
    "Read our Terms of Service to understand the rules and guidelines for using Classic Games Hub and our free browser games.",
}

export default function TermsPage() {
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
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">Terms of Service</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Hero Section */}
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <FileText className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Terms of Service</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
            </p>
          </div>

          {/* Agreement Notice */}
          <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
            <CardContent className="py-6">
              <div className="flex items-start gap-3">
                <Scale className="w-6 h-6 text-blue-600 dark:text-blue-400 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Agreement to Terms</h3>
                  <p className="text-blue-800 dark:text-blue-200">
                    By accessing and using Classic Games Hub, you accept and agree to be bound by the terms and
                    provision of this agreement.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Use of Service */}
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-green-600" />
                Use of Our Service
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 dark:text-gray-300">
                Classic Games Hub provides free browser-based games for entertainment purposes. By using our service,
                you agree to:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
                <li>Use the service only for lawful purposes</li>
                <li>Not attempt to hack, reverse engineer, or exploit our games</li>
                <li>Not use automated tools or bots to play our games</li>
                <li>Respect other users and maintain appropriate conduct</li>
                <li>Not attempt to circumvent any security measures</li>
              </ul>
            </CardContent>
          </Card>

          {/* Intellectual Property */}
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Intellectual Property Rights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Our Content</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  All games, code, graphics, and content on Classic Games Hub are original creations or used with proper
                  authorization. We respect intellectual property rights and create original implementations of classic
                  game concepts.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">User-Generated Content</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Any feedback, suggestions, or content you provide to us may be used to improve our services without
                  compensation to you.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Prohibited Uses */}
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                Prohibited Uses
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300 mb-4">You may not use our service:</p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
                <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
                <li>
                  To violate any international, federal, provincial, or state regulations, rules, laws, or local
                  ordinances
                </li>
                <li>
                  To infringe upon or violate our intellectual property rights or the intellectual property rights of
                  others
                </li>
                <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
                <li>To submit false or misleading information</li>
                <li>To upload or transmit viruses or any other type of malicious code</li>
                <li>To spam, phish, pharm, pretext, spider, crawl, or scrape</li>
                <li>For any obscene or immoral purpose</li>
              </ul>
            </CardContent>
          </Card>

          {/* Service Availability */}
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Service Availability</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 dark:text-gray-300">
                We strive to provide continuous access to our games, but we do not guarantee uninterrupted service. We
                reserve the right to:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
                <li>Modify or discontinue any part of our service</li>
                <li>Perform maintenance that may temporarily interrupt service</li>
                <li>Update games and features to improve user experience</li>
                <li>Remove or modify content at our discretion</li>
              </ul>
            </CardContent>
          </Card>

          {/* Disclaimers */}
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Disclaimers and Limitation of Liability</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Service "As Is"</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Our service is provided on an "as is" and "as available" basis. We make no warranties, expressed or
                  implied, and hereby disclaim all other warranties including implied warranties of merchantability,
                  fitness for a particular purpose, or non-infringement.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Limitation of Liability</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  In no event shall Classic Games Hub be liable for any indirect, incidental, special, consequential, or
                  punitive damages, including without limitation, loss of profits, data, use, goodwill, or other
                  intangible losses.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Privacy and Data */}
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Privacy and Data Collection</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300">
                Your privacy is important to us. Our collection and use of personal information is governed by our
                Privacy Policy. By using our service, you consent to the collection and use of information as outlined
                in our Privacy Policy.
              </p>
              <div className="mt-4">
                <Button asChild variant="outline">
                  <Link href="/privacy">Read Privacy Policy</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Termination */}
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Termination</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300">
                We may terminate or suspend your access to our service immediately, without prior notice or liability,
                for any reason whatsoever, including without limitation if you breach the Terms of Service.
              </p>
            </CardContent>
          </Card>

          {/* Changes to Terms */}
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Changes to Terms</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300">
                We reserve the right to modify or replace these Terms at any time. If a revision is material, we will
                try to provide at least 30 days notice prior to any new terms taking effect.
              </p>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
            <CardContent className="text-center py-8">
              <FileText className="w-12 h-12 mx-auto mb-4 opacity-90" />
              <h3 className="text-2xl font-bold mb-4">Questions About These Terms?</h3>
              <p className="mb-6 opacity-90">
                If you have any questions about these Terms of Service, please contact us.
              </p>
              <Button asChild variant="secondary">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
