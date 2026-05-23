
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Send, FlaskConical, Globe } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const defaultEstimateBody = `{
    "originAddress": "123 Main St, New York, NY, USA",
    "destinationAddress": "100 Allen Avenue, Ikeja, Lagos, Nigeria",
    "packages": [
        {
            "weight": 10,
            "length": 12,
            "width": 12,
            "height": 12,
            "description": "Box of clothes",
            "value": 20000
        }
    ]
}`;

const defaultCreateShipmentBody = `{
    "originAddress": "123 Main St, New York, NY, USA",
    "destinationAddress": "100 Allen Avenue, Ikeja, Lagos, Nigeria",
    "serviceType": "valueImport",
    "shipper": {
        "name": "Test Shipper",
        "email": "shipper@example.com",
        "phone": "123-456-7890"
    },
    "receiver": {
        "name": "Test Receiver",
        "email": "receiver@example.com",
        "phone": "08012345678"
    },
    "packages": [
        {
            "weight": 10,
            "length": 12,
            "width": 12,
            "height": 12,
            "description": "Box of clothes",
            "value": 20000
        }
    ]
}`;

export default function ApiTestPage() {
    const [apiKey, setApiKey] = useState('');
    const [env, setEnv] = useState<'production' | 'staging'>('staging');
    const [estimateBody, setEstimateBody] = useState(defaultEstimateBody);
    const [createShipmentBody, setCreateShipmentBody] = useState(defaultCreateShipmentBody);
    const [shipmentId, setShipmentId] = useState('');
    const [response, setResponse] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('estimate');

    const handleTestEndpoint = async (endpoint: string) => {
        if (!apiKey) {
            toast({ variant: 'destructive', title: 'API Key Missing', description: 'Provide a valid key.' });
            return;
        }

        setLoading(true);
        setResponse(null);

        try {
            let res: Response;
            const baseUrl = env === 'staging' ? '/api/v1/test' : '/api/v1';
            let url = '';
            const options: RequestInit = {
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
            };

            switch (endpoint) {
                case 'estimate':
                    url = `${baseUrl}/estimate`;
                    options.method = 'POST';
                    options.body = estimateBody;
                    break;
                case 'create':
                    url = `${baseUrl}/shipments`;
                    options.method = 'POST';
                    options.body = createShipmentBody;
                    break;
                case 'list':
                    url = `${baseUrl}/shipments`;
                    options.method = 'GET';
                    break;
            }

            res = await fetch(url, options);
            const result = await res.json();
            setResponse(JSON.stringify(result, null, 2));

            if (!res.ok) {
                 toast({ variant: 'destructive', title: `Error: ${res.status}`, description: result.error || 'Request failed.' });
            } else {
                toast({ title: 'Success', description: 'API call successful.' });
            }

        } catch (error: any) {
            setResponse(`// Error:\n${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col gap-4">
            <h1 className="font-semibold text-lg md:text-2xl">API Test Bed</h1>
            <Card>
                <CardHeader>
                    <CardTitle>Configure Environment</CardTitle>
                    <CardDescription>Select the environment and provide the corresponding API key.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label>Environment</Label>
                            <RadioGroup value={env} onValueChange={(v: any) => setEnv(v)} className="flex gap-4">
                                <Label htmlFor="staging" className="flex items-center gap-2 border p-3 rounded-lg cursor-pointer hover:bg-muted">
                                    <RadioGroupItem value="staging" id="staging" />
                                    <FlaskConical className="h-4 w-4 text-blue-600" /> Staging
                                </Label>
                                <Label htmlFor="production" className="flex items-center gap-2 border p-3 rounded-lg cursor-pointer hover:bg-muted">
                                    <RadioGroupItem value="production" id="production" />
                                    <Globe className="h-4 w-4 text-green-600" /> Production
                                </Label>
                            </RadioGroup>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="api-key">API Key</Label>
                            <Input
                                id="api-key"
                                value={apiKey}
                                onChange={(e) => setApiKey(e.target.value)}
                                placeholder={env === 'staging' ? "county_cargo_test_..." : "county_cargo_sk_..."}
                            />
                        </div>
                    </div>
                    
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="estimate">Get Estimate</TabsTrigger>
                            <TabsTrigger value="create">Create Shipment</TabsTrigger>
                            <TabsTrigger value="list">List Shipments</TabsTrigger>
                        </TabsList>
                        
                        <TabsContent value="estimate" className="mt-6 space-y-4">
                            <Textarea value={estimateBody} onChange={(e) => setEstimateBody(e.target.value)} rows={10} className="font-mono text-xs" />
                            <Button onClick={() => handleTestEndpoint('estimate')} disabled={loading}>
                                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
                                Test Estimate
                            </Button>
                        </TabsContent>

                        <TabsContent value="create" className="mt-6 space-y-4">
                            <Textarea value={createShipmentBody} onChange={(e) => setCreateShipmentBody(e.target.value)} rows={10} className="font-mono text-xs" />
                            <Button onClick={() => handleTestEndpoint('create')} disabled={loading}>
                                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
                                Test Create
                            </Button>
                        </TabsContent>

                        <TabsContent value="list" className="mt-6">
                            <Button onClick={() => handleTestEndpoint('list')} disabled={loading}>
                                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
                                Fetch All Shipments
                            </Button>
                        </TabsContent>
                        
                    </Tabs>
                </CardContent>
            </Card>

            {response && (
                <Card>
                    <CardHeader><CardTitle>Response</CardTitle></CardHeader>
                    <CardContent>
                        <pre className="mt-2 rounded-md bg-muted p-4 text-xs overflow-x-auto font-mono"><code>{response}</code></pre>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
