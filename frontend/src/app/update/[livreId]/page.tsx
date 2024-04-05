"use strict";
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Livre {
  titre: string;
  auteurs: string;
  editeur: string;
  date_publication: string;
  isbn: string;
  genre: string;
  langue: string;
  resume: string;
  disponibilite: string;
  emplacement: string;
}

interface Params {
  livreId: string;
}

/**
 * Fetches a livre by ID.
 * @param {string} id The ID of the livre to retrieve.
 */
async function getLivre(id: string): Promise<Livre> {
  const res = await fetch(`http://127.0.0.1:8000/api/livre/${id}/`);
  if (!res.ok) {
    throw new Error("Failed to retrieve livre");
  }
  return res.json();
}

/**
 * Updates a livre by ID.
 * @param {string} id The ID of the livre to update.
 * @param {Object} data The updated data for the livre.
 */
async function updateLivre(id: string, data: Partial<Livre>): Promise<void> {
  const res = await fetch(`http://127.0.0.1:8000/api/livre/${id}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to update livre");
  }
}

/**
 * Deletes a livre by ID.
 * @param {string} id The ID of the livre to delete.
 */
async function deleteLivre(id: string): Promise<void> {
  const res = await fetch(`http://127.0.0.1:8000/api/livre/${id}/`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Failed to delete livre");
  }
}

const Page = ({ params }: { params: Params }) => {
  const router = useRouter();
  const [formData, setFormData] = useState<Livre>({
    titre: "",
    auteurs: "",
    editeur: "",
    date_publication: "",
    isbn: "",
    genre: "",
    langue: "",
    resume: "",
    disponibilite: "",
    emplacement: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Handles form submission.
   * @param {Event} event The form submission event.
   */
  const onFinish = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      await updateLivre(params.livreId, formData);
      router.replace("/?action=update");
    } catch (error) {
      setError("An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch livre data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getLivre(params.livreId);
        setFormData(data);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchData();
  }, [params.livreId]);

  return (
    <form onSubmit={onFinish}>
      <div>
        <label>Titre</label>
        <input type="text" value={formData.titre} onChange={(e) => setFormData({ ...formData, titre: e.target.value })} />
      </div>
      <div>
        <label>Auteurs</label>
        <input type="text" value={formData.auteurs} onChange={(e) => setFormData({ ...formData, auteurs: e.target.value })} />
      </div>
      <div>
        <label>Editeur</label>
        <input type="text" value={formData.editeur} onChange={(e) => setFormData({ ...formData, editeur: e.target.value })} />
      </div>
      <div>
        <label>Date de publication</label>
        <input type="date" value={formData.date_publication} onChange={(e) => setFormData({ ...formData, date_publication: e.target.value })} />
      </div>
      <div>
        <label>ISBN</label>
        <input type="text" value={formData.isbn} onChange={(e) => setFormData({ ...formData, isbn: e.target.value })} />
      </div>
      <div>
        <label>Genre</label>
        <input type="text" value={formData.genre} onChange={(e) => setFormData({ ...formData, genre: e.target.value })} />
      </div>
      <div>
        <label>Langue</label>
        <input type="text" value={formData.langue} onChange={(e) => setFormData({ ...formData, langue: e.target.value })} />
      </div>
      <div>
        <label>Résumé</label>
        <input type="text" value={formData.resume} onChange={(e) => setFormData({ ...formData, resume: e.target.value })} />
      </div>
      <div>
        <label>Disponibilité</label>
        <input type="text" value={formData.disponibilite} onChange={(e) => setFormData({ ...formData, disponibilite: e.target.value })} />
      </div>
      <div>
        <label>Emplacement</label>
        <input type="text" value={formData.emplacement} onChange={(e) => setFormData({ ...formData, emplacement: e.target.value })} />
      </div>

      {/* Error message */}
      {error && <p className="error-message">{error}</p>}

      {/* Submit button */}
      <button disabled={isLoading} type="submit">
        Submit
      </button>
    </form>
  );
};

export default Page;