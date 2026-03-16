import React from 'react'
import { Mail, Phone, Globe, ShieldCheck } from 'lucide-react'

function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Product Info */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold text-white mb-4">Edusafa</h3>
            <p className="text-sm text-slate-400 leading-relaxed max-w-md">
              Edusafa is Kerala’s first modern Madrasa Management Software,
              built to deliver simplicity, elegance, secure operations, and
              powerful functionality. With its premium interface and
              thoughtfully designed features, it transforms the way madrasas
              handle administration and academic management.
            </p>
          </div>

          {/* Legal + Contact */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">
              Legal
            </h4>
            <ul className="space-y-3 text-sm mb-4">
              <li>
                <a
                  href="/privacy"
                  className="hover:text-white transition-colors no-underline"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="/terms"
                  className="hover:text-white transition-colors no-underline"
                >
                  Terms of Service
                </a>
              </li>
            </ul>

            <div className="space-y-2 text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                edusafahere@gmail.com
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                +91 8848034231
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-slate-800">
        <div
          className="max-w-7xl mx-auto px-4 py-4
                  flex flex-col md:flex-row 
                  items-center md:items-center 
                  justify-center md:justify-between 
                  text-center md:text-left
                  gap-3 md:gap-4 
                  text-xs text-slate-500"
        >
          {/* Copyright */}
          <p>© {new Date().getFullYear()} Edusafa. All rights reserved.</p>

          {/* Right Section */}
          <div
            className="flex flex-col sm:flex-row 
                    items-center 
                    gap-2 sm:gap-4"
          >
            <span className="flex items-center gap-1 text-[13px] md:text-sm">
              <ShieldCheck className="w-4 h-4" />
              Enterprise-Grade Security
            </span>

            <span className="text-[13px] md:text-sm">
              Built & Maintained by AioneSpark TechHive LLP
            </span>

            <span className="text-[13px] md:text-sm text-green-800">
              Version 1.0.3 Madrasa edition
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
