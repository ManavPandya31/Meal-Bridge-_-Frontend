import CountUp from "react-countup";
import { motion } from "framer-motion";

const Stats = () => {
  const stats = [
    { value: 3000, suffix: "+", label: "Donors" },
    { value: 650, suffix: "+", label: "NGOs" },
    { value: 50000, suffix: "+", label: "Meals Served" },
    { value: 10000, suffix: "kg+", label: "Food Wastage Reduced" },
    { value: 50, suffix: "+", label: "Cities Covered" }
  ];

  return (
    <section className="bg-[#FAEBD7] from-orange-50 to-gray-100 py-16 px-4 w-full overflow-hidden">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-10">Our Impact</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full justify-center">
          {stats.slice(0, 3).map((stat, index) => (
            <motion.div
              key={index}
              className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-[250px] flex flex-col items-center justify-center transition-transform transform hover:scale-105 mx-auto"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <motion.span
                className="text-3xl md:text-4xl font-extrabold text-orange-500"
                whileHover={{ scale: 1.1 }}
              >
                <CountUp end={stat.value} duration={2.5} />{stat.suffix}
              </motion.span>
              <span className="text-sm md:text-lg font-medium text-gray-700 mt-2">{stat.label}</span>
            </motion.div>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full justify-center mt-6">
          {stats.slice(3).map((stat, index) => (
            <motion.div
              key={index}
              className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-[250px] flex flex-col items-center justify-center transition-transform transform hover:scale-105 mx-auto"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <motion.span
                className="text-3xl md:text-4xl font-extrabold text-orange-500"
                whileHover={{ scale: 1.1 }}
              >
                <CountUp end={stat.value} duration={2.5} />{stat.suffix}
              </motion.span>
              <span className="text-sm md:text-lg font-medium text-gray-700 mt-2">{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
