import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronRight, UserMinus } from 'lucide-react'
import { offboardingSteps, offboardingDetails } from '../data/constants'

export function Offboarding() {
  const [currentOffboardingStep, setCurrentOffboardingStep] = useState(0)

  const handleOffboardingStepClick = (index: number) => {
    setCurrentOffboardingStep(index)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="relative">
          <div className="flex justify-between items-center mb-8">
            {offboardingSteps.map((step, index) => (
              <div 
                key={step.label} 
                className="flex flex-col items-center relative z-10"
                style={{ width: `${100 / offboardingSteps.length}%` }}
              >
                <div 
                  className={`w-12 h-12 rounded-full flex items-center justify-center cursor-pointer
                    ${index <= currentOffboardingStep ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-600'}`}
                  onClick={() => handleOffboardingStepClick(index)}
                >
                  <step.icon className="w-6 h-6" />
                </div>
                <span className="text-sm font-medium mt-2 text-center">{step.label}</span>
                {index < offboardingSteps.length - 1 && (
                  <div 
                    className="absolute top-6 -right-1/2 w-full h-0.5 -z-10"
                    style={{
                      background: index <= currentOffboardingStep - 1 ? '#f97316' : '#fed7aa',
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <Card className="border-t-4 border-t-blue-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserMinus className="w-5 h-5" />
              Employee Offboarding
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {offboardingDetails.map((step, index) => (
              <Button
                key={step.title}
                variant="ghost"
                className={`w-full justify-between ${index === currentOffboardingStep ? 'bg-blue-50' : ''}`}
                onClick={() => handleOffboardingStepClick(index)}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center`}>
                    <step.icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="text-left">
                    <div className="font-medium">{step.title}</div>
                    <div className="text-sm text-muted-foreground">{step.description}</div>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5" />
              </Button>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}