import Swal from "sweetalert2";
import { Trash2 } from "lucide-react";

export default function UsersTable({ users, onUserDeleted }) {
    const handleDelete = async (userId) => {
        const confirm = await Swal.fire({
            title: "Supprimer l'utilisateur ?",
            text: "Cette action est irréversible",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#E08B7A",
            cancelButtonColor: "#aaa",
            confirmButtonText: "Oui, supprimer",
            cancelButtonText: "Annuler"
        });

        if (!confirm.isConfirmed) {
            return;
        }

        const res = await fetch(`/api/admin/users/${userId}/delete`, {
            method: "DELETE",
        });

        if (res.ok) {
            Swal.fire("Supprimé", "L'utilisateur a été supprimé.", "success");
            if (onUserDeleted) {
                onUserDeleted(userId);
            }
        } else {
            const data = await res.json();
            Swal.fire("Erreur", data.error || "Une erreur est survenue.", "error");
        }
    };

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
                    <th className="p-3 border-b border-gray-300">Actions</th>
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
                        <td className="p-3 border-b border-gray-300">
                            {u.role !== "ADMIN" && (
                                <button
                                    className="text-red-500 hover:text-red-700"
                                    onClick={() => handleDelete(u.id)}
                                    title="Supprimer l'utilisateur"
                                >
                                    <Trash2 size={18} />
                                </button>
                            )}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
