"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Mail, MapPin, Send, CheckCircle, AlertCircle } from "lucide-react";
import { toast } from "sonner";

// TODO: instead of useState form use react-hook-form to manage form state
// decide on strategy to handle emails/contact

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const ContactSection = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // Replace this with your actual form submission logic
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
        toast("Thank you for reaching out. I'll get back to you soon.");
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      setSubmitStatus("error");
      toast("Failed to send message");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = formData.name && formData.email && formData.subject && formData.message;

  return (
    <section id='contact' className='py-20'>
      <div className='container mx-auto px-4'>
        <div className='max-w-4xl mx-auto'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl md:text-4xl font-bold mb-4'>Get In Touch</h2>
            <p className='text-muted-foreground text-lg max-w-2xl mx-auto'>
              Have a project in mind or want to collaborate? I'd love to hear from you!
            </p>
          </div>

          <div className='grid md:grid-cols-2 gap-8'>
            {/* Contact Information */}
            <div className='space-y-6'>
              <div>
                <h3 className='text-xl font-semibold mb-4'>Let's Connect</h3>
                <p className='text-muted-foreground mb-6'>
                  I'm always open to discussing new opportunities, interesting projects, or just having a chat about
                  technology and development.
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
                <form onSubmit={handleSubmit} className='space-y-4'>
                  <div className='grid grid-cols-2 gap-4'>
                    <div className='space-y-2'>
                      <Label htmlFor='name'>Name *</Label>
                      <Input
                        id='name'
                        name='name'
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder='Your name'
                        required
                      />
                    </div>
                    <div className='space-y-2'>
                      <Label htmlFor='email'>Email *</Label>
                      <Input
                        id='email'
                        name='email'
                        type='email'
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder='email@example.com'
                        required
                      />
                    </div>
                  </div>

                  <div className='space-y-2'>
                    <Label htmlFor='subject'>Subject *</Label>
                    <Input
                      id='subject'
                      name='subject'
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="What's this about?"
                      required
                    />
                  </div>

                  <div className='space-y-2'>
                    <Label htmlFor='message'>Message *</Label>
                    <Textarea
                      id='message'
                      name='message'
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder='Tell me about your project or idea...'
                      rows={5}
                      required
                    />
                  </div>

                  <Button type='submit' className='w-full' disabled={!isFormValid || isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <div className='w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2' />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className='w-4 h-4 mr-2' />
                        Send Message
                      </>
                    )}
                  </Button>

                  {submitStatus === "success" && (
                    <div className='flex items-center gap-2 text-green-600 text-sm'>
                      <CheckCircle className='w-4 h-4' />
                      Message sent successfully!
                    </div>
                  )}

                  {submitStatus === "error" && (
                    <div className='flex items-center gap-2 text-red-600 text-sm'>
                      <AlertCircle className='w-4 h-4' />
                      Failed to send message. Please try again.
                    </div>
                  )}
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
