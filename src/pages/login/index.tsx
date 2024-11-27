'use client'

import React, { use } from 'react'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
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
            <h1 className={classNames('box-title',styles.boxTitle)}> Golekin </h1>
            <p className={classNames('box-subtitle',styles.boxSubtitle)}> selamat datang di Golekin</p>
          </div>

          {/* Email */}
          <form className={classNames('login-form',styles.loginForm)}>
            <div className={classNames('loginForm-line',styles.loginFormLine)}>
              <Label htmlFor="email" className={classNames('email-text',styles.emailText)}> Email </Label>
              <Input className={classNames('placeholder-email',styles.placeHolderEmail)}
                id="email" 
                type="email" 
                placeholder="Masukkan Email anda" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} // Menambahkan handler onChange
                required
              />
            </div>

            {/* Password */}
            <div className={classNames('password-line',styles.passwordLine)}>
              <label htmlFor="password" className={classNames('password-text',styles.passwordText)}> Password </label>
              <div className={classNames('password-relative',styles.passwordRelative)}>
              <Input className={classNames('placeholder-password',styles.placeHolderPassword)}
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
                <Label htmlFor="remember-me" className={classNames('remember-text',styles.rememberText)}>Remember Me</Label>
              </div>
              <a href="#" className={classNames('forgot-password',styles.forgotPassword)}>
                Forgot Password?
              </a>
            </div>
            
            {/* login */}
            <div className={classNames('login-space',styles.loginSpace)}>
              <button type="submit" className={classNames('login-button',styles.loginButton)}>
                Login
              </button>
            </div>

            {/* garis  */}
            <div className={classNames('line-relative',styles.lineRelative)}>
              <div className={classNames('line-absolute',styles.lineAbsolute)}>
                <span className={classNames('line-border',styles.lineBorder)} />
              </div>
              <div className={classNames('lineUper-Case',styles.lineUperCase)}>
                <span className={classNames('lineBackground',styles.lineBackground)}>
                  atau login dengan
                </span>
              </div>
            </div>
            
            {/* kotak email */}
            <div className={classNames('icon-garis',styles.iconGaris)}>
              <Button variant="outline" className={classNames('iconEmail-Text',styles.iconEmailText)}>
                <Mail className={classNames('icon-Email',styles.iconEmail)}/>
                Email 
              </Button>
              <Button variant="outline" className={classNames('iconFacebook-Text',styles.iconFacebookText)}> 
                <Facebook className={classNames('icon-Facebook',styles.iconFacebook)} />
                Facebook 
              </Button>
            </div>

            {/* daftar */}
            <p className={classNames('footer-text',styles.footerText)}>
              Belum punya akun?{" "}
              <a
                href="#"
                className={classNames('footer-hover',styles.footerHover)}
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

export default login;