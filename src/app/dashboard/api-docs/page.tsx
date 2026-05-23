'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { useEffect } from "react";
import { Webhook, FlaskConical, ShieldAlert, Globe } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { cn } from "@/lib/utils";

const CodeBlock = ({ children, language = 'json' }: { children: React.ReactNode, language?: string }) => (
    <pre className="mt-2 rounded-md bg-muted p-4 text-sm overflow-x-auto">
        <code className={`language-${language}`}>{children}</code>
    </pre>
);

const EndpointInfo = ({ method, path, testPath }: { method: string, path: string, testPath?: string }) => (
    <div className="space-y-4 mb-6">
        <div className="space-y-2">
            <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className={cn(
                    "font-bold",
                    method === 'GET' ? "text-blue-700 bg-blue-50 border-blue-200" :
                    method === 'POST' ? "text-green-700 bg-green-50 border-green-200" :
                    method === 'DELETE' ? "text-red-700 bg-red-50 border-red-200" : ""
                )}>{method}</Badge>
            </div>
            <Label className="text-xs font-semibold uppercase text-muted-foreground">Endpoints</Label>
            <div className="space-y-1">
                {testPath && (
                    <div className="flex items-center gap-2 text-sm bg-blue-50/50 p-2 rounded border border-blue-100 border-dashed">
                        <FlaskConical className="h-3 w-3 text-blue-600" />
                        <span className="font-bold text-xs uppercase w-20 text-blue-700">Staging:</span>
                        <code className="text-xs font-mono break-all text-blue-800">https://api.countycargo.com{testPath}</code>
                    </div>
                )}
                <div className="flex items-center gap-2 text-sm bg-muted p-2 rounded border border-dashed">
                    <Globe className="h-3 w-3 text-muted-foreground" />
                    <span className="font-bold text-xs uppercase w-20">Production:</span>
                    <code className="text-xs font-mono break-all">https://api.countycargo.com{path}</code>
                </div>
            </div>
        </div>
    </div>
);

export default function ApiDocsPage() {
    useEffect(() => {
        document.title = "API Documentation | County Cargo";
    }, []);
    
    const estimateRequestBody = `{
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

    const createShipmentRequestBody = `{
  "originAddress": "123 Main St, New York, NY, USA",
  "destinationAddress": "100 Allen Avenue, Ikeja, Lagos, Nigeria",
  "serviceType": "valueImport",
  "shipper": {
    "name": "Jane Doe",
    "email": "jane@example.com",
    "phone": "+1 234 567 890"
  },
  "receiver": {
    "name": "John Smith",
    "email": "john@example.ng",
    "phone": "+234 801 234 5678"
  },
  "packages": [
    {
      "weight": 10,
      "length": 12,
      "width": 12,
      "height": 12,
      "description": "Personal items",
      "value": 25000
    }
  ]
}`;

    return (
        <div className="flex flex-col gap-8">
            <div className="flex items-center justify-between gap-4">
                <h1 className="font-semibold text-lg md:text-2xl">API Documentation</h1>
                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">v1.0.0</Badge>
            </div>

            <Alert className="bg-blue-50 border-blue-200">
                <FlaskConical className="h-4 w-4 text-blue-600" />
                <AlertTitle className="text-blue-800">Staging API Recommended</AlertTitle>
                <AlertDescription className="text-blue-700">
                    Always use your <strong className="font-bold">Test API Key</strong> with the <code className="bg-blue-100 px-1 rounded">/api/v1/test/</code> endpoints during development. No real shipments will be processed.
                </AlertDescription>
            </Alert>

            <Card id="authentication" className="scroll-mt-20">
                <CardHeader>
                    <CardTitle>Authentication</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                       Provide your API key in the <code className="text-xs bg-muted px-1 py-0.5 rounded-sm">Authorization</code> header as a Bearer token.
                    </p>
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2 border rounded-lg p-4 bg-blue-50/20">
                            <h4 className="text-sm font-bold uppercase tracking-tight text-blue-700">Staging / Test</h4>
                            <p className="text-xs text-muted-foreground">Use for integration testing.</p>
                            <CodeBlock language="bash">{`Authorization: Bearer county_cargo_test_...`}</CodeBlock>
                        </div>
                        <div className="space-y-2 border rounded-lg p-4 bg-muted/30">
                            <h4 className="text-sm font-bold uppercase tracking-tight">Production</h4>
                            <p className="text-xs text-muted-foreground">Use for real transactions.</p>
                            <CodeBlock language="bash">{`Authorization: Bearer county_cargo_sk_...`}</CodeBlock>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card id="webhooks" className="scroll-mt-20">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Webhook className="h-5 w-5" /> Webhooks</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <section>
                        <h3 className="text-base font-semibold mb-2">Overview</h3>
                        <p className="text-sm text-muted-foreground">
                            Webhooks allow you to receive real-time notifications about your shipments. We will send a POST request with the event details to your configured URL.
                        </p>
                    </section>
                    <section>
                        <h3 className="text-base font-semibold mb-2">Payload Example</h3>
                        <CodeBlock>{`{
  "event": "shipment.updated",
  "data": {
    "id": "US-123456",
    "status": "In Transit",
    "paymentStatus": "Paid"
  }
}`}</CodeBlock>
                    </section>
                </CardContent>
            </Card>

            <Card id="get-estimate" className="scroll-mt-20">
                <CardHeader><CardTitle>Get Shipping Estimate</CardTitle></CardHeader>
                <CardContent>
                    <EndpointInfo method="POST" path="/api/v1/estimate" testPath="/api/v1/test/estimate" />
                    <h3 className="text-sm font-semibold mb-2">Request Body</h3>
                    <CodeBlock>{estimateRequestBody}</CodeBlock>
                </CardContent>
            </Card>

            <Card id="create-shipment" className="scroll-mt-20">
                <CardHeader><CardTitle>Create Shipment</CardTitle></CardHeader>
                <CardContent>
                    <EndpointInfo method="POST" path="/api/v1/shipments" testPath="/api/v1/test/shipments" />
                    <h3 className="text-sm font-semibold mb-2">Request Body</h3>
                    <CodeBlock>{createShipmentRequestBody}</CodeBlock>
                </CardContent>
            </Card>

            <Card id="get-shipment" className="scroll-mt-20">
                <CardHeader><CardTitle>Get Shipment Details</CardTitle></CardHeader>
                <CardContent>
                    <EndpointInfo method="GET" path="/api/v1/shipments/{id}" />
                    <p className="text-sm text-muted-foreground mb-4">Returns the status and details of a specific shipment.</p>
                </CardContent>
            </Card>

            <Card id="list-shipments" className="scroll-mt-20">
                <CardHeader><CardTitle>List All Shipments</CardTitle></CardHeader>
                <CardContent>
                    <EndpointInfo method="GET" path="/api/v1/shipments" testPath="/api/v1/test/shipments" />
                    <p className="text-sm text-muted-foreground mb-4">Returns a list of all shipments created with your API key.</p>
                </CardContent>
            </Card>

            <Card id="cancel-shipment" className="scroll-mt-20">
                <CardHeader><CardTitle>Cancel Shipment</CardTitle></CardHeader>
                <CardContent>
                    <EndpointInfo method="DELETE" path="/api/v1/shipments/{id}" />
                    <p className="text-sm text-muted-foreground mb-4">Cancels a shipment if it is still in "Unpaid" or "Awaiting Confirmation" status.</p>
                </CardContent>
            </Card>



            <Card id="bulk-estimate" className="scroll-mt-20">
                <CardHeader><CardTitle>Bulk Estimate</CardTitle></CardHeader>
                <CardContent>
                    <EndpointInfo method="POST" path="/api/v1/estimate/bulk" />
                    <p className="text-sm text-muted-foreground mb-4">Pass an array of estimate requests to get multiple quotes at once.</p>
                    <CodeBlock>{`[
  { "originAddress": "...", "destinationAddress": "...", "packages": [...] },
  { "originAddress": "...", "destinationAddress": "...", "packages": [...] }
]`}</CodeBlock>
                </CardContent>
            </Card>

            <Card id="bulk-create" className="scroll-mt-20">
                <CardHeader><CardTitle>Bulk Create Shipments</CardTitle></CardHeader>
                <CardContent>
                    <EndpointInfo method="POST" path="/api/v1/shipments/bulk" />
                    <p className="text-sm text-muted-foreground mb-4">Create multiple shipments in a single request. Max 10 per request.</p>
                </CardContent>
            </Card>

            <Alert variant="destructive">
                <ShieldAlert className="h-4 w-4" />
                <AlertTitle>Important Security Notice</AlertTitle>
                <AlertDescription>
                    Never share your Production API Key. If your key is compromised, immediately regenerate it in your profile settings to invalidate the old one.
                </AlertDescription>
            </Alert>
        </div>
    );
}
