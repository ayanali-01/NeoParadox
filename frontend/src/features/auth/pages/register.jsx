import React, { useState } from 'react'
import { useAuth } from '../hook/useAuth.js'
import { useNavigate, Link } from 'react-router-dom'

const Register = () => {
  const { handleRegister } = useAuth()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    fullName: '',
    contact: '',
    email: '',
    password: '',
    isSeller: false,
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrorMsg('')

    try {
      const user = await handleRegister({
        fullname: formData.fullName,
        contact: formData.contact,
        email: formData.email,
        password: formData.password,
        isSeller: formData.isSeller,
      })

      if (user) {
        if (formData.isSeller || user.role === 'seller') {
          navigate('/seller/dashboard')
        } else {
          navigate('/')
        }
      }
    } catch (err) {
      setErrorMsg(err.response?.data?.meesage || err.message || 'Registration failed')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      {/* Google Fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Inter:wght@300;400;500;600&display=swap"
        rel="stylesheet"
      />

      <div
        className="min-h-screen w-full flex flex-col lg:flex-row selection:bg-[#c9a84c]/30"
        style={{ backgroundColor: '#080810', fontFamily: "'Inter', sans-serif" }}
      >
        {/* ── Left Editorial Image & Quote Section ── */}
        <div className="relative w-full lg:w-1/2 min-h-[460px] lg:min-h-screen overflow-hidden flex flex-col justify-between p-8 lg:p-14">
          {/* Background Image */}
          <img
            src="/auth-editorial.jpg"
            alt="Editorial Fashion"
            className="absolute inset-0 w-full h-full object-cover object-top"
          />

          {/* Luxury dark gradient overlay for quote legibility */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(180deg, rgba(8,8,16,0.35) 0%, rgba(8,8,16,0.1) 40%, rgba(8,8,16,0.85) 90%, #080810 100%)'
            }}
          />

          {/* Brand Header overlay */}
          <div className="relative z-10 flex items-center justify-between">
            <span
              className="text-xs font-medium tracking-[0.35em] uppercase text-[#c9a84c]"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              NeoParadox
            </span>
          </div>

          {/* Bottom Quote Thing */}
          <div className="relative z-10 mt-auto pt-16">
            <h2
              className="text-4xl sm:text-5xl lg:text-6xl font-light text-white leading-[1.08]"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Define your <br />
              <span className="italic font-normal">aesthetic.</span>
            </h2>
            <p className="mt-4 text-xs sm:text-sm text-white/70 max-w-md font-light leading-relaxed tracking-wide">
              Join the exclusive movement of creators and brands redefining the modern fashion narrative.
            </p>
          </div>
        </div>

        {/* ── Right Form Section (No outer border, clean underline inputs) ── */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-16 xl:p-20">
          <div className="w-full max-w-md">

            {/* Header */}
            <div className="mb-10">
              <span className="text-[12px] tracking-[0.3em] uppercase font-semibold text-[#c9a84c]">
                WELCOME TO NeoParadox
              </span>
              <h1
                className="text-3xl sm:text-4xl lg:text-5xl font-light text-white mt-2 leading-tight"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Elevate Your Style
              </h1>
            </div>

            {errorMsg && (
              <div className="mb-6 py-2.5 px-3 text-xs text-red-300 bg-red-950/40 border-l-2 border-red-500">
                {errorMsg}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Full Name */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] tracking-[0.25em] uppercase text-white/50 font-medium">
                  FULL NAME
                </label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="e.g. John Doe"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent border-0 border-b border-white/15 focus:border-[#c9a84c] text-white text-sm py-2.5 outline-none transition-colors duration-200 placeholder:text-white/20"
                />
              </div>

              {/* Contact Number */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] tracking-[0.25em] uppercase text-white/50 font-medium">
                  CONTACT NUMBER
                </label>
                <input
                  type="tel"
                  name="contact"
                  placeholder="+91 98765 43210"
                  value={formData.contact}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent border-0 border-b border-white/15 focus:border-[#c9a84c] text-white text-sm py-2.5 outline-none transition-colors duration-200 placeholder:text-white/20"
                />
              </div>

              {/* Email Address */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] tracking-[0.25em] uppercase text-white/50 font-medium">
                  EMAIL ADDRESS
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="hello@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent border-0 border-b border-white/15 focus:border-[#c9a84c] text-white text-sm py-2.5 outline-none transition-colors duration-200 placeholder:text-white/20"
                />
              </div>

              {/* Password */}
              <div className="flex flex-col gap-1.5 relative">
                <label className="text-[10px] tracking-[0.25em] uppercase text-white/50 font-medium">
                  PASSWORD
                </label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent border-0 border-b border-white/15 focus:border-[#c9a84c] text-white text-sm py-2.5 pr-10 outline-none transition-colors duration-200 placeholder:text-white/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 bottom-2.5 text-xs text-white/40 hover:text-[#c9a84c] transition-colors uppercase tracking-wider"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>

              {/* Register as Seller Checkbox */}
              <div className="pt-2 flex items-center gap-3">
                <input
                  type="checkbox"
                  id="isSeller"
                  name="isSeller"
                  checked={formData.isSeller}
                  onChange={handleChange}
                  className="w-4 h-4 rounded-none accent-[#c9a84c] cursor-pointer"
                />
                <label
                  htmlFor="isSeller"
                  className="text-[11px] tracking-[0.22em] uppercase text-white/70 hover:text-white cursor-pointer select-none font-medium"
                >
                  REGISTER AS SELLER
                </label>
              </div>

              {/* Sign Up Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 text-[11px] tracking-[0.3em] uppercase font-semibold text-[#080810] bg-[#c9a84c] hover:bg-[#e0be62] transition-colors duration-300 mt-4 disabled:opacity-50"
              >
                {isSubmitting ? 'CREATING ACCOUNT...' : 'SIGN UP'}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-4 my-6">
              <div className="flex-1 h-px bg-white/10" />
              <span className="text-white/30 text-[10px] tracking-[0.3em] uppercase">OR</span>
              <div className="flex-1 h-px bg-white/10" />
            </div>

            {/* Google Sign In */}
            <button
              type="button"
              onClick={() => {
                window.location.href = "http://localhost:3000/api/auth/google"
              }}
              className="w-full flex items-center justify-center gap-3 py-3.5 bg-white/[0.04] hover:bg-white/[0.08] text-white/80 hover:text-white text-xs tracking-[0.18em] uppercase font-medium transition-colors duration-200"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </button>

            {/* Switch to Login */}
            <p className="text-center text-white/40 text-xs mt-8 tracking-wide">
              Already have an account?{' '}
              <Link to="/login" className="text-[#c9a84c] hover:underline underline-offset-4 ml-1">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Register
