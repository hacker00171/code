import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Key } from 'lucide-react'

interface DeviceInfo {
  firmware: number;
  supports_large_blob: boolean;
  supports_discoverable_credentials: boolean;
  requires_pin: boolean;
}

interface CredentialInfo {
  credential: {
    public_key: string;
    attestation: {
      certificate: string;
      auth_data: string;
      client_data_hash: string;
      signature: string;
    };
  };
  certificate: string;
  checks: {
    isYubikey: boolean;
    validAttestation: boolean;
  };
}

// Sample data
const sampleDeviceInfo: DeviceInfo = {
  firmware: 329473,
  supports_large_blob: true,
  supports_discoverable_credentials: true,
  requires_pin: true
}

const sampleCredentialInfo: CredentialInfo = {
  credential: {
    public_key: "-----BEGIN PUBLIC KEY-----\nMFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEzaqM8mzverp11K32yYZpU2bTd3Ko\n1JMXDIrExDD3pZZa4YQGkYh1SsD7",
    attestation: {
      certificate: "-----BEGIN CERTIFICATE-----\nMIIC2TCCACgAwIBAgIJAPuIBcG2k0XUMA0GCSqGSIb3DQEBCqGSSIb3DQEBAAAAA",
      auth_data: "LDnrcvEQ976n+FBI/ctao7z3scaf7AMxbFbKE1BH1NRBAAAAA",
      client_data_hash: "KeKeKWnPU49CmwAcxzJzh1+dKVUyqeoxhy6412T25AE=",
      signature: "MEYCIQDZpOun6GCFHHAwswXYwaFQQFhPMGA14Z1cD+8oDDijAwIhAM2PqWTDL0U8ecXbE4fziHUEOfcJ6zEbJvcRkNnerEZ9N"
    }
  },
  certificate: "-----BEGIN CERTIFICATE-----\nMIIBEzCBuaADAgECAgEBMAoGCCqGSM49BAMCMBMxETAPBgNVBAMTCFl1YmljbyBYMCAXDTE2MDMxNDAwMDA",
  checks: {
    isYubikey: true,
    validAttestation: true
  }
}

// const credentialSteps = [
//   { label: 'Register', icon: Key },
//   { label: 'Verify', icon: Key },
//   { label: 'Complete', icon: Key },
// ]

// const credentialDetails = [
//   {
//     title: 'Register New Key',
//     description: 'Add a new security key to your account',
//     icon: Key
//   },
//   {
//     title: 'Verify Key',
//     description: 'Verify your security key is working',
//     icon: Key
//   },
//   {
//     title: 'Complete Setup',
//     description: 'Finish security key configuration',
//     icon: Key
//   },
// ]

export function CredentialList() {
//   const [currentStep, setCurrentStep] = useState(0)
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo | null>(null)
  const [credentialInfo, setCredentialInfo] = useState<CredentialInfo | null>(null)
  const [isLoading, setIsLoading] = useState(false)

//   const handleStepClick = (index: number) => {
//     setCurrentStep(index)
//   }

  const resetDeviceInfo = () => {
    setDeviceInfo(null)
  }

  const resetCredentialInfo = () => {
    setCredentialInfo(null)
  }

  const handleGetDeviceInfo = async () => {
    setIsLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      setDeviceInfo(sampleDeviceInfo)
    } catch (error) {
      console.error('Error fetching device info:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleGetCredentialInfo = async () => {
    setIsLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      setCredentialInfo(sampleCredentialInfo)
    } catch (error) {
      console.error('Error fetching credential info:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white rounded-lg p-6 shadow-sm">
        {/* <div className="relative">
          <div className="flex justify-between items-center mb-8">
            {credentialSteps.map((step, index) => (
              <div 
                key={step.label} 
                className="flex flex-col items-center relative z-10"
                style={{ width: `${100 / credentialSteps.length}%` }}
              >
                <div 
                  className={`w-12 h-12 rounded-full flex items-center justify-center cursor-pointer
                    ${index <= currentStep ? 'bg-blue-500 text-white' : 'bg-blue-100 text-blue-500'}`}
                  onClick={() => handleStepClick(index)}
                >
                  <step.icon className="w-6 h-6" />
                </div>
                <span className="text-sm font-medium mt-2 text-center">{step.label}</span>
                {index < credentialSteps.length - 1 && (
                  <div 
                    className="absolute top-6 -right-1/2 w-full h-0.5 -z-10"
                    style={{
                      background: index <= currentStep - 1 ? '#3b82f6' : '#bfdbfe',
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </div> */}

        {/* <Card className="border-t-4 border-t-blue-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="w-5 h-5" />
              Security Key Management
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {credentialDetails.map((step, index) => (
              <Button
                key={step.title}
                variant="ghost"
                className={`w-full justify-between ${index === currentStep ? 'bg-blue-50' : ''}`}
                onClick={() => handleStepClick(index)}
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
        </Card> */}

        <Card className="border-t-4 border-t-blue-500 mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="w-5 h-5" />
              Device Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            {deviceInfo ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <p>Firmware: {deviceInfo.firmware}</p>
                  <p>Supports Large Blob: {deviceInfo.supports_large_blob ? 'Yes' : 'No'}</p>
                  <p>Supports Discoverable Credentials: {deviceInfo.supports_discoverable_credentials ? 'Yes' : 'No'}</p>
                  <p>Requires PIN: {deviceInfo.requires_pin ? 'Yes' : 'No'}</p>
                </div>
                <Button 
                  variant="outline"
                  onClick={resetDeviceInfo}
                  className="bg-blue-500 hover:bg-blue-600 text-white"
                >
                  Back
                </Button>
              </div>
            ) : (
              <Button 
                onClick={handleGetDeviceInfo} 
                disabled={isLoading}
              >
                {isLoading ? 'Loading...' : 'Get Device Info'}
              </Button>
            )}
          </CardContent>
        </Card>

        <Card className="border-t-4 border-t-blue-500 mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="w-5 h-5" />
              Credential Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            {credentialInfo ? (
              <div className="space-y-4">
                <div>
                  <p className="font-medium">Public Key:</p>
                  <p className="text-sm break-all bg-gray-50 p-2 rounded">{credentialInfo.credential.public_key}</p>
                </div>
                <div>
                  <p className="font-medium">Certificate:</p>
                  <p className="text-sm break-all bg-gray-50 p-2 rounded">{credentialInfo.credential.attestation.certificate}</p>
                </div>
                <div>
                  <p className="font-medium">Authentication Data:</p>
                  <p className="text-sm break-all bg-gray-50 p-2 rounded">{credentialInfo.credential.attestation.auth_data}</p>
                </div>
                <div>
                  <p className="font-medium">Client Data Hash:</p>
                  <p className="text-sm break-all bg-gray-50 p-2 rounded">{credentialInfo.credential.attestation.client_data_hash}</p>
                </div>
                <div>
                  <p className="font-medium">Signature:</p>
                  <p className="text-sm break-all bg-gray-50 p-2 rounded">{credentialInfo.credential.attestation.signature}</p>
                </div>
                <div className="border-t pt-4">
                  <p className="font-medium">Attestation Status:</p>
                  <p>Valid: {credentialInfo.checks.validAttestation ? 'Yes' : 'No'}</p>
                  <p>Yubikey: {credentialInfo.checks.isYubikey ? 'Yes' : 'No'}</p>
                </div>
                <Button 
                  variant="outline"
                  onClick={resetCredentialInfo}
                  className="bg-blue-500 hover:bg-blue-600 text-white"
                >
                  Back
                  
                </Button>
              </div>
            ) : (
              <Button 
                onClick={handleGetCredentialInfo} 
                disabled={isLoading}
              >
                {isLoading ? 'Loading...' : 'Get Credential Info'}
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 