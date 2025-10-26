"use client";
import { motion } from "framer-motion";
import DotPattern from "./magicui/dot-pattern";
import Sparkles from "./magicui/sparkles";
import { useMemo } from "react";

export default function ContactSection() {
  const socialLinks = useMemo(() => [
    {
      icon: "fab fa-github",
      label: "GitHub",
      href: "https://github.com/Abdhsrag",
      color: "hover:text-gray-400",
      bgColor: "group-hover:bg-gray-400/10",
    },
    {
      icon: "fab fa-linkedin",
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/abdelrahmanmohamedosama",
      color: "hover:text-blue-500",
      bgColor: "group-hover:bg-blue-500/10",
    },
    {
      icon: "fab fa-whatsapp",
      label: "WhatsApp",
      href: "https://wa.me/201277116459",
      color: "hover:text-green-500",
      bgColor: "group-hover:bg-green-500/10",
    },
  ], []);

  return (
    <section id="contact" className="relative py-20 sm:py-32 px-4 sm:px-6 overflow-hidden">
      <DotPattern density="low" />
      <Sparkles density="low" />
      <div className="absolute inset-0 bg-gradient-to-b from-black via-cyan-950/5 to-black" />

      <div className="absolute top-1/2 left-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-cyan-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-purple-500/10 rounded-full blur-3xl" />

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center"
        >
          <motion.h2 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-4 sm:mb-6 px-4"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <span className="text-gradient">Let's Connect</span>
          </motion.h2>
          <motion.div 
            className="w-16 sm:w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto rounded-full mb-8 sm:mb-12"
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          />

          <motion.p 
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-300 mb-8 sm:mb-12 leading-relaxed px-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
          >
            Have a project in mind? Let's build something{" "}
            <span className="text-cyan-400 font-bold">amazing</span> together!
          </motion.p>

          <motion.div 
            className="grid grid-cols-3 sm:flex sm:flex-wrap justify-center gap-4 sm:gap-6 mb-8 sm:mb-12 px-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            viewport={{ once: true }}
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className={`group relative w-full sm:w-24 h-20 sm:h-24 rounded-xl sm:rounded-2xl glass-card flex flex-col items-center justify-center transition-all ${social.color}`}
                title={social.label}
              >
                <div className={`absolute inset-0 rounded-xl sm:rounded-2xl opacity-0 transition-opacity ${social.bgColor}`} />
                <i className={`${social.icon} text-2xl sm:text-3xl md:text-4xl mb-1 sm:mb-2 relative z-10`} />
                <span className="text-[10px] sm:text-xs text-gray-400 group-hover:text-current relative z-10 transition-colors">
                  {social.label}
                </span>
              </motion.a>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            viewport={{ once: true }}
            className="glass-card p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl mx-4 sm:mx-auto sm:inline-block max-w-full sm:max-w-none"
          >
            <p className="text-sm sm:text-base text-gray-400 mb-2 sm:mb-3">Or email me directly at:</p>
            <motion.a
              href="mailto:abdhsrag280@gmail.com"
              whileHover={{ scale: 1.05 }}
              className="text-base sm:text-xl md:text-2xl font-bold text-gradient hover:opacity-80 transition-opacity break-all sm:break-normal"
            >
              abdhsrag280@gmail.com
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            viewport={{ once: true }}
            className="mt-8 sm:mt-12 px-4"
          >
            <motion.a
              href="mailto:abdhsrag280@gmail.com"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full font-bold text-sm sm:text-base md:text-lg shadow-lg hover:shadow-cyan-500/50 transition-all"
            >
              <i className="fas fa-envelope text-base sm:text-lg md:text-xl" />
              <span className="whitespace-nowrap">Send Me a Message</span>
              <i className="fas fa-arrow-right text-sm sm:text-base" />
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}