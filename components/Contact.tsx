'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Mail, MapPin, Phone, Copy, Check } from 'lucide-react';
import { FaGithub, FaLinkedin, FaInstagram, FaWhatsapp } from 'react-icons/fa6';

const contactMethods = [
    {
        icon: Mail,
        label: 'Email',
        value: 'sabdhocathurkuncoro@gmail.com',
        href: 'mailto:sabdhocathurkuncoro@gmail.com',
    },
    {
        icon: Phone,
        label: 'Phone & WhatsApp',
        value: '+62 896 5346 3568',
        href: 'https://wa.me/6289653463568',
    },
    {
        icon: MapPin,
        label: 'Location',
        value: 'Jakarta, Indonesia',
        href: '#',
    },
];

const socialLinks = [
    {
        icon: FaGithub,
        label: 'GitHub',
        href: 'https://github.com/sabdho-cathur-kuncoro',
    },
    {
        icon: FaLinkedin,
        label: 'LinkedIn',
        href: 'https://linkedin.com/in/sabdho-kuncoro',
    },
    {
        icon: FaWhatsapp,
        label: 'WhatsApp',
        href: 'https://wa.me/6289653463568',
    },
    {
        icon: FaInstagram,
        label: 'Instagram',
        href: 'https://www.instagram.com/sbdcknr/',
    },
];

export default function Contact() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    const [copied, setCopied] = useState(false);

    const handleCopyEmail = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        navigator.clipboard.writeText('sabdhocathurkuncoro@gmail.com');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <section id="contact" ref={ref} className="py-20 md:py-32 relative">
            <div className="container mx-auto px-6">
                <div className="max-w-6xl mx-auto">
                    {/* Section Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6 }}
                        className="mb-12"
                    >
                        <p className="font-mono text-xs uppercase tracking-widest text-accent mb-4">
                            04 / Contact
                        </p>
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">
                            Get In Touch
                        </h2>
                        <p className="text-muted text-lg max-w-2xl">
                            Available for full-time front-end engineering roles and select contract work.
                            Reach out through any of the channels below.
                        </p>
                    </motion.div>

                    {/* Contact Cards */}
                    <div className="grid md:grid-cols-3 gap-6 mb-16">
                        {contactMethods.map((method, index) => (
                            <motion.a
                                key={method.label}
                                href={method.href}
                                initial={{ opacity: 0, y: 30 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="surface rounded-lg p-6 hover:border-accent/40 transition-colors group block relative"
                                whileHover={{ y: -4 }}
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className="inline-flex p-3 border border-white/10 rounded-lg text-accent">
                                        <method.icon className="w-6 h-6" />
                                    </div>
                                    {method.label === 'Email' && (
                                        <button
                                            type="button"
                                            onClick={handleCopyEmail}
                                            title="Copy email address"
                                            className="px-2.5 py-1 border border-white/10 rounded-md text-muted hover:text-accent hover:border-accent/40 transition-colors text-xs flex items-center gap-1.5 font-mono"
                                        >
                                            {copied ? (
                                                <>
                                                    <Check className="w-3.5 h-3.5 text-accent" />
                                                    <span className="text-accent">Copied</span>
                                                </>
                                            ) : (
                                                <>
                                                    <Copy className="w-3.5 h-3.5" />
                                                    <span>Copy</span>
                                                </>
                                            )}
                                        </button>
                                    )}
                                </div>
                                <h3 className="font-mono text-xs uppercase tracking-widest text-muted mb-2">
                                    {method.label}
                                </h3>
                                <p className="text-foreground font-medium group-hover:text-accent transition-colors">
                                    {method.value}
                                </p>
                            </motion.a>
                        ))}
                    </div>

                    {/* CTA Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="surface rounded-lg p-8 md:p-12 text-center"
                    >
                        <h3 className="text-3xl md:text-4xl font-bold mb-4">
                            Have an opening or project in <span className="text-accent">mind</span>?
                        </h3>
                        <p className="text-muted text-lg mb-8 max-w-2xl mx-auto">
                            I&apos;m currently considering front-end opportunities and select mobile projects. Reach out directly via email or message.
                        </p>

                        {/* Email CTA & Copy Button */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                            <a
                                href="mailto:sabdhocathurkuncoro@gmail.com"
                                className="inline-flex items-center gap-3 px-8 py-4 bg-accent text-background rounded-lg font-semibold text-lg hover:bg-accent/90 transition-colors w-full sm:w-auto justify-center"
                            >
                                <Mail className="w-5 h-5" />
                                Send Me an Email
                            </a>
                            <button
                                type="button"
                                onClick={handleCopyEmail}
                                className="inline-flex items-center gap-2.5 px-6 py-4 border border-white/10 rounded-lg text-foreground hover:border-accent hover:text-accent transition-colors w-full sm:w-auto justify-center text-sm font-mono"
                            >
                                {copied ? (
                                    <>
                                        <Check className="w-4 h-4 text-accent" />
                                        <span className="text-accent">Copied to Clipboard!</span>
                                    </>
                                ) : (
                                    <>
                                        <Copy className="w-4 h-4" />
                                        <span>Copy Email Address</span>
                                    </>
                                )}
                            </button>
                        </div>

                        {/* Social Links */}
                        <div className="flex justify-center gap-4">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-4 border border-white/10 rounded-lg hover:border-accent hover:text-accent transition-colors"
                                    aria-label={social.label}
                                >
                                    <social.icon className="w-6 h-6" />
                                </a>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Footer Colophon */}
            <motion.footer
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="mt-20 text-muted"
            >
                <div className="container mx-auto px-6">
                    <div className="border-t border-white/10 pt-8 pb-12 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
                        <p className="text-muted text-center sm:text-left">
                            Built with Next.js 16 (App Router), TypeScript &amp; Tailwind CSS. Set in Inter &amp; JetBrains Mono.
                        </p>
                        <p className="text-muted text-center sm:text-right shrink-0">
                            © {new Date().getFullYear()} Sabdho Cathur Kuncoro.
                        </p>
                    </div>
                </div>
            </motion.footer>
        </section>
    );
}
