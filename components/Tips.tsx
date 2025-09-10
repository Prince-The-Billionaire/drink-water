"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import { useWaterStore } from '@/lib/waterstore';
import { parseSizeToMl } from '@/lib/parseSize';
import { toast, Toaster } from 'sonner';

const Tips = () => {
    const { setWaterSize } = useWaterStore();
    const [selectedWater, setSelectedWater] = useState<null | {
        name: string;
        size: string;
        img: string;
    }>(null);

    const WaterSizes = [
        { name: 'Sachet Water', size: '50cl', img: '/sachet_water.png' },
        { name: 'Small Bottle', size: '33cl', img: '/waterbottle.png' },
        { name: 'Medium Bottle', size: '50cl', img: '/waterbottle.png' },
        { name: 'Large Bottle', size: '1L', img: '/waterbottle.png' },
        { name: 'Extra Large Bottle', size: '1.5L', img: '/waterbottle.png' },
    ];

    const handleSelect = (item: { name: string; size: string; img: string }) => {
        setSelectedWater(item);
        setWaterSize(item);
        toast.success(`${item.name} (${item.size}) selected! 💧`);
    };

    return (
        <div className="w-full lg:ml-16">
            <Toaster position="top-center" richColors />

            {/* Tip box */}
            <div className="flex flex-row p-3 rounded-2xl items-center bg-blue-500 mb-4 w-full max-w-md">
                <Image src={'/Idea.png'} alt='idea' width={40} height={40} className="w-8 h-8 md:w-12 md:h-12"/>
                <p className="text-white/70 ml-2 text-sm md:text-base">
                    Drinking at least 2 liters of water a day improves the skin
                </p>
            </div>

            {/* Encouragement box */}
            <div className="flex flex-row gap-2 md:gap-3 items-center my-4 flex-wrap">
                <Image src={'/Confetti_Ball.png'} alt='confetti' width={40} height={40} className="w-8 h-8 md:w-12 md:h-12"/>
                <p className="text-black/60 text-sm md:text-base">Keep it up! You're doing great!</p>
                <Image src={'/Confetti_Ball.png'} alt='confetti' width={40} height={40} className="w-8 h-8 md:w-12 md:h-12"/>    
            </div>

            {/* Water sizes */}
            <div>
                <h2 className="text-xl md:text-2xl font-bold mb-2">Water Sizes</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {WaterSizes.map((item, index) => (
                        <div
                            key={index}
                            onClick={() => handleSelect(item)}
                            className={`flex flex-row gap-4 mt-2 items-center p-2 rounded-xl cursor-pointer transition 
                                ${selectedWater?.name === item.name ? "bg-blue-500 text-white" : "bg-gray-100"}`}
                        >
                            <Image src={item.img} alt={item.name} width={45} height={45} className="w-10 h-10 md:w-12 md:h-12"/>
                            <div>
                                <p className={`font-bold text-sm md:text-base ${selectedWater?.name === item.name ? "text-white" : "text-black/60"}`}>
                                    {item.name}
                                </p>
                                <p className={`text-xs md:text-sm ${selectedWater?.name === item.name ? "text-white/80" : "text-black/40"}`}>
                                    {item.size}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Tips
