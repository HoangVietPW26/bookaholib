"use client"
import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { ZodType } from "zod"
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
import Link from 'next/link'
// import ImageUpload from './ImageUpload'
import { toast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'
import { bookSchema } from '@/lib/validations'
import z from 'zod'
import { Textarea } from '@/components/ui/textarea'
import FileUpload from '@/components/FileUpload'
import ColorPicker from '../ColorPicker'
import { createBook } from '@/lib/admin/actions/books'

interface Props<T extends Partial<Book>>{
    type: "create" | "update"
}



const BookForm = () => {
    
    const router = useRouter()
    const form = useForm<z.infer<typeof bookSchema>>({
        resolver: zodResolver(bookSchema),
        defaultValues: {
            title: "",
            description: "",
            author: "",
            genre: "",
            rating: 1,
            totalCopies: 1,
            coverUrl: "",
            coverColor: "",
            videoUrl: "",
            summary: "",
          },
      })
    
     
      // 2. Define a submit handler.
      const onSubmit = async(values: z.infer<typeof bookSchema>) => {
        const result = await createBook(values)
        if (result.success) {
            toast({
                title: 'Success',
                description: "Book create successfullly"
            })

            router.push(`/admin/books/${result.data.id}`)
        } else {
            toast({
                title: 'Error',
                description: result.messege,
                variant: "destructive"
            })
        }
      }
  
    return (


        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className='flex flex-col gap-1'>
                <FormLabel className='text-base font-normal text-dark-500'>
                    Book Title
                </FormLabel>
                <FormControl>

                    <Input required placeholder='Book title' {...field} className='book-form_input'/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

        <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem className='flex flex-col gap-1'>
                <FormLabel className='text-base font-normal text-dark-500'>
                    Author
                </FormLabel>
                <FormControl>

                    <Input required placeholder='Book author' {...field} className='book-form_input'/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

            <FormField
            control={form.control}
            name="genre"
            render={({ field }) => (
              <FormItem className='flex flex-col gap-1'>
                <FormLabel className='text-base font-normal text-dark-500'>
                    Book Genre
                </FormLabel>
                <FormControl>

                    <Input required placeholder='Book genre' {...field} className='book-form_input'/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

        <FormField
            control={form.control}
            name="rating"
            render={({ field }) => (
              <FormItem className='flex flex-col gap-1'>
                <FormLabel className='text-base font-normal text-dark-500'>
                    Rating
                </FormLabel>
                <FormControl>
                    <Input required placeholder='Book rating' {...field} className='book-form_input' type='number' min={1} max={5}/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />


        <FormField
            control={form.control}
            name="totalCopies"
            render={({ field }) => (
              <FormItem className='flex flex-col gap-1'>
                <FormLabel className='text-base font-normal text-dark-500'>
                    total Copies
                </FormLabel>
                <FormControl>
                    <Input required placeholder='Total copies' {...field} className='book-form_input' type='number' min={1} max={10000}/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

        <FormField
            control={form.control}
            name="coverUrl"
            render={({ field }) => (
              <FormItem className='flex flex-col gap-1'>
                <FormLabel className='text-base font-normal text-dark-500'>
                    Book Image
                </FormLabel>
                <FormControl>
                    <FileUpload 
                        type='image' 
                        accept='image/*' 
                        placeholder='Upload a book cover' 
                        folder='books/cover' 
                        variant='light' 
                        onFileChange={field.onChange} 
                        value={field.value} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />


        <FormField
            control={form.control}
            name="coverColor"
            render={({ field }) => (
              <FormItem className='flex flex-col gap-1'>
                <FormLabel className='text-base font-normal text-dark-500'>
                    Primary Color
                </FormLabel>
                <FormControl>
                    <ColorPicker onPickerChange={field.onChange} value={field.value} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />


        <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className='flex flex-col gap-1'>
                <FormLabel className='text-base font-normal text-dark-500'>
                    Book Description
                </FormLabel>
                <FormControl>
                    <Textarea className='book-form_input' placeholder='Book Description' {...field} rows={10}/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

        <FormField
            control={form.control}
            name="videoUrl"
            render={({ field }) => (
              <FormItem className='flex flex-col gap-1'>
                <FormLabel className='text-base font-normal text-dark-500'>
                    Book Trailer
                </FormLabel>
                <FormControl>
                <FileUpload 
                        type='video' 
                        accept='video/*' 
                        placeholder='Upload a book trailer' 
                        folder='books/video' 
                        variant='light' 
                        onFileChange={field.onChange} 
                        value={field.value} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />


        <FormField
            control={form.control}
            name="summary"
            render={({ field }) => (
              <FormItem className='flex flex-col gap-1'>
                <FormLabel className='text-base font-normal text-dark-500'>
                    Book Summary
                </FormLabel>
                <FormControl>
                    <Textarea className='book-form_input' placeholder='Book Summary' {...field} rows={5}/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type='submit' className='book-form_btn text-white'>Add book to library</Button>

        </form>
      </Form>
  )
}

export default BookForm