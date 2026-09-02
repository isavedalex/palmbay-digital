import { EnvelopeSimple, MapPin } from "@phosphor-icons/react/dist/ssr";
import { contact } from "@/lib/content";
import { ContactForm } from "./ContactForm";

export function ContactSection() {
  return (
    <section id="contact" className="scroll-mt-20 bg-palmbay-bluebg px-[5%] py-16 md:py-24">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="text-white">
            <p className="mb-4 font-formula text-sm uppercase tracking-[0.2em] text-palmbay-pink">Contact</p>
            <h2 className="font-monument text-4xl leading-[1.05] md:text-6xl lg:text-7xl">{contact.heading}</h2>
            <p className="mt-6 max-w-lg font-helvetica text-base text-white/85 md:text-lg">{contact.body}</p>

            <ul className="mt-10 space-y-4 font-helvetica">
              <li className="flex items-center gap-3">
                <EnvelopeSimple size={22} weight="bold" className="text-palmbay-pink" />
                <a href={`mailto:${contact.email}`} className="text-lg underline-offset-4 hover:underline">
                  {contact.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MapPin size={22} weight="bold" className="text-palmbay-pink" />
                <span className="text-lg">{contact.location}</span>
              </li>
            </ul>
          </div>

          <ContactForm />
        </div>
      </div>
    </section>
  );
}
