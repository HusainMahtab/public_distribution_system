'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Plus, Pencil, Trash, Search } from "lucide-react";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const distributionSchema = z.object({
  serialNumber: z.string().min(1, "Serial number is required"),
  cardNumber: z.string().min(1, "Card number is required"),
  cardHolder: z.string().min(1, "Card holder name is required"),
  unit: z.number().min(1, "Unit must be greater than 0"),
});

interface Distribution {
  _id: string;
  serialNumber: string;
  cardNumber: string;
  cardHolder: string;
  unit: number;
}

export default function AdminPanel() {
  const [open, setOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [distributions, setDistributions] = useState<Distribution[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedDistribution, setSelectedDistribution] = useState<Distribution | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const { data: currentUser } = useSession();
  const admin = currentUser?.user.fullName;

  const form = useForm<z.infer<typeof distributionSchema>>({
    resolver: zodResolver(distributionSchema),
    defaultValues: {
      serialNumber: "",
      cardNumber: "",
      cardHolder: "",
      unit: 0,
    },
  });

  const updateForm = useForm<z.infer<typeof distributionSchema>>({
    resolver: zodResolver(distributionSchema),
    defaultValues: {
      serialNumber: "",
      cardNumber: "",
      cardHolder: "",
      unit: 0,
    },
  });

  useEffect(() => {
    fetchDistributions();
  }, []);

  const fetchDistributions = async () => {
    try {
      const response = await fetch('/api/distributions');
      const data = await response.json();
      setDistributions(data);
      setLoading(false);
    } catch (error) {
      toast.error("Failed to fetch distributions");
      setLoading(false);
    }
  };

  const filteredDistributions = distributions.filter((distribution) =>
    Object.values(distribution).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const onSubmit = async (data: z.infer<typeof distributionSchema>) => {
    setLoading(true);
    try {
      const response = await fetch('/api/distributions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
     
      if (!response.ok) {
        throw new Error('Failed to add distribution');
      }

      const newDistribution = await response.json();
      setDistributions(prev => [...prev, newDistribution]);
      setLoading(false);
      toast.success("Distribution added successfully");
      form.reset();
      setOpen(false);
    } catch (error) {
      setLoading(false);
      toast.error("Failed to add distribution");
    }
  };

  const handleUpdate = async (data: z.infer<typeof distributionSchema>) => {
    setLoading(true);
    if (!selectedDistribution) return;

    try {
      const response = await fetch(`/api/distributions/${selectedDistribution._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) throw new Error('Failed to update');

      const updatedData = await response.json();
      setDistributions(prev => 
        prev.map(d => d._id === selectedDistribution._id ? updatedData : d)
      );
      setLoading(false);
      toast.success("Distribution updated successfully");
      updateForm.reset();
      setUpdateOpen(false);
    } catch (error) {
      setLoading(false);
      toast.error("Failed to update distribution");
    }
  };

  const handleDelete = async (id: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/distributions/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete');
      setDistributions(prev => prev.filter(d => d._id !== id));
     setLoading(false);
      toast.success("Distribution deleted successfully");
    } catch (error) {
      toast.error("Failed to delete distribution");
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold">{admin}</h1>
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-[300px]">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search distributions..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add New
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Distribution</DialogTitle>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="serialNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Serial Number</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter serial number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="cardNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Card Number</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter card number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="cardHolder"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Card Holder</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter card holder name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="unit"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Unit</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="Enter unit" 
                            {...field}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full">
                   {loading ? "Adding..." : " Add Distribution"}
                  </Button>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="w-full">
              <CardHeader>
                <Skeleton className="h-4 w-[150px]" />
              </CardHeader>
              <CardContent className="space-y-2">
                <Skeleton className="h-4 w-[100px]" />
                <Skeleton className="h-4 w-[120px]" />
                <Skeleton className="h-4 w-[80px]" />
              </CardContent>
              <CardFooter>
                <Skeleton className="h-8 w-[100px]" />
              </CardFooter>
            </Card>
          ))
        ) : (
          filteredDistributions.map((distribution) => (
            <Card key={distribution._id} className="w-full">
              <CardHeader>
                <CardTitle className="text-lg">
                  {distribution.cardHolder}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Serial Number: {distribution.serialNumber}
                </p>
                <p className="text-sm text-muted-foreground">
                  Card Number: {distribution.cardNumber}
                </p>
                <p className="text-sm text-muted-foreground">
                  Unit: {distribution.unit}
                </p>
              </CardContent>
              <CardFooter className="flex justify-end space-x-2">
                <Dialog open={updateOpen} onOpenChange={setUpdateOpen}>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedDistribution(distribution);
                        updateForm.reset(distribution);
                      }}
                    >
                      <Pencil className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Update Distribution</DialogTitle>
                    </DialogHeader>
                    <Form {...updateForm}>
                      <form onSubmit={updateForm.handleSubmit(handleUpdate)} className="space-y-4">
                        <FormField
                          control={updateForm.control}
                          name="serialNumber"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Serial Number</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter serial number" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={updateForm.control}
                          name="cardNumber"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Card Number</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter card number" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={updateForm.control}
                          name="cardHolder"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Card Holder</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter card holder name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={updateForm.control}
                          name="unit"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Unit</FormLabel>
                              <FormControl>
                                <Input 
                                  type="number" 
                                  placeholder="Enter unit" 
                                  {...field}
                                  onChange={(e) => field.onChange(Number(e.target.value))}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button type="submit" className="w-full">
                         {loading ? "Updating... " : "Update Distribution"}
                        </Button>
                      </form>
                    </Form>
                  </DialogContent>
                </Dialog>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(distribution._id)}
                >
                  <Trash className="h-4 w-4 mr-1" />
                  Delete
                </Button>
              </CardFooter>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}