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
            <section className="bg-[#071320] text-white py-16 sm:py-20 md:py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto text-center">
        
        <p className="text-[#d99236] font-semibold uppercase tracking-wider mb-2 sm:mb-3 text-sm sm:text-base">
          Get Started
        </p>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 px-2">
          How It Works
        </h2>

        <p className="text-gray-300 max-w-2xl mx-auto mb-12 sm:mb-16 md:mb-20 text-base sm:text-lg px-4">
          Book your ideal study room in three simple steps.
        </p>
 
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 md:gap-14 items-start">
          {steps.map((step) => (
            <div
              key={step.number}
              className="flex flex-col items-center text-center px-4 sm:px-2"
            >
           
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#F4EBDC] flex items-center justify-center text-[#071320] text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 shadow-lg">
                {step.number}
              </div>
 
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-5 px-2">
                {step.title}
              </h3>
 
              <p className="text-gray-300 leading-7 sm:leading-8 text-base sm:text-lg max-w-sm mx-auto">
                {step.description}
              </p>
            </div>
          ))}
        </div>

   
        <div className="mt-16 sm:mt-20 px-4">
         <Link href={"/"}>
           <button className="bg-[#d99236] hover:bg-[#c8842d] transition-all duration-300 text-white font-semibold px-6 sm:px-8 md:px-10 py-3 sm:py-4 rounded-xl inline-flex items-center gap-2 sm:gap-3 text-base sm:text-lg shadow-lg w-full sm:w-auto justify-center">
            Get Started Free
            <ArrowRight size={18} className="sm:w-5 sm:h-5" />
          </button>
          </Link> 
        </div>
      </div>
    </section>
        </div>
    );
};

export default Howwoeks;