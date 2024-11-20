import { useState } from 'react'
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { ChevronRight, UserPlus } from 'lucide-react'
// import { onboardingSteps, onboardingDetails } from '../data/constants'
import { FileText, UserCheck, User, } from 'lucide-react'
import { RegisterPending } from './subtabsregister/RegisterPending'
// import RegisterPending from './subtabsregister/RegisterPending'
import { RegisterCompleted } from './subtabsregister/RegisterCompleted'
import { RegisterReports } from './subtabsregister/RegistrationReport'

export const onboardingSteps = [
  { icon: User, label: 'Registration Pending' },
  { icon: UserCheck, label: 'Registration Completed' },
  { icon: FileText, label: 'Report' },
]

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




export function Onboarding() {
  const [currentOnboardingStep, setCurrentOnboardingStep] = useState(0)

  const handleOnboardingStepClick = (index: number) => {
    setCurrentOnboardingStep(index)
  }

  const renderCurrentStep = () => {
    switch(currentOnboardingStep) {
      case 0:
        return <RegisterPending />
      case 1:
        return <RegisterCompleted />
      case 2:
        return <RegisterReports/>
      default:
        return <RegisterPending />
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="relative">
          <div className="flex justify-between items-center mb-8">
            {onboardingSteps.map((step, index) => (
              <div 
                key={step.label} 
                className="flex flex-col items-center relative z-10"
                style={{ width: `${100 / onboardingSteps.length}%` }}
              >
                <div 
                  className={`w-12 h-12 rounded-full flex items-center justify-center cursor-pointer transition-colors relative
                    ${index <= currentOnboardingStep ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-600'}`}
                  onClick={() => handleOnboardingStepClick(index)}
                >
                  <step.icon className="w-6 h-6" />
                </div>
                <span className="text-sm font-medium mt-2 text-center">{step.label}</span>
                {index < onboardingSteps.length - 1 && (
                  <div 
                    className="absolute top-6 -right-1/2 w-full h-0.5 -z-10"
                    style={{
                      background: index <= currentOnboardingStep - 1 ? '#2563eb' : '#eff6ff',
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {renderCurrentStep()}
      </div>
    </div>
  )
} 