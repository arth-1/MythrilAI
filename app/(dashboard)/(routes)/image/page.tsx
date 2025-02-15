"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Download, ImageIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Empty } from "@/components/empty";
import { Heading } from "@/components/heading";
import { Loader } from "@/components/loader";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardFooter } from "@/components/ui/card";
import useProModal from "@/hooks/use-pro-modal";
import Image from "next/image";
import { toast } from "react-hot-toast";
import { amountOptions, formSchema, resolutionOptions } from "./constants";
import Header from "@/components/Header";

const ImagePage = () => {
  const router = useRouter();
  const proModal = useProModal();
  const [images, setImages] = useState<string[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      amount: "1",
      resolution: "512x512",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setImages([]);
      const response = await axios.post("/api/image", values, { responseType: "blob" });
      const text = await response.data.text();
      console.log("Response text:", text);
      console.log(response.data);
      
      const blob = await response.data;
      const imageBlob = new Blob([blob], { type: "image/png" }); // Ensure it's treated as an image
      const imageUrl = URL.createObjectURL(imageBlob);
      setImages([imageUrl]);


      form.reset();
    } catch (error: any) {
      console.log(error);
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
        title="Image Generation"
        description="Our most advanced AI Image Generation model."
        icon={ImageIcon}
        iconColor="text-pink-700"
        bgColor="bg-pink-700/10"
      />
      <div className="px-4 lg:px-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-12 gap-2 p-4">
            <FormField name="prompt" render={({ field }) => (
              <FormItem className="col-span-12 lg:col-span-6">
                <FormControl>
                  <Input {...field} placeholder="Start typing here..." disabled={isLoading} />
                </FormControl>
              </FormItem>
            )} />
            <FormField name="amount" control={form.control} render={({ field }) => (
              <FormItem className="col-span-12 lg:col-span-2">
                <Select disabled={isLoading} onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {amountOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )} />
            <FormField name="resolution" control={form.control} render={({ field }) => (
              <FormItem className="col-span-12 lg:col-span-2">
                <Select disabled={isLoading} onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {resolutionOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )} />
            <Button className="col-span-12 lg:col-span-2 w-full" disabled={isLoading}>Generate</Button>
          </form>
        </Form>
        <div className="mt-4">
          {isLoading && <Loader />}
          {images.length === 0 && !isLoading && <Empty label="Start typing to generate images." />}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
            {images.map((image, index) => (
              <Card key={index}>
                <div className="relative aspect-square">
                  <Image src={image} fill alt="Generated image" />
                </div>
                <CardFooter>
                  <Button onClick={() => window.open(image)} variant="secondary">
                    <Download className="h-4 w-4" />
                    Download
                  </Button>
                </CardFooter>
              </Card>
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

export default ImagePage;
