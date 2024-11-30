'use client'

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import useStyles from "./style";
import classNames from "classnames";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

function register() {
    const styles = useStyles()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    return (
        <div className={classNames('box-register',styles.boxRegister)}>
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className={classNames('effect-Motion',styles.effectMotion)}
            >

                <div className={classNames('box-login',styles.boxLogin)}>
                    <div className={classNames('box-center',styles.boxCenter)}>
                        <h1 className={classNames('box-title',styles.boxTitle)}>Daftar Golekin</h1>
                        {/* <p className={classNames('box-subtitle',styles.boxSubtitle)}>Ayo Daftar Menjadi Member Golekin</p> */}
                    </div>

                    <form className={classNames('nama-space',styles.namaSpace)}>
                        {/* username */}
                        <div className={classNames('nama-enter',styles.namaEnter)}>
                            <Label htmlFor="name" className={classNames('nama-text',styles.namaText)}>Username</Label>
                            <Input id="name" placeholder="Nama Lengkap anda" className={classNames('nama-input',styles.namaInput)}/>
                        </div>

                        {/* nama lengkap */}
                        <div className={classNames('nama-enter',styles.namaEnter)}>
                            <Label htmlFor="name" className={classNames('nama-text',styles.namaText)}>Nama Lengkap</Label>
                            <Input id="name" placeholder="Nama Lengkap anda" className={classNames('nama-input',styles.namaInput)}/>
                        </div>

                        {/* email */}
                        <div className={classNames('email-enter',styles.emailEnter)}>
                            <Label htmlFor="email" className={classNames('email-text',styles.emailText)}>Email</Label>
                            <Input className={classNames('email-input',styles.emailInput)}
                                id="email" 
                                type="email" 
                                placeholder="Email" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        {/* Password */}
                            <div className={classNames('password-enter',styles.passwordEnter)}>
                                <label htmlFor="password" className={classNames('password-text',styles.passwordText)}>Password</label>
                                <div className={classNames('password-relative',styles.passwordRelative)}>
                                    <Input className={classNames('placeholder-password',styles.placeHolderPassword)}
                                        id="password" 
                                        type={showPassword ? "text" : "password"} 
                                        placeholder="Password" 
                                        value={password} 
                                        onChange={(e) => setPassword(e.target.value)}
                                    />

                                    {/* password Eye */}
                                    <button 
                                        type="button" 
                                        onClick={() => setShowPassword(!showPassword)} className={classNames('button-eye',styles.buttonEye)}>
                                        {showPassword ? <Eye /> : <EyeOff />}
                                    </button>
                                </div>
                            </div>

                        {/* Posisi */}
                        <div className='space-y-2'>
                            <Label htmlFor="posisi" className={classNames('position-text',styles.positionText)}>Daftar Sebagai</Label>
                            <Select>
                                <SelectTrigger className={classNames('position-select',styles.positionSelect)}>
                                    <SelectValue placeholder="sebagai"/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="light">Agen</SelectItem>
                                    <SelectItem value="dark">Pedagang</SelectItem>
                                    <SelectItem value="system">Konsumen</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                    {/* phone number */}
                    <div className={classNames('position-text', styles.positionText)}>
                        <Label htmlFor="phone" className={classNames('position-text', styles.positionText)}>
                            Nomor Telepon
                        </Label>
                        <Input 
                            id="phone" 
                            type="number" 
                            placeholder="Nomor Telepon anda" 
                            onKeyDown={(e) => {
                                if (e.key === 'e' || e.key === '+' || e.key === '-') {
                                    e.preventDefault();
                                }
                            }}
                        />
                    </div>

                    {/* pin */}
                    <div className={classNames('nama-enter',styles.namaEnter)}>
                            <Label htmlFor="name" className={classNames('nama-text',styles.namaText)}>PIN</Label>
                                <Input className={classNames('pin-text',styles.pinText)}
                                id="pin" 
                                type="number" 
                                placeholder="Pin anda" 
                                onKeyDown={(e) => {
                                    if (e.key === 'e' || e.key === '+' || e.key === '-') {
                                        e.preventDefault();
                                    }
                                }}
                                />
                    </div>

                    {/* button submit */}
                    <div className={classNames('button-submit',styles.buttonSubmit)}>
                        <Button type="submit" className={classNames('submit-button',styles.submitButton)}>Daftar</Button>
                    </div>
                    </form>
            </div>
            </motion.div>
        </div>
    )                    
}

export default register;