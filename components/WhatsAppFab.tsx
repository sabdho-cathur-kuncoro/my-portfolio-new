'use client';

import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

export default function WhatsAppFab() {
    const phoneNumber = '6289653463568'; // Your phone number without + or spaces
    const message = encodeURIComponent('Hi! I found your portfolio and would like to connect.');
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

    return (
        <motion.a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50 group"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: 1
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
        >
            <div className="relative">
                {/* Main button */}
                <div className="surface rounded-full p-4 text-accent hover:border-accent/40 transition-colors">
                    <MessageCircle className="w-6 h-6" strokeWidth={2} />
                </div>

                {/* Tooltip */}
                <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                    <div className="surface text-foreground px-3 py-2 rounded-lg text-sm font-medium">
                        Chat on WhatsApp
                    </div>
                </div>
            </div>
        </motion.a>
    );
}
