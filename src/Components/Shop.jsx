import React, { useState, useMemo, useRef } from 'react';

// Define the custom colors
const colorPrimary = '#3d2626'; 
const colorSecondary = '#f5e6d6';
const colorDarkAccent = '#5c3939'; 

// Product Image URLs (Mock Data - added fallback array for slider)
const shopHeroImageUrl = "https://i.postimg.cc/Bbqgm0Yx/image.png";
const productImageUrl1 = "https://i.postimg.cc/wvQZ2g5Q/1461c67c-e363-4521-ae1b-9d2051706bcd.png";
const productImageUrl2 = "https://i.postimg.cc/wvQZ2g5Q/1461c67c-e363-4521-ae1b-9d2051706bcd.png"; 
const productImageUrl3 = "https://i.postimg.cc/wvQZ2g5Q/1461c67c-e363-4521-ae1b-9d2051706bcd.png";
const productImageUrl4 = "https://i.postimg.cc/wvQZ2g5Q/1461c67c-e363-4521-ae1b-9d2051706bcd.png";


const HeartIcon = ({ filled = false, onClick }) => (
    <svg
        onClick={onClick}
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill={filled ? '#ef4444' : 'none'} 
        stroke={filled ? '#ef4444' : colorPrimary}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="cursor-pointer transition-colors duration-200 hover:opacity-75"
    >
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
);

const ShoppingCartIcon = ({ count = 0 }) => (
    <div className="relative">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke={colorPrimary}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-6 h-6"
        >
            <circle cx="8" cy="21" r="1" /><circle cx="19" cy="21" r="1" /><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.72a2 2 0 0 0 2-1.58L23 6H6" />
        </svg>
        {count > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {count}
            </span>
        )}
    </div>
);

// --- Notification Component ---
const Notification = ({ message, isVisible }) => {
    if (!message) return null;

    const visibilityClass = isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full';

    return (
        <div
            className={`fixed top-5 left-1/2 transform -translate-x-1/2 z-50 p-4 rounded-lg shadow-2xl transition-all duration-500 ${visibilityClass}`}
            style={{
                backgroundColor: colorPrimary,
                color: colorSecondary,
                minWidth: '300px',
                textAlign: 'center',
            }}
        >
            <p className="font-semibold text-sm">{message}</p>
        </div>
    );
};

// --- Navbar Component ---

const Navbar = ({ cartCount, onViewChange }) => {
    const navItems = ['Home', 'Shop'];
    return (
        <header className="sticky top-0 z-10 w-full shadow-md" style={{ backgroundColor: colorSecondary }}>
            <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-6 md:px-10">

                <div
                    className="text-3xl font-serif font-bold tracking-wider cursor-pointer"
                    style={{ color: colorPrimary }}
                    onClick={() => onViewChange('shop', null)}
                >
                    demi
                    <span className="inline-block align-top ml-1 text-sm leading-none" style={{ color: colorPrimary }}>&reg;</span>
                </div>

                <nav className="flex items-center space-x-8">
                    {navItems.map(item => (
                        <a
                            key={item}
                            href="/"
                            onClick={() => onViewChange('shop', null)}
                            className="hidden md:block text-lg uppercase tracking-widest hover:opacity-70 transition duration-200"
                            style={{ color: colorPrimary, fontFamily: 'sans-serif' }}
                        >
                            {item}
                        </a>
                    ))}
                    {/* Cart Icon */}
                    <div className="cursor-pointer" onClick={() => onViewChange('cart', null)}>
                        <ShoppingCartIcon count={cartCount} />
                    </div>
                </nav>
            </div>
        </header>
    );
};

// --- Product Card Component ---

const ProductCard = ({ product, isFavorite, onToggleFavorite, onAddToCart, onImageClick }) => (
    <div className="flex flex-col p-4 rounded-xl transition duration-300 hover:shadow-2xl shadow-lg" style={{ backgroundColor: '#fff', border: `1px solid ${colorSecondary}` }}>
        
        <div
            className="cursor-pointer relative overflow-hidden rounded-lg mb-3 flex items-center justify-center"
            onClick={() => onImageClick(product)}
        >
            <img
                src={product.images[0]}
                alt={product.name}
               
                className="w-full h-full object-contain transition-transform duration-300 hover:scale-[1.05]"
                onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/250x250/ccc/333?text=Product' }}
            />

            <div className="absolute top-2 right-2 p-2" onClick={(e) => { e.stopPropagation(); onToggleFavorite(product.id); }}>
                <HeartIcon filled={isFavorite} />
            </div>
        </div>

        {/* Content Section */}
        <div className="flex flex-col flex-grow min-h-[70px]">
            <p className="text-sm font-semibold mt-2 flex-grow" style={{ color: colorPrimary }}>{product.name}</p>
            <p className="text-xs mt-1 font-bold" style={{ color: colorDarkAccent }}>₹ {product.priceINR.toLocaleString('en-IN')}</p>
        </div>

        <button
            onClick={() => onAddToCart(product)}
            className="mt-4 text-xs uppercase tracking-widest py-2 px-5 rounded-full transition duration-300 hover:opacity-90 hover:shadow-xl"
            style={{ backgroundColor: colorPrimary, color: colorSecondary }}
        >
            Add to Cart
        </button>
    </div>
);

// --- Product Detail Component ---

const ProductDetail = ({ product, onBack, onAddToCart }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const nextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % product.images.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + product.images.length) % product.images.length);
    };

    return (
        <div className="max-w-4xl mx-auto py-12 px-6">
            <button
                onClick={onBack}
                className="flex items-center text-sm font-semibold mb-8 text-gray-600 hover:text-gray-800 transition-colors"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="m15 18-6-6 6-6" /></svg>
                Back to Shop
            </button>

            <div className="flex flex-col md:flex-row gap-12 rounded-xl shadow-2xl overflow-hidden" style={{ backgroundColor: '#fff', border: `1px solid ${colorSecondary}` }}>

                {/* Left: Image Slider */}
                <div className="relative w-full md:w-1/2 bg-gray-50 flex items-center justify-center">
                    <img
                        src={product.images[currentImageIndex]}
                        alt={product.name}
                        className="w-full h-full object-cover"
                        style={{ maxHeight: '500px' }}
                        onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/400x500/ccc/333?text=Detail' }}
                    />

                    {/* Slider Controls */}
                    {product.images.length > 1 && (
                        <>
                            <button onClick={prevImage} className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-black/30 text-white hover:bg-black/50 transition">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                            </button>
                            <button onClick={nextImage} className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-black/30 text-white hover:bg-black/50 transition">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                            </button>
                        </>
                    )}

                    {/* Image Indicators */}
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
                        {product.images.map((_, index) => (
                            <div
                                key={index}
                                className={`w-2 h-2 rounded-full ${index === currentImageIndex ? 'bg-white shadow-lg' : 'bg-white/50 cursor-pointer'}`}
                                onClick={() => setCurrentImageIndex(index)}
                            />
                        ))}
                    </div>

                </div>

                {/* Right: Details */}
                <div className="w-full md:w-1/2 p-8 flex flex-col justify-between">
                    <div>
                        <h1 className="text-4xl font-serif font-bold mb-3" style={{ color: colorPrimary }}>
                            {product.name}
                        </h1>
                        <p className="text-lg mb-6" style={{ color: colorDarkAccent }}>
                            <span className='font-light italic'>Price:</span> **₹ {product.priceINR.toLocaleString('en-IN')}**
                        </p>
                        <p className="text-sm text-gray-600 mb-8">
                            A premium hair care solution designed to restore essential nutrients, providing deep hydration and brilliant shine. Suitable for {product.hairType} hair types.
                        </p>
                    </div>

                    {/* Buy Button */}
                    <button
                        onClick={() => onAddToCart(product)}
                        className="w-full py-3 text-lg uppercase tracking-widest rounded-lg transition duration-300 hover:opacity-90 hover:shadow-xl font-bold"
                        style={{ backgroundColor: colorPrimary, color: colorSecondary }}
                    >
                        Buy Now
                    </button>
                </div>
            </div>
        </div>
    );
};

const CartView = ({ items, onUpdateQuantity, onRemoveItem, onBack }) => {

   
    const subtotal = useMemo(() =>
        items.reduce((sum, item) => sum + item.product.priceINR * item.quantity, 0),
        [items]
    );

    const shipping = items.length > 0 ? 99 : 0; 
    const total = subtotal + shipping;

    return (
        <div className="max-w-4xl mx-auto py-12 px-6">
            <button
                onClick={onBack}
                className="flex items-center text-sm font-semibold mb-8 text-gray-600 hover:text-gray-800 transition-colors"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="m15 18-6-6 6-6" /></svg>
                Back to Shop
            </button>

            <h1 className="text-4xl font-serif font-bold mb-8" style={{ color: colorPrimary }}>
                Your Shopping Cart
            </h1>

            <div className="flex flex-col md:flex-row gap-8">
                {/* Cart Items List - Left Column */}
                <div className="w-full md:w-2/3">
                    {items.length === 0 ? (
                        <div className="p-8 text-center rounded-xl shadow-lg" style={{ backgroundColor: '#fff', border: `1px solid ${colorDarkAccent}` }}>
                            <p className="text-lg text-gray-500">Your cart is empty. Time to find some shine!</p>
                            <button
                                onClick={onBack}
                                className="mt-4 py-2 px-6 rounded-lg transition duration-300 font-semibold"
                                style={{ backgroundColor: colorPrimary, color: colorSecondary }}
                            >
                                Continue Shopping
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {items.map(({ product, quantity }) => (
                                <div
                                    key={product.id}
                                    className="flex items-center p-4 rounded-xl shadow-md"
                                    style={{ backgroundColor: '#fff', border: `1px solid ${colorSecondary}` }}
                                >
                                    <img
                                        src={product.images[0]}
                                        alt={product.name}
                                        className="w-16 h-16 object-cover rounded-md mr-4"
                                        onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/64x64/ccc/333?text=Item' }}
                                    />
                                    <div className="flex-grow">
                                        <p className="font-semibold" style={{ color: colorPrimary }}>{product.name}</p>
                                        <p className="text-sm text-gray-600">₹ {(product.priceINR * quantity).toLocaleString('en-IN')}</p>
                                    </div>

                                    {/* Quantity Controls */}
                                    <div className="flex items-center space-x-2 mr-4">
                                        <button
                                            onClick={() => onUpdateQuantity(product.id, quantity - 1)}
                                            className="w-8 h-8 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
                                        >
                                            -
                                        </button>
                                        <span className="font-medium w-6 text-center">{quantity}</span>
                                        <button
                                            onClick={() => onUpdateQuantity(product.id, quantity + 1)}
                                            className="w-8 h-8 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
                                        >
                                            +
                                        </button>
                                    </div>

                                    {/* Remove Button */}
                                    <button
                                        onClick={() => onRemoveItem(product.id)}
                                        className="text-red-500 hover:text-red-700 transition"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Summary - Right Column */}
                <div
                    className="w-full md:w-1/3 p-6 rounded-xl shadow-xl"
                    style={{ backgroundColor: colorPrimary, color: colorSecondary }}
                >
                    <h2 className="text-2xl font-bold mb-4 border-b pb-2" style={{ borderColor: colorDarkAccent }}>
                        Order Summary
                    </h2>

                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span>Subtotal:</span>
                            <span>₹ {subtotal.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Shipping:</span>
                            <span>₹ {shipping.toLocaleString('en-IN')}</span>
                        </div>
                        <hr style={{ borderTop: `1px solid ${colorDarkAccent}` }} className="my-3" />
                        <div className="flex justify-between text-lg font-bold">
                            <span>Order Total:</span>
                            <span>₹ {total.toLocaleString('en-IN')}</span>
                        </div>
                    </div>

                    <button
                        disabled={items.length === 0}
                        className={`w-full mt-6 py-3 text-lg uppercase tracking-widest rounded-lg transition duration-300 font-bold ${items.length === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90 hover:shadow-xl'}`}
                        style={{ backgroundColor: colorSecondary, color: colorPrimary }}
                    >
                        Checkout
                    </button>
                </div>
            </div>
        </div>
    );
};

// --- Main Shop Component ---

const Shop = () => {
    // 1. Data Definitions
    const ALL_PRODUCTS_DATA = [
        { id: 1, images: [productImageUrl1, productImageUrl2], name: "Demi Sakura Shampoo", priceINR: 2499, category: 'Shampoo', hairType: 'Dry' },
        { id: 2, images: [productImageUrl2, productImageUrl3], name: "Demi Sakura Conditioner", priceINR: 2499, category: 'Conditioner', hairType: 'Dry' },
        { id: 3, images: [productImageUrl3, productImageUrl4], name: "Demi Sakura Hair Mask", priceINR: 3199, category: 'Hair Mask', hairType: 'Damaged' },
        { id: 4, images: [productImageUrl4, productImageUrl1], name: "Demi Sakura Hair Botox", priceINR: 3399, category: 'Serums', hairType: 'Damaged' },
        { id: 5, images: [productImageUrl1, productImageUrl3], name: "Demi Hair Serum", priceINR: 2099, category: 'Serums', hairType: 'All' },
        { id: 6, images: [productImageUrl3, productImageUrl2], name: "Demi Travel Kit", priceINR: 4999, category: 'Shampoo', hairType: 'Normal' },
        { id: 7, images: [productImageUrl4, productImageUrl1], name: "Demi Gloss Treatment", priceINR: 2899, category: 'Serums', hairType: 'Normal' },
        { id: 8, images: [productImageUrl2, productImageUrl3], name: "Demi Deep Repair Mask", priceINR: 3599, category: 'Hair Mask', hairType: 'Dry' },
    ];

    // Static lists for filter display
    const categories = ['Hair Mask', 'Shampoo', 'Conditioner', 'Serums'];
    const filters = ['Hair Type', 'Price (Low to High)', 'New Launch'];

    // 2. State Management
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedFilter, setSelectedFilter] = useState(null);
    const [cartItems, setCartItems] = useState([]); 
    const [favorites, setFavorites] = useState([]); 
    const [currentView, setCurrentView] = useState('shop'); 
    const [selectedProduct, setSelectedProduct] = useState(null);

    
    const [toastMessage, setToastMessage] = useState('');
    const [isToastVisible, setIsToastVisible] = useState(false);

    const timerRef = useRef(null);

    // Constants for timing
    const ANIMATION_DURATION = 500; 
    const DISPLAY_DURATION = 2500; 

    const totalCartCount = useMemo(() =>
        cartItems.reduce((sum, item) => sum + item.quantity, 0),
        [cartItems]
    );

    // 3. Handlers

    const handleToggleFavorite = (productId) => {
        setFavorites(prev =>
            prev.includes(productId)
                ? prev.filter(id => id !== productId)
                : [...prev, productId]
        );
    };

    const handleAddToCart = (product) => {

        // 1. Update Cart Items State
        setCartItems(prevItems => {
            const existingItemIndex = prevItems.findIndex(item => item.product.id === product.id);

            if (existingItemIndex > -1) {
                // Item exists, increment quantity
                const newItems = [...prevItems];
                newItems[existingItemIndex].quantity += 1;
                return newItems;
            } else {
                // Item is new, add it
                return [...prevItems, { product, quantity: 1 }];
            }
        });

        // 2. Toast Notification Logic
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }

        setToastMessage(`✅ ${product.name} added to cart!`);

        setTimeout(() => {
            setIsToastVisible(true);
        }, 50);

        timerRef.current = setTimeout(() => {
            setIsToastVisible(false);

            timerRef.current = setTimeout(() => {
                setToastMessage('');
                timerRef.current = null;
            }, ANIMATION_DURATION);

        }, DISPLAY_DURATION);
    };

    const handleUpdateQuantity = (productId, newQuantity) => {
        if (newQuantity <= 0) {
            handleRemoveFromCart(productId);
            return;
        }

        setCartItems(prevItems =>
            prevItems.map(item =>
                item.product.id === productId
                    ? { ...item, quantity: newQuantity }
                    : item
            )
        );
    };

    const handleRemoveFromCart = (productId) => {
        setCartItems(prevItems =>
            prevItems.filter(item => item.product.id !== productId)
        );
    };


    const handleViewChange = (view, product = null) => {
        setCurrentView(view);
        setSelectedProduct(product);
    };

    const handleImageClick = (product) => {
        handleViewChange('detail', product);
    }

    // 4. Filtering Logic 
    const productsToDisplay = useMemo(() => {
        let filtered = [...ALL_PRODUCTS_DATA];

        // 1. Filter by Category
        if (selectedCategory) {
            filtered = filtered.filter(product => product.category === selectedCategory);
        }

        // 2. Filter/Sort by Filter Option
        if (selectedFilter) {
            switch (selectedFilter) {
                case 'Price (Low to High)':
                    filtered.sort((a, b) => a.priceINR - b.priceINR);
                    break;
                case 'New Launch':
                    filtered.sort((a, b) => b.id - a.id); // Mock new launch by higher ID
                    break;
                case 'Hair Type (Dry)':
                    filtered = filtered.filter(product => product.hairType === 'Dry');
                    break;
                case 'Hair Type (Damaged)':
                    filtered = filtered.filter(product => product.hairType === 'Damaged');
                    break;
                case 'Hair Type (Normal)':
                    filtered = filtered.filter(product => product.hairType === 'Normal');
                    break;
                default:
                    break;
            }
        }
        return filtered;
    }, [selectedCategory, selectedFilter]);

    const isCategorySelected = (cat) => selectedCategory === cat;
    const isFilterSelected = (filter) => selectedFilter === filter;

    // 5. Render Logic based on currentView
    const renderContent = () => {
        if (currentView === 'detail' && selectedProduct) {
            return (
                <ProductDetail
                    product={selectedProduct}
                    onBack={() => handleViewChange('shop', null)}
                    onAddToCart={handleAddToCart}
                />
            );
        }

        if (currentView === 'cart') {
            return (
                <CartView
                    items={cartItems}
                    onUpdateQuantity={handleUpdateQuantity}
                    onRemoveItem={handleRemoveFromCart}
                    onBack={() => handleViewChange('shop', null)}
                />
            );
        }

        // Render Main Shop Grid (shop view)
        return (
            <>
                <div className="relative w-full h-60 ">
                    <img
                        src={shopHeroImageUrl}
                        alt="Shop Hero Banner"
                        className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center px-6 md:px-12">
                        <h1 className="text-5xl md:text-7xl font-serif font-light text-white opacity-95 text-center">
                            Nourish. Shine. Repeat.
                        </h1>
                    </div>
                </div>

                {/* Main Shop Layout */}
                <div className="mx-auto flex flex-col md:flex-row px-6 md:px-10 lg:px-24 py-12">
                    {/* Sidebar - Left Column */}
                    <aside
                        className="w-full md:w-1/4 mb-10 md:mb-0 md:mr-10 p-6 rounded-xl shadow-xl"
                        style={{ backgroundColor: colorPrimary, color: colorSecondary }}
                    >
                        <h2
                            className="text-3xl mb-6 pb-2"
                            style={{ fontFamily: 'Georgia, serif', borderBottom: `1px solid ${colorDarkAccent}` }}
                        >
                            Restore <br /> Shine
                        </h2>

                        {/* Clear Filters Button */}
                        {(selectedCategory || selectedFilter) && (
                            <button
                                onClick={() => {
                                    setSelectedCategory(null);
                                    setSelectedFilter(null);
                                }}
                                className="text-xs uppercase tracking-widest mb-4 py-1 px-3 rounded bg-white/10 hover:bg-white/20 transition duration-150"
                            >
                                Clear Filters
                            </button>
                        )}
                        <hr className="mb-4" style={{ borderTop: `1px solid ${colorDarkAccent}` }} />

                        <div className="mb-8">
                            <p className="text-xs uppercase tracking-widest mb-3 opacity-80">Shop By Category</p>
                            {categories.map(cat => (
                                <a
                                    key={cat}
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setSelectedCategory(isCategorySelected(cat) ? null : cat); // Toggle
                                    }}
                                    className={`block text-base py-1 transition duration-150 ${isCategorySelected(cat) ? 'text-white font-bold' : 'hover:text-white'}`}
                                >
                                    {cat}
                                </a>
                            ))}
                        </div>
                        <hr className="my-4" style={{ borderTop: `1px solid ${colorDarkAccent}` }} />

                        <div>
                            <p className="text-xs uppercase tracking-widest mb-3 opacity-80">Filter By</p>
                            {filters.map(filter => (
                                <a
                                    key={filter}
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setSelectedFilter(isFilterSelected(filter) ? null : filter); // Toggle
                                    }}
                                    className={`block text-base py-1 transition duration-150 ${isFilterSelected(filter) ? 'text-white font-bold' : 'hover:text-white'}`}
                                >
                                    {filter}
                                </a>
                            ))}
                        </div>
                    </aside>

                    {/* Product Grid - Right Column */}
                    <main className="w-full ">
                        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {productsToDisplay.map(product => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    isFavorite={favorites.includes(product.id)}
                                    onToggleFavorite={handleToggleFavorite}
                                    onAddToCart={handleAddToCart}
                                    onImageClick={handleImageClick}
                                />
                            ))}
                            {productsToDisplay.length === 0 && (
                                <p className="text-gray-500 col-span-full text-center py-10">No products found matching your current selection.</p>
                            )}
                        </div>
                    </main>
                </div>
            </>
        );
    };

    // --- Footer Component ---
    const Footer = () => (
        <footer className="w-full pt-20 pb-10" style={{ backgroundColor: colorPrimary, color: colorSecondary }}>
            <div className="max-w-7xl mx-auto px-6 md:px-10">
              
              <div className="flex flex-col md:flex-row justify-between relative mb-12">
                
                {/* Left Column: Script Text */}
                <div className="md:w-5/12 flex items-center mb-10 md:mb-0">
                  <p 
                    className="text-4xl md:text-5xl leading-tight italic" 
                    style={{ fontFamily: '"Brush Script MT", cursive, serif' }}
                  >
                    Made with love, <br /> 
                    inspired hair nature.
                  </p>
                </div>
    
                {/* Vertical Divider (Hidden on Mobile) */}
                <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-white opacity-40 transform -translate-x-1/2"></div>
    
                {/* Right Column: Contact Details */}
                <div className="md:w-5/12 flex flex-col justify-center text-sm font-sans tracking-wide space-y-4 md:pl-10">
                  
                  {/* Address */}
                  <div className="flex items-start gap-3">
                    <span className="text-red-400 text-lg">📍</span> {/* Pin Emoji */}
                    <p>
                      45 Blossom Avenue, Kyoto Street, <br/>
                      Tokyo, Japan
                    </p>
                  </div>
    
                  {/* Phone */}
                  <div className="flex items-center gap-3">
                    <span className="text-gray-400 text-lg">📞</span> {/* Phone Emoji */}
                    <p>+81 45 6789 2231</p>
                  </div>
    
                  {/* Email */}
                  <div className="flex items-center gap-3">
                    <span className="text-blue-300 text-lg">📧</span> {/* Email Emoji */}
                    <p>hello@demibeauty.com</p>
                  </div>
    
                  {/* Socials */}
                  <div className="mt-2">
                    <p className="mb-1 opacity-80">Follow us:</p>
                    <div className="flex items-center flex-wrap gap-x-2">
                      <span className="text-pink-400 text-lg">🌸</span> {/* Flower Emoji */}
                      <a href="#" className="hover:text-white transition-colors underline decoration-1 underline-offset-2">Instagram</a> 
                      <span>|</span>
                      <a href="#" className="hover:text-white transition-colors underline decoration-1 underline-offset-2">Pinterest</a> 
                      <span>|</span>
                      <a href="#" className="hover:text-white transition-colors underline decoration-1 underline-offset-2">Facebook</a> 
                      <span>|</span>
                      <a href="#" className="hover:text-white transition-colors underline decoration-1 underline-offset-2">YouTube</a>
                    </div>
                  </div>
    
                </div>
              </div>
    
              {/* Horizontal Bottom Line */}
              <div className="w-full h-px bg-white opacity-40"></div>
              
            </div>
        </footer>
    );

    // The main return wraps the conditional content
    return (
        <div style={{ fontFamily: 'Inter, sans-serif', backgroundColor: colorSecondary, minHeight: '100vh' }}>
            {/* Render the Notification component here */}
            <Notification message={toastMessage} isVisible={isToastVisible} />

            <Navbar
                cartCount={totalCartCount}
                onViewChange={handleViewChange}
            />
            {renderContent()}
            <Footer/>
        </div>
    );
};
export default Shop;