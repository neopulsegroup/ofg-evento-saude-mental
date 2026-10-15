import { About } from "@/components/sites/saude-mental/About";
import { Footer } from "@/components/sites/saude-mental/Footer";
import { Header } from "@/components/sites/saude-mental/Header";
import { Hero } from "@/components/sites/saude-mental/Hero";
import { Impact } from "@/components/sites/saude-mental/Impact";
import { LocalFaq } from "@/components/sites/saude-mental/LocalFaq";
import { Register } from "@/components/sites/saude-mental/Register";
import { Story } from "@/components/sites/saude-mental/Story";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Impact />
        <Story />
        <Register />
        <LocalFaq />
      </main>
      <Footer />
    </>
  );
}
