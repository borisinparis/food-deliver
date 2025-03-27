"use client";
import Header from "@/app/homePage/components/Section";
import Section from "@/app/homePage/components/Header";
import Footer from "@/app/homePage/components/Footer";
// import { userUser } from "@/providers/UserProvider";
export const HomePage = () => {
  // const { email, role } = userUser();
  return (
    <>
      <Section />
      <Header />
      <Footer />
    </>
  );
};
export default HomePage;
