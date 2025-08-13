import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Gamepad2, Users, Target, Heart } from "lucide-react"

export const metadata = {
  title: "About Us - Classic Games Hub",
  description:
    "Learn about Classic Games Hub, our mission to preserve classic gaming experiences, and our commitment to providing free, browser-based retro games.",
}

export default function AboutPage() {
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
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">About Us</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Hero Section */}
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Gamepad2 className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">About Classic Games Hub</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Preserving the golden age of gaming through free, browser-based classic games that everyone can enjoy.
            </p>
          </div>

          {/* Mission Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <CardTitle>Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  To make classic gaming accessible to everyone by providing high-quality, free browser games that
                  capture the essence of retro gaming.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <CardTitle>Our Community</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Building a community of retro gaming enthusiasts who appreciate the timeless appeal of classic arcade
                  games.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-4">
                  <Heart className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <CardTitle>Our Values</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  We believe in free access to entertainment, preserving gaming history, and creating inclusive
                  experiences for all players.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl">What We Do</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Classic Game Recreation</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  We create faithful recreations of classic arcade games using modern web technologies. Our games are
                  built from scratch to ensure they're free from copyright issues while maintaining the authentic feel
                  of the originals.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Browser-Based Gaming</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  All our games run directly in your web browser with no downloads, installations, or plugins required.
                  This makes classic gaming accessible to anyone with an internet connection.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Free for Everyone</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  We believe that classic games should be accessible to everyone. All our games are completely free to
                  play, supported by ethical advertising that doesn't interfere with gameplay.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Continuous Improvement</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  We regularly update our games with bug fixes, performance improvements, and new features based on
                  community feedback. Our goal is to provide the best possible gaming experience.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Contact CTA */}
          <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <CardContent className="text-center py-8">
              <h3 className="text-2xl font-bold mb-4">Get in Touch</h3>
              <p className="mb-6 opacity-90">Have questions, suggestions, or feedback? We'd love to hear from you!</p>
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
