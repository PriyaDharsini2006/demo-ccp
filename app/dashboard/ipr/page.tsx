import DashboardNav from "@/app/components/DashboardNav";
import Link from "next/link";

export default function IPRPage() {
  return (
    <div className="p-6">
      <DashboardNav />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">IPR</h1>
        <Link 
          href="/dashboard/ipr/new" 
          className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800"
        >
          Add New IPR
        </Link>
      </div>
      {/* Add your IPR listing component here */}
    </div>
  );
} 