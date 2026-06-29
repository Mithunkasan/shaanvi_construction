'use client';

import * as React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar, User } from 'lucide-react';
import { formatDate } from '@/lib/utils';

interface Blog {
  id: string;
  title: string;
  slug: string;
  content: string;
  image: string;
  authorName: string;
  tags: string[];
  createdAt: Date | string;
  category: {
    name: string;
  };
}

interface BlogRollProps {
  blogs: Blog[];
}

export function BlogRoll({ blogs }: BlogRollProps) {
  if (blogs.length === 0) return null;

  return (
    <section id="blog" className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-widest text-amber-500 mb-2">
              Shaanvi Construction Journal
            </p>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-foreground">
              Latest Architectural Insights
            </h2>
          </div>
          <div className="mt-4 md:mt-0">
            <Link href="/blog">
              <Button variant="outline" className="flex items-center gap-2">
                View All Journal Entries
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Blogs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.slice(0, 3).map((blog, index) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <Card className="h-full border border-border/40 overflow-hidden bg-card hover:border-amber-500/40 hover:shadow-lg transition-all duration-500 flex flex-col justify-between">
                <div>
                  {/* Photo Frame */}
                  <div className="relative h-56 w-full overflow-hidden bg-slate-900">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-slate-950/15" />
                    
                    {/* Category Label */}
                    <div className="absolute top-4 left-4 bg-amber-500 text-slate-950 px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-wider shadow-xs">
                      {blog.category.name}
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground mb-4">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>{formatDate(blog.createdAt)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <User className="h-3.5 w-3.5" />
                        <span>{blog.authorName}</span>
                      </div>
                    </div>

                    <CardTitle className="text-lg md:text-xl font-bold mb-3 group-hover:text-amber-500 transition-colors duration-300 line-clamp-2">
                      {blog.title}
                    </CardTitle>
                    
                    {/* Strip HTML tags from preview text */}
                    <CardDescription className="text-xs md:text-sm leading-relaxed text-muted-foreground line-clamp-3 font-light">
                      {blog.content.replace(/<[^>]*>/g, '')}
                    </CardDescription>
                  </CardContent>
                </div>

                <div className="px-6 pb-6 pt-4 border-t border-border/20 mt-4 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {blog.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="text-[10px] bg-muted px-2 py-0.5 rounded-sm font-semibold text-muted-foreground">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  
                  <Link href={`/blog/${blog.slug}`}>
                    <Button variant="ghost" size="sm" className="text-amber-500 hover:text-amber-600 font-bold p-0 flex items-center gap-1 group-hover:translate-x-1 transition-transform cursor-pointer">
                      Read Article
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Button>
                  </Link>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
export default BlogRoll;
