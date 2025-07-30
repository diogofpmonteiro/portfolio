"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Mail, MapPin, Send, Loader2 } from "lucide-react";
import { toast } from "sonner";

import emailjs from "@emailjs/browser";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ContactFormData, contactFormSchema } from "@/lib/zod-schemas";
import { env } from "@/lib/env";

const ContactSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const sendEmail = async () => {
    if (!formRef.current) return;

    try {
      const res = await emailjs.sendForm(
        env.NEXT_PUBLIC_EMAIL_SERVICE_ID,
        env.NEXT_PUBLIC_EMAIL_TEMPLATE_ID,
        formRef.current,
        {
          publicKey: env.NEXT_PUBLIC_EMAIL_PUBLIC_KEY,
        }
      );

      if (res.status === 200 || res.status === 202) {
        form.reset();
        toast.success("Thanks for reaching out!");
      } else {
        throw new Error("Failed to send");
      }
    } catch {
      throw new Error("Failed to send");
    }
  };

  const onSubmit = async () => {
    setIsSubmitting(true);

    try {
      await sendEmail();
    } catch {
      toast.error("Failed to send message");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id='contact' className='py-20 md:mb-44'>
      <div className='container mx-auto px-4'>
        <div className='max-w-4xl mx-auto'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl md:text-4xl font-bold mb-4'>Get In Touch</h2>
            <p className='text-muted-foreground text-lg max-w-2xl mx-auto'>
              Have a project in mind or want to collaborate? I&apos;d love to hear from you!
            </p>
          </div>

          <div className='grid md:grid-cols-2 gap-8'>
            {/* Contact Information */}
            <div className='space-y-6'>
              <div>
                <h3 className='text-xl font-semibold mb-4'>Let&apos;s Connect</h3>
                <p className='text-muted-foreground mb-6'>
                  I&apos;m always open to discussing new opportunities, interesting projects, or just having a chat
                  about technology and development.
                </p>
              </div>

              <div className='space-y-4'>
                <div className='flex items-center gap-3'>
                  <div className='w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center'>
                    <Mail className='w-5 h-5 text-primary' />
                  </div>
                  <div>
                    <p className='font-medium'>Email</p>
                    <a
                      href='mailto:diogopmonteiro_@hotmail.com'
                      className='text-muted-foreground hover:text-primary transition-colors'>
                      diogopmonteiro_@hotmail.com
                    </a>
                  </div>
                </div>

                <div className='flex items-center gap-3'>
                  <div className='w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center'>
                    <MapPin className='w-5 h-5 text-primary' />
                  </div>
                  <div>
                    <p className='font-medium'>Location</p>
                    <p className='text-muted-foreground'>Lisbon, Portugal</p>
                  </div>
                </div>
              </div>

              <div className='pt-6'>
                <p className='text-sm text-muted-foreground mb-3'>Response time</p>
                <Badge variant='secondary' className='text-sm'>
                  Usually within 24 hours
                </Badge>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Send me a message</CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form ref={formRef} onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                    <div className='grid grid-cols-2 gap-4'>
                      <FormField
                        control={form.control}
                        name='name'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name *</FormLabel>
                            <FormControl>
                              <Input placeholder='Your name' {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name='email'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email *</FormLabel>
                            <FormControl>
                              <Input type='email' placeholder='email@example.com' {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name='subject'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Subject *</FormLabel>
                          <FormControl>
                            <Input placeholder="What's this about?" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name='message'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message *</FormLabel>
                          <FormControl>
                            <Textarea placeholder='Tell me about your project or idea...' rows={5} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button type='submit' className='w-full' disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <Loader2 className='size-4 mr-2 animate-spin' />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className='w-4 h-4 mr-2' />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
