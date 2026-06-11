import * as React from "react";
import { Container } from "@/components/ui";
import { ContactDetails } from "./contact-details";
import { ContactForm } from "./contact-form";

/**
 * Two-column wrapper: details on the left, placeholder form on the right.
 */
export function ContactDetailsForm() {
  return (
    <section
      aria-label="Contact details and message form"
      className="py-16 md:py-24 lg:py-32 bg-[var(--color-background)]"
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          <div className="lg:col-span-5">
            <ContactDetails />
          </div>
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </Container>
    </section>
  );
}
