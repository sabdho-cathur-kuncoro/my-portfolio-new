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
                {/* Pulsing ring effect */}
                <motion.div
                    className="absolute inset-0 bg-green-500 rounded-full"
                    animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.5, 0, 0.5],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />

                {/* Main button */}
                <div className="relative bg-gradient-to-br from-green-400 to-green-600 rounded-full p-4 shadow-lg shadow-green-500/50 hover:shadow-green-500/70 transition-shadow">
                    <MessageCircle className="w-7 h-7 text-white" strokeWidth={2.5} />
                </div>

                {/* Tooltip */}
                <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                    <div className="bg-gray-900 text-white px-3 py-2 rounded-lg text-sm font-medium shadow-xl">
                        Chat on WhatsApp
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 rotate-45 w-2 h-2 bg-gray-900" />
                    </div>
                </div>
            </div>
        </motion.a>
    );
}
