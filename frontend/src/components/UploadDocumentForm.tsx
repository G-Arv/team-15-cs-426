"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
    documentName: z.string().min(2, {
      message: "Document name must be at least 2 characters.",
    }),
    file: z
      .instanceof(File, { message: "You must upload a file." })
      .optional(),
  })

export function UploadDocumentForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            documentName: "",
            file: undefined,
        },
    });


    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

                <FormField
                    control={form.control}
                    name="documentName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Document Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter document name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="file"
                    render={({ field: { onChange, ...field } }) => (
                        <FormItem>
                            <FormLabel>Upload File</FormLabel>
                            <FormControl>
                                <Input 
                                    type="file" 
                                    accept=".pdf,.doc,.docx,.jpg,.png"
                                    onChange={(e) => {
                                        if (e.target.files?.[0]) {
                                            onChange(e.target.files[0]);
                                        }
                                    }} 
                                />
                            </FormControl>
                            <FormDescription>Accepted formats: PDF, DOC, DOCX, JPG, PNG</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Upload</Button>
            </form>
        </Form>
    )
}
