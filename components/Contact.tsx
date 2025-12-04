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
        color: 'from-accent-purple to-accent-pink',
    },
    {
        icon: Phone,
        label: 'Phone',
        value: '+62 896 5346 3568',
        href: 'tel:+6289653463568',
        color: 'from-accent-cyan to-accent-green',
    },
    {
        icon: MapPin,
        label: 'Location',
        value: 'Jakarta, Indonesia',
        href: '#',
        color: 'from-accent-pink to-accent-orange',
    },
];

const socialLinks = [
    {
        icon: FaGithub,
        label: 'GitHub',
        href: 'https://github.com/sabdho-cathur-kuncoro',
        color: 'hover:text-accent-purple',
    },
    {
        icon: FaLinkedin,
        label: 'LinkedIn',
        href: 'https://linkedin.com/in/sabdho-kuncoro',
        color: 'hover:text-accent-cyan',
    },
    {
        icon: FaInstagram,
        label: 'Instagram',
        href: 'https://www.instagram.com/sbdcknr/',
        color: 'hover:text-accent-pink',
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
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">
                            Get In <span className="gradient-text">Touch</span>
                        </h2>
                        <div className="w-20 h-1 bg-gradient-cyber mx-auto mb-6"></div>
                        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                            I'm always open to new opportunities, collaborations, and interesting projects.
                            Feel free to reach out!
                        </p>
                    </motion.div>

                    {/* Contact Cards */}
                    <div className="grid md:grid-cols-3 gap-8 mb-16">
                        {contactMethods.map((method, index) => (
                            <motion.a
                                key={method.label}
                                href={method.href}
                                initial={{ opacity: 0, y: 30 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="glass rounded-2xl p-8 text-center hover:bg-white/10 transition-all group block"
                                whileHover={{ y: -10 }}
                            >
                                <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${method.color} mb-4`}>
                                    <method.icon className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-lg font-semibold mb-2 text-gray-300">
                                    {method.label}
                                </h3>
                                <p className="text-foreground font-medium group-hover:text-accent-cyan transition-colors">
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
                        className="glass rounded-3xl p-12 text-center relative overflow-hidden"
                    >
                        {/* Background Decoration */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-accent-purple/20 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent-cyan/20 rounded-full blur-3xl"></div>

                        <div className="relative z-10">
                            <h3 className="text-3xl md:text-4xl font-bold mb-4">
                                Let's Build Something <span className="gradient-text">Amazing</span> Together
                            </h3>
                            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                                Whether you have a project in mind or just want to chat about technology,
                                I'd love to hear from you.
                            </p>

                            {/* Email CTA */}
                            <motion.a
                                href="mailto:sabdhocathurkuncoro@gmail.com"
                                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-cyber text-white rounded-lg font-semibold text-lg shadow-lg hover:shadow-accent-purple/50 transition-shadow mb-8"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Mail className="w-5 h-5" />
                                Send Me an Email
                            </motion.a>

                            {/* Social Links */}
                            <div className="flex justify-center gap-6">
                                {socialLinks.map((social) => (
                                    <motion.a
                                        key={social.label}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`p-4 glass rounded-lg transition-all ${social.color}`}
                                        whileHover={{ y: -5, scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                        aria-label={social.label}
                                    >
                                        <social.icon className="w-6 h-6" />
                                    </motion.a>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Footer */}
            <motion.footer
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="mt-20 text-center text-gray-400"
            >
                <div className="container mx-auto px-6">
                    <div className="border-t border-white/10 pt-8">
                        <p className="mb-2">
                            Designed & Built by <span className="text-accent-cyan font-semibold">Sabdho Cathur Kuncoro</span>
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
