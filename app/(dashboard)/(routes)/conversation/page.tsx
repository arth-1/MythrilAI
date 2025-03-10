"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { MessageSquare } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { BotAvatar } from "@/components/bot-avatar";
import { Empty } from "@/components/empty";
import { Heading } from "@/components/heading";
import { Loader } from "@/components/loader";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UserAvatar } from "@/components/user-avatar";
import { cn } from "@/lib/utils";

import useProModal from "@/hooks/use-pro-modal";
import { toast } from "react-hot-toast";
import { formSchema } from "./constants";
import Header from "@/components/Header";
import ReactMarkdown from "react-markdown";

// Define a simple message type for conversation messages
type Message = {
  role: "user" | "assistant";
  content: string;
};

const ConversationPage = () => {
  const router = useRouter();
  const proModal = useProModal();
  const [messages, setMessages] = useState<Message[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { prompt: "" },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const userMessage: Message = {
        role: "user",
        content: values.prompt,
      };

      const newMessages = [...messages, userMessage];

      console.log("Sending request with:", JSON.stringify({ messages: newMessages })); // Debugging

      const response = await axios.post("/api/conversation", {
        messages: newMessages,
      });

      const assistantMessage: Message = {
        role: "assistant",
        content: response.data.response, // Changed from response.data.text
      };

      setMessages((current) => [...current, userMessage, assistantMessage]);
      form.reset();
    } catch (error: any) {
      console.error(error);
      if (error?.response?.status === 403) {
        proModal.onOpen();
      } else {
        toast.error("Something went wrong.");
      }
    } finally {
      router.refresh();
    }
  };

  return (
    <div className="bg-[rgb(240,234,226)]">
      <Header />
      <br />
      <Heading
        title="Conversation"
        description="Our most advanced AI conversation model."
        icon={MessageSquare}
        iconColor="text-violet-500"
        bgColor="bg-violet-500/10"
      />
      <div className="px-4 lg:px-8">
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
            >
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-10">
                    <FormControl className="m-0 p-0">
                      <Input
                        {...field}
                        placeholder="  Start typing here..."
                        className="border-0 outline-none focus-visible:ring-1 focus-visible:ring-transparent"
                        disabled={isLoading}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button className="col-span-12 lg:col-span-2 w-full" disabled={isLoading}>
                Generate
              </Button>
            </form>
          </Form>
        </div>
        <div className="space-y-4 mt-4">
          {isLoading && (
            <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
              <Loader />
            </div>
          )}
          {messages.length === 0 && !isLoading && (
            <Empty label="Start typing to have a conversation." />
          )}
          <div className="flex flex-col-reverse gap-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  "p-8 w-full flex items-start gap-x-8 rounded-lg",
                  message.role === "user"
                    ? "bg-white border border-black/10"
                    : "bg-muted"
                )}
              >
                {message.role === "user" ? <UserAvatar /> : <BotAvatar />}
            <div className="prose">
              {message.role === "assistant" ? (
                <ReactMarkdown>{message.content}</ReactMarkdown>
              ) : (
                <p className="text-sm">{message.content}</p>
              )}
            </div>
          </div>
            ))}
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />
    </div>
  );
};

export default ConversationPage;
