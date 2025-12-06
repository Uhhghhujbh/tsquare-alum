import React, { useState, useEffect } from 'react';
import { ShoppingCart, Trash2, MessageCircle, Package, Sparkles, TrendingUp } from 'lucide-react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const Services = () => {
    const [activeTab, setActiveTab] = useState('basic');
    const [cart, setCart] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "products"));
                const items = querySnapshot.docs.map(doc => ({ 
                    id: doc.id, 
                    ...doc.data() 
                }));
                setProducts(items);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching products:", error);
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const filteredProducts = products.filter(p => p.type === activeTab);

    const addToCart = (product) => {
        setCart([...cart, product]);
        setIsCartOpen(true);
    };

    const removeFromCart = (indexToRemove) => {
        setCart(cart.filter((_, index) => index !== indexToRemove));
    };

    const getTotalPrice = () => {
        return cart.reduce((sum, item) => sum + parseFloat(item.price || 0), 0);
    };

    const checkoutWhatsApp = () => {
        if (cart.length === 0) return;
        let message = "Hello T Square, I want to order the following:\n\n";
        cart.forEach((item, index) => {
            message += `${index + 1}. ${item.name} - ₦${item.price}\n`;
        });
        message += `\n*Total Estimate: ₦${getTotalPrice().toLocaleString()}*\n\nPlease confirm availability.`;
        const url = `https://wa.me/2348106151579?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    };

    if (loading) {
        return (
            <div className="pt-32 min-h-screen bg-gradient-to-b from-slate-50 to-blue-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-xl text-gray-600">Loading products...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="pt-24 pb-20 bg-gradient-to-b from-slate-50 to-blue-50 min-h-screen">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-12 mb-8 shadow-lg">
                <div className="container mx-auto px-4">
                    <div className="flex items-center gap-3 mb-2">
                        <Package className="w-8 h-8" />
                        <h1 className="text-4xl md:text-5xl font-bold">Our Services</h1>
                    </div>
                    <p className="text-blue-100 text-lg">Browse our cheap and affordable price list and get instant estimates</p>
                </div>
            </div>

            <div className="container mx-auto px-4 flex flex-col lg:flex-row gap-8">
                
                <div className="flex-grow">
                    {/* Tabs */}
                    <div className="flex gap-4 mb-8 flex-wrap">
                        <button 
                            onClick={() => setActiveTab('basic')} 
                            className={`px-6 py-3 rounded-xl font-bold transition-all transform hover:scale-105 flex items-center gap-2 ${
                                activeTab === 'basic' 
                                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg' 
                                    : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-blue-300'
                            }`}
                        >
                            <Sparkles className="w-4 h-4" />
                            Basic Jobs
                        </button>
                        <button 
                            onClick={() => setActiveTab('advanced')} 
                            className={`px-6 py-3 rounded-xl font-bold transition-all transform hover:scale-105 flex items-center gap-2 ${
                                activeTab === 'advanced' 
                                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg' 
                                    : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-blue-300'
                            }`}
                        >
                            <TrendingUp className="w-4 h-4" />
                            Advanced Projects
                        </button>
                    </div>

                    {/* Stats Banner */}
                    <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-xl p-4 mb-6 flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Showing</p>
                            <p className="text-2xl font-bold text-blue-700">{filteredProducts.length} Products</p>
                        </div>
                        <div className="text-right">
                            <p className="text-sm text-gray-600">In Your Cart</p>
                            <p className="text-2xl font-bold text-green-600">{cart.length} Items</p>
                        </div>
                    </div>

                    {/* PRODUCT GRID */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredProducts.length === 0 ? (
                            <div className="col-span-3 text-center py-20">
                                <Package className="w-20 h-20 text-gray-300 mx-auto mb-4" />
                                <p className="text-gray-400 text-lg">No products found in this category.</p>
                            </div>
                        ) : (
                            filteredProducts.map((product) => (
                                <div 
                                    key={product.id} 
                                    className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 group border border-gray-100"
                                >
                                    <div className="h-48 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                                        <img 
                                            src={product.image || "https://via.placeholder.com/300"} 
                                            alt={product.name} 
                                            className="w-full h-full object-cover group-hover:scale-110 transition duration-500" 
                                            onError={(e) => {e.target.src="https://via.placeholder.com/300?text=No+Image"}}
                                        />
                                    </div>
                                    <div className="p-5">
                                        <h3 className="font-bold text-lg mb-2 text-gray-800 group-hover:text-blue-600 transition">{product.name}</h3>
                                        <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">{product.desc}</p>
                                        <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
                                            <div>
                                                <p className="text-xs text-gray-500 mb-1">Starting from</p>
                                                <span className="font-bold text-blue-600 text-2xl">₦{parseFloat(product.price).toLocaleString()}</span>
                                            </div>
                                            <button 
                                                onClick={() => addToCart(product)}
                                                className="bg-gradient-to-r from-slate-800 to-slate-900 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:from-slate-700 hover:to-slate-800 transition-all transform hover:scale-105 shadow-md"
                                            >
                                                Add to Quote
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* RIGHT SIDE: CART */}
                <div className={`fixed inset-0 z-50 bg-black/50 lg:static lg:bg-transparent lg:block lg:w-96 ${isCartOpen ? 'block' : 'hidden'}`}>
                    <div className="bg-white h-full lg:h-auto lg:sticky lg:top-24 lg:rounded-2xl shadow-2xl p-6 w-full lg:w-auto max-w-md ml-auto flex flex-col border border-gray-200">
                        <div className="flex justify-between items-center mb-6 pb-4 border-b-2 border-gray-100">
                            <h2 className="text-2xl font-bold flex items-center gap-2 text-gray-800">
                                <ShoppingCart className="w-6 h-6 text-blue-600" /> 
                                <span>Estimate Cart</span>
                            </h2>
                            <button 
                                onClick={() => setIsCartOpen(false)} 
                                className="lg:hidden text-gray-500 hover:text-gray-700 text-2xl font-bold w-8 h-8 flex items-center justify-center"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Cart Badge */}
                        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-3 mb-4 border border-blue-200">
                            <p className="text-sm text-gray-600 mb-1">Total Items</p>
                            <p className="text-3xl font-bold text-blue-700">{cart.length}</p>
                        </div>

                        <div className="flex-grow overflow-y-auto space-y-3 mb-6 max-h-96">
                            {cart.length === 0 ? (
                                <div className="text-center py-16">
                                    <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-3" />
                                    <p className="text-gray-400">Your cart is empty</p>
                                    <p className="text-gray-400 text-sm mt-1">Add items to get started</p>
                                </div>
                            ) : (
                                cart.map((item, index) => (
                                    <div 
                                        key={index} 
                                        className="flex justify-between items-center bg-gradient-to-r from-slate-50 to-blue-50 p-4 rounded-xl border border-gray-200 hover:shadow-md transition"
                                    >
                                        <div className="flex-grow">
                                            <p className="font-bold text-sm text-gray-800">{item.name}</p>
                                            <p className="text-blue-600 font-semibold mt-1">₦{parseFloat(item.price).toLocaleString()}</p>
                                        </div>
                                        <button 
                                            onClick={() => removeFromCart(index)} 
                                            className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>

                        {cart.length > 0 && (
                            <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl p-4 mb-4 border-2 border-blue-200">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-700 font-semibold">Estimated Total:</span>
                                    <span className="text-2xl font-bold text-blue-700">₦{getTotalPrice().toLocaleString()}</span>
                                </div>
                                <p className="text-xs text-gray-500 mt-2">*Final price may vary based on specifications</p>
                            </div>
                        )}

                        <div className="mt-auto space-y-3">
                            <button 
                                onClick={checkoutWhatsApp}
                                disabled={cart.length === 0}
                                className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white font-bold py-4 rounded-xl shadow-lg hover:from-green-700 hover:to-green-800 disabled:opacity-50 disabled:cursor-not-allowed disabled:from-gray-400 disabled:to-gray-400 flex items-center justify-center gap-2 transition-all transform hover:scale-105"
                            >
                                <MessageCircle className="w-5 h-5" /> 
                                Send Order via WhatsApp
                            </button>
                            {cart.length > 0 && (
                                <button 
                                    onClick={() => setCart([])}
                                    className="w-full bg-white text-gray-700 font-semibold py-3 rounded-xl border-2 border-gray-200 hover:bg-gray-50 transition"
                                >
                                    Clear All Items
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Mobile Floating Cart Button */}
            <button 
                onClick={() => setIsCartOpen(true)}
                className="fixed bottom-24 right-6 lg:hidden bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 rounded-full shadow-2xl z-40 flex items-center gap-2 animate-pulse hover:animate-none"
            >
                <ShoppingCart className="w-5 h-5" /> 
                <span className="font-bold bg-white text-blue-700 px-2 py-1 rounded-full text-sm">{cart.length}</span>
            </button>
        </div>
    );
};

export default Services;