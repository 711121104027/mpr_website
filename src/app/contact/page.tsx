//src/app/contact/page.tsx
import ContactForm from "@/components/contact/ContactForm";
import ContactHero from "@/components/contact/ContactHero";
import ContactInfo from "@/components/contact/ContactInfo";
import ContactMap from "@/components/contact/ContactMap";

export default function ContactPage() {
  return (
    <>
      <ContactHero />

      <section className="py-10 lg:py-12">
        <div className="mx-auto w-full max-w-[1450px] px-5 lg:px-8">
          <div className="grid grid-cols-1 gap-12 xl:grid-cols-[1.1fr_0.9fr] xl:items-start">
  {/* Right Section on Mobile / Right Column on Desktop */}
  <div className="order-1 xl:order-2">
    <ContactInfo />
    <ContactMap />
  </div>

  {/* Form */}
  <div className="order-2 xl:order-1">
    <ContactForm />
  </div>
</div>
        </div>
      </section>
    </>
  );
}