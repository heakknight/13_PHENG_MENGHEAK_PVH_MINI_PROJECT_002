export default function OrderCardComponent({ order }) {
  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("en-US", {
      month: "short", day: "numeric", year: "numeric",
    });

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <div className="flex items-start justify-between px-6 py-5">
        <div>
          <p className="text-[11px] uppercase tracking-widest text-gray-400 font-medium mb-1">Order</p>
          <p className="text-sm font-semibold text-gray-800">#{order.orderId}</p>
        </div>
        <div className="text-right">
          <p className="text-[11px] uppercase tracking-widest text-gray-400 font-medium mb-1">Total</p>
          <p className="text-lg font-bold text-gray-900">{formatCurrency(order.totalAmount)}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 px-6 pb-5 border-b border-gray-100">
        <div>
          <p className="text-[11px] uppercase tracking-widest text-gray-400 font-medium mb-1">User ID</p>
          <p className="text-sm text-gray-700 truncate">{order.appUserId}</p>
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-widest text-gray-400 font-medium mb-1">Order date</p>
          <p className="text-sm text-gray-700">{formatDate(order.orderDate)}</p>
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-widest text-gray-400 font-medium mb-1">Line items</p>
          <p className="text-sm text-gray-700">{order.orderDetailsResponse?.length ?? 0}</p>
        </div>
      </div>

      <div className="bg-gray-50 px-6 py-4">
        <p className="text-[11px] uppercase tracking-widest text-gray-400 font-medium mb-3">Order details</p>
        <div className="flex flex-col gap-2">
          {order.orderDetailsResponse?.map((item) => (
            <div key={item.productId} className="flex items-center justify-between text-sm">
              <p className="text-gray-600">
                Product <span className="font-semibold text-gray-800">{item.productName}</span>
              </p>
              <div className="flex items-center gap-8">
                <p className="text-gray-500">Qty <span className="font-medium text-gray-700">{item.orderQty}</span></p>
                <p className="font-semibold text-gray-800 w-20 text-right">{formatCurrency(item.orderTotal)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}