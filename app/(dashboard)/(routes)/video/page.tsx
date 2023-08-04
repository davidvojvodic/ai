"use client";
// Import necessary components, icons, and utilities
import * as z from "zod";
import Heading from "@/components/heading";
import { Film } from "lucide-react";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { formSchema } from "./constants";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import Empty from "@/components/empty";
import { Loader } from "@/components/loader";
import { useProModal } from "@/hooks/use-pro-modal";
import { toast } from "react-hot-toast";

// Define the VideoPage functional component
const VideoPage = () => {
  // Initialize state variables and hooks
  const proModal = useProModal();
  const router = useRouter();
  const [video, setVideo] = useState<string>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  // Function to handle form submission
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setVideo(undefined);

      // Send a POST request to the API endpoint to create the video
      const response = await axios.post("/api/video", values);

      // Set the video URL from the response to the state
      setVideo(response.data[0]);

      // Reset the form after successful submission
      form.reset();
    } catch (error: any) {
      // Open pro modal if the user is not on a PRO plan
      if (error?.response?.status === 403) {
        proModal.onOpen();
      } else {
        toast.error("Nekaj je šlo narobe");
      }
      console.log(error);
    } finally {
      // Refresh the page after form submission
      router.refresh();
    }
  };

  return (
    <div className="h-fit bg-[#060e0e]">
      {/* Heading section */}
      <Heading
        title="Ustvarjanje videa"
        description="Spremenite svoje besedilo v video."
        icon={Film}
        iconColor="text-[#36bcba]"
        bgColor="bg-white/10"
      />
      <div className="px-4 lg:px-8">
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="rounded-lg border border-[#2f3838] w-full bg-white/10 text-white p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
            >
              {/* Form field for the text prompt */}
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-10">
                    <FormControl className="m-0 p-0">
                      <Input
                        {...field}
                        disabled={isLoading}
                        placeholder="Morski pes v morju"
                        className="border-0 outline-none bg-transparent focus-visible:ring-0 focus-visible:ring-transparent"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              {/* Button to submit the form */}
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
          {/* Show a loader if the form is submitting */}
          {isLoading && (
            <div className="p-8 rounded-lg w-full h-full flex items-center justify-center bg-muted">
              <Loader />
            </div>
          )}
          {/* Show an empty state message if no video is created */}
          {!video && !isLoading && (
            <Empty img="/girl_laptop-2.png" label="Ni ustvarjenega videa" />
          )}
          {/* Display the video if it exists */}
          {video && (
            <video
              className="w-full aspect-video mt-8 rounded-lg border bg-black"
              controls
            >
              <source src={video} />
            </video>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoPage;
