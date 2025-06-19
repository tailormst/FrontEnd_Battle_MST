"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Menu, X, Sun, Moon, ArrowRight, Settings, BarChart3, Star, Download, Mail } from "lucide-react"
import Image from "next/image"

export default function Homepage() {
  const [darkMode, setDarkMode] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [selectedCard, setSelectedCard] = useState(0)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([])
  const [stats, setStats] = useState({
    carbonFootprint: 0,
    energyIntensity: 0,
    energyConsumption: 0,
  })

  const statsRef = useRef<HTMLElement>(null)
  const rippleRef = useRef<HTMLDivElement>(null)

  // Dark mode toggle
  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    if (typeof window !== "undefined") {
      if (!darkMode) {
        document.documentElement.classList.add("dark")
      } else {
        document.documentElement.classList.remove("dark")
      }
    }
  }

  // Initialize dark mode
  useEffect(() => {
    if (typeof window !== "undefined") {
      document.documentElement.classList.add("dark")
    }
  }, [])

  // Ripple effect handler
  // const rippleRef = useRef<HTMLDivElement>(null);
  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!rippleRef.current) return;

    const rect = rippleRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const newRipple = {
      id: Date.now() + Math.random(), // better uniqueness
      x,
      y,
    };

    setRipples((prev) => [...prev, newRipple]);

    // remove after 800ms
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 800);
  };


  // Loading animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2000)

    const progressTimer = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressTimer)
          return 100
        }
        return prev + 2
      })
    }, 40)

    return () => {
      clearTimeout(timer)
      clearInterval(progressTimer)
    }
  }, [])

  // Stats animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounters()
          }
        })
      },
      { threshold: 0.5 },
    )

    if (statsRef.current) {
      observer.observe(statsRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const animateCounters = () => {
    const targets = {
      carbonFootprint: 45048,
      energyIntensity: 123,
      energyConsumption: 47790662,
    }
    const duration = 2000
    const steps = 60

    let step = 0
    const timer = setInterval(() => {
      step++
      const progress = step / steps
      const easeOut = 1 - Math.pow(1 - progress, 3)

      setStats({
        carbonFootprint: Math.floor(targets.carbonFootprint * easeOut),
        energyIntensity: Math.floor(targets.energyIntensity * easeOut),
        energyConsumption: Math.floor(targets.energyConsumption * easeOut),
      })

      if (step >= steps) {
        clearInterval(timer)
        setStats(targets)
      }
    }, duration / steps)
  }

  // Testimonials auto-play
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % 3)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const brandCards = [
    { name: "ECorp", icon: "🏢", active: true },
    { name: "ICorp", icon: "💼", active: false },
    { name: "The Agency", icon: "🎯", active: false },
  ]

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CFO, TechCorp",
      content:
        "This platform transformed our financial reporting. We now create comprehensive dashboards in minutes, not hours.",
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Michael Chen",
      role: "Data Analyst, StartupXYZ",
      content:
        "The AI insights feature is incredible. It automatically identifies trends and anomalies we would have missed.",
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Emily Davis",
      role: "Operations Director, InnovateCo",
      content:
        "Our forecasting accuracy improved by 40% since implementing this solution. The consolidation features are game-changing.",
      avatar: "/placeholder.svg?height=60&width=60",
    },
  ]

  const partners = [
    { name: "Twitter", icon: "🐦" },
    { name: "Snapchat", icon: "👻" },
    { name: "Facebook", icon: "📘" },
    { name: "Instagram", icon: "📷" },
    { name: "WhatsApp", icon: "💬" },
    { name: "SYNC", icon: "🔄" },
  ]

  // Loading screen
  if (loading) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
        <div className="text-center">
          <div className="text-white text-6xl font-bold font-mono mb-8">
            {Math.floor(loadingProgress).toString().padStart(3, "0")}
          </div>
          <div className="w-64 h-2 bg-gray-600 rounded-full overflow-hidden">
            <div
              className="h-full bg-white transition-all duration-100 ease-out rounded-full"
              style={{ width: `${loadingProgress}%` }}
            />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? "dark" : ""}`}>
      {/* NAVBAR */}
      <nav className="fixed top-0 w-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-md z-40 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <BarChart3 className="w-8 h-8 text-blue-600" />
                <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">ReportFlow</span>
              </div>
            </div>

            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {["Home", "Features", "Ripple", "Partners", "Stats", "Testimonials", "Contact"].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 text-sm font-medium transition-colors duration-200"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200"
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              <div className="md:hidden">
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="p-2 rounded-lg text-gray-600 dark:text-gray-400"
                >
                  {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {["Home", "Features", "Ripple", "Partners", "Stats", "Testimonials", "Contact"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* HERO SECTION */}
      <section
        id="home"
        className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900"
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-20 w-64 h-64 bg-blue-400/10 rounded-full animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-400/10 rounded-full animate-pulse"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            Create reports, forecasts,
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              dashboards & consolidations
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 font-medium">Now with AI-insights</p>
          <div className="flex flex-col items-center space-y-4">
            <button className="group bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
              Start 14-day free trial
              <ArrowRight className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
            <a
              href="#features"
              className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors duration-200 underline underline-offset-4"
            >
              See what we do
            </a>
          </div>
        </div>
      </section>

      {/* RIPPLE FOLLOW EFFECT SECTION */}
      <section id="ripple" className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Mouse Trail Ripple Effect
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Move your mouse inside the box below to create trailing ripple bubbles.
            </p>
          </div>

          <div className="flex justify-center">
            <div
              ref={rippleRef}
              onMouseMove={handleMouseMove}
              className="relative w-full max-w-4xl h-96 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-gray-700 dark:to-gray-600 rounded-3xl border-4 border-gray-800 dark:border-gray-300 overflow-hidden"
            >
              {ripples.map((ripple) => (
                <div
                  key={ripple.id}
                  className="absolute w-4 h-4 bg-blue-500 rounded-full animate-float opacity-70 pointer-events-none"
                  style={{
                    left: ripple.x,
                    top: ripple.y,
                    transform: "translate(-50%, -50%)",
                  }}
                />
              ))}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <p className="text-2xl font-semibold text-gray-700 dark:text-gray-300">
                  Move your mouse!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* CUSTOMER PARTNERS SECTION */}
      <section id="partners" className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Our Valued Partners</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">Trusted by leading companies worldwide</p>
          </div>

          <div className="flex justify-center">
            <div className="relative w-full max-w-4xl h-96 bg-black rounded-3xl p-8 overflow-hidden">
              <h3 className="text-white text-3xl font-bold text-center mb-8">Our Valued Partners</h3>

              <div className="grid grid-cols-3 gap-8 h-64">
                {partners.map((partner, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-center text-6xl transition-all duration-500 hover:scale-110 ${index === 5 ? "filter-none" : "filter blur-sm opacity-60 hover:filter-none hover:opacity-100"
                      }`}
                  >
                    <div className="w-20 h-20 bg-gray-200 rounded-2xl flex items-center justify-center">
                      <span className="text-2xl">{partner.icon}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-center mt-8">
                <button className="border-2 border-white text-white px-6 py-2 rounded-lg hover:bg-white hover:text-black transition-all duration-300">
                  Meet Our Customers
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section id="features" className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Brand Management</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Manage multiple brands and organizations from one dashboard
            </p>
          </div>

          <div className="space-y-4">
            {brandCards.map((card, index) => (
              <div
                key={index}
                onClick={() => setSelectedCard(index)}
                className={`p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 transform hover:scale-[1.02] ${selectedCard === index
                  ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-lg"
                  : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:border-gray-300 dark:hover:border-gray-600"
                  }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="text-3xl">{card.icon}</div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{card.name}</h3>
                      <p className="text-gray-600 dark:text-gray-400">Organization Dashboard</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ${selectedCard === index ? "bg-blue-600" : "bg-gray-300 dark:bg-gray-600"
                        }`}
                    >
                      <div
                        className={`w-4 h-4 rounded-full bg-white transition-transform duration-300 ${selectedCard === index ? "translate-x-6" : "translate-x-0"
                          }`}
                      ></div>
                    </div>
                    <Settings className="w-5 h-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section ref={statsRef} id="stats" className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Environmental Impact Dashboard
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">Track your sustainability metrics over time</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Carbon Footprint */}
            <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Carbon Footprint</h3>
              <div className="text-4xl font-bold text-blue-600 mb-4">{stats.carbonFootprint.toLocaleString()}</div>
              <div className="space-y-2 mb-4">
                {[2019, 2020, 2021, 2022].map((year, index) => (
                  <div key={year} className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">{year}</span>
                    <div className="flex-1 mx-3">
                      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-500 rounded-full transition-all duration-1000"
                          style={{ width: `${(index + 1) * 20}%` }}
                        ></div>
                      </div>
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{(index + 1) * 20}%</span>
                  </div>
                ))}
              </div>
              <div className="text-sm text-green-600 dark:text-green-400 font-medium">↓ 15% from 2019</div>
            </div>

            {/* Energy Intensity */}
            <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Energy Intensity</h3>
              <div className="text-4xl font-bold text-green-600 mb-4">{stats.energyIntensity}</div>
              <div className="space-y-2 mb-4">
                {[2019, 2020, 2021, 2022].map((year, index) => (
                  <div key={year} className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">{year}</span>
                    <div className="flex-1 mx-3">
                      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-green-500 rounded-full transition-all duration-1000"
                          style={{ width: `${(4 - index) * 25}%` }}
                        ></div>
                      </div>
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{(4 - index) * 25}%</span>
                  </div>
                ))}
              </div>
              <div className="text-sm text-green-600 dark:text-green-400 font-medium">↓ 22% from 2019</div>
            </div>

            {/* Energy Consumption */}
            <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Energy Consumption</h3>
              <div className="text-4xl font-bold text-purple-600 mb-4">{stats.energyConsumption.toLocaleString()}</div>
              <div className="space-y-2 mb-4">
                {[2019, 2020, 2021, 2022].map((year, index) => (
                  <div key={year} className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">{year}</span>
                    <div className="flex-1 mx-3">
                      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-purple-500 rounded-full transition-all duration-1000"
                          style={{ width: `${Math.random() * 80 + 20}%` }}
                        ></div>
                      </div>
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {Math.floor(Math.random() * 80 + 20)}%
                    </span>
                  </div>
                ))}
              </div>
              <div className="text-sm text-red-600 dark:text-red-400 font-medium">↑ 8% from 2019</div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section id="testimonials" className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              What Our Customers Say
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">Trusted by finance teams worldwide</p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
              >
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="w-full flex-shrink-0">
                    <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg text-center">
                      <div className="flex justify-center mb-6">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <blockquote className="text-xl text-gray-600 dark:text-gray-300 mb-8 italic">
                        "{testimonial.content}"
                      </blockquote>
                      <div className="flex items-center justify-center">
                        <Image
                          src={testimonial.avatar || "/placeholder.svg"}
                          alt={testimonial.name}
                          width={60}
                          height={60}
                          className="rounded-full mr-4"
                        />
                        <div>
                          <div className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</div>
                          <div className="text-gray-600 dark:text-gray-400">{testimonial.role}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors duration-300 ${index === currentTestimonial ? "bg-blue-600" : "bg-gray-300 dark:bg-gray-600"
                    }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION FOOTER */}
      <section id="contact" className="py-20 bg-blue-600 dark:bg-blue-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Transform Your Reporting?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of teams creating better reports with AI-powered insights
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <div className="flex bg-white rounded-lg overflow-hidden shadow-lg">
              <input
                type="email"
                placeholder="Enter your email address"
                className="px-6 py-4 text-gray-900 placeholder-gray-500 focus:outline-none w-80"
              />
              <button className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-4 font-semibold transition-colors duration-200">
                <Mail className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
              Start Free Trial
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 flex items-center justify-center">
              <Download className="w-5 h-5 mr-2" />
              Download Sample Data
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 dark:bg-black text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <BarChart3 className="w-8 h-8 text-blue-400" />
                <span className="ml-2 text-xl font-bold">ReportFlow</span>
              </div>
              <p className="text-gray-400">
                Create reports, forecasts, dashboards & consolidations with AI-powered insights.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors duration-200">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors duration-200">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors duration-200">
                    API
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors duration-200">
                    Documentation
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors duration-200">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors duration-200">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors duration-200">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors duration-200">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors duration-200">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors duration-200">
                    Community
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors duration-200">
                    Status
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors duration-200">
                    Privacy
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 ReportFlow. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
