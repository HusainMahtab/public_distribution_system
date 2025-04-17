'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Skeleton } from '@/components/ui/skeleton';

interface Distribution {
  _id: string;
  serialNumber: string;
  cardNumber: string;
  cardHolder: string;
  unit: number;
}

export default function DistributionCards({ initialData }: { initialData: Distribution[] }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [filteredData, setFilteredData] = useState<Distribution[]>([]);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
      setFilteredData(
        initialData.filter((item) =>
          Object.values(item).some((value) =>
            value.toString().toLowerCase().includes(searchTerm.toLowerCase())
          )
      )
    )
    }, 1000);

    return () => clearTimeout(timer);
  }, [searchTerm, initialData]);

  // Skeleton loader count based on screen size
  const skeletonCount = typeof window !== 'undefined' ? 
    window.innerWidth < 640 ? 1 : 
    window.innerWidth < 1024 ? 2 : 
    window.innerWidth < 1280 ? 3 : 4 
    : 4;

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Search Header */}
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Distribution Cards</h1>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search by card holder, number, or serial..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 rounded-lg"
          />
        </div>
      </div>
      
      {/* Content Area */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: skeletonCount }).map((_, index) => (
            <Card key={index} className="border border-gray-200 rounded-xl">
              <CardHeader>
                <Skeleton className="h-6 w-3/4" />
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <>
          {/* Distribution Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence>
              {filteredData.map((distribution) => (
                <motion.div
                  key={distribution._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="hover:shadow-lg transition-shadow h-full border border-gray-200 rounded-xl">
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold truncate">
                        {distribution.cardHolder}
                      </CardTitle>
                    </CardHeader>
                    
                    <CardContent className="space-y-3">
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-medium text-gray-500">Card Number</span>
                          <span className="font-mono text-sm font-medium">
                            {distribution.cardNumber}
                          </span>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Serial Number</span>
                          <span className="font-medium">{distribution.serialNumber}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Units</span>
                          <span className="font-bold text-blue-600">{distribution.unit}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          
          {/* Empty State */}
          {filteredData.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="mx-auto max-w-md space-y-4">
                <div className="text-gray-400">
                  <Search className="mx-auto h-12 w-12" />
                </div>
                <h3 className="text-lg font-medium text-gray-900">No distributions found</h3>
                <p className="text-gray-500">
                  {searchTerm 
                    ? "No cards match your search" 
                    : "No distribution cards available"}
                </p>
              </div>
            </motion.div>
          )}
        </>
      )}
    </div>
  );
}