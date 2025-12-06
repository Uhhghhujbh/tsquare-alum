import React, { useState, useEffect } from 'react';
import { AlertTriangle, Clock } from 'lucide-react';

const TestModeWarning = () => {
    const [isVisible, setIsVisible] = useState(true);

    // Auto-hide after 10 seconds (optional) or keep it permanent
    // Remove this useEffect if you want it to STAY there until they refresh
    useEffect(() => {
        const timer = setTimeout(() => {
            // setIsVisible(false); // Uncomment to auto-close
        }, 10000);
        return () => clearTimeout(timer);
    }, []);

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-end justify-center pointer-events-none pb-6 px-4">
            {/* The Card */}
            <div className="bg-red-900 text-white p-6 rounded-xl shadow-2xl max-w-md w-full border-2 border-red-500 pointer-events-auto animate-bounce md:animate-none">
                <div className="flex items-start gap-4">
                    <div className="bg-red-600 p-3 rounded-full shrink-0 animate-pulse">
                        <AlertTriangle className="w-8 h-8 text-white" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold uppercase tracking-wider text-red-100">System Warning</h3>
                        <p className="font-bold text-white mt-1">THIS PAGE IS RUNNING IN TEST MODE.</p>
                        
                        <div className="bg-black/30 p-3 rounded-lg mt-3 border border-red-500/50">
                            <p className="text-sm text-red-100 leading-relaxed">
                                Please connect a valid <strong>Custom Domain</strong> within <span className="text-yellow-400 font-bold">24 HOURS</span> to go live.
                            </p>
                            <div className="flex items-center gap-2 mt-2 text-yellow-400 font-mono text-xs uppercase">
                                <Clock className="w-3 h-3" />
                                <span>Risk: Server Suspension imminent</span>
                            </div>
                        </div>

                        <button 
                            onClick={() => setIsVisible(false)}
                            className="mt-4 w-full bg-white text-red-900 font-bold py-2 rounded hover:bg-gray-200 transition text-sm"
                        >
                            I Understand (Close)
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TestModeWarning;