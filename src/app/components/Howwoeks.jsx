import { ArrowRight } from "lucide-react";
import Link from "next/link";

const steps = [
  {
    number: "01",
    title: "Browse & Search",
    description:
      "Explore available study rooms. Filter by amenities, floor level, or price to find your perfect match.",
  },
  {
    number: "02",
    title: "Pick a Time Slot",
    description:
      "Select your preferred date and time. Our system automatically checks availability and prevents conflicts.",
  },
  {
    number: "03",
    title: "Confirm & Study",
    description:
      "Confirm your booking instantly and head to your room. Manage or cancel anytime from your dashboard.",
  },
];

const Howwoeks = () => {
    return (
        <div>
            <section className="bg-[#071320] text-white py-24 px-6">
      <div className="max-w-7xl mx-auto text-center">
        
        <p className="text-[#d99236] font-semibold uppercase tracking-wider mb-3">
          Get Started
        </p>

        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          How It Works
        </h2>

        <p className="text-gray-300 max-w-2xl mx-auto mb-20 text-lg">
          Book your ideal study room in three simple steps.
        </p>
 
        <div className="grid grid-cols-1 md:grid-cols-3 gap-14 items-start">
          {steps.map((step) => (
            <div
              key={step.number}
              className="flex flex-col items-center text-center"
            >
           
              <div className="w-24 h-24 rounded-full bg-[#F4EBDC] flex items-center justify-center text-[#071320] text-4xl font-bold mb-8 shadow-lg">
                {step.number}
              </div>
 
              <h3 className="text-2xl font-bold mb-5">{step.title}</h3>
 
              <p className="text-gray-300 leading-8 text-lg max-w-sm">
                {step.description}
              </p>
            </div>
          ))}
        </div>

   
        <div className="mt-20">
         <Link href={"/"}><button className="bg-[#d99236] hover:bg-[#c8842d] transition-all duration-300 text-white font-semibold px-10 py-4 rounded-xl inline-flex items-center gap-3 text-lg shadow-lg">
            Get Started Free
            <ArrowRight size={20} />
          </button>
          </Link> 
        </div>
      </div>
    </section>
        </div>
    );
};

export default Howwoeks;