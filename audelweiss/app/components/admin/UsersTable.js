export default function UsersTable({ users }) {
    if (users.length === 0)
        return (
            <p className="text-center text-gray-500 text-lg mt-10">
                Aucun utilisateur trouvé.
            </p>
        );

    return (
        <div className="overflow-x-auto rounded-lg shadow-md border border-gray-200">
            <table className="w-full min-w-[700px] table-auto text-sm text-gray-700">
                <thead className="bg-[#f7e9e5] text-gray-800 uppercase text-left text-xs font-semibold tracking-wider">
                <tr>
                    <th className="p-3 border-b border-gray-300">ID</th>
                    <th className="p-3 border-b border-gray-300">Email</th>
                    <th className="p-3 border-b border-gray-300">Nom</th>
                    <th className="p-3 border-b border-gray-300">Prénom</th>
                    <th className="p-3 border-b border-gray-300">Rôle</th>
                </tr>
                </thead>
                <tbody>
                {users.map((u, i) => (
                    <tr
                        key={u.id}
                        className={`${
                            i % 2 === 0 ? "bg-white" : "bg-gray-50"
                        } hover:bg-[#ffe9e5] transition-colors duration-200`}
                    >
                        <td className="p-3 border-b border-gray-300">{u.id}</td>
                        <td className="p-3 border-b border-gray-300 break-words max-w-xs">{u.email}</td>
                        <td className="p-3 border-b border-gray-300">{u.lastName || "-"}</td>
                        <td className="p-3 border-b border-gray-300">{u.firstName || "-"}</td>
                        <td className="p-3 border-b border-gray-300 font-medium text-[#E08B7A]">{u.role}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
