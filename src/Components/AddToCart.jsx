import React, { useMemo } from 'react';
const colorPrimary = '#3d2626';
const colorSecondary = '#f5e6d6';
const colorDarkAccent = '#5c3939';


/**
 * @param {object[]} items 
 * @param {function} onUpdateQuantity 
 * @param {function} onRemoveItem 
 * @param {function} onBack 
 */
const AddToCart = ({ items, onUpdateQuantity, onRemoveItem, onBack }) => {

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

export default AddToCart;