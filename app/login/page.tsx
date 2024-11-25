'use client'

import React, { use } from 'react'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@radix-ui/react-checkbox'
import { Eye, EyeOff, Mail, Facebook } from 'lucide-react'
import useStyles  from './style'
import classNames from 'classnames'


function login() {
  const styles = useStyles()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  return (
    <div className='min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center p-4'>
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className={classNames('effect-Motion',styles.effectMotion)}
      >

      <div className={classNames('box-login',styles.boxLogin)}>
          <div className={classNames('box-center',styles.boxCenter)}>
            <h1 className={classNames('box-title',styles.boxTitle)}> welcome back</h1>
            <p className={classNames('box-subtitle',styles.boxSubtitle)}> selamat datang kembali</p>
          </div>

          {/* Email */}
          <form className="space-y-4">
            <div className='space-y-2'>
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="Masukkan Email anda" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} // Menambahkan handler onChange
                required
              />
            </div>

            {/* Password */}
            <div className='space-y-2'>
              <label htmlFor="password"> Password </label>
              <div className='relative'>
              <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Masukan Password anda"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {/* button eye */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={classNames('button-eye',styles.buttonEye)}
               >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>

            {/* Remember me */}
            <div className={classNames('remember-item',styles.rememberItem)}>
              <div className={classNames('remember-label',styles.rememberLabel)}>
                <Checkbox id="remember-me">
                  <input
                    type="checkbox"
                    id="remember-me"
                    className={classNames('remember-checkbox',styles.rememberCheckbox)}
                  />
                </Checkbox>
                <Label htmlFor="remember-me">Remember Me</Label>
              </div>
              <a href="#" className={classNames('forgot-password',styles.forgotPassword)}>
                Forgot Password?
              </a>
            </div>
            
            {/* login */}
            <div className="">
              <Button type="submit" className={classNames('login-button',styles.loginButton)}>
                Login
              </Button>
            </div>

            {/* garis  */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  atau login dengan
                </span>
              </div>
            </div>
            
            {/* kotak email */}
            <div className='grid grid-cols-2 gap-4'>
              <Button variant="outline" className='w-full'> 
                <Mail className="mr-2 h-4 w-4" />
                Email 
              </Button>
              <Button variant="outline" className='w-full'> 
                <Facebook className="mr-2 h-4 w-4" />
                Facebook 
              </Button>
            </div>

            {/* daftar */}
            <p className="text-center text-sm">
              Belum punya akun?{" "}
              <a
                href="#"
                className="text-primary hover:underline"
              >
                Daftar
              </a>
            </p>
          </form>
      </div>
      </motion.div>
    </div>
  )
}

export default login