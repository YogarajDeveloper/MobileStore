import React, { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react';

const TextInput = ({ 
    label,
    icon,
    error,
    helperText,
    placeholder,
    type = 'text',
    className = '', 
    onChange,
    name,
    value,    
    isPassword = false,
}) => {
    
    const [showPassword, setShowPassword] = useState(false);  

    const handleChange = (e) => {
        console.log("name",name)
        console.log("value ",e.target.value)

        // let inputValue = e.target.value;
        // console.log("inputValue",inputValue)
        onChange(e);
    };

    return (
        <div className="w-full space-y-1.5">
            <label
                className="block text-xs font-semibold text-slate-300 tracking-wide select-none"
            >
                {label}
            </label>

            <div className="relative flex items-center">
                {icon && (
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        {icon}
                    </div>
                )}

                <input
                    placeholder={placeholder}
                    name={name}
                    value={value}
                    onChange={handleChange}
                    type={isPassword ? (showPassword ? 'text' : 'password') : type}
                    className={`w-full py-3 px-4 text-sm font-medium rounded-xl transition-all duration-200 bg-loginBg border text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed
                    ${icon ? 'pl-11' : 'pl-4'} ${isPassword ? 'pr-11' : 'pr-4'} ${error ? 'border-red-500/80 focus:border-red-500 focus:ring-red-500/30' : 'border-slate-700/80 hover:border-slate-600'} ${className}`}
                />

                {isPassword && (
                    <button
                        type="button"
                        tabIndex={-1}
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-200 focus:outline-none transition-colors"
                        title={showPassword ? 'Hide password' : 'Show password'}
                    >
                        {showPassword ?  <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </button>
                )}
            </div>

            {error ? (
                <p className="text-[11px] text-red-400 font-medium flex items-center gap-1 mt-1">
                    <span>⚠️</span> {error}
                </p>
            ) : helperText ? (
                <p className="text-[11px] text-slate-400 mt-1">{helperText}</p>
            ) : null}
        </div>
    )
}

export default TextInput