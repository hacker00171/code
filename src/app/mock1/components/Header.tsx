import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Add this interface at the top of your Header component file
interface HeaderProps {
  selectedAccess: string;
  onAccessChange: (value: string) => void;
}

export const Header: React.FC<HeaderProps> = () => {

  return (
    <div className="bg-[#1E40F6] text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center mb-4 relative">

          <div className="absolute right-0 top-0">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="flex items-center gap-2 text-white hover:bg-blue-600 hover:text-white transition-colors group"
                >
                  <div className="text-right hidden sm:block">
                    <p className="text-sm font-medium group-hover:text-white">John Doe</p>
                    <p className="text-xs text-blue-100 group-hover:text-white">Security Officer</p>
                  </div>
                  <Avatar className="h-9 w-9 ring-2 ring-white/20 ring-offset-2 ring-offset-blue-600 transition-all duration-200 group-hover:ring-white/40">
                    <AvatarImage 
                      src="/avatars/professional-avatar.jpg" 
                      alt="John Doe"
                      className="object-cover"
                    />
                    <AvatarFallback className="bg-blue-500 text-white">JD</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem className="text-red-600"
                  onClick={() => window.location.href = "/"}
                >Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <h1 className="text-4xl font-bold tracking-tight mb-2">FIDO2 Yubikey Lifecycle Management</h1>
          <p className="text-blue-100 text-lg">Physical and Logical Access Control System Implementation</p>
        </div>
      </div>
    </div>
  )
} 