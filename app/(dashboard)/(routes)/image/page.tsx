"use client";
// Import necessary components, icons, and utilities
import * as z from "zod";
import Heading from "@/components/heading";
import { Camera, Download, ImageIcon } from "lucide-react";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { amountOptions, formSchema, resolutionOptions } from "./constants";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import Empty from "@/components/empty";
import { Loader } from "@/components/loader";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import { useProModal } from "@/hooks/use-pro-modal";
import { toast } from "react-hot-toast";

const ImagePage = () => {
  // Initialize the pro modal and router
  const proModal = useProModal();
  const router = useRouter();

  // State to manage the list of images
  const [images, setImages] = useState<string[]>([]);

  // Initialize the form using react-hook-form and zod validation schema
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      amount: "1",
      resolution: "512x512",
    },
  });

  // Check if the form is submitting to show the loader
  const isLoading = form.formState.isSubmitting;

  // Handler for form submission
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // Clear the images array before fetching new images
      setImages([]);

      // Send a POST request to the server with form data
      const response = await axios.post("/api/image", values);

      // Extract URLs from the response data
      const urls = response.data.map((image: { url: string }) => image.url);

      // Update the images state with the new URLs
      setImages(urls);
      form.reset();
    } catch (error: any) {
      // If there is an error, handle it accordingly
      if (error?.response?.status === 403) {
        proModal.onOpen(); // Open pro modal if there is a 403 error
      } else {
        toast.error("Nekaj je šlo narobe"); // Show a toast error for other errors
      }
      console.log(error);
    } finally {
      router.refresh(); // Refresh the page after form submission (clears the form)
    }
  };

  return (
    <div className="h-fit bg-[#060e0e]">
      <Heading
        title="Ustvarjanje slik"
        description="Spremenite svoje besedilo v sliko."
        icon={Camera}
        iconColor="text-[#36bcba]"
        bgColor="bg-white/10"
      />
      <div className="px-4 lg:px-8">
        <div>
          <Form {...form}>
            {/* Form to input the prompt, amount, and resolution */}
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="rounded-lg border border-[#2f3838] w-full bg-white/10 text-white p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
            >
              {/* Input field for the prompt */}
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-6">
                    <FormControl className="m-0 p-0">
                      <Input
                        {...field}
                        disabled={isLoading}
                        placeholder="Fotografija pingvina na Antarktiki"
                        className="border-0 outline-none bg-transparent focus-visible:ring-0 focus-visible:ring-transparent"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              {/* Select field for the amount */}
              <FormField
                name="amount"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-2">
                    <Select
                      disabled={isLoading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue defaultValue={field.value} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {amountOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              {/* Select field for the resolution */}
              <FormField
                name="resolution"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-2">
                    <Select
                      disabled={isLoading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue defaultValue={field.value} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {resolutionOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              {/* Submit button */}
              <Button
                className="col-span-12 lg:col-span-2 w-full bg-[#36bcba] hover:bg-[#298e8d]"
                disabled={isLoading}
              >
                Ustvari
              </Button>
            </form>
          </Form>
        </div>
        <div className="space-y-4 mt-4">
          {/* Display the loader when submitting the form */}
          {isLoading && (
            <div className="p-20">
              <Loader />
            </div>
          )}
          {/* Display the empty state if no images are available */}
          {images.length === 0 && !isLoading && (
            <Empty img="/photos_object-2.png" label="Ni ustvarjenih slik." />
          )}
          {/* Display the images */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
            {images.map((src) => (
              <Card key={src} className="rounded-lg overflow-hidden">
                <div className="relative aspect-square">
                  {/* Show the image using the Next.js Image component */}
                  <Image src={src} alt="Image" fill />
                </div>
                {/* Card footer with the download button */}
                <CardFooter className="p-2">
                  <Button
                    onClick={() => window.open(src)}
                    variant="secondary"
                    className="w-full"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Prenesi
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImagePage;
