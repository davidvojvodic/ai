"use client";

import * as z from "zod";
import Heading from "@/components/heading";
import { Copy, MessageSquare, MessagesSquare } from "lucide-react";
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
import { useProModal } from "@/hooks/use-pro-modal";
import { toast } from "react-hot-toast";

const ConversationPage = () => {
  const proModal = useProModal();
  const router = useRouter();
  const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([]);

  // const onCopy = () => {
  //   if (!content) {
  //     return;
  //   }

  //   navigator.clipboard.writeText(content);
  //   toast({
  //     description: "Message copied to clipboard",
  //   });
  // };

  // Initialize the form and validation using zod
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
      // Prepare user's message for AI
      const userMessage: ChatCompletionRequestMessage = {
        role: "user",
        content: values.prompt,
      };

      // Add user's message to the conversation
      const newMessages = [...messages, userMessage];

      // Send user's message to the AI model via API
      const response = await axios.post("/api/conversation", {
        messages: newMessages,
      });

      // Update the conversation with AI's response
      setMessages((current) => [...current, userMessage, response.data]);

      form.reset();
    } catch (error: any) {
      // Handle API errors and display pro modal if needed
      if (error?.response?.status === 403) {
        proModal.onOpen();
      } else {
        toast.error("Nekaj je šlo narobe");
      }
    } finally {
      // Refresh the page
      router.refresh();
    }
  };

  return (
    <div className="h-fit bg-[#060e0e]">
      {/* Header */}
      <Heading
        title="Pogovor"
        description="Naš najnaprednejši model pogovora."
        icon={MessagesSquare}
        iconColor="text-[#36bcba]"
        bgColor="bg-white/10"
      />
      <div className="px-4 lg:px-8">
        <div>
          {/* Form for user to input messages */}
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
                        placeholder="Vprašaj me karkoli"
                        className="border-0 !border-transparent !outline-none bg-transparent !focus-visible:ring-0 !focus-visible:ring-transparent"
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
          {/* Loading state */}
          {isLoading && (
            <div className="p-8 rounded-lg w-full h-full flex items-center justify-center bg-muted">
              <Loader />
            </div>
          )}
          {/* Empty conversation */}
          {messages.length === 0 && !isLoading && (
            <Empty img="/Laptop-2.png" label="Ni pogovorov" />
          )}
          {/* Display conversation messages */}
          <div className="flex flex-col-reverse gap-4">
            {messages.map((message) => (
              <div
                key={message.content}
                className={cn(
                  "p-8 w-full flex items-center mt-3 gap-8 rounded-lg",
                  message.role === "user"
                    ? "bg-white border border-black/10 text-black"
                    : "bg-muted"
                )}
              >
                {/* Render user or bot avatar based on the role */}
                {message.role === "user" ? <UserAvatar /> : <BotAvatar />}
                {/* Render the content of the message */}
                <p className="text-sm">{message.content}</p>
                {message.role !== "user" && !isLoading && (
                  <Button
                    onClick={() => {}}
                    className="px-2 bg-slate-400"
                    size="lg"
                    variant="default"
                  >
                    <Copy />
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationPage;
