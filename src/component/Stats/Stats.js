import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

const StatCard = ({ value, label, suffix = "", duration = 2 }) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (!isInView) return;

        let startTime;
        let animationFrame;

        const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = (timestamp - startTime) / (duration * 1000);

            if (progress < 1) {
                setCount(Math.floor(value * progress));
                animationFrame = requestAnimationFrame(animate);
            } else {
                setCount(value);
            }
        };

        animationFrame = requestAnimationFrame(animate);

        return () => {
            if (animationFrame) {
                cancelAnimationFrame(animationFrame);
            }
        };
    }, [isInView, value, duration]);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="glass-card rounded-lg p-6 hover-lift hover-glow text-center"
        >
            <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">
                {count}{suffix}
            </div>
            <div className="text-secondary font-mono text-sm tracking-wide">
                {label}
            </div>
        </motion.div>
    );
};

const Stats = () => {
    const stats = [
        { value: 3, label: "Years Experience", suffix: "+" },
        { value: 20, label: "Projects Completed", suffix: "+" },
        { value: 15, label: "Technologies", suffix: "+" },
        { value: 100, label: "Commits This Month", suffix: "+" },
    ];

    return (
        <section className="py-12 md:py-20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {stats.map((stat, index) => (
                    <StatCard
                        key={index}
                        value={stat.value}
                        label={stat.label}
                        suffix={stat.suffix}
                        duration={2 + index * 0.2}
                    />
                ))}
            </div>
        </section>
    );
};

export default Stats;
