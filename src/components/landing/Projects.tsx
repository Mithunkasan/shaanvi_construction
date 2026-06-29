'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, DollarSign, Calendar, Compass } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  images: string[];
  budget: string | null;
  status: string;
  progress: number;
  startDate: Date | string | null;
  completionDate: Date | string | null;
}

interface ProjectsProps {
  projects: Project[];
}

export function Projects({ projects }: ProjectsProps) {
  const [filter, setFilter] = React.useState('All');
  const [selectedProject, setSelectedProject] = React.useState<Project | null>(null);

  const categories = ['All', 'Residential', 'Commercial', 'Renovation', 'Architecture'];

  const filteredProjects = projects.filter((project) => {
    if (filter === 'All') return true;
    return project.category.toLowerCase() === filter.toLowerCase();
  });

  return (
    <section id="projects" className="py-24 bg-slate-900/10 border-t border-b border-border/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-sm font-bold uppercase tracking-widest text-amber-500 mb-2">
            Our Portfolio
          </p>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight">
            Architectural Masterpieces
          </h2>
          <p className="text-base text-muted-foreground mt-4 font-light">
            Explore our curated gallery of modern residential villas, commercial structures, and restorations.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={filter === cat ? 'gold' : 'outline'}
              onClick={() => setFilter(cat)}
              className="rounded-full text-xs font-semibold uppercase tracking-wider"
            >
              {cat}
            </Button>
          ))}
        </div>

        {/* Masonry-style Grid with Framer Motion Layout animations */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                onClick={() => setSelectedProject(project)}
                className="relative group overflow-hidden rounded-xl bg-slate-950 aspect-video md:aspect-4/3 cursor-pointer shadow-md"
              >
                {/* Project Image */}
                <img
                  src={project.images[0]}
                  alt={project.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Luxury gradient overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/40 to-transparent opacity-75 md:opacity-0 md:group-hover:opacity-85 transition-opacity duration-300" />
                
                {/* Details showing on hover */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end text-white transform md:translate-y-4 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 transition-all duration-300">
                  <span className="text-[10px] md:text-xs uppercase tracking-widest text-amber-500 font-bold mb-1">
                    {project.category}
                  </span>
                  <h3 className="text-xl md:text-2xl font-black mb-2">{project.title}</h3>
                  <p className="text-xs md:text-sm text-slate-300 leading-relaxed line-clamp-2 mb-4 font-light">
                    {project.description}
                  </p>
                  
                  <div className="flex items-center space-x-2 text-xs text-amber-500 font-semibold">
                    <Eye className="h-4 w-4" />
                    <span>View Project Case Study</span>
                  </div>
                </div>

                {/* Mobile top-right status badge */}
                <div className="absolute top-4 right-4 bg-slate-950/80 backdrop-blur-md text-white border border-white/10 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider">
                  {project.status}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Project Case Study Dialog */}
      <Dialog open={selectedProject !== null} onOpenChange={(open) => !open && setSelectedProject(null)}>
        <DialogContent className="max-w-2xl">
          {selectedProject && (
            <>
              <DialogHeader>
                <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-amber-500 mb-1">
                  <Compass className="h-4 w-4" />
                  <span>{selectedProject.category} Case Study</span>
                </div>
                <DialogTitle className="text-2xl md:text-3xl font-black">{selectedProject.title}</DialogTitle>
                <DialogDescription className="text-sm text-muted-foreground leading-relaxed mt-2 font-light">
                  {selectedProject.description}
                </DialogDescription>
              </DialogHeader>

              {/* Showcase Image Gallery slider */}
              <div className="relative h-64 md:h-80 w-full rounded-xl overflow-hidden my-4 bg-slate-950">
                <img
                  src={selectedProject.images[0]}
                  alt={selectedProject.title}
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Metadatas grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-4 border-t border-border/40 text-sm">
                <div>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground">Estimated Budget</p>
                  <div className="flex items-center gap-1 font-semibold text-foreground mt-1">
                    <DollarSign className="h-4 w-4 text-amber-500" />
                    <span>{selectedProject.budget || 'Contact us'}</span>
                  </div>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground">Status / Progress</p>
                  <p className="font-semibold text-foreground mt-1">
                    {selectedProject.status} ({selectedProject.progress}%)
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground">Timeline Start</p>
                  <div className="flex items-center gap-1 font-semibold text-foreground mt-1">
                    <Calendar className="h-4 w-4 text-amber-500" />
                    <span>
                      {selectedProject.startDate
                        ? new Date(selectedProject.startDate).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                          })
                        : 'Pre-planning'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Progress bar visualizer */}
              <div className="mt-6">
                <div className="flex justify-between text-xs text-muted-foreground mb-1">
                  <span>Development Progress</span>
                  <span>{selectedProject.progress}%</span>
                </div>
                <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gold-gradient rounded-full transition-all duration-1000"
                    style={{ width: `${selectedProject.progress}%` }}
                  />
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
export default Projects;
