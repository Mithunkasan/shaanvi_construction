'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/toast';

const contactSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  phone: z.string().optional(),
  subject: z.string().min(5, { message: 'Subject must be at least 5 characters.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const { toast } = useToast();
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    try {
      // Send data to server endpoint
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      if (res.ok) {
        toast({
          title: 'Message Sent Successfully',
          description: 'Thank you for reaching out. A studio representative will call you shortly.',
          type: 'success',
        });
        reset();
      } else {
        throw new Error();
      }
    } catch (e) {
      toast({
        title: 'Submission Failed',
        description: 'Unable to deliver message. Please call us directly.',
        type: 'error',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Studio Information Details */}
          <div className="space-y-8">
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-amber-500 mb-2">
                Connect With Us
              </p>
              <h2 className="text-3xl md:text-5xl font-black tracking-tight text-foreground">
                Let's Build Something Exceptional
              </h2>
              <p className="text-base text-muted-foreground mt-4 font-light leading-relaxed">
                Contact our design team to schedule initial project consultations, site property surveys, or structural evaluations.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="h-12 w-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 shrink-0">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Direct Call</p>
                  <p className="text-base font-bold text-foreground mt-0.5">+91 8438523322</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="h-12 w-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 shrink-0">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Studio Email</p>
                  <p className="text-base font-bold text-foreground mt-0.5">contact@shaanviconstruction.com</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="h-12 w-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 shrink-0">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Headquarters</p>
                  <p className="text-base font-bold text-foreground mt-0.5">Vadiveeswaram, Nagercoil</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Branch Office</p>
                  <p className="text-base font-bold text-foreground mt-0.5">Chennai, Tamil Nadu</p>
                </div>                
              </div>
            </div>
          </div>

          {/* Interactive Form Card */}
          <div className="bg-card border border-border/40 p-8 rounded-2xl shadow-sm glass">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Your Name *</Label>
                  <Input id="name" placeholder="John Doe" {...register('name')} />
                  {errors.name && <p className="text-xs text-rose-500">{errors.name.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input id="email" type="email" placeholder="john@example.com" {...register('email')} />
                  {errors.email && <p className="text-xs text-rose-500">{errors.email.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" placeholder="+1 (555) 123-4567" {...register('phone')} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject *</Label>
                  <Input id="subject" placeholder="New Villa Construction" {...register('subject')} />
                  {errors.subject && <p className="text-xs text-rose-500">{errors.subject.message}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message Inquiries *</Label>
                <Textarea id="message" rows={5} placeholder="Tell us about your spatial needs, property location, and estimated budget..." {...register('message')} />
                {errors.message && <p className="text-xs text-rose-500">{errors.message.message}</p>}
              </div>

              <Button type="submit" disabled={isSubmitting} variant="gold" className="w-full flex items-center justify-center gap-2 text-slate-950 font-bold py-6 rounded-lg cursor-pointer">
                {isSubmitting ? (
                  <span className="h-4 w-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Send className="h-4.5 w-4.5" />
                    Send Studio Message
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
export default ContactForm;
