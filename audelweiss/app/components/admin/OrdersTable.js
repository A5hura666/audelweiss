export default function OrdersTable({ orders, onSelectOrder }) {
    if (orders.length === 0)
        return (
            <p className="text-center text-gray-500 text-lg mt-10">
                Aucune commande trouvée.
            </p>
        );

    return (
        <div className="overflow-x-auto rounded-lg shadow-md border border-gray-200">
            <table className="w-full min-w-[700px] table-auto text-sm text-gray-700">
                <thead className="bg-[#f7e9e5] text-gray-800 uppercase text-left text-xs font-semibold tracking-wider">
                <tr>
                    <th className="p-3 border-b border-gray-300">ID</th>
                    <th className="p-3 border-b border-gray-300">Utilisateur ID</th>
                    <th className="p-3 border-b border-gray-300">Date</th>
                    <th className="p-3 border-b border-gray-300">Statut</th>
                    <th className="p-3 border-b border-gray-300 text-right">Total (€)</th>
                </tr>
                </thead>
                <tbody>
                {orders.map((o, i) => (
                    <tr
                        key={o.id}
                        onClick={() => onSelectOrder?.(o)}
                        className={`cursor-pointer ${
                            i % 2 === 0 ? "bg-white" : "bg-gray-50"
                        } hover:bg-[#ffe9e5] transition-colors duration-200`}
                    >
                        <td className="p-3 border-b border-gray-300">{o.id}</td>
                        <td className="p-3 border-b border-gray-300">{o.userId}</td>
                        <td className="p-3 border-b border-gray-300">
                            {new Date(o.createdAt).toLocaleDateString()}
                        </td>
                        <td className="p-3 border-b border-gray-300 font-medium text-[#E08B7A]">
                            {o.status}
                        </td>
                        <td className="p-3 border-b border-gray-300 text-right">
                            {o.total.toFixed(2)}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
