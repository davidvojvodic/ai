"use client";
// Import necessary components, icons, and utilities
import * as z from "zod";
import Heading from "@/components/heading";
import { ImageIcon, Music } from "lucide-react";
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

const ImageRestorationPage = () => {
  // Initialize the pro modal and router
  const proModal = useProModal();
  const router = useRouter();

  // State to manage the audio URL for the created music
  const [image, setImage] = useState<string>();

  // Initialize the form using react-hook-form and zod validation schema
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  // Check if the form is submitting to show the loader
  const isLoading = form.formState.isSubmitting;

  // Handler for form submission
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // Clear the music URL before fetching new music
      setImage(undefined);

      // Send a POST request to the server with form data
      const response = await axios.post("/api/image-restoration", values);

      // Update the music state with the new audio URL
      setImage(response.data.audio);

      // Reset the form after successful submission
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
        title="Restavriranje slik"
        description="Obnovite svoje stare slike v nove."
        icon={ImageIcon}
        iconColor="text-[#36bcba]"
        bgColor="bg-white/10"
      />
      <div className="px-4 lg:px-8">
        <div>
          <Form {...form}>
            {/* Form to input the prompt for creating music */}
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="rounded-lg border border-[#2f3838] w-full bg-white/10 text-white p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
            >
              {/* Input field for the prompt */}
              <FormField
                name="file"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-10">
                    <FormControl className="m-0 p-0">
                      <Input
                        type="file"
                        {...field}
                        disabled={isLoading}
                        className="border-0 outline-none bg-transparent focus-visible:ring-0 focus-visible:ring-transparent"
                      />
                    </FormControl>
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
            <div className="p-8 rounded-lg w-full h-full flex items-center justify-center bg-muted">
              <Loader />
            </div>
          )}
          {/* Display the empty state if no music is available */}
          {!image && !isLoading && (
            <Empty img="/women_hand-2.png" label="Ni ustvarjene glasbe" />
          )}
          {/* Display the audio player with the created music */}
          {image && (
            <audio controls className="w-full mt-8">
              <source src={image} />
            </audio>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageRestorationPage;
