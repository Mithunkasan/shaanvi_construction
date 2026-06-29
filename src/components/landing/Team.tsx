'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Twitter, Instagram } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string | null;
  facebook: string | null;
  twitter: string | null;
  linkedin: string | null;
  instagram: string | null;
}

interface TeamProps {
  team: TeamMember[];
}

export function Team({ team }: TeamProps) {
  return (
    <section className="py-24 bg-slate-900/10 border-t border-b border-border/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-sm font-bold uppercase tracking-widest text-amber-500 mb-2">
            Our Studio
          </p>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-foreground">
            Meet the Visionaries
          </h2>
          <p className="text-base text-muted-foreground mt-4 font-light">
            An elite crew of principal architects, structural designers, and material engineers.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <Card className="h-full border border-border/40 overflow-hidden bg-card hover:border-amber-500/40 hover:shadow-lg transition-all duration-500">
                {/* Photo frame */}
                <div className="relative h-72 w-full overflow-hidden bg-slate-900">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/40 transition-colors duration-300" />
                  
                  {/* Floating Social Icons Overlay on Hover */}
                  <div className="absolute inset-0 flex items-center justify-center space-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {member.linkedin && (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="h-10 w-10 rounded-full bg-slate-950/95 backdrop-blur-md text-amber-500 border border-white/10 flex items-center justify-center hover:bg-amber-500 hover:text-slate-950 transition-all duration-300 shadow-lg cursor-pointer"
                      >
                        <Linkedin className="h-4 w-4" />
                      </a>
                    )}
                    {member.twitter && (
                      <a
                        href={member.twitter}
                        target="_blank"
                        rel="noreferrer"
                        className="h-10 w-10 rounded-full bg-slate-950/95 backdrop-blur-md text-amber-500 border border-white/10 flex items-center justify-center hover:bg-amber-500 hover:text-slate-950 transition-all duration-300 shadow-lg cursor-pointer"
                      >
                        <Twitter className="h-4 w-4" />
                      </a>
                    )}
                    {member.instagram && (
                      <a
                        href={member.instagram}
                        target="_blank"
                        rel="noreferrer"
                        className="h-10 w-10 rounded-full bg-slate-950/95 backdrop-blur-md text-amber-500 border border-white/10 flex items-center justify-center hover:bg-amber-500 hover:text-slate-950 transition-all duration-300 shadow-lg cursor-pointer"
                      >
                        <Instagram className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>

                <CardContent className="p-6 text-center">
                  <CardTitle className="text-lg md:text-xl font-bold mb-1 group-hover:text-amber-500 transition-colors duration-300">
                    {member.name}
                  </CardTitle>
                  <p className="text-xs uppercase tracking-widest text-amber-500 font-bold mb-4">
                    {member.role}
                  </p>
                  <CardDescription className="text-sm text-muted-foreground leading-relaxed font-light line-clamp-3">
                    {member.bio}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
export default Team;
