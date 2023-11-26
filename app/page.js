'use client'
import { CalendarForm } from '@/components/custom/calendar'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useState } from 'react'


export default function Home() {
  const data = localStorage.getItem('schedules')
  const storageSchedules = JSON.parse(data) || []
  const [schedules, setSchedules] = useState(storageSchedules)

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between p-24 border calendar-container">
        <CalendarForm setSchedules={setSchedules} />
        <section>
          <h2>Turnos:</h2>
          <ul>
            {schedules.length
              ? schedules.map((date, i) => <li key={`item-${i}`}>
                <Card>
                  <CardHeader>
                    <CardTitle>{date}</CardTitle>
                  </CardHeader>
                </Card>

              </li>)
              :
              <Card>
                <CardHeader>
                  <CardTitle>No hay turnos disponibles.</CardTitle>
                  <CardDescription>Guadate uno!</CardDescription>
                </CardHeader>
              </Card>
            }
          </ul>
        </section>

      </main>
    </>
  )
}
