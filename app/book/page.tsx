import { Suspense } from "react"
import BookingWrapper from "./booking-wrapper"

export default function BookPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BookingWrapper />
    </Suspense>
  )
}