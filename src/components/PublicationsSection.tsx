"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { publications } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type SortType = "date" | "category";

interface Publication {
  title: string;
  link: string;
  image: string;
  description: string;
  category: string;
  date: string;
}

export default function PublicationsSection() {
  const [sortType, setSortType] = useState<SortType>("date");

  const sortedPublications = useMemo(() => {
    const sorted = [...publications];
    
    if (sortType === "date") {
      return sorted.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } else {
      // Sort by category, then by date within each category
      return sorted.sort((a, b) => {
        if (a.category === b.category) {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        }
        return a.category.localeCompare(b.category);
      });
    }
  }, [sortType]);

  const groupedPublications = useMemo(() => {
    if (sortType === "category") {
      const grouped: Record<string, Publication[]> = {};
      sortedPublications.forEach(pub => {
        if (!grouped[pub.category]) {
          grouped[pub.category] = [];
        }
        grouped[pub.category].push(pub);
      });
      
      // Sort categories by number of papers (descending)
      const sortedCategories = Object.entries(grouped).sort(([, papersA], [, papersB]) => {
        return papersB.length - papersA.length;
      });
      
      // Convert back to object with sorted order
      const sortedGrouped: Record<string, Publication[]> = {};
      sortedCategories.forEach(([category, papers]) => {
        sortedGrouped[category] = papers;
      });
      
      return sortedGrouped;
    }
    return null;
  }, [sortedPublications, sortType]);

  const formatDate = (dateString: string) => {
    // If the date string is just a year (e.g., "2025"), return it as is
    if (/^\d{4}$/.test(dateString)) {
      return dateString;
    }
    // Otherwise, extract just the year from a full date
    const date = new Date(dateString);
    return date.getFullYear().toString();
  };

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Publications
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          My published research contributions across various domains of artificial intelligence and machine learning.
        </p>
      </motion.div>

      {/* Sort Toggle */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex justify-center mb-8"
      >
        <div className="flex bg-muted rounded-lg p-1">
          <Button
            variant={sortType === "date" ? "default" : "ghost"}
            size="sm"
            onClick={() => setSortType("date")}
            className="rounded-md"
          >
            Sort by Date
          </Button>
          <Button
            variant={sortType === "category" ? "default" : "ghost"}
            size="sm"
            onClick={() => setSortType("category")}
            className="rounded-md"
          >
            Sort by Category
          </Button>
        </div>
      </motion.div>

      {/* Publications Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="space-y-8"
      >
        {sortType === "date" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedPublications.map((publication, index) => (
              <motion.div
                key={publication.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="h-full"
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <div className="aspect-video bg-muted rounded-t-lg overflow-hidden">
                    <img
                      src={publication.image}
                      alt={publication.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "/publications/default.svg";
                      }}
                    />
                  </div>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-purple-600 bg-purple-100 dark:bg-purple-900/20 px-2 py-1 rounded-full">
                        {publication.category}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {formatDate(publication.date)}
                      </span>
                    </div>
                    <CardTitle className="text-lg leading-tight">
                      <a
                        href={publication.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-purple-600 transition-colors duration-200"
                      >
                        {publication.title}
                      </a>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm leading-relaxed">
                      {publication.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="space-y-12">
            {groupedPublications && Object.entries(groupedPublications).map(([category, pubs], categoryIndex) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              >
                <h3 className="text-2xl font-semibold mb-6 text-center bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  {category}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {pubs.map((publication, index) => (
                    <motion.div
                      key={publication.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: (categoryIndex * 0.1) + (index * 0.1) }}
                      whileHover={{ y: -5 }}
                      className="h-full"
                    >
                      <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                        <div className="aspect-video bg-muted rounded-t-lg overflow-hidden">
                          <img
                            src={publication.image}
                            alt={publication.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = "/publications/default.svg";
                            }}
                          />
                        </div>
                        <CardHeader className="pb-3">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-purple-600 bg-purple-100 dark:bg-purple-900/20 px-2 py-1 rounded-full">
                              {publication.category}
                            </span>
                            <span className="text-sm text-muted-foreground">
                              {formatDate(publication.date)}
                            </span>
                          </div>
                          <CardTitle className="text-lg leading-tight">
                            <a
                              href={publication.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:text-purple-600 transition-colors duration-200"
                            >
                              {publication.title}
                            </a>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <CardDescription className="text-sm leading-relaxed">
                            {publication.description}
                          </CardDescription>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </section>
  );
}
