import React, { useContext, useState } from "react";
import { X, ShoppingCart, ArrowRight, User, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { CartContext } from "../../Layout/Layout";

const CartSidebar = ({ isOpen, onClose }) => {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    cartTotal,
    closeCart,
    clearCart,
  } = useContext(CartContext);

  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ADD YOUR WHATSAPP NUMBER HERE (with country code, without + sign)
  const whatsappNumber = "9421609386"; // Example: 911234567890 for India

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleProceedToCheckout = () => {
    setShowCheckoutForm(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Format the WhatsApp message
    const productsList = cartItems
      .map(
        (item) =>
          `• ${item.name} (Qty: ${item.quantity}) - ₹${(
            item.price * item.quantity
          ).toFixed(2)}`
      )
      .join("%0A");

    const totalAmount = cartTotal.toFixed(2);

    const message = `*New Order Request*%0A%0A*Customer Details:*%0AName: ${formData.name}%0APhone: ${formData.phone}%0AAddress: ${formData.address}%0A%0A*Order Items:*%0A${productsList}%0A%0A*Total Amount: ₹${totalAmount}*%0A%0AThank you for your order!`;

    // Open WhatsApp with the pre-filled message to YOUR number
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank");

    // Clear cart and close the form after a short delay
    setTimeout(() => {
      clearCart();
      setShowCheckoutForm(false);
      setFormData({ name: "", phone: "", address: "" });
      setIsSubmitting(false);
      onClose();
    }, 1000);
  };

  const handleBackToCart = () => {
    setShowCheckoutForm(false);
  };

  return (
    <div className={`fixed inset-0 z-50 ${isOpen ? "block" : "hidden"}`}>
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      <div
        className={`absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="border-b p-4 flex justify-between items-center">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <ShoppingCart size={20} />
              {showCheckoutForm
                ? "Checkout"
                : `Your Cart (${cartItems.reduce(
                    (total, item) => total + item.quantity,
                    0
                  )})`}
            </h3>
            <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
              <X size={20} />
            </button>
          </div>

          {/* Cart Items or Checkout Form */}
          <div className="flex-1 overflow-y-auto p-4">
            {showCheckoutForm ? (
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Full Name *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User size={16} className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                      placeholder="Enter your full name"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Phone Number *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone size={16} className="text-gray-400" />
                    </div>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Delivery Address *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MapPin size={16} className="text-gray-400" />
                    </div>
                    <textarea
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      rows={3}
                      className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                      placeholder="Enter your complete delivery address"
                    />
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-md">
                  <h4 className="font-medium mb-2">Order Summary</h4>
                  <div className="space-y-2 text-sm">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex justify-between">
                        <span>
                          {item.name} (x{item.quantity})
                        </span>
                        <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t mt-3 pt-3 flex justify-between font-bold">
                    <span>Total</span>
                    <span>₹{cartTotal.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Send Order via WhatsApp
                </button>

                <button
                  type="button"
                  onClick={handleBackToCart}
                  className="w-full mt-2 text-center text-gray-600 hover:text-black"
                >
                  Back to Cart
                </button>
              </form>
            ) : cartItems.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">Your cart is empty</p>
                <Link
                  to="/shop"
                  onClick={onClose}
                  className="mt-4 inline-block text-black font-medium underline"
                >
                  Continue Shopping
                </Link>
              </div>
            ) : (
              <ul className="divide-y">
                {cartItems.map((item) => (
                  <li key={item.id} className="py-4">
                    <div className="flex gap-4">
                      <div className="w-20 h-20 bg-gray-100 rounded overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-gray-600 text-sm">
                          ₹{item.price} x {item.quantity}
                        </p>
                        <div className="flex justify-between items-center mt-2">
                          <div className="flex items-center border rounded">
                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              className="px-2 py-1"
                            >
                              -
                            </button>
                            <span className="px-2">{item.quantity}</span>
                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              className="px-2 py-1"
                            >
                              +
                            </button>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-500 text-sm"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Footer */}
          {cartItems.length > 0 && !showCheckoutForm && (
            <div className="border-t p-4">
              <div className="flex justify-between mb-4">
                <span className="font-medium">Subtotal</span>
                <span className="font-bold">₹{cartTotal.toFixed(2)}</span>
              </div>
              <button
                onClick={handleProceedToCheckout}
                className="block w-full bg-black text-white py-3 rounded-lg text-center mb-2"
              >
                Proceed to Checkout
              </button>
              <Link
                to="/shop"
                onClick={onClose}
                className="block text-center text-gray-600 hover:text-black"
              >
                Continue Shopping
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartSidebar;

// import React, { useContext, useState } from "react";
// import { X, ShoppingCart, ArrowRight, User, Phone, MapPin } from "lucide-react";
// import { Link } from "react-router-dom";
// import { CartContext } from "../../Layout/Layout";

// const CartSidebar = ({ isOpen, onClose }) => {
//   const {
//     cartItems,
//     removeFromCart,
//     updateQuantity,
//     cartTotal,
//     closeCart,
//     clearCart,
//   } = useContext(CartContext);

//   const [showCheckoutForm, setShowCheckoutForm] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     phone: "",
//     address: "",
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleProceedToCheckout = () => {
//     setShowCheckoutForm(true);
//   };

//   const handleFormSubmit = (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     // Format the WhatsApp message
//     const productsList = cartItems
//       .map(
//         (item) =>
//           `• ${item.name} (Qty: ${item.quantity}) - ₹${(
//             item.price * item.quantity
//           ).toFixed(2)}`
//       )
//       .join("%0A");

//     const totalAmount = cartTotal.toFixed(2);

//     const message = `*New Order Request*%0A%0A*Customer Details:*%0AName: ${formData.name}%0APhone: ${formData.phone}%0AAddress: ${formData.address}%0A%0A*Order Items:*%0A${productsList}%0A%0A*Total Amount: ₹${totalAmount}*%0A%0AThank you for your order!`;

//     // Open WhatsApp with the pre-filled message
//     window.open(`https://wa.me/?text=${message}`, "_blank");

//     // Clear cart and close the form after a short delay
//     setTimeout(() => {
//       clearCart();
//       setShowCheckoutForm(false);
//       setFormData({ name: "", phone: "", address: "" });
//       setIsSubmitting(false);
//       onClose();
//     }, 1000);
//   };

//   const handleBackToCart = () => {
//     setShowCheckoutForm(false);
//   };

//   return (
//     <div className={`fixed inset-0 z-50 ${isOpen ? "block" : "hidden"}`}>
//       <div className="absolute inset-0 bg-black/50" onClick={onClose} />

//       <div
//         className={`absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl transition-transform duration-300 ${
//           isOpen ? "translate-x-0" : "translate-x-full"
//         }`}
//       >
//         <div className="h-full flex flex-col">
//           {/* Header */}
//           <div className="border-b p-4 flex justify-between items-center">
//             <h3 className="text-xl font-bold flex items-center gap-2">
//               <ShoppingCart size={20} />
//               {showCheckoutForm
//                 ? "Checkout"
//                 : `Your Cart (${cartItems.reduce(
//                     (total, item) => total + item.quantity,
//                     0
//                   )})`}
//             </h3>
//             <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
//               <X size={20} />
//             </button>
//           </div>

//           {/* Cart Items or Checkout Form */}
//           <div className="flex-1 overflow-y-auto p-4">
//             {showCheckoutForm ? (
//               <form onSubmit={handleFormSubmit} className="space-y-4">
//                 <div>
//                   <label
//                     htmlFor="name"
//                     className="block text-sm font-medium text-gray-700 mb-1"
//                   >
//                     Full Name *
//                   </label>
//                   <div className="relative">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                       <User size={16} className="text-gray-400" />
//                     </div>
//                     <input
//                       type="text"
//                       id="name"
//                       name="name"
//                       value={formData.name}
//                       onChange={handleInputChange}
//                       required
//                       className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
//                       placeholder="Enter your full name"
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label
//                     htmlFor="phone"
//                     className="block text-sm font-medium text-gray-700 mb-1"
//                   >
//                     Phone Number *
//                   </label>
//                   <div className="relative">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                       <Phone size={16} className="text-gray-400" />
//                     </div>
//                     <input
//                       type="tel"
//                       id="phone"
//                       name="phone"
//                       value={formData.phone}
//                       onChange={handleInputChange}
//                       required
//                       className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
//                       placeholder="Enter your phone number"
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label
//                     htmlFor="address"
//                     className="block text-sm font-medium text-gray-700 mb-1"
//                   >
//                     Delivery Address *
//                   </label>
//                   <div className="relative">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                       <MapPin size={16} className="text-gray-400" />
//                     </div>
//                     <textarea
//                       id="address"
//                       name="address"
//                       value={formData.address}
//                       onChange={handleInputChange}
//                       required
//                       rows={3}
//                       className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
//                       placeholder="Enter your complete delivery address"
//                     />
//                   </div>
//                 </div>

//                 <div className="bg-gray-50 p-4 rounded-md">
//                   <h4 className="font-medium mb-2">Order Summary</h4>
//                   <div className="space-y-2 text-sm">
//                     {cartItems.map((item) => (
//                       <div key={item.id} className="flex justify-between">
//                         <span>
//                           {item.name} (x{item.quantity})
//                         </span>
//                         <span>₹{(item.price * item.quantity).toFixed(2)}</span>
//                       </div>
//                     ))}
//                   </div>
//                   <div className="border-t mt-3 pt-3 flex justify-between font-bold">
//                     <span>Total</span>
//                     <span>₹{cartTotal.toFixed(2)}</span>
//                   </div>
//                 </div>

//                 <button
//                   type="submit"
//                   disabled={isSubmitting}
//                   className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   {isSubmitting ? "Processing..." : "Send Order via WhatsApp"}
//                 </button>

//                 <button
//                   type="button"
//                   onClick={handleBackToCart}
//                   className="w-full mt-2 text-center text-gray-600 hover:text-black"
//                 >
//                   Back to Cart
//                 </button>
//               </form>
//             ) : cartItems.length === 0 ? (
//               <div className="text-center py-12">
//                 <p className="text-gray-500">Your cart is empty</p>
//                 <Link
//                   to="/shop"
//                   onClick={onClose}
//                   className="mt-4 inline-block text-black font-medium underline"
//                 >
//                   Continue Shopping
//                 </Link>
//               </div>
//             ) : (
//               <ul className="divide-y">
//                 {cartItems.map((item) => (
//                   <li key={item.id} className="py-4">
//                     <div className="flex gap-4">
//                       <div className="w-20 h-20 bg-gray-100 rounded overflow-hidden">
//                         <img
//                           src={item.image}
//                           alt={item.name}
//                           className="w-full h-full object-cover"
//                         />
//                       </div>
//                       <div className="flex-1">
//                         <h4 className="font-medium">{item.name}</h4>
//                         <p className="text-gray-600 text-sm">
//                           ₹{item.price} x {item.quantity}
//                         </p>
//                         <div className="flex justify-between items-center mt-2">
//                           <div className="flex items-center border rounded">
//                             <button
//                               type="button"
//                               onClick={() =>
//                                 updateQuantity(item.id, item.quantity - 1)
//                               }
//                               className="px-2 py-1"
//                             >
//                               -
//                             </button>
//                             <span className="px-2">{item.quantity}</span>
//                             <button
//                               type="button"
//                               onClick={() =>
//                                 updateQuantity(item.id, item.quantity + 1)
//                               }
//                               className="px-2 py-1"
//                             >
//                               +
//                             </button>
//                           </div>
//                           <button
//                             type="button"
//                             onClick={() => removeFromCart(item.id)}
//                             className="text-red-500 text-sm"
//                           >
//                             Remove
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>

//           {/* Footer */}
//           {cartItems.length > 0 && !showCheckoutForm && (
//             <div className="border-t p-4">
//               <div className="flex justify-between mb-4">
//                 <span className="font-medium">Subtotal</span>
//                 <span className="font-bold">₹{cartTotal.toFixed(2)}</span>
//               </div>
//               <button
//                 onClick={handleProceedToCheckout}
//                 className="block w-full bg-black text-white py-3 rounded-lg text-center mb-2"
//               >
//                 Proceed to Checkout
//               </button>
//               <Link
//                 to="/shop"
//                 onClick={onClose}
//                 className="block text-center text-gray-600 hover:text-black"
//               >
//                 Continue Shopping
//               </Link>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CartSidebar;

// import React, { useContext } from "react";
// import { X, ShoppingCart, ArrowRight } from "lucide-react";
// import { Link } from "react-router-dom";
// import { CartContext } from "../../Layout/Layout";

// const CartSidebar = ({ isOpen, onClose }) => {
//   const { cartItems, removeFromCart, updateQuantity, cartTotal, closeCart } =
//     useContext(CartContext);

//   return (
//     <div className={`fixed inset-0 z-50 ${isOpen ? "block" : "hidden"}`}>
//       <div className="absolute inset-0 bg-black/50" onClick={onClose} />

//       <div
//         className={`absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl transition-transform duration-300 ${
//           isOpen ? "translate-x-0" : "translate-x-full"
//         }`}
//       >
//         <div className="h-full flex flex-col">
//           {/* Header */}
//           <div className="border-b p-4 flex justify-between items-center">
//             <h3 className="text-xl font-bold flex items-center gap-2">
//               <ShoppingCart size={20} />
//               Your Cart (
//               {cartItems.reduce((total, item) => total + item.quantity, 0)})
//             </h3>
//             <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
//               <X size={20} />
//             </button>
//           </div>

//           {/* Cart Items */}
//           <div className="flex-1 overflow-y-auto p-4">
//             {cartItems.length === 0 ? (
//               <div className="text-center py-12">
//                 <p className="text-gray-500">Your cart is empty</p>
//                 <Link
//                   to="/shop"
//                   onClick={onClose}
//                   className="mt-4 inline-block text-black font-medium underline"
//                 >
//                   Continue Shopping
//                 </Link>
//               </div>
//             ) : (
//               <ul className="divide-y">
//                 {cartItems.map((item) => (
//                   <li key={item.id} className="py-4">
//                     <div className="flex gap-4">
//                       <div className="w-20 h-20 bg-gray-100 rounded overflow-hidden">
//                         <img
//                           src={item.image}
//                           alt={item.name}
//                           className="w-full h-full object-cover"
//                         />
//                       </div>
//                       <div className="flex-1">
//                         <h4 className="font-medium">{item.name}</h4>
//                         <p className="text-gray-600 text-sm">
//                           ${item.price} x {item.quantity}
//                         </p>
//                         <div className="flex justify-between items-center mt-2">
//                           <div className="flex items-center border rounded">
//                             <button
//                               onClick={() =>
//                                 updateQuantity(item.id, item.quantity - 1)
//                               }
//                               className="px-2 py-1"
//                             >
//                               -
//                             </button>
//                             <span className="px-2">{item.quantity}</span>
//                             <button
//                               onClick={() =>
//                                 updateQuantity(item.id, item.quantity + 1)
//                               }
//                               className="px-2 py-1"
//                             >
//                               +
//                             </button>
//                           </div>
//                           <button
//                             onClick={() => removeFromCart(item.id)}
//                             className="text-red-500 text-sm"
//                           >
//                             Remove
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>

//           {/* Footer */}
//           {cartItems.length > 0 && (
//             <div className="border-t p-4">
//               <div className="flex justify-between mb-4">
//                 <span className="font-medium">Subtotal</span>
//                 <span className="font-bold">${cartTotal.toFixed(2)}</span>
//               </div>
//               <Link
//                 to="/checkout"
//                 onClick={closeCart}
//                 className="block w-full bg-black text-white py-3 rounded-lg text-center"
//               >
//                 Proceed to Checkout
//               </Link>
//               <Link
//                 to="/shop"
//                 onClick={onClose}
//                 className="block mt-2 text-center text-gray-600 hover:text-black"
//               >
//                 Continue Shopping
//               </Link>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CartSidebar;
