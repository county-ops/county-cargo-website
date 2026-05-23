
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import BookingForm from "./booking-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useEffect } from "react";
import { PlaneTakeoff, PlaneLanding, Loader2 } from "lucide-react";
import { getServiceSettings, ServiceSettings } from "@/lib/service-settings";
import { useProfile } from "@/components/profile-provider";
import { useRouter } from "next/navigation";

export default function BookShipmentPage() {
  const { profile, profileLoading } = useProfile();
  const router = useRouter();
  const [serviceSettings, setServiceSettings] = useState<ServiceSettings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Book a New Shipment | County Cargo";
    
    if (!profileLoading && profile) {
      if (profile.role !== 'Admin') {
        router.push('/dashboard');
        return;
      }
      
      getServiceSettings()
        .then(settings => {
          setServiceSettings(settings);
        })
        .catch(err => console.error("Failed to load service settings:", err))
        .finally(() => setLoading(false));
    }
  }, [profile, profileLoading, router]);
  
  const isExportEnabled = serviceSettings?.expressExport || serviceSettings?.valueExport;
  const isImportEnabled = serviceSettings?.valueImport || serviceSettings?.expressImport;

  // Determine the default active tab
  const defaultTab = isExportEnabled ? 'export' : (isImportEnabled ? 'import' : '');
  const [activeTab, setActiveTab] = useState(defaultTab);
  
  useEffect(() => {
      if (!loading && !activeTab) {
          setActiveTab(defaultTab);
      }
  }, [loading, defaultTab, activeTab]);
  

  if (loading) {
      return (
        <div className="flex justify-center items-center h-40">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        </div>
      );
  }

  return (
    <div className="flex flex-1 flex-col gap-6 md:gap-10 bg-gradient-to-br from-blue-50 via-white to-blue-50/30 p-4 md:p-8 lg:p-12 rounded-[2.5rem] border border-blue-200/50 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-2">
                <div className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-800">
                    <PlaneTakeoff className="mr-2 h-4 w-4 text-blue-600" />
                    Booking Portal
                </div>
                <h1 className="font-black text-4xl md:text-5xl text-blue-950 tracking-tight">New Shipment</h1>
                <p className="text-blue-700/80 font-medium text-base max-w-2xl">Create and configure a new logistic record in the database.</p>
            </div>
        </div>
        
        <Card className="rounded-[2.5rem] border border-blue-100 shadow-xl shadow-blue-900/5 overflow-hidden bg-white/80 backdrop-blur-xl">
            <CardHeader className="p-8 md:p-10 bg-gradient-to-br from-blue-50/80 via-white to-white border-b border-blue-100/50">
                <CardTitle className="text-2xl md:text-3xl font-black text-blue-950 tracking-tight">Shipment Details</CardTitle>
                <CardDescription className="text-sm md:text-base text-blue-600/80 font-medium tracking-wide mt-2">
                    Select a shipment type below and fill out the configuration form
                </CardDescription>
            </CardHeader>
            <CardContent className="p-8 md:p-10">
              {isExportEnabled || isImportEnabled ? (
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <div className="mb-6 flex justify-center">
                    <TabsList className={`grid w-full max-w-md ${isExportEnabled && isImportEnabled ? 'grid-cols-2' : 'grid-cols-1'}`}>
                      {isExportEnabled && (
                        <TabsTrigger value="export">
                          <PlaneTakeoff className="mr-2 h-4 w-4" />
                          Export
                        </TabsTrigger>
                      )}
                      {isImportEnabled && (
                        <TabsTrigger value="import">
                          <PlaneLanding className="mr-2 h-4 w-4" />
                          Import
                        </TabsTrigger>
                      )}
                    </TabsList>
                  </div>
                  {isExportEnabled && (
                    <TabsContent value="export">
                      <BookingForm shipmentType="export" key="export" serviceSettings={serviceSettings} />
                    </TabsContent>
                  )}
                  {isImportEnabled && (
                    <TabsContent value="import">
                       <BookingForm shipmentType="import" key="import" serviceSettings={serviceSettings} />
                    </TabsContent>
                  )}
                </Tabs>
              ) : (
                <div className="py-8 text-center text-muted-foreground">
                   <p>No shipping services are currently available. Please contact support.</p>
                </div>
              )}
            </CardContent>
        </Card>
    </div>
  )
}
