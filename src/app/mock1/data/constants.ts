import { Building2, KeyRound, Lock, RefreshCcw, Shield, UserMinus, Users, Wallet } from 'lucide-react'

    // export const onboardingSteps = [
    //   { icon: KeyRound, label: 'Register pending' },
    //   { icon: RefreshCcw, label: 'Register completed' },
    //   { icon: Lock, label: 'report' },
    // //   { icon: Users, label: 'Access' },
    // ]

    // export const onboardingDetails = [
    //   { 
    //     icon: KeyRound, 
    //     title: 'Yubikey Procurement',
    //     description: 'New Yubikey device is obtained'
    //   },
    //   { 
    //     icon: RefreshCcw, 
    //     title: 'Bytenova Personalization Yubikey',
    //     description: 'Yubikey is configured using Bytenova application and ready to use'
    //   },
    //   { 
    //     icon: Lock, 
    //     title: 'Security Enrollment',
    //     description: 'Security officer enrolls Yubikey in AEOS physical access system'
    //   },
    //   { 
    //     icon: Users, 
    //     title: 'Employee Access',
    //     description: 'Employee receives configured Yubikey and can access authorized doors'
    //   },
    // ]

export const offboardingSteps = [
  { icon: UserMinus, label: 'Remove Access' },
  { icon: KeyRound, label: 'Return Device' },
  { icon: RefreshCcw, label: 'Reset' },
  { icon: Shield, label: 'Ready' },
]

export const offboardingDetails = [
  { 
    icon: Users, 
    title: 'AEOS Removal',
    description: 'Employee access rights are removed from physical access system'
  },
  { 
    icon: KeyRound, 
    title: 'Yubikey Return',
    description: 'Employee returns Yubikey to security officer for processing'
  },
  { 
    icon: RefreshCcw, 
    title: 'Device Reset',
    description: 'Security officer performs complete reset of Yubikey'
  },
  { 
    icon: Shield, 
    title: 'Preparation for Reuse',
    description: 'Yubikey is ready for new employee personalization cycle'
  },
]

export const benefits = [
  {
    icon: Shield,
    title: 'Enhanced Security',
    description: 'FIDO2 security keys provide strong two-factor authentication for physical access control'
  },
  {
    icon: Users,
    title: 'Unified Access Control',
    description: 'Single Yubikey enables both physical (doors) and logical (computer) access using FIDO2 standards'
  },
  {
    icon: Wallet,
    title: 'Cost-Effective',
    description: 'Reusable Yubikeys reduce long-term costs and environmental impact'
  },
  {
    icon: Building2,
    title: 'Centralized Management',
    description: 'Complete lifecycle management through AEOS system with full audit trails'
  },
  {
    icon: Lock,
    title: 'Multi-Factor Authentication',
    description: 'FIDO2 protocol ensures secure authentication for both building and computer system access'
  }
] 