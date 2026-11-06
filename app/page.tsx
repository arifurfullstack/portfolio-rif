import BootLoader from "@/components/BootLoader";
import RobotCursors from "@/components/RobotCursors";
import Hero from "@/components/Hero";
import WorkSection from "@/components/WorkSection";
import StackSection from "@/components/StackSection";
import RecordSection from "@/components/RecordSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#09090b] text-[#fafafa] selection:bg-[#ff3b2f] selection:text-white">
      {/* Short Boot Loader */}
      <BootLoader />

      {/* Signature Animation Engine: 6-12 Robot Cursors & Control Dock */}
      <RobotCursors />

      {/* Hero Section */}
      <Hero />

      {/* 1. Work that ships */}
      <WorkSection />

      {/* 2. Technologies & Runtime Tools Endless Marquee */}
      <StackSection />

      {/* 3. Chronological Record (Experience, Hackathons, Education) */}
      <RecordSection />

      {/* 4. Philosophy & Principles */}
      <AboutSection />

      {/* 5. Contact, CTA & Footer */}
      <ContactSection />
    </main>
  );
}
