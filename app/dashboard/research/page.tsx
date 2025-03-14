
import Link from "next/link";

export default function ResearchPage() {
  return (
    <div className="p-6">
     
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Research</h1>
        <Link 
          href="/dashboard/research/new" 
          className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800"
        >
          Add New Research
        </Link>
      </div>
      {/* Add your research listing component here */}
    </div>
  );
} 