'use client'

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import useStyles from "./style";
import classNames from "classnames";

function register() {
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
                        <h1 className={classNames('box-title',styles.boxTitle)}>register</h1>
                        <p className={classNames('box-subtitle',styles.boxSubtitle)}>daftar sekarang</p>
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
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        
                    </form>
            </div>
            </motion.div>
        </div>
    )                    
}

export default register;