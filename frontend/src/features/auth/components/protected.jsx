import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router'

const Protected = ({ children, role = null }) => {

    const user = useSelector(state => state.auth.user)
    const loading = useSelector(state => state.auth.loading)

    if (loading) {
        return (
            <div
                className="min-h-screen flex items-center justify-center selection:bg-[#c9a84c]/30"
                style={{ backgroundColor: '#080810', color: '#c9a84c', fontFamily: "'Inter', sans-serif" }}
            >
                <div className="flex flex-col items-center gap-4">
                    <div className="w-8 h-8 border-2 border-[#c9a84c]/20 border-t-[#c9a84c] rounded-full animate-spin" />
                    <span className="text-[10px] uppercase tracking-[0.3em] text-white/50">
                        Verifying session...
                    </span>
                </div>
            </div>
        )
    }

    if (!user) {
        return <Navigate to="/login" replace />
    }

    if (role && user.role !== role) {
        return <Navigate to="/" replace />
    }

    return children

}

export default Protected