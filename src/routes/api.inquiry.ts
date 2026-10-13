import { createFileRoute } from '@tanstack/react-router';
import { inquirySchema } from '@/lib/inquiry-schema';
export const Route = createFileRoute('/api/inquiry')({server:{handlers:{POST:async({request})=>{
 const origin=request.headers.get('origin');
 if(origin && origin!==new URL(request.url).origin) return Response.json({sent:false,code:'invalid_origin'},{status:403});
 if(!request.headers.get('content-type')?.includes('application/json')) return Response.json({sent:false,code:'invalid_input'},{status:400});
 const raw=await request.text();
 if(raw.length>12000) return Response.json({sent:false,code:'invalid_input'},{status:413});
 let input:unknown;try{input=JSON.parse(raw);}catch{return Response.json({sent:false,code:'invalid_input'},{status:400});}
 const parsed=inquirySchema.safeParse(input);
 if(!parsed.success) return Response.json({sent:false,code:'invalid_input'},{status:400});
 // No sender domain is configured. Do not discard the inquiry or fake delivery.
 // Once the owned domain is configured, scaffold the managed email templates and
 // call its sendTemplateEmail here with a fixed recipient, fixed template, and
 // idempotencyKey `portfolio-inquiry-${parsed.data.submissionId}`.
 // The provider handles delivery rate limits, suppression, and duplicate sends.
 // Return sent:true ONLY when that helper confirms sent:true.
 return Response.json({sent:false,code:'email_not_configured',message:'Email sending is not configured. Please contact Baraa directly or retry after setup.'},{status:503,headers:{'Cache-Control':'no-store'}});
}}}});
