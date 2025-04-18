
'use client';

import axios from "axios";
import { useEffect, useState } from "react";
import DistributionCards from "@/components/DistributionCards";

interface Distribution {
  _id: string;
  serialNumber: string;
  cardNumber: string;
  cardHolder: string;
  unit: number;
}

function Distributions() {
    const [distributions, setDistributions] = useState<Distribution[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
  
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/distributions`);
        setDistributions(response.data);
        setError(null);
      } catch (error) {
        console.log("error while fetching distribution data", error);
        setError("Failed to fetch distribution data");
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      fetchData();
    }, []);
  
    if (loading) {
      return <div className="flex justify-center items-center h-64">Loading...</div>;
    }
  
    if (error) {
      return <div className="flex justify-center items-center h-64 text-red-500">{error}</div>;
    }
  
  return (
    <main className="container mx-auto py-1">
      <DistributionCards initialData={distributions} />
    </main>
  )
}

export default Distributions