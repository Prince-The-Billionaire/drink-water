import Image from "next/image";
import Sidebar from "../components/Sidebar";
import Dashboard from "@/components/Dashboard";

export default function Home() {
  return (
    <div className="bg-gray-100 relative text-black min-h-screen flex">
      <Sidebar/>
      <Dashboard/>
    </div>
  );
}
