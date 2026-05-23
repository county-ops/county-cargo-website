
'use client'
import { Separator } from "@/components/ui/separator"
import ProfileForm from "./profile-form"
import { useEffect } from "react"

export default function ProfileSettingsPage() {
  useEffect(() => {
    document.title = "Profile Settings | County Cargo";
  }, []);
  
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Profile & Security</h3>
        <p className="text-sm text-muted-foreground">
          Update your personal details and manage your password.
        </p>
      </div>
      <Separator />
      <ProfileForm />
    </div>
  )
}
