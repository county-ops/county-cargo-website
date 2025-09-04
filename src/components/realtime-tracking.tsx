
'use client'

import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Loader2 } from "lucide-react";


export function RealtimeTracking() {
    const [trackingNumber, setTrackingNumber] = useState('');
    const [trackingInfo, setTrackingInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleTrack = async () => {
        if(!trackingNumber) {
            setError('Please enter a tracking number.');
            return;
        }
        setIsLoading(true);
        setError('');
        setTrackingInfo(null);
        // Mock API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        if (trackingNumber === 'PN123456789') {
            setTrackingInfo({
                status: 'In Transit',
                location: 'Los Angeles, CA',
                estimatedDelivery: '2 days'
            } as any);
        } else {
            setError('Invalid tracking number. Please try again.');
        }

        setIsLoading(false);
    }


    return (
        <Card className="w-full max-w-md shadow-lg bg-card">
            <CardHeader>
                <CardTitle>Track your shipment</CardTitle>
            </CardHeader>
            <CardContent className="p-6 pt-0">
                <div className="space-y-4">
                     <Input 
                        type="text" 
                        placeholder="Tracking Number (e.g. PN123456789)" 
                        value={trackingNumber} 
                        onChange={(e) => setTrackingNumber(e.target.value)}
                    />
                    <Button className="w-full" onClick={handleTrack} disabled={isLoading}>
                        {isLoading ? <Loader2 className="animate-spin" /> : 'Track now'}
                    </Button>
                    {error && <p className="text-destructive text-sm">{error}</p>}
                    {trackingInfo && (
                        <div className="mt-4 p-4 bg-muted rounded-lg">
                            <h4 className="font-bold">Tracking Details</h4>
                            <p>Status: {(trackingInfo as any).status}</p>
                            <p>Location: {(trackingInfo as any).location}</p>
                            <p>Estimated Delivery: {(trackingInfo as any).estimatedDelivery}</p>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}
