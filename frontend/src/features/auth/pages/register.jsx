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
  })
  const [showPassword, setShowPassword] = useState(false)
  const [focused, setFocused] = useState('')
  const [agreed, setAgreed] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }



  const handleSubmit = async (e) => {
    e.preventDefault()

      const user = await handleRegister({
      fullname:formData.fullName,
      contact:formData.contact,
      email:formData.email,
      password:formData.password,
      })

    if(user){
        navigate('/')
      }
    
    

  }

  const getPasswordStrength = (pwd) => {
    if (!pwd) return 0
    let score = 0
    if (pwd.length >= 6) score++
    if (pwd.length >= 10) score++
    if (/[A-Z]/.test(pwd) && /[0-9]/.test(pwd)) score++
    if (/[^A-Za-z0-9]/.test(pwd)) score++
    return score
  }

  const strength = getPasswordStrength(formData.password)
  const strengthLabels = ['', 'Weak', 'Fair', 'Good', 'Strong']
  const strengthColors = ['', 'bg-red-500', 'bg-orange-400', 'bg-yellow-400', 'bg-[#c9a84c]']

  return (
    <div className="min-h-screen bg-[#080810] flex items-center justify-center relative overflow-hidden py-12 px-4">

      {/* Ambient background orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-[#c9a84c]/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[450px] h-[450px] rounded-full bg-[#8b5cf6]/8 blur-[120px]" />
        <div className="absolute top-[40%] left-[50%] w-[300px] h-[300px] rounded-full bg-[#c9a84c]/5 blur-[100px] -translate-x-1/2" />
      </div>

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(201,168,76,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.4) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Card */}
      <div className="relative z-10 w-full max-w-md">

        {/* Top decorative line */}
        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#c9a84c] to-transparent mb-8 opacity-60" />

        <div
          className="bg-[#0d0d1a]/80 border border-[#c9a84c]/20 rounded-2xl p-8 shadow-2xl"
          style={{
            backdropFilter: 'blur(24px)',
            boxShadow: '0 0 60px rgba(201,168,76,0.08), 0 40px 80px rgba(0,0,0,0.6)',
          }}
        >
          {/* Brand header */}
          <div className="text-center mb-8">
            {/* Logo mark */}
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border border-[#c9a84c]/30 bg-[#c9a84c]/5 mb-4"
              style={{ boxShadow: '0 0 30px rgba(201,168,76,0.15)' }}>
              <svg className="w-7 h-7 text-[#c9a84c]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>

            <h1 className="text-3xl font-bold tracking-widest text-white uppercase" style={{ fontFamily: 'Georgia, serif' }}>
              Neo<span className="text-[#c9a84c]">Paradox</span>
            </h1>
            <p className="text-[#c9a84c]/60 text-xs tracking-[0.3em] uppercase mt-1">Luxury Redefined</p>

            <div className="mt-5">
              <h2 className="text-white/90 text-lg font-light tracking-wide">Create Your Account</h2>
              <p className="text-white/30 text-xs mt-1">Join the circle of distinction</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Full Name */}
            <div className="relative">
              <label
                className="absolute left-4 transition-all duration-300 pointer-events-none font-medium tracking-widest uppercase"
                style={{
                  top: focused === 'fullName' || formData.fullName ? '8px' : '50%',
                  transform: focused === 'fullName' || formData.fullName ? 'none' : 'translateY(-50%)',
                  fontSize: focused === 'fullName' || formData.fullName ? '10px' : '12px',
                  color: focused === 'fullName' || formData.fullName ? '#c9a84c' : 'rgba(255,255,255,0.3)',
                }}
              >
                Full Name
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                value={formData.fullName}
                onChange={handleChange}
                onFocus={() => setFocused('fullName')}
                onBlur={() => setFocused('')}
                required
                className="w-full bg-[#0a0a16] rounded-xl px-4 pt-6 pb-2 text-white/90 text-sm outline-none transition-all duration-300"
                style={{
                  border: focused === 'fullName' ? '1px solid rgba(201,168,76,0.6)' : '1px solid rgba(255,255,255,0.1)',
                  boxShadow: focused === 'fullName' ? '0 0 20px rgba(201,168,76,0.1)' : 'none',
                }}
              />
              <div
                className="absolute left-0 top-3 bottom-3 w-[2px] rounded-full bg-[#c9a84c] transition-all duration-300"
                style={{ opacity: focused === 'fullName' ? 1 : 0 }}
              />
            </div>

            {/* Contact */}
            <div className="relative">
              <label
                className="absolute left-4 transition-all duration-300 pointer-events-none font-medium tracking-widest uppercase"
                style={{
                  top: focused === 'contact' || formData.contact ? '8px' : '50%',
                  transform: focused === 'contact' || formData.contact ? 'none' : 'translateY(-50%)',
                  fontSize: focused === 'contact' || formData.contact ? '10px' : '12px',
                  color: focused === 'contact' || formData.contact ? '#c9a84c' : 'rgba(255,255,255,0.3)',
                }}
              >
                Contact Number
              </label>
              <input
                id="contact"
                name="contact"
                type="tel"
                value={formData.contact}
                onChange={handleChange}
                onFocus={() => setFocused('contact')}
                onBlur={() => setFocused('')}
                required
                className="w-full bg-[#0a0a16] rounded-xl px-4 pt-6 pb-2 text-white/90 text-sm outline-none transition-all duration-300"
                style={{
                  border: focused === 'contact' ? '1px solid rgba(201,168,76,0.6)' : '1px solid rgba(255,255,255,0.1)',
                  boxShadow: focused === 'contact' ? '0 0 20px rgba(201,168,76,0.1)' : 'none',
                }}
              />
              <div
                className="absolute left-0 top-3 bottom-3 w-[2px] rounded-full bg-[#c9a84c] transition-all duration-300"
                style={{ opacity: focused === 'contact' ? 1 : 0 }}
              />
            </div>

            {/* Email */}
            <div className="relative">
              <label
                className="absolute left-4 transition-all duration-300 pointer-events-none font-medium tracking-widest uppercase"
                style={{
                  top: focused === 'email' || formData.email ? '8px' : '50%',
                  transform: focused === 'email' || formData.email ? 'none' : 'translateY(-50%)',
                  fontSize: focused === 'email' || formData.email ? '10px' : '12px',
                  color: focused === 'email' || formData.email ? '#c9a84c' : 'rgba(255,255,255,0.3)',
                }}
              >
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                onFocus={() => setFocused('email')}
                onBlur={() => setFocused('')}
                required
                className="w-full bg-[#0a0a16] rounded-xl px-4 pt-6 pb-2 text-white/90 text-sm outline-none transition-all duration-300"
                style={{
                  border: focused === 'email' ? '1px solid rgba(201,168,76,0.6)' : '1px solid rgba(255,255,255,0.1)',
                  boxShadow: focused === 'email' ? '0 0 20px rgba(201,168,76,0.1)' : 'none',
                }}
              />
              <div
                className="absolute left-0 top-3 bottom-3 w-[2px] rounded-full bg-[#c9a84c] transition-all duration-300"
                style={{ opacity: focused === 'email' ? 1 : 0 }}
              />
            </div>

            {/* Password */}
            <div className="relative">
              <label
                className="absolute left-4 transition-all duration-300 pointer-events-none font-medium tracking-widest uppercase"
                style={{
                  top: focused === 'password' || formData.password ? '8px' : '50%',
                  transform: focused === 'password' || formData.password ? 'none' : 'translateY(-50%)',
                  fontSize: focused === 'password' || formData.password ? '10px' : '12px',
                  color: focused === 'password' || formData.password ? '#c9a84c' : 'rgba(255,255,255,0.3)',
                }}
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange}
                onFocus={() => setFocused('password')}
                onBlur={() => setFocused('')}
                required
                className="w-full bg-[#0a0a16] rounded-xl px-4 pr-12 pt-6 pb-2 text-white/90 text-sm outline-none transition-all duration-300"
                style={{
                  border: focused === 'password' ? '1px solid rgba(201,168,76,0.6)' : '1px solid rgba(255,255,255,0.1)',
                  boxShadow: focused === 'password' ? '0 0 20px rgba(201,168,76,0.1)' : 'none',
                }}
              />
              <div
                className="absolute left-0 top-3 bottom-3 w-[2px] rounded-full bg-[#c9a84c] transition-all duration-300"
                style={{ opacity: focused === 'password' ? 1 : 0 }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors duration-200"
                style={{ color: 'rgba(255,255,255,0.3)' }}
                onMouseEnter={e => e.currentTarget.style.color = '#c9a84c'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.3)'}
              >
                {showPassword ? (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                )}
              </button>
            </div>

            {/* Password strength indicator */}
            {formData.password && (
              <div className="px-1 space-y-1">
                <div className="flex gap-1.5">
                  {[1, 2, 3, 4].map((level) => (
                    <div
                      key={level}
                      className={`h-0.5 flex-1 rounded-full transition-all duration-500 ${
                        level <= strength ? strengthColors[strength] : 'bg-white/10'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-[10px] tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.3)' }}>
                  Strength: <span className="text-[#c9a84c]">{strengthLabels[strength]}</span>
                </p>
              </div>
            )}

            {/* Terms checkbox */}
            <div className="flex items-start gap-3 pt-1">
              <button
                type="button"
                id="terms-checkbox"
                onClick={() => setAgreed(!agreed)}
                className="mt-0.5 w-4 h-4 rounded flex-shrink-0 flex items-center justify-center transition-all duration-200"
                style={{
                  border: agreed ? '1px solid #c9a84c' : '1px solid rgba(255,255,255,0.2)',
                  backgroundColor: agreed ? '#c9a84c' : 'transparent',
                }}
              >
                {agreed && (
                  <svg className="w-2.5 h-2.5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
              <p className="text-white/30 text-xs leading-relaxed">
                I agree to the{' '}
                <a href="#" className="text-[#c9a84c]/80 hover:text-[#c9a84c] underline underline-offset-2 transition-colors">Terms of Service</a>
                {' '}and{' '}
                <a href="#" className="text-[#c9a84c]/80 hover:text-[#c9a84c] underline underline-offset-2 transition-colors">Privacy Policy</a>
              </p>
            </div>

            {/* Submit button */}
            <button
              id="register-submit"
              type="submit"
              disabled={!agreed}
              className="relative w-full mt-2 overflow-hidden rounded-xl py-3.5 text-sm font-semibold tracking-[0.2em] uppercase transition-all duration-300 text-[#080810]"
              style={{
                background: 'linear-gradient(90deg, #c9a84c, #e8c96e, #c9a84c)',
                opacity: !agreed ? 0.4 : 1,
                cursor: !agreed ? 'not-allowed' : 'pointer',
              }}
              onMouseEnter={e => {
                if (agreed) e.currentTarget.style.boxShadow = '0 0 40px rgba(201,168,76,0.4)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              Create Account
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent to-white/10" />
            <span className="text-white/20 text-xs tracking-widest uppercase">or</span>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent to-white/10" />
          </div>

          {/* Google sign-up */}
          <button
            id="google-signup"
            type="button"
            onClick={() => {
              window.location.href = "http://localhost:3000/api/auth/google"
            }}
            className="w-full flex items-center justify-center gap-3 py-3 rounded-xl text-sm transition-all duration-300"
            style={{
              border: '1px solid rgba(255,255,255,0.1)',
              backgroundColor: 'rgba(255,255,255,0.05)',
              color: 'rgba(255,255,255,0.6)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'
              e.currentTarget.style.color = 'rgba(255,255,255,0.85)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
              e.currentTarget.style.color = 'rgba(255,255,255,0.6)'
            }}
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>

          {/* Sign in link */}
          <p className="text-center text-white/25 text-xs mt-6 tracking-wide">
            Already a member?{' '}
            <Link to="/login" className="text-[#c9a84c]/70 hover:text-[#c9a84c] font-medium transition-colors duration-200">
              Sign In
            </Link>
          </p>
        </div>

        {/* Bottom decorative line */}
        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#c9a84c] to-transparent mt-8 opacity-30" />

        <p className="text-center text-white/15 text-[10px] tracking-widest uppercase mt-4">
          © 2026 NeoParadox · All Rights Reserved
        </p>
      </div>
    </div>
  )
}

export default Register
