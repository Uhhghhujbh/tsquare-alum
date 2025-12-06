import React, { useState, useEffect } from 'react';
import { auth, googleProvider, db } from '../firebase';
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { collection, addDoc, getDocs, deleteDoc, doc, query, where, updateDoc } from 'firebase/firestore';
import { Trash, LogOut, Plus, Image, ShieldAlert, Edit, Search, Filter, Package, TrendingUp, DollarSign, Eye, X, Save } from 'lucide-react';

const Admin = () => {
    const [user, setUser] = useState(null);
    const [products, setProducts] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('all');
    const [editingProduct, setEditingProduct] = useState(null);
    const [showPreview, setShowPreview] = useState(false);

    const [newItem, setNewItem] = useState({
        name: '', price: '', desc: '', image: '', category: 'basic'
    });

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);
            if (currentUser) {
                await checkAdminStatus(currentUser.email);
            } else {
                setLoading(false);
            }
        });
        return () => unsubscribe();
    }, []);

    const checkAdminStatus = async (email) => {
        try {
            // Check the "admin" collection for the "Email" field
            const q = query(collection(db, "admin"), where("Email", "==", email));
            const querySnapshot = await getDocs(q);
            
            if (!querySnapshot.empty) {
                setIsAdmin(true);
                fetchProducts(); 
            } else {
                alert("Access Denied: Your email is not in the Admin Database.");
                setIsAdmin(false);
            }
        } catch (error) {
            console.error("Database Error:", error);
            setIsAdmin(false);
        }
        setLoading(false);
    };

    const fetchProducts = async () => {
        const querySnapshot = await getDocs(collection(db, "products"));
        const items = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        setProducts(items);
    };

    const handleLogin = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
        } catch (error) {
            alert("Error logging in: " + error.message);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!newItem.name || !newItem.price) {
            alert("Please fill required fields");
            return;
        }

        addDoc(collection(db, "products"), {
            name: newItem.name,
            price: newItem.price,
            desc: newItem.desc,
            image: newItem.image,
            type: newItem.category,
            createdAt: new Date()
        }).then(() => {
            alert("✅ Product Added Successfully!");
            setNewItem({ name: '', price: '', desc: '', image: '', category: 'basic' });
            fetchProducts();
        }).catch((error) => {
            console.error("Error adding document: ", error);
            alert("Error adding product");
        });
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        if (!editingProduct.name || !editingProduct.price) {
            alert("Please fill required fields");
            return;
        }

        const productRef = doc(db, "products", editingProduct.id);
        updateDoc(productRef, {
            name: editingProduct.name,
            price: editingProduct.price,
            desc: editingProduct.desc,
            image: editingProduct.image,
            type: editingProduct.type,
            updatedAt: new Date()
        }).then(() => {
            alert("✅ Product Updated Successfully!");
            setEditingProduct(null);
            fetchProducts();
        }).catch((error) => {
            console.error("Error updating: ", error);
            alert("Error updating product");
        });
    };

    const handleDelete = async (id) => {
        if(window.confirm("Are you sure you want to delete this product?")) {
            try {
                await deleteDoc(doc(db, "products", id));
                alert("🗑️ Product Deleted");
                fetchProducts();
            } catch (error) {
                console.error("Error deleting: ", error);
            }
        }
    };

    const getStats = () => {
        return {
            total: products.length,
            basic: products.filter(p => p.type === 'basic').length,
            advanced: products.filter(p => p.type === 'advanced').length,
            totalValue: products.reduce((sum, p) => sum + parseFloat(p.price || 0), 0)
        };
    };

    const filteredProducts = products.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            p.desc.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterCategory === 'all' || p.type === filterCategory;
        return matchesSearch && matchesFilter;
    });

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600 text-lg">Verifying Access...</p>
                </div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-blue-100">
                <div className="bg-white p-12 rounded-2xl shadow-2xl text-center max-w-md w-full border border-gray-200">
                    <div className="bg-gradient-to-r from-blue-600 to-cyan-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <ShieldAlert className="w-10 h-10 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold mb-2 text-gray-800">T Square Admin</h1>
                    <p className="text-gray-600 mb-6">Secure Dashboard Access</p>
                    <button 
                        onClick={handleLogin} 
                        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-4 rounded-xl font-bold hover:from-blue-700 hover:to-blue-800 transition-all transform hover:scale-105 shadow-lg"
                    >
                        Sign in with Google
                    </button>
                </div>
            </div>
        );
    }

    if (!isAdmin) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50">
                <div className="bg-white p-12 rounded-2xl shadow-2xl text-center max-w-md border-2 border-red-200">
                    <div className="bg-red-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <ShieldAlert className="w-10 h-10 text-red-600" />
                    </div>
                    <h1 className="text-3xl font-bold mb-3 text-red-600">Access Denied</h1>
                    <p className="text-gray-600 mb-2">The email</p>
                    <p className="font-bold text-gray-800 mb-6 bg-red-50 p-3 rounded-lg">{user.email}</p>
                    <p className="text-gray-600 mb-6">is not authorized for admin access.</p>
                    <button 
                        onClick={() => signOut(auth)} 
                        className="bg-gradient-to-r from-slate-800 to-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:from-slate-700 hover:to-slate-800 transition-all transform hover:scale-105 shadow-lg"
                    >
                        Log Out
                    </button>
                </div>
            </div>
        );
    }

    const stats = getStats();

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-blue-50 pt-24 pb-10 px-4">
            <div className="container mx-auto max-w-7xl">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-2xl p-8 mb-8 shadow-xl">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                            <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
                            <p className="text-blue-100">Welcome back, {user.displayName || user.email}</p>
                        </div>
                        <button 
                            onClick={() => signOut(auth)} 
                            className="flex items-center gap-2 bg-white text-red-600 font-bold px-6 py-3 rounded-xl hover:bg-red-50 transition-all shadow-lg"
                        >
                            <LogOut size={18} /> Logout
                        </button>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-gray-600 text-sm font-semibold">Total Products</p>
                            <Package className="w-8 h-8 text-blue-500" />
                        </div>
                        <p className="text-4xl font-bold text-gray-800">{stats.total}</p>
                    </div>
                    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-gray-600 text-sm font-semibold">Basic Jobs</p>
                            <Filter className="w-8 h-8 text-green-500" />
                        </div>
                        <p className="text-4xl font-bold text-gray-800">{stats.basic}</p>
                    </div>
                    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-gray-600 text-sm font-semibold">Advanced Projects</p>
                            <TrendingUp className="w-8 h-8 text-purple-500" />
                        </div>
                        <p className="text-4xl font-bold text-gray-800">{stats.advanced}</p>
                    </div>
                    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-gray-600 text-sm font-semibold">Total Value</p>
                            <DollarSign className="w-8 h-8 text-amber-500" />
                        </div>
                        <p className="text-3xl font-bold text-gray-800">₦{stats.totalValue.toLocaleString()}</p>
                    </div>
                </div>

                {/* Add Product Form */}
                <div className="bg-white rounded-2xl shadow-lg mb-8 border border-gray-200 overflow-hidden">
                    <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-6">
                        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                            <Plus className="w-6 h-6" /> Add New Product
                        </h2>
                    </div>
                    <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Product Name *</label>
                                <input 
                                    type="text" 
                                    placeholder="e.g., Sliding Window Installation" 
                                    className="border-2 border-gray-300 p-3 rounded-lg w-full focus:border-blue-500 focus:outline-none"
                                    value={newItem.name} 
                                    onChange={e => setNewItem({...newItem, name: e.target.value})} 
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Price (₦) *</label>
                                <input 
                                    type="number" 
                                    placeholder="e.g., 50000" 
                                    className="border-2 border-gray-300 p-3 rounded-lg w-full focus:border-blue-500 focus:outline-none"
                                    value={newItem.price} 
                                    onChange={e => setNewItem({...newItem, price: e.target.value})} 
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Category *</label>
                                <select 
                                    className="border-2 border-gray-300 p-3 rounded-lg w-full focus:border-blue-500 focus:outline-none"
                                    value={newItem.category} 
                                    onChange={e => setNewItem({...newItem, category: e.target.value})}
                                >
                                    <option value="basic">Basic Job</option>
                                    <option value="advanced">Advanced Project</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Image URL</label>
                                <div className="relative">
                                    <input 
                                        type="url" 
                                        placeholder="https://example.com/image.jpg" 
                                        className="border-2 border-gray-300 p-3 rounded-lg w-full pl-10 focus:border-blue-500 focus:outline-none"
                                        value={newItem.image} 
                                        onChange={e => setNewItem({...newItem, image: e.target.value})} 
                                    />
                                    <Image className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" />
                                </div>
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                            <textarea 
                                placeholder="Detailed description of the product or service..." 
                                className="border-2 border-gray-300 p-3 rounded-lg w-full focus:border-blue-500 focus:outline-none" 
                                rows="3"
                                value={newItem.desc} 
                                onChange={e => setNewItem({...newItem, desc: e.target.value})} 
                            />
                        </div>
                        <div className="flex gap-3">
                            <button 
                                onClick={handleSubmit} 
                                className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold py-4 rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all transform hover:scale-105 shadow-lg"
                            >
                                <Plus className="inline w-5 h-5 mr-2" />
                                Add Product
                            </button>
                            {newItem.image && (
                                <button 
                                    onClick={() => setShowPreview(!showPreview)}
                                    className="bg-blue-100 text-blue-700 font-bold px-6 py-4 rounded-xl hover:bg-blue-200 transition"
                                >
                                    <Eye className="inline w-5 h-5" />
                                </button>
                            )}
                        </div>
                        {showPreview && newItem.image && (
                            <div className="mt-4 p-4 bg-gray-50 rounded-xl">
                                <p className="text-sm font-semibold text-gray-700 mb-2">Image Preview:</p>
                                <img src={newItem.image} alt="Preview" className="w-full max-w-md rounded-lg shadow-md" onError={(e) => e.target.src = "https://via.placeholder.com/400?text=Invalid+URL"} />
                            </div>
                        )}
                    </div>
                </div>

                {/* Search and Filter */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-200">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 relative">
                            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" />
                            <input 
                                type="text"
                                placeholder="Search products..."
                                className="border-2 border-gray-300 p-3 pl-10 rounded-lg w-full focus:border-blue-500 focus:outline-none"
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <select 
                            className="border-2 border-gray-300 p-3 rounded-lg focus:border-blue-500 focus:outline-none md:w-64"
                            value={filterCategory}
                            onChange={e => setFilterCategory(e.target.value)}
                        >
                            <option value="all">All Categories</option>
                            <option value="basic">Basic Jobs</option>
                            <option value="advanced">Advanced Projects</option>
                        </select>
                    </div>
                    <p className="text-sm text-gray-600 mt-4">
                        Showing {filteredProducts.length} of {products.length} products
                    </p>
                </div>

                {/* Products Table */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
                    <div className="bg-gradient-to-r from-slate-800 to-slate-900 p-6">
                        <h2 className="text-2xl font-bold text-white">Product Inventory</h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b-2 border-gray-200">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Image</th>
                                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Product Name</th>
                                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Price</th>
                                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Category</th>
                                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {filteredProducts.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-16 text-center text-gray-400">
                                            <Package className="w-16 h-16 mx-auto mb-3 opacity-30" />
                                            <p>No products found</p>
                                        </td>
                                    </tr>
                                ) : (
                                    filteredProducts.map((product) => (
                                        <tr key={product.id} className="hover:bg-gray-50 transition">
                                            <td className="px-6 py-4">
                                                <img 
                                                    src={product.image || "https://via.placeholder.com/100"} 
                                                    alt={product.name}
                                                    className="w-16 h-16 object-cover rounded-lg shadow-sm"
                                                    onError={(e) => e.target.src = "https://via.placeholder.com/100?text=No+Image"}
                                                />
                                            </td>
                                            <td className="px-6 py-4">
                                                <p className="font-semibold text-gray-800">{product.name}</p>
                                                <p className="text-sm text-gray-500 line-clamp-1">{product.desc}</p>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="font-bold text-blue-600">₦{parseFloat(product.price).toLocaleString()}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                                    product.type === 'basic' 
                                                        ? 'bg-green-100 text-green-700' 
                                                        : 'bg-purple-100 text-purple-700'
                                                }`}>
                                                    {product.type === 'basic' ? 'Basic' : 'Advanced'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex gap-2">
                                                    <button 
                                                        onClick={() => setEditingProduct(product)}
                                                        className="p-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition"
                                                        title="Edit"
                                                    >
                                                        <Edit className="w-4 h-4" />
                                                    </button>
                                                    <button 
                                                        onClick={() => handleDelete(product.id)}
                                                        className="p-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition"
                                                        title="Delete"
                                                    >
                                                        <Trash className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Edit Modal */}
            {editingProduct && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="bg-gradient-to-r from-blue-600 to-cyan-500 p-6 flex justify-between items-center">
                            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                                <Edit className="w-6 h-6" /> Edit Product
                            </h2>
                            <button 
                                onClick={() => setEditingProduct(null)}
                                className="text-white hover:bg-white/20 p-2 rounded-lg transition"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Product Name *</label>
                                    <input 
                                        type="text" 
                                        className="border-2 border-gray-300 p-3 rounded-lg w-full focus:border-blue-500 focus:outline-none"
                                        value={editingProduct.name} 
                                        onChange={e => setEditingProduct({...editingProduct, name: e.target.value})} 
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Price (₦) *</label>
                                    <input 
                                        type="number" 
                                        className="border-2 border-gray-300 p-3 rounded-lg w-full focus:border-blue-500 focus:outline-none"
                                        value={editingProduct.price} 
                                        onChange={e => setEditingProduct({...editingProduct, price: e.target.value})} 
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Category *</label>
                                    <select 
                                        className="border-2 border-gray-300 p-3 rounded-lg w-full focus:border-blue-500 focus:outline-none"
                                        value={editingProduct.type} 
                                        onChange={e => setEditingProduct({...editingProduct, type: e.target.value})}
                                    >
                                        <option value="basic">Basic Job</option>
                                        <option value="advanced">Advanced Project</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Image URL</label>
                                    <input 
                                        type="url" 
                                        className="border-2 border-gray-300 p-3 rounded-lg w-full focus:border-blue-500 focus:outline-none"
                                        value={editingProduct.image} 
                                        onChange={e => setEditingProduct({...editingProduct, image: e.target.value})} 
                                    />
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                                <textarea 
                                    className="border-2 border-gray-300 p-3 rounded-lg w-full focus:border-blue-500 focus:outline-none" 
                                    rows="3"
                                    value={editingProduct.desc} 
                                    onChange={e => setEditingProduct({...editingProduct, desc: e.target.value})} 
                                />
                            </div>
                            {editingProduct.image && (
                                <div className="mb-4">
                                    <img 
                                        src={editingProduct.image} 
                                        alt="Preview" 
                                        className="w-full max-w-sm rounded-lg shadow-md"
                                        onError={(e) => e.target.src = "https://via.placeholder.com/400?text=Invalid+URL"}
                                    />
                                </div>
                            )}
                            <div className="flex gap-3">
                                <button 
                                    onClick={handleUpdate} 
                                    className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-3 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg"
                                >
                                    <Save className="inline w-5 h-5 mr-2" />
                                    Save Changes
                                </button>
                                <button 
                                    onClick={() => setEditingProduct(null)}
                                    className="px-6 bg-gray-200 text-gray-700 font-bold py-3 rounded-xl hover:bg-gray-300 transition"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Admin;