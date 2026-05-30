"use client";

import React, { useState, useEffect } from "react";
import { 
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// --- Types ---
type SectionType = 'HeaderNavigation' | 'HeroBanner' | 'StatsRibbon' | 'AboutSection' | 'ProgramsGrid' | 'UpcomingEvents' | 'RecruiterLogos' | 'Testimonials' | 'LatestNews' | 'LeadCaptureForm' | 'Footer' | 'PricingTable' | 'TextContent';

interface Section {
  id: string;
  type: SectionType;
  props: Record<string, any>;
  isHidden?: boolean;
}

// --- Block Renderers (Premium Template) ---
export const Blocks: Record<string, React.FC<{ props: any }>> = {
  HeaderNavigation: ({ props }: { props: any }) => (
    <header className="bg-white dark:bg-black border-b border-zinc-100 dark:border-zinc-900 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3 cursor-pointer">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">
            {props.logoIcon || "🏛️"}
          </div>
          <span className="font-bold text-xl tracking-tight dark:text-white">
            {props.logoText || "Institution"}
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          <a href="/site/home" className="text-sm font-semibold text-zinc-600 hover:text-blue-600 dark:text-zinc-300 transition-colors">Home</a>
          
          <div className="relative group cursor-pointer py-8">
            <span className="text-sm font-semibold text-zinc-600 hover:text-blue-600 dark:text-zinc-300 transition-colors flex items-center gap-1">
              About Us <span className="text-[10px]">▼</span>
            </span>
            <div className="absolute top-20 left-0 w-48 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all transform translate-y-2 group-hover:translate-y-0">
              <a href="/site/about" className="block px-4 py-3 text-sm text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:text-blue-600 transition-colors rounded-t-xl">Overview</a>
              <a href="/site/about-leadership" className="block px-4 py-3 text-sm text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:text-blue-600 transition-colors">Leadership Team</a>
              <a href="/site/about-history" className="block px-4 py-3 text-sm text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:text-blue-600 transition-colors rounded-b-xl">History & Mission</a>
            </div>
          </div>

          <div className="relative group cursor-pointer py-8">
            <span className="text-sm font-semibold text-zinc-600 hover:text-blue-600 dark:text-zinc-300 transition-colors flex items-center gap-1">
              Academics <span className="text-[10px]">▼</span>
            </span>
            <div className="absolute top-20 left-0 w-48 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all transform translate-y-2 group-hover:translate-y-0">
              <a href="/site/academics" className="block px-4 py-3 text-sm text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:text-blue-600 transition-colors rounded-t-xl">Overview</a>
              <a href="/site/academics-programs" className="block px-4 py-3 text-sm text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:text-blue-600 transition-colors">Programs & Courses</a>
              <a href="/site/academics-faculty" className="block px-4 py-3 text-sm text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:text-blue-600 transition-colors rounded-b-xl">Faculty</a>
            </div>
          </div>

          <div className="relative group cursor-pointer py-8">
            <span className="text-sm font-semibold text-zinc-600 hover:text-blue-600 dark:text-zinc-300 transition-colors flex items-center gap-1">
              Admissions <span className="text-[10px]">▼</span>
            </span>
            <div className="absolute top-20 left-0 w-48 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all transform translate-y-2 group-hover:translate-y-0">
              <a href="/site/admissions-info" className="block px-4 py-3 text-sm text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:text-blue-600 transition-colors rounded-t-xl">Overview</a>
              <a href="/site/admissions-fees" className="block px-4 py-3 text-sm text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:text-blue-600 transition-colors">Fee Structure</a>
              <a href="/site/admissions-apply" className="block px-4 py-3 text-sm text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:text-blue-600 transition-colors rounded-b-xl">Apply Now</a>
            </div>
          </div>

          <div className="relative group cursor-pointer py-8">
            <span className="text-sm font-semibold text-zinc-600 hover:text-blue-600 dark:text-zinc-300 transition-colors flex items-center gap-1">
              Campus Life <span className="text-[10px]">▼</span>
            </span>
            <div className="absolute top-20 left-0 w-48 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all transform translate-y-2 group-hover:translate-y-0">
              <a href="/site/campus-life" className="block px-4 py-3 text-sm text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:text-blue-600 transition-colors rounded-t-xl">Overview</a>
              <a href="/site/campus-events" className="block px-4 py-3 text-sm text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:text-blue-600 transition-colors">Events & News</a>
            </div>
          </div>
          
          <a href="/site/student-services" className="text-sm font-semibold text-zinc-600 hover:text-blue-600 dark:text-zinc-300 transition-colors">Student Services</a>
        </nav>

        {/* CTA & Mobile Menu */}
        <div className="flex items-center gap-4">
          <a href="/site/admissions-apply" className="hidden md:block px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-full transition-colors shadow-sm cursor-pointer">
            {props.ctaText || "Apply Now"}
          </a>
          <button className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 bg-zinc-50 dark:bg-zinc-900 rounded-lg">
            <span className="w-5 h-0.5 bg-zinc-600 dark:bg-zinc-400"></span>
            <span className="w-5 h-0.5 bg-zinc-600 dark:bg-zinc-400"></span>
            <span className="w-5 h-0.5 bg-zinc-600 dark:bg-zinc-400"></span>
          </button>
        </div>
      </div>
    </header>
  ),
  HeroBanner: ({ props }: { props: any }) => (
    <div 
      className="relative bg-black text-white min-h-[600px] flex flex-col items-center justify-center text-center overflow-hidden"
      style={{
        backgroundImage: props.bgVideoUrl 
          ? 'none' 
          : `url(${typeof window !== 'undefined' && window.innerWidth < 768 && props.mobileBgImageUrl ? props.mobileBgImageUrl : (props.bgImageUrl || '')})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Background Video */}
      {props.bgVideoUrl && (
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          src={props.bgVideoUrl}
        />
      )}
      <div className="absolute inset-0 bg-black" style={{ opacity: props.overlayOpacity || 0.6 }} />
      <div className="relative z-10 text-center px-4 max-w-4xl">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">{props.title || "Excellence in Education."}</h1>
        <p className="text-lg md:text-2xl text-zinc-300 max-w-2xl mx-auto font-light leading-relaxed">
          {props.subtitle || "A world-class curriculum designed to shape the innovators and leaders of tomorrow."}
        </p>
        <a 
          href="/site/admissions-apply"
          className="mt-8 px-8 py-4 bg-white text-black rounded-full font-semibold text-sm hover:scale-105 transition-transform inline-block"
        >
          {props.ctaText || "Apply Now"}
        </a>
      </div>
    </div>
  ),
  StatsRibbon: ({ props }: { props: any }) => (
    <div className="py-12 border-y border-zinc-100 dark:border-zinc-900 bg-white dark:bg-black">
      <div className="max-w-6xl mx-auto px-8 grid grid-cols-2 md:grid-cols-4 gap-8 divide-x-0 md:divide-x divide-y md:divide-y-0 divide-zinc-100 dark:divide-zinc-900">
        {[
          { label: props.stat1Label || "Students Trained", value: props.stat1Value || "10,000+" },
          { label: props.stat2Label || "Courses Offered", value: props.stat2Value || "50+" },
          { label: props.stat3Label || "Placement Percentage", value: props.stat3Value || "95%" },
          { label: props.stat4Label || "Industry Partners", value: props.stat4Value || "200+" }
        ].map((stat, i) => (
          <div key={i} className="text-center py-4 md:py-0">
            <div className="text-4xl font-bold mb-2 tracking-tight" style={{ color: props.primaryColor || '#2563eb' }}>{stat.value}</div>
            <div className="text-xs font-semibold text-zinc-500 uppercase tracking-widest">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  ),
  AboutSection: ({ props }: { props: any }) => (
    <div className="py-24 bg-white dark:bg-black">
      <div className="max-w-6xl mx-auto px-8 flex flex-col md:flex-row gap-16 items-center">
        <div className="flex-1">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">{props.title || "Our Vision & Mission"}</h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed mb-8">
            {props.content || "We are dedicated to providing an enriching environment that fosters intellectual curiosity, emotional intelligence, and a strong sense of community."}
          </p>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-xl">🏆</div>
            <div>
              <h4 className="font-bold">Award Winning Institution</h4>
              <p className="text-sm text-zinc-500">Ranked #1 in Regional Excellence</p>
            </div>
          </div>
        </div>
        <div className="flex-1 w-full">
          <div className="aspect-square md:aspect-video rounded-3xl overflow-hidden shadow-2xl bg-zinc-100 dark:bg-zinc-900">
             <img src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80" alt="Campus" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </div>
  ),
  ProgramsGrid: ({ props }: { props: any }) => (
    <div className="py-24 bg-zinc-50 dark:bg-zinc-950">
      <div className="max-w-6xl mx-auto px-8">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-12 text-center">{props.title || "Featured Courses & Programs"}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {[
            { name: props.prog1Name || "Computer Science B.Tech", duration: props.prog1Duration || "4 Years", fee: props.prog1Fee || "$15,000/yr", seats: props.prog1Seats || "120 Seats" },
            { name: props.prog2Name || "MBA in Finance", duration: props.prog2Duration || "2 Years", fee: props.prog2Fee || "$25,000/yr", seats: props.prog2Seats || "60 Seats" },
            { name: props.prog3Name || "Data Science Bootcamp", duration: props.prog3Duration || "6 Months", fee: props.prog3Fee || "$5,000", seats: props.prog3Seats || "30 Seats" }
          ].map((prog, i) => (
            <div key={i} className="bg-white dark:bg-black rounded-3xl p-8 shadow-sm border border-zinc-100 dark:border-zinc-800 hover:shadow-xl transition-shadow group cursor-pointer flex flex-col h-full">
              <div className="w-12 h-12 rounded-2xl bg-zinc-100 dark:bg-zinc-900 mb-6 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">📚</div>
              <h3 className="text-xl font-bold mb-4">{prog.name}</h3>
              
              <div className="mt-auto pt-6 border-t border-zinc-100 dark:border-zinc-800 flex flex-wrap gap-4 text-xs font-medium text-zinc-500">
                <span className="flex items-center gap-1">⏱️ {prog.duration}</span>
                <span className="flex items-center gap-1">💰 {prog.fee}</span>
                <span className="flex items-center gap-1">🪑 {prog.seats}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
  Testimonials: ({ props }: { props: any }) => (
    <div className="py-24 bg-white dark:bg-black">
      <div className="max-w-4xl mx-auto px-8 text-center">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-16">{props.title || "Student Voices"}</h2>
        <div className="text-xl md:text-3xl font-serif italic text-zinc-600 dark:text-zinc-400 leading-relaxed mb-8">
          "{props.quote || "The faculty and facilities here are unparalleled. It truly prepared me for my career in ways I couldn't have imagined."}"
        </div>
        <div className="font-bold text-lg">{props.author || "Jane Doe, Class of '24"}</div>
      </div>
    </div>
  ),
  LeadCaptureForm: ({ props }: { props: any }) => (
    <div className="py-24 bg-zinc-50 dark:bg-zinc-950">
      <div className="max-w-4xl mx-auto px-8 flex flex-col lg:flex-row gap-16 items-center">
        <div className="flex-1 text-center lg:text-left">
           <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">{props.title || "Ready to Join Us?"}</h2>
           <p className="text-zinc-500 dark:text-zinc-400 font-light text-lg">{props.subtitle || "Provide your details and our admissions team will be in touch shortly."}</p>
        </div>
        <div className="flex-1 w-full space-y-5 bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-xl">
          <div>
            <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-2">Full Name</label>
            <input type="text" className="w-full bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 focus:outline-none focus:border-zinc-400 transition-colors" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-2">Email Address</label>
            <input type="email" className="w-full bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 focus:outline-none focus:border-zinc-400 transition-colors" />
          </div>
          <div>
             <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-2">Program of Interest</label>
             <select className="w-full bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 focus:outline-none focus:border-zinc-400 transition-colors text-zinc-700 dark:text-zinc-300">
                <option>Primary School</option>
                <option>Middle School</option>
                <option>High School</option>
             </select>
          </div>
          <button 
            className="w-full text-white font-medium py-4 rounded-xl mt-4 transition-opacity hover:opacity-90 shadow-lg"
            style={{ backgroundColor: props.primaryColor || '#000000' }}
          >
            Submit Inquiry
          </button>
        </div>
      </div>
    </div>
  ),
  UpcomingEvents: ({ props }: { props: any }) => (
    <div className="py-24 bg-zinc-50 dark:bg-zinc-950">
      <div className="max-w-6xl mx-auto px-8">
        <h2 className="text-4xl font-bold tracking-tight mb-12 text-center">{props.title || "Upcoming Events"}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: props.event1Title || "Open House 2026", date: props.event1Date || "June 15, 2026", venue: props.event1Venue || "Main Auditorium" },
            { title: props.event2Title || "Alumni Meet", date: props.event2Date || "July 22, 2026", venue: props.event2Venue || "Virtual" },
            { title: props.event3Title || "Tech Symposium", date: props.event3Date || "August 10, 2026", venue: props.event3Venue || "Innovation Center" }
          ].map((event, i) => (
            <div key={i} className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-zinc-100 dark:border-zinc-800 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
              <div>
                <div className="text-sm font-bold text-blue-600 dark:text-blue-400 mb-2">{event.date}</div>
                <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                <div className="text-zinc-500 text-sm flex items-center gap-2 mb-6">
                  📍 {event.venue}
                </div>
              </div>
              <button className="text-sm font-bold border border-zinc-200 dark:border-zinc-700 px-4 py-2 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors w-full">
                Register Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
  RecruiterLogos: ({ props }: { props: any }) => (
    <div className="py-16 bg-white dark:bg-black border-y border-zinc-100 dark:border-zinc-900 overflow-hidden">
      <div className="max-w-6xl mx-auto px-8 text-center mb-8">
        <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-400">{props.title || "Our Top Recruiters"}</h3>
      </div>
      <div className="flex gap-12 justify-center items-center opacity-50 grayscale flex-wrap px-8">
        <div className="text-2xl font-black font-serif">Google</div>
        <div className="text-2xl font-black font-sans tracking-tighter">Microsoft</div>
        <div className="text-2xl font-bold italic">Amazon</div>
        <div className="text-2xl font-bold tracking-widest">IBM</div>
        <div className="text-2xl font-black">Infosys</div>
        <div className="text-2xl font-bold font-mono">TCS</div>
      </div>
    </div>
  ),
  LatestNews: ({ props }: { props: any }) => (
    <div className="py-24 bg-white dark:bg-black">
      <div className="max-w-4xl mx-auto px-8">
        <h2 className="text-4xl font-bold tracking-tight mb-12">{props.title || "Latest News & Announcements"}</h2>
        <div className="space-y-6">
          {[
            { title: props.news1Title || "Institution receives Grade A++ Accreditation", date: props.news1Date || "May 28, 2026" },
            { title: props.news2Title || "New AI Research Lab inaugurated by the Chief Minister", date: props.news2Date || "May 15, 2026" },
            { title: props.news3Title || "Admissions open for Fall 2026 Batch", date: props.news3Date || "May 10, 2026" }
          ].map((news, i) => (
            <div key={i} className="flex gap-6 items-start pb-6 border-b border-zinc-100 dark:border-zinc-900 group cursor-pointer">
              <div className="w-16 h-16 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex-shrink-0 flex items-center justify-center text-xl">
                📰
              </div>
              <div>
                <div className="text-xs font-bold text-zinc-400 mb-1">{news.date}</div>
                <h3 className="text-lg font-bold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{news.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
  Footer: ({ props }: { props: any }) => (
    <footer className="bg-black text-white py-16 border-t border-zinc-900">
      <div className="max-w-5xl mx-auto px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2">
          <h2 className="text-2xl font-bold mb-4">{props.schoolName || "Institution Name"}</h2>
          <p className="text-zinc-400 text-sm max-w-sm leading-relaxed">
            Empowering students to achieve their highest potential through innovative education and a supportive community.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-4 text-zinc-300">Quick Links</h3>
          <ul className="space-y-2 text-sm text-zinc-500">
            <li className="hover:text-white cursor-pointer transition-colors">Admissions</li>
            <li className="hover:text-white cursor-pointer transition-colors">Academics</li>
            <li className="hover:text-white cursor-pointer transition-colors">Campus Life</li>
            <li className="hover:text-white cursor-pointer transition-colors">Contact Us</li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-4 text-zinc-300">Connect</h3>
          <ul className="space-y-2 text-sm text-zinc-500">
            <li className="hover:text-white cursor-pointer transition-colors">Twitter</li>
            <li className="hover:text-white cursor-pointer transition-colors">Instagram</li>
            <li className="hover:text-white cursor-pointer transition-colors">LinkedIn</li>
          </ul>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-8 mt-16 pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center text-xs text-zinc-500">
         <p>© {new Date().getFullYear()} {props.schoolName || "Institution Name"}. All rights reserved.</p>
         <div className="flex gap-4 mt-4 md:mt-0">
           <a href="#" className="hover:text-white">Privacy Policy</a>
           <a href="#" className="hover:text-white">Terms of Service</a>
         </div>
      </div>
    </footer>
  ),
  PricingTable: ({ props }: { props: any }) => (
    <div className="py-24 bg-zinc-50 dark:bg-zinc-950 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 dark:text-white">{props.title || "Fee Structure"}</h2>
          <p className="text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed">
            {props.subtitle || "Transparent pricing with no hidden costs. Invest in a world-class education."}
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[1, 2, 3].map((tier) => (
            <div key={tier} className="bg-white dark:bg-zinc-900 rounded-3xl p-8 border border-zinc-100 dark:border-zinc-800 shadow-sm hover:shadow-xl transition-shadow relative">
              {tier === 2 && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-xs font-bold tracking-wider uppercase">
                  Most Popular
                </div>
              )}
              <h3 className="text-xl font-bold dark:text-white mb-2">{props[`tier${tier}Name`] || `Tier ${tier}`}</h3>
              <p className="text-sm text-zinc-500 mb-6">{props[`tier${tier}Desc`] || "Perfect for standard enrollment."}</p>
              <div className="mb-6">
                <span className="text-4xl font-bold dark:text-white">{props[`tier${tier}Price`] || "$5,000"}</span>
                <span className="text-zinc-500">/year</span>
              </div>
              <ul className="space-y-4 mb-8">
                {[1, 2, 3, 4].map((feature) => (
                  <li key={feature} className="flex items-center text-sm text-zinc-600 dark:text-zinc-400">
                    <span className="text-blue-500 mr-3">✓</span> {props[`tier${tier}Feature${feature}`] || `Included Feature ${feature}`}
                  </li>
                ))}
              </ul>
              <button className={`w-full py-3 rounded-xl font-bold transition-colors ${tier === 2 ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white'}`}>
                {props.ctaText || "Apply Now"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
  TextContent: ({ props }: { props: any }) => (
    <div className="py-24 bg-white dark:bg-black px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold mb-8 dark:text-white">{props.title || "Our Story"}</h2>
        <div className="prose prose-lg dark:prose-invert max-w-none text-zinc-600 dark:text-zinc-400">
          <div className="mb-6 leading-relaxed" dangerouslySetInnerHTML={{ __html: props.paragraph1 || "Founded with a vision to redefine education, we have consistently pushed the boundaries of what is possible. Our commitment to excellence is reflected in our state-of-the-art facilities, world-class faculty, and innovative curriculum." }}></div>
          <div className="leading-relaxed" dangerouslySetInnerHTML={{ __html: props.paragraph2 || "We believe in fostering an environment where curiosity thrives and potential is realized. Our graduates go on to become leaders in their respective fields, equipped with the knowledge and skills necessary to make a lasting impact on the world." }}></div>
        </div>
      </div>
    </div>
  )
};

// --- Sortable Item Wrapper ---
function SortableSection({ section, isActive, onSelect, onRemove, onToggleVisibility, builderLanguage = "en" }: { section: Section, isActive: boolean, onSelect: () => void, onRemove: () => void, onToggleVisibility: () => void, builderLanguage?: string }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: section.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : (section.isHidden ? 0.4 : 1),
  };

  const Component = Blocks[section.type];
  const resolvedProps = typeof resolveSectionProps !== "undefined" ? resolveSectionProps(section.props, builderLanguage) : section.props;

  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      onClick={onSelect}
      className={`relative group border-2 ${isActive ? 'border-blue-500' : 'border-transparent hover:border-blue-200'} rounded-xl transition-colors cursor-pointer mb-4 ${section.isHidden ? 'grayscale' : ''}`}
    >
      <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex gap-2">
        <button {...attributes} {...listeners} className="bg-white text-gray-600 p-2 rounded-lg shadow-md cursor-grab active:cursor-grabbing hover:bg-gray-50">
           ☰
        </button>
        <button onClick={(e) => { e.stopPropagation(); onToggleVisibility(); }} className="bg-amber-500 text-white p-2 rounded-lg shadow-md hover:bg-amber-600">
           {section.isHidden ? '🙈' : '👁️'}
        </button>
        <button onClick={(e) => { e.stopPropagation(); onRemove(); }} className="bg-red-500 text-white p-2 rounded-lg shadow-md hover:bg-red-600">
           🗑
        </button>
      </div>
      
      {/* Block Render */}
      <div className="pointer-events-none">
         <Component props={resolvedProps} />
      </div>
      
      {isActive && (
        <div className="absolute -top-3 -right-3 bg-blue-500 text-white text-xs px-2 py-1 rounded-full shadow-md font-bold">
          {section.type} Selected
        </div>
      )}
    </div>
  );
}



export function resolveLocalizedString(value: any, lang: string): string {
  if (!value) return "";
  if (typeof value === "string") return value;
  if (typeof value === "object") {
    return value[lang] || value["en"] || "";
  }
  return String(value);
}

export function updateLocalizedString(currentValue: any, lang: string, newValue: string): any {
  if (!currentValue || typeof currentValue === "string") {
    // Migrate string to object
    const migrated: Record<string, any> = { en: currentValue || "", ml: "" };
    migrated[lang] = newValue;
    return migrated;
  }
  return { ...currentValue, [lang]: newValue };
}

// Resolve all text props for a section
export function resolveSectionProps(props: any, lang: string) {
  const resolved: any = {};
  for (const key in props) {
    if (key === "imageUrl" || key === "backgroundImage" || key === "image") {
      resolved[key] = props[key]; // images dont need translation
    } else if (Array.isArray(props[key])) {
      // arrays like pricing features or lists
      resolved[key] = props[key].map((item: any) => 
        typeof item === "string" ? item : resolveSectionProps(item, lang)
      );
    } else if (typeof props[key] === "object" && props[key] !== null && ("en" in props[key] || "ml" in props[key])) {
      resolved[key] = resolveLocalizedString(props[key], lang);
    } else {
      resolved[key] = props[key];
    }
  }
  return resolved;
}

export function getPageTemplate(pageId: string): Section[] {
  const baseHeader: Section = { id: 'sec-header', type: 'HeaderNavigation', props: {} };
  const baseFooter: Section = { id: 'sec-footer', type: 'Footer', props: {} };

  switch (pageId) {
    case 'about':
    case 'about-leadership':
    case 'about-history':
      return [
        baseHeader,
        { id: 'sec-hero', type: 'HeroBanner', props: { title: 'About Our Institution.', subtitle: 'Discover our history, mission, and the leadership driving us forward.' } },
        { id: 'sec-text', type: 'TextContent', props: {} },
        { id: 'sec-test', type: 'Testimonials', props: {} },
        baseFooter
      ];
    case 'academics':
    case 'academics-programs':
    case 'academics-faculty':
      return [
        baseHeader,
        { id: 'sec-hero', type: 'HeroBanner', props: { title: 'Academic Excellence.', subtitle: 'Explore our diverse range of programs and meet our world-class faculty.' } },
        { id: 'sec-progs', type: 'ProgramsGrid', props: {} },
        baseFooter
      ];
    case 'admissions':
    case 'admissions-info':
    case 'admissions-fees':
    case 'admissions-apply':
      return [
        baseHeader,
        { id: 'sec-hero', type: 'HeroBanner', props: { title: 'Join Our Community.', subtitle: 'Start your journey with us today. Find out about admissions and fee structures.' } },
        { id: 'sec-fees', type: 'PricingTable', props: {} },
        { id: 'sec-lead', type: 'LeadCaptureForm', props: {} },
        baseFooter
      ];
    case 'campus-life':
    case 'campus-events':
      return [
        baseHeader,
        { id: 'sec-hero', type: 'HeroBanner', props: { title: 'Life on Campus.', subtitle: 'Experience a vibrant campus life full of events, clubs, and culture.' } },
        { id: 'sec-events', type: 'UpcomingEvents', props: {} },
        { id: 'sec-news', type: 'LatestNews', props: {} },
        baseFooter
      ];
    case 'student-services':
      return [
        baseHeader,
        { id: 'sec-hero', type: 'HeroBanner', props: { title: 'Student Support.', subtitle: 'We are here to support your academic and personal growth.' } },
        { id: 'sec-text', type: 'TextContent', props: { title: 'Our Support Services', paragraph1: 'Our institution offers a wide range of services to support students...', paragraph2: 'From counseling to academic advising, we have you covered.' } },
        baseFooter
      ];
    case 'home':
    default:
      return [
        baseHeader,
        { id: '1', type: 'HeroBanner', props: { title: 'Excellence in Education.', subtitle: 'A world-class curriculum designed to shape the innovators and leaders of tomorrow.' } },
        { id: '2', type: 'StatsRibbon', props: {} },
        { id: '3', type: 'AboutSection', props: {} },
        { id: '4', type: 'ProgramsGrid', props: {} },
        { id: '5', type: 'RecruiterLogos', props: {} },
        { id: '6', type: 'UpcomingEvents', props: {} },
        { id: '7', type: 'LatestNews', props: {} },
        { id: '8', type: 'Testimonials', props: {} },
        { id: '9', type: 'LeadCaptureForm', props: {} },
        baseFooter,
      ];
  }
}

// --- Main Builder Component ---
export default function SiteBuilder({ onExit, pageId = 'home' }: { onExit: () => void, pageId?: string }) {
  const [sections, setSections] = useState<Section[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [selectedSectionId, setSelectedSectionId] = useState<string | null>(null);
  const [builderLanguage, setBuilderLanguage] = useState<string>("en");
  const [viewport, setViewport] = useState<'desktop'|'tablet'|'mobile'>('desktop');
  const [isPublishing, setIsPublishing] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchPageData() {
      try {
        const res = await fetch(`/api/pages?pageId=${pageId}`);
        const data = await res.json();
        if (data.page && data.page.sections) {
          setSections(data.page.sections);
        } else {
          // Fall back to localStorage migration or template
          const saved = localStorage.getItem(`builder_page_${pageId}`);
          if (saved) {
            setSections(JSON.parse(saved));
          } else {
            setSections(getPageTemplate(pageId));
          }
        }
      } catch (err) {
        console.error('Failed to fetch page', err);
        setSections(getPageTemplate(pageId));
      } finally {
        setIsLoading(false);
      }
    }
    fetchPageData();
  }, [pageId]);

  const handlePublish = () => {
    setIsPublishing(true);
    localStorage.setItem(`builder_page_${pageId}`, JSON.stringify(sections));
    setTimeout(() => {
      setIsPublishing(false);
      alert(`🎉 Page "${pageId}" published successfully!`);
    }, 800);
  };

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragStart = (event: any) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setSections((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
    setActiveId(null);
  };

  const selectedSection = sections.find(s => s.id === selectedSectionId);

  const addSection = (type: SectionType) => {
    setSections([...sections, { id: Math.random().toString(36).substr(2, 9), type, props: {} }]);
  };

  const updateSectionProp = (key: string, value: string) => {
    if (!selectedSectionId) return;
    setSections(sections.map(s => s.id === selectedSectionId ? { ...s, props: { ...s.props, [key]: value } } : s));
  };

  return (
    <div className="flex h-screen bg-zinc-100 dark:bg-black overflow-hidden font-sans">
      {/* LEFT SIDEBAR: Layers / Sections */}
      <div className="w-64 bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 flex flex-col z-10">
        <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center gap-3">
           <button onClick={onExit} className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg">←</button>
           <h2 className="font-bold text-lg truncate">Edit: {pageId.replace('-', ' ')}</h2>
        </div>
        <div className="p-4 flex-1 overflow-y-auto">
          <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-4">Page Sections</h3>
          <div className="space-y-2">
            {sections.map((section, index) => (
              <button 
                key={section.id}
                onClick={() => setSelectedSectionId(section.id)}
                className={`w-full p-3 rounded-xl text-left transition-all flex items-center justify-between group shadow-sm border ${
                  selectedSectionId === section.id 
                    ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-500 ring-1 ring-blue-500 ring-opacity-50' 
                    : 'bg-zinc-50 dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700 hover:border-blue-400 hover:shadow'
                }`}
              >
                <span className="text-sm font-semibold flex items-center gap-3">
                  <span className={`text-lg w-8 h-8 flex items-center justify-center rounded-lg shadow-sm border ${
                    selectedSectionId === section.id ? 'bg-blue-100 dark:bg-blue-800 border-blue-200 dark:border-blue-700' : 'bg-white dark:bg-zinc-700 border-zinc-100 dark:border-zinc-600'
                  }`}>
                    {section.type === 'HeroBanner' ? '🖼️' : 
                     section.type === 'StatsRibbon' ? '📊' : 
                     section.type === 'AboutSection' ? 'ℹ️' : 
                     section.type === 'ProgramsGrid' ? '📚' : 
                     section.type === 'UpcomingEvents' ? '📅' : 
                     section.type === 'RecruiterLogos' ? '🏢' : 
                     section.type === 'LatestNews' ? '📰' : 
                     section.type === 'Testimonials' ? '💬' : 
                     section.type === 'Footer' ? '⬇️' : '📝'}
                  </span>
                  <div className="flex flex-col">
                    <span>{section.type.replace(/([A-Z])/g, ' $1').trim()}</span>
                    <span className="text-[10px] text-zinc-400 font-normal">Section {index + 1}</span>
                  </div>
                </span>
                <span className="opacity-0 group-hover:opacity-100 text-zinc-400 hover:text-blue-600 text-xs transition-all">Edit</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* CENTER: Canvas */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <div className="h-16 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between px-6 z-10 shadow-sm">
           <div className="flex items-center gap-6">
             <div className="flex bg-zinc-100 dark:bg-zinc-800 p-1 rounded-lg">
               <button onClick={() => setViewport('desktop')} className={`px-4 py-1.5 rounded-md text-sm font-medium ${viewport === 'desktop' ? 'bg-white dark:bg-zinc-700 shadow-sm text-zinc-900 dark:text-white' : 'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'}`}>Desktop</button>
               <button onClick={() => setViewport('tablet')} className={`px-4 py-1.5 rounded-md text-sm font-medium ${viewport === 'tablet' ? 'bg-white dark:bg-zinc-700 shadow-sm text-zinc-900 dark:text-white' : 'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'}`}>Tablet</button>
               <button onClick={() => setViewport('mobile')} className={`px-4 py-1.5 rounded-md text-sm font-medium ${viewport === 'mobile' ? 'bg-white dark:bg-zinc-700 shadow-sm text-zinc-900 dark:text-white' : 'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'}`}>Mobile</button>
             </div>
             
             <div className="h-8 w-px bg-zinc-200 dark:bg-zinc-700 hidden md:block"></div>
             
             <div className="flex bg-zinc-100 dark:bg-zinc-800 p-1 rounded-lg">
                <button 
                  onClick={() => setBuilderLanguage("en")} 
                  className={`px-4 py-1.5 rounded-md text-sm font-bold transition-all ${builderLanguage === "en" ? "bg-white dark:bg-zinc-700 shadow-sm text-blue-600 dark:text-blue-400" : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"}`}
                >🇬🇧 English</button>
                <button 
                  onClick={() => setBuilderLanguage("ml")} 
                  className={`px-4 py-1.5 rounded-md text-sm font-bold transition-all ${builderLanguage === "ml" ? "bg-blue-600 shadow-sm text-white" : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"}`}
                >🇮🇳 Malayalam Mode</button>
              </div>
           </div>
           
           <button 
             onClick={handlePublish}
             disabled={isPublishing}
             className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl font-bold shadow-md transition-all disabled:opacity-70 flex items-center gap-2"
           >
             {isPublishing ? 'Publishing...' : 'Publish Site'}
           </button>
        </div>

        {/* Live Preview Area */}
        <div className="flex-1 overflow-y-auto p-8 flex justify-center bg-[url('https://raw.githubusercontent.com/tailwindlabs/tailwindcss/master/.github/logo.svg')] bg-[length:100px] bg-center bg-repeat bg-opacity-5">
           <div 
             className={`bg-white dark:bg-zinc-950 shadow-2xl rounded-2xl overflow-hidden flex flex-col transition-all duration-500 mx-auto h-[calc(100vh-140px)] ${
               viewport === 'desktop' ? 'w-full max-w-5xl' : viewport === 'tablet' ? 'w-[768px]' : 'w-[375px]'
             }`}
           >
             {/* Mock Browser Header */}
             <div className="h-10 bg-zinc-100 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 flex items-center px-4 gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
                <div className="ml-4 flex-1 bg-white dark:bg-black h-6 rounded-md border border-zinc-200 dark:border-zinc-700 flex items-center px-3 text-xs text-zinc-500">myinstitution.edu</div>
             </div>

             {/* Page Content */}
             <div className="flex-1 p-4 overflow-y-auto bg-gray-50/50 dark:bg-black/20">
                <DndContext sensors={sensors} collisionDetection={closestCenter} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
                  <SortableContext items={sections.map(s => s.id)} strategy={verticalListSortingStrategy}>
                    {sections.map((section) => (
                      <SortableSection 
                        key={section.id} 
                        section={section} 
                        isActive={selectedSectionId === section.id}
                        onSelect={() => setSelectedSectionId(section.id)}
                        onRemove={() => setSections(sections.filter(s => s.id !== section.id))}
                        onToggleVisibility={() => {
                          setSections(sections.map(s => s.id === section.id ? { ...s, isHidden: !s.isHidden } : s));
                        }}
                        builderLanguage={builderLanguage}
                      />
                    ))}
                  </SortableContext>
                  <DragOverlay>
                    {activeId ? (
                      <div className="opacity-50 scale-95 border-2 border-blue-500 rounded-xl overflow-hidden">
                        {(() => {
                          const ActiveComponent = Blocks[sections.find(s => s.id === activeId)!.type];
                          return ActiveComponent ? <ActiveComponent props={sections.find(s => s.id === activeId)!.props} /> : null;
                        })()}
                      </div>
                    ) : null}
                  </DragOverlay>
                </DndContext>
                
                {/* Floating Chatbot UI (SRS Alignment) */}
                <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
                  <div className="bg-white dark:bg-zinc-900 shadow-2xl rounded-2xl p-4 w-72 mb-4 border border-zinc-200 dark:border-zinc-800 hidden group-hover:block transition-all transform translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100">
                    <div className="flex items-center gap-3 mb-4 border-b border-zinc-100 dark:border-zinc-800 pb-3">
                      <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400">🤖</div>
                      <div>
                        <h4 className="font-bold text-sm">Admission Bot</h4>
                        <p className="text-[10px] text-green-500">Online</p>
                      </div>
                    </div>
                    <div className="text-sm text-zinc-600 dark:text-zinc-400 mb-4 bg-zinc-50 dark:bg-zinc-800/50 p-3 rounded-lg">
                      Hi! I can help you with Admission FAQs, Course Searches, and Event queries. How can I help?
                    </div>
                    <input type="text" placeholder="Type a message..." className="w-full bg-zinc-50 dark:bg-black border border-zinc-200 dark:border-zinc-700 rounded-lg px-3 py-2 text-xs outline-none" />
                  </div>
                  <button className="w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-2xl flex items-center justify-center text-2xl transition-transform hover:scale-110 group">
                    💬
                  </button>
                </div>
                
             </div>
           </div>
        </div>
      </div>

      {/* RIGHT SIDEBAR: Property Inspector */}
      <div className="w-80 bg-white dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 z-10 flex flex-col">
        <div className="p-4 border-b border-zinc-200 dark:border-zinc-800">
           <h2 className="font-bold text-lg">Inspector</h2>
        </div>
        <div className="p-6 flex-1 overflow-y-auto">
          {selectedSection ? (
            <div className="space-y-6">
              <div className="bg-blue-50 dark:bg-blue-900/10 p-4 rounded-xl border border-blue-100 dark:border-blue-900/30">
                <div className="flex items-center gap-2 mb-1">
                   <span className="text-blue-600 bg-white dark:bg-blue-900/50 p-1 rounded-md shadow-sm">⚙️</span>
                   <h3 className="text-sm font-bold text-blue-900 dark:text-blue-300">{selectedSection.type.replace(/([A-Z])/g, ' $1').trim()}</h3>
                </div>
                <p className="text-xs text-blue-600/70 dark:text-blue-400">Edit properties for this block.</p>
              </div>

              {/* Dynamic Property Form based on component type */}
              <div className="space-y-4">
                {/* Shared Title */}
                {(selectedSection.type === 'HeroBanner' || selectedSection.type === 'AboutSection' || selectedSection.type === 'ProgramsGrid' || selectedSection.type === 'LeadCaptureForm') && (
                  <div>
                    <label className="block text-xs font-bold text-zinc-600 dark:text-zinc-400 mb-1">Title</label>
                    <input 
                      type="text" 
                      value={selectedSection.props.title || ""} 
                      onChange={(e) => updateSectionProp('title', e.target.value)}
                      placeholder="Enter title..."
                      className="w-full bg-zinc-50 dark:bg-black border border-zinc-200 dark:border-zinc-700 rounded-lg px-3 py-2 text-sm focus:border-blue-500 outline-none" 
                    />
                  </div>
                )}
                
                {/* Hero / Lead Capture Subtitle */}
                {(selectedSection.type === 'HeroBanner' || selectedSection.type === 'LeadCaptureForm') && (
                  <div>
                    <label className="block text-xs font-bold text-zinc-600 dark:text-zinc-400 mb-1">Subtitle</label>
                    <textarea 
                      value={selectedSection.props.subtitle || ""} 
                      onChange={(e) => updateSectionProp('subtitle', e.target.value)}
                      placeholder="Enter subtitle..."
                      className="w-full bg-zinc-50 dark:bg-black border border-zinc-200 dark:border-zinc-700 rounded-lg px-3 py-2 text-sm focus:border-blue-500 outline-none h-20" 
                    />
                  </div>
                )}

                {/* About Section Description & Image */}
                {selectedSection.type === 'AboutSection' && (
                  <>
                    <div>
                      <label className="block text-xs font-bold text-zinc-600 dark:text-zinc-400 mb-1">Description</label>
                      <textarea 
                        value={selectedSection.props.description || ""} 
                        onChange={(e) => updateSectionProp('description', e.target.value)}
                        placeholder="Enter description..."
                        className="w-full bg-zinc-50 dark:bg-black border border-zinc-200 dark:border-zinc-700 rounded-lg px-3 py-2 text-sm focus:border-blue-500 outline-none h-32" 
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-zinc-600 dark:text-zinc-400 mb-1">Image URL</label>
                      <input 
                        type="url" 
                        value={selectedSection.props.imageUrl || ""} 
                        onChange={(e) => updateSectionProp('imageUrl', e.target.value)}
                        placeholder="https://images.unsplash.com/..."
                        className="w-full bg-zinc-50 dark:bg-black border border-zinc-200 dark:border-zinc-700 rounded-lg px-3 py-2 text-sm focus:border-blue-500 outline-none" 
                      />
                    </div>
                  </>
                )}

                {/* Header Navigation */}
                {selectedSection.type === 'HeaderNavigation' && (
                  <>
                    <div>
                      <label className="block text-xs font-bold text-zinc-600 dark:text-zinc-400 mb-1">Logo Text</label>
                      <input 
                        type="text" 
                        value={selectedSection.props.logoText || ""} 
                        onChange={(e) => updateSectionProp('logoText', e.target.value)}
                        placeholder="e.g. Institution"
                        className="w-full bg-zinc-50 dark:bg-black border border-zinc-200 dark:border-zinc-700 rounded-lg px-3 py-2 text-sm focus:border-blue-500 outline-none mb-3" 
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-zinc-600 dark:text-zinc-400 mb-1">Logo Icon / Emoji</label>
                      <input 
                        type="text" 
                        value={selectedSection.props.logoIcon || ""} 
                        onChange={(e) => updateSectionProp('logoIcon', e.target.value)}
                        placeholder="e.g. 🏛️"
                        className="w-full bg-zinc-50 dark:bg-black border border-zinc-200 dark:border-zinc-700 rounded-lg px-3 py-2 text-sm focus:border-blue-500 outline-none mb-3" 
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-zinc-600 dark:text-zinc-400 mb-1">CTA Button Text</label>
                      <input 
                        type="text" 
                        value={selectedSection.props.ctaText || ""} 
                        onChange={(e) => updateSectionProp('ctaText', e.target.value)}
                        placeholder="e.g. Apply Now"
                        className="w-full bg-zinc-50 dark:bg-black border border-zinc-200 dark:border-zinc-700 rounded-lg px-3 py-2 text-sm focus:border-blue-500 outline-none" 
                      />
                    </div>
                  </>
                )}

                {/* Pricing Table Properties */}
                {selectedSection.type === 'PricingTable' && (
                  <>
                    <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800">
                      <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-3">Tiers</h4>
                      {[1, 2, 3].map(tier => (
                        <div key={tier} className="mb-4 bg-zinc-50 dark:bg-zinc-900 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800">
                          <label className="block text-xs font-bold text-zinc-600 dark:text-zinc-400 mb-1">Tier {tier} Name</label>
                          <input 
                            type="text" 
                            value={selectedSection.props[`tier${tier}Name`] || ""} 
                            onChange={(e) => updateSectionProp(`tier${tier}Name`, e.target.value)}
                            placeholder={`e.g. Tier ${tier}`}
                            className="w-full bg-white dark:bg-black border border-zinc-200 dark:border-zinc-700 rounded-lg px-3 py-1.5 text-sm outline-none mb-2" 
                          />
                          <label className="block text-xs font-bold text-zinc-600 dark:text-zinc-400 mb-1">Price</label>
                          <input 
                            type="text" 
                            value={selectedSection.props[`tier${tier}Price`] || ""} 
                            onChange={(e) => updateSectionProp(`tier${tier}Price`, e.target.value)}
                            placeholder="e.g. $5,000"
                            className="w-full bg-white dark:bg-black border border-zinc-200 dark:border-zinc-700 rounded-lg px-3 py-1.5 text-sm outline-none" 
                          />
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {/* Text Content Properties */}
                {selectedSection.type === 'TextContent' && (
                  <>
                    <div>
                      <label className="block text-xs font-bold text-zinc-600 dark:text-zinc-400 mb-1">Paragraph 1</label>
                      <textarea 
                        value={selectedSection.props.paragraph1 || ""} 
                        onChange={(e) => updateSectionProp('paragraph1', e.target.value)}
                        placeholder="Enter first paragraph..."
                        className="w-full bg-zinc-50 dark:bg-black border border-zinc-200 dark:border-zinc-700 rounded-lg px-3 py-2 text-sm focus:border-blue-500 outline-none h-24 mb-3" 
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-zinc-600 dark:text-zinc-400 mb-1">Paragraph 2</label>
                      <textarea 
                        value={selectedSection.props.paragraph2 || ""} 
                        onChange={(e) => updateSectionProp('paragraph2', e.target.value)}
                        placeholder="Enter second paragraph..."
                        className="w-full bg-zinc-50 dark:bg-black border border-zinc-200 dark:border-zinc-700 rounded-lg px-3 py-2 text-sm focus:border-blue-500 outline-none h-24" 
                      />
                    </div>
                  </>
                )}

                {/* Hero CTA & Media */}
                {selectedSection.type === 'HeroBanner' && (
                  <>
                    <div>
                      <label className="block text-xs font-bold text-zinc-600 dark:text-zinc-400 mb-1">CTA Button Text</label>
                      <input 
                        type="text" 
                        value={selectedSection.props.ctaText || ""} 
                        onChange={(e) => updateSectionProp('ctaText', e.target.value)}
                        placeholder="e.g. Apply Now"
                        className="w-full bg-zinc-50 dark:bg-black border border-zinc-200 dark:border-zinc-700 rounded-lg px-3 py-2 text-sm focus:border-blue-500 outline-none" 
                      />
                    </div>
                    <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800">
                      <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-3">Media & Background</h4>
                      
                      <div className="space-y-3">
                        <div>
                          <label className="block text-xs font-bold text-zinc-600 dark:text-zinc-400 mb-1">Background Image URL</label>
                          <input 
                            type="url" 
                            value={selectedSection.props.bgImageUrl || ""} 
                            onChange={(e) => updateSectionProp('bgImageUrl', e.target.value)}
                            placeholder="https://images.unsplash.com/..."
                            className="w-full bg-zinc-50 dark:bg-black border border-zinc-200 dark:border-zinc-700 rounded-lg px-3 py-2 text-sm focus:border-blue-500 outline-none" 
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-zinc-600 dark:text-zinc-400 mb-1">Background Video URL (Overrides Image)</label>
                          <input 
                            type="url" 
                            value={selectedSection.props.bgVideoUrl || ""} 
                            onChange={(e) => updateSectionProp('bgVideoUrl', e.target.value)}
                            placeholder="https://...mp4"
                            className="w-full bg-zinc-50 dark:bg-black border border-zinc-200 dark:border-zinc-700 rounded-lg px-3 py-2 text-sm focus:border-blue-500 outline-none" 
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-zinc-600 dark:text-zinc-400 mb-1 flex justify-between">
                            <span>Overlay Opacity</span>
                            <span>{selectedSection.props.overlayOpacity || '40'}%</span>
                          </label>
                          <input 
                            type="range" 
                            min="0" 
                            max="100" 
                            value={selectedSection.props.overlayOpacity || "40"} 
                            onChange={(e) => updateSectionProp('overlayOpacity', e.target.value)}
                            className="w-full accent-blue-600" 
                          />
                        </div>
                      </div>
                    </div>
                  </>
                )}
                
                {/* Global Styling Controls */}
                {(selectedSection.type === 'HeroBanner' || selectedSection.type === 'LeadCaptureForm') && (
                   <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800">
                      <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-3">Styling</h4>
                      <div>
                        <label className="block text-xs font-bold text-zinc-600 dark:text-zinc-400 mb-2">Primary Color (Buttons)</label>
                        <div className="flex gap-2 mb-2">
                           {['#000000', '#2563eb', '#dc2626', '#16a34a', '#d97706'].map(color => (
                             <button
                               key={color}
                               onClick={() => updateSectionProp('primaryColor', color)}
                               className={`w-6 h-6 rounded-full border-2 transition-all ${selectedSection.props.primaryColor === color ? 'border-zinc-400 scale-110 shadow-md' : 'border-transparent'}`}
                               style={{ backgroundColor: color }}
                             />
                           ))}
                        </div>
                        <input 
                          type="text" 
                          value={selectedSection.props.primaryColor || "#000000"} 
                          onChange={(e) => updateSectionProp('primaryColor', e.target.value)}
                          placeholder="#000000"
                          className="w-full bg-zinc-50 dark:bg-black border border-zinc-200 dark:border-zinc-700 rounded-lg px-3 py-2 text-sm focus:border-blue-500 outline-none uppercase font-mono" 
                        />
                      </div>
                   </div>
                )}
                
                {/* Stats Ribbon */}
                {selectedSection.type === 'StatsRibbon' && (
                  <>
                    <div>
                      <label className="block text-xs font-bold text-zinc-600 dark:text-zinc-400 mb-1">Stat 1 (Acceptance)</label>
                      <input type="text" value={selectedSection.props.stat1 || ""} onChange={(e) => updateSectionProp('stat1', e.target.value)} className="w-full bg-zinc-50 dark:bg-black border border-zinc-200 dark:border-zinc-700 rounded-lg px-3 py-2 text-sm outline-none" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-zinc-600 dark:text-zinc-400 mb-1">Stat 2 (Ratio)</label>
                      <input type="text" value={selectedSection.props.stat2 || ""} onChange={(e) => updateSectionProp('stat2', e.target.value)} className="w-full bg-zinc-50 dark:bg-black border border-zinc-200 dark:border-zinc-700 rounded-lg px-3 py-2 text-sm outline-none" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-zinc-600 dark:text-zinc-400 mb-1">Stat 3 (Extracurriculars)</label>
                      <input type="text" value={selectedSection.props.stat3 || ""} onChange={(e) => updateSectionProp('stat3', e.target.value)} className="w-full bg-zinc-50 dark:bg-black border border-zinc-200 dark:border-zinc-700 rounded-lg px-3 py-2 text-sm outline-none" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-zinc-600 dark:text-zinc-400 mb-1">Stat 4 (Established)</label>
                      <input type="text" value={selectedSection.props.stat4 || ""} onChange={(e) => updateSectionProp('stat4', e.target.value)} className="w-full bg-zinc-50 dark:bg-black border border-zinc-200 dark:border-zinc-700 rounded-lg px-3 py-2 text-sm outline-none" />
                    </div>
                  </>
                )}

                {/* Testimonials */}
                {selectedSection.type === 'Testimonials' && (
                  <>
                    <div>
                      <label className="block text-xs font-bold text-zinc-600 dark:text-zinc-400 mb-1">Quote</label>
                      <textarea value={selectedSection.props.quote || ""} onChange={(e) => updateSectionProp('quote', e.target.value)} className="w-full bg-zinc-50 dark:bg-black border border-zinc-200 dark:border-zinc-700 rounded-lg px-3 py-2 text-sm outline-none h-24" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-zinc-600 dark:text-zinc-400 mb-1">Author Name</label>
                      <input type="text" value={selectedSection.props.author || ""} onChange={(e) => updateSectionProp('author', e.target.value)} className="w-full bg-zinc-50 dark:bg-black border border-zinc-200 dark:border-zinc-700 rounded-lg px-3 py-2 text-sm outline-none" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-zinc-600 dark:text-zinc-400 mb-1">Role / Subtitle</label>
                      <input type="text" value={selectedSection.props.role || ""} onChange={(e) => updateSectionProp('role', e.target.value)} className="w-full bg-zinc-50 dark:bg-black border border-zinc-200 dark:border-zinc-700 rounded-lg px-3 py-2 text-sm outline-none" />
                    </div>
                  </>
                )}

                {/* Footer */}
                {selectedSection.type === 'Footer' && (
                  <div>
                    <label className="block text-xs font-bold text-zinc-600 dark:text-zinc-400 mb-1">School Name</label>
                    <input type="text" value={selectedSection.props.schoolName || ""} onChange={(e) => updateSectionProp('schoolName', e.target.value)} className="w-full bg-zinc-50 dark:bg-black border border-zinc-200 dark:border-zinc-700 rounded-lg px-3 py-2 text-sm outline-none" />
                  </div>
                )}
                {/* Recruiter Logos */}
                {selectedSection.type === 'RecruiterLogos' && (
                  <div>
                    <p className="text-xs text-zinc-500 mb-2">Note: Individual logos will be dynamically managed in the CMS. You can edit the section title here.</p>
                  </div>
                )}
                
                {/* Upcoming Events */}
                {selectedSection.type === 'UpcomingEvents' && (
                  <>
                    {[1, 2, 3].map(i => (
                      <div key={i} className="pt-2 border-t border-zinc-200 dark:border-zinc-800 mt-2">
                        <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-3">Event {i}</h4>
                        <div className="space-y-2">
                          <input type="text" value={selectedSection.props[`event${i}Title`] || ""} onChange={(e) => updateSectionProp(`event${i}Title`, e.target.value)} placeholder="Event Title" className="w-full bg-zinc-50 dark:bg-black border border-zinc-200 dark:border-zinc-700 rounded-lg px-3 py-2 text-sm outline-none" />
                          <div className="grid grid-cols-2 gap-2">
                            <input type="text" value={selectedSection.props[`event${i}Date`] || ""} onChange={(e) => updateSectionProp(`event${i}Date`, e.target.value)} placeholder="Date" className="w-full bg-zinc-50 dark:bg-black border border-zinc-200 dark:border-zinc-700 rounded-lg px-3 py-2 text-sm outline-none" />
                            <input type="text" value={selectedSection.props[`event${i}Venue`] || ""} onChange={(e) => updateSectionProp(`event${i}Venue`, e.target.value)} placeholder="Venue" className="w-full bg-zinc-50 dark:bg-black border border-zinc-200 dark:border-zinc-700 rounded-lg px-3 py-2 text-sm outline-none" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </>
                )}

                {/* Latest News */}
                {selectedSection.type === 'LatestNews' && (
                  <>
                    {[1, 2, 3].map(i => (
                      <div key={i} className="pt-2 border-t border-zinc-200 dark:border-zinc-800 mt-2">
                        <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-3">News {i}</h4>
                        <div className="space-y-2">
                          <input type="text" value={selectedSection.props[`news${i}Title`] || ""} onChange={(e) => updateSectionProp(`news${i}Title`, e.target.value)} placeholder="News Headline" className="w-full bg-zinc-50 dark:bg-black border border-zinc-200 dark:border-zinc-700 rounded-lg px-3 py-2 text-sm outline-none" />
                          <input type="text" value={selectedSection.props[`news${i}Date`] || ""} onChange={(e) => updateSectionProp(`news${i}Date`, e.target.value)} placeholder="Date" className="w-full bg-zinc-50 dark:bg-black border border-zinc-200 dark:border-zinc-700 rounded-lg px-3 py-2 text-sm outline-none" />
                        </div>
                      </div>
                    ))}
                  </>
                )}

                {/* Programs Grid */}
                {selectedSection.type === 'ProgramsGrid' && (
                  <>
                    {[1, 2, 3].map(i => (
                      <div key={i} className="pt-2 border-t border-zinc-200 dark:border-zinc-800 mt-2">
                        <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-3">Program {i}</h4>
                        <div className="space-y-2">
                          <input type="text" value={selectedSection.props[`prog${i}Name`] || ""} onChange={(e) => updateSectionProp(`prog${i}Name`, e.target.value)} placeholder="Program Name" className="w-full bg-zinc-50 dark:bg-black border border-zinc-200 dark:border-zinc-700 rounded-lg px-3 py-2 text-sm outline-none" />
                          <div className="grid grid-cols-3 gap-2">
                            <input type="text" value={selectedSection.props[`prog${i}Duration`] || ""} onChange={(e) => updateSectionProp(`prog${i}Duration`, e.target.value)} placeholder="Duration" className="w-full bg-zinc-50 dark:bg-black border border-zinc-200 dark:border-zinc-700 rounded-lg px-2 py-2 text-xs outline-none" />
                            <input type="text" value={selectedSection.props[`prog${i}Fee`] || ""} onChange={(e) => updateSectionProp(`prog${i}Fee`, e.target.value)} placeholder="Fee" className="w-full bg-zinc-50 dark:bg-black border border-zinc-200 dark:border-zinc-700 rounded-lg px-2 py-2 text-xs outline-none" />
                            <input type="text" value={selectedSection.props[`prog${i}Seats`] || ""} onChange={(e) => updateSectionProp(`prog${i}Seats`, e.target.value)} placeholder="Seats" className="w-full bg-zinc-50 dark:bg-black border border-zinc-200 dark:border-zinc-700 rounded-lg px-2 py-2 text-xs outline-none" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </>
                )}

              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center text-zinc-400">
               <div className="text-4xl mb-4">🖱️</div>
               <p className="text-sm">Select a block on the canvas to edit its properties.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
