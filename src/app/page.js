import Image from "next/image";
import Banner from "./components/Banner";
import Somecouerse from "./components/Somecouerse";
import Feature from "./components/Feature";
import Howwoeks from "./components/Howwoeks";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <div>
      <Banner></Banner>
      <Somecouerse></Somecouerse>
      <Feature></Feature>
      <Howwoeks></Howwoeks>
    </div>
  );
}

