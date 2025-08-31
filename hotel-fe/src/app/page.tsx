import RoomCard from "@/components/Card/RoomCard";
import MainLayout from "@/components/Layout/MainLayout";
import HeroSection from "./HeroSection";

export default function Home() {
  return (
    <>
      <MainLayout>
        <HeroSection />
        <RoomCard />
      </MainLayout>
    </>
  );
}
