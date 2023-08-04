"use client";
// Import necessary modules and components
import * as z from "zod";
import Heading from "@/components/heading";
import { Code, Code2 } from "lucide-react";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { formSchema } from "./constants";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ChatCompletionRequestMessage } from "openai";
import Empty from "@/components/empty";
import { Loader } from "@/components/loader";
import { cn } from "@/lib/utils";
import { UserAvatar } from "@/components/user-avatar";
import { BotAvatar } from "@/components/bot-avatar";
import ReactMarkdown from "react-markdown";
import { useProModal } from "@/hooks/use-pro-modal";
import { toast } from "react-hot-toast";

// Define the CodePage component
const CodePage = () => {
  // Initialize hooks and state variables
  const proModal = useProModal();
  const router = useRouter();
  const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([]);

  // Set up the react-hook-form with zod validation and default values
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  // Handle form submission
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // Create a user message to be sent to the AI service
      const userMessage: ChatCompletionRequestMessage = {
        role: "user",
        content: values.prompt,
      };

      // Append the user message to the existing messages array
      const newMessages = [...messages, userMessage];

      // Send the messages array to the AI service using Axios
      const response = await axios.post("/api/code", {
        messages: newMessages,
      });

      // Update the messages state with the response from the AI service
      setMessages((current) => [...current, userMessage, response.data]);

      // Reset the form after successful submission
      form.reset();
    } catch (error: any) {
      // Handle errors, potentially show pro modal for non-pro users
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

  // Render the CodePage component
  return (
    <div className="h-fit bg-[#060e0e] pb-5">
      {/* Render the heading section */}
      <Heading
        title="Ustvarjanje kode"
        description="Ustvarite kodo z uporabo besedila."
        icon={Code2}
        iconColor="text-[#36bcba]"
        bgColor="bg-white/10"
      />
      <div className="px-4 lg:px-8">
        <div>
          {/* Render the form with input field and submit button */}
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="rounded-lg border border-[#2f3838] w-full bg-white/10 text-white p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
            >
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-10">
                    <FormControl className="m-0 p-0">
                      <Input
                        {...field}
                        disabled={isLoading}
                        placeholder="Preprost preklopni gumb z uporabo Reacta"
                        className="border-0 outline-none bg-transparent focus-visible:ring-0 focus-visible:ring-transparent"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
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
          {/* Render the loading spinner if form is submitting */}
          {isLoading && (
            <div className="p-8 rounded-lg w-full h-full flex items-center justify-center bg-muted">
              <Loader />
            </div>
          )}

          {/* Render the "Empty" component if there are no messages */}
          {messages.length === 0 && !isLoading && (
            <Empty img="/Computer-2.png" label="Ni pogovorov" />
          )}

          {/* Render the messages */}
          <div className="flex flex-col-reverse gap-y-4">
            {messages.map((message) => (
              <div
                key={message.content}
                className={cn(
                  "p-8 w-full flex items-center mt-3 gap-8 rounded-lg",
                  message.role === "user"
                    ? "bg-white border border-black/10"
                    : "bg-muted"
                )}
              >
                {message.role === "user" ? <UserAvatar /> : <BotAvatar />}

                {/* Render the ReactMarkdown component to display the message content */}
                <ReactMarkdown
                  components={{
                    pre: ({ node, ...props }) => (
                      <div className="overflow-auto w-full my-2 bg-black/10 p-3 rounded-lg">
                        <pre {...props} />
                      </div>
                    ),
                    code: ({ node, ...props }) => (
                      <code className="bg-black/10 rounded-lg p-1" {...props} />
                    ),
                  }}
                  className="text-sm overflow-hidden leading-7"
                >
                  {message.content || ""}
                </ReactMarkdown>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Export the CodePage component as the default export
export default CodePage;
