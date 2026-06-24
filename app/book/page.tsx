"use client";

import { Suspense } from "react";
import { BookingForm } from "./booking-form";

export const dynamic = 'force-dynamic';

export default function BookPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BookingForm />
    </Suspense>
  );
}