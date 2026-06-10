'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa6';

const contactMethods = [
    {
        icon: Mail,
        label: 'Email',
        value: 'sabdhocathurkuncoro@gmail.com',
        href: 'mailto:sabdhocathurkuncoro@gmail.com',
    },
    {
        icon: Phone,
        label: 'Phone',
        value: '+62 896 5346 3568',
        href: 'tel:+6289653463568',
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
        icon: FaInstagram,
        label: 'Instagram',
        href: 'https://www.instagram.com/sbdcknr/',
    },
];

export default function Contact() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

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
                            04 — Contact
                        </p>
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">
                            Get In Touch
                        </h2>
                        <p className="text-muted text-lg max-w-2xl">
                            I&apos;m always open to new opportunities, collaborations, and
                            interesting projects. Feel free to reach out.
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
                                className="surface rounded-lg p-6 hover:border-accent/40 transition-colors group block"
                                whileHover={{ y: -4 }}
                            >
                                <div className="inline-flex p-3 border border-white/10 rounded-lg mb-4 text-accent">
                                    <method.icon className="w-6 h-6" />
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
                        className="surface rounded-lg p-12 text-center"
                    >
                        <h3 className="text-3xl md:text-4xl font-bold mb-4">
                            Let&apos;s Build Something <span className="text-accent">Amazing</span> Together
                        </h3>
                        <p className="text-muted text-lg mb-8 max-w-2xl mx-auto">
                            Whether you have a project in mind or just want to chat about
                            technology, I&apos;d love to hear from you.
                        </p>

                        {/* Email CTA */}
                        <a
                            href="mailto:sabdhocathurkuncoro@gmail.com"
                            className="inline-flex items-center gap-3 px-8 py-4 bg-accent text-background rounded-lg font-semibold text-lg hover:bg-accent/90 transition-colors mb-8"
                        >
                            <Mail className="w-5 h-5" />
                            Send Me an Email
                        </a>

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

            {/* Footer */}
            <motion.footer
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="mt-20 text-center text-muted"
            >
                <div className="container mx-auto px-6">
                    <div className="border-t border-white/10 pt-8">
                        <p className="mb-2">
                            Designed & Built by <span className="text-accent font-semibold">Sabdho Cathur Kuncoro</span>
                        </p>
                        <p className="text-sm">
                            © {new Date().getFullYear()} All rights reserved.
                        </p>
                    </div>
                </div>
            </motion.footer>
        </section>
    );
}
