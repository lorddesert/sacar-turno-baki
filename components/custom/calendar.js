"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Toaster } from "../ui/toaster"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { toast } from "@/components/ui/use-toast"

const FormSchema = z.object({
  dob: z.date({
    required_error: "Pone la fecha.",
  }),
})

export function CalendarForm({ setSchedules }) {
  const form = useForm({
    resolver: zodResolver(FormSchema),
  })

  function onSubmit({ dob: date }) {
    toast({
      title: "Turno con Baki guardado! 😄"
    })

    form.reset()
    const schedules = JSON.parse(localStorage.getItem('schedules') || '[]')
    const newSchedules = [...schedules, new Intl.DateTimeFormat('es-AR').format(date)]
    setSchedules(newSchedules)

    localStorage.setItem("schedules", JSON.stringify(newSchedules))
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8" style={{ display: "grid", placeItems: "center" }}>
        <FormField
          control={form.control}
          name="dob"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel style={{ fontSize: '2rem' }}>Sacar fecha de turno con BAKI</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Elegi pa!</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription style={{ textAlign: 'center', marginBottom: "15px" }}>
                Con esto se juega con Baki.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">MANDALE</Button>
      </form>
      <Toaster />
    </Form>
  )
}
