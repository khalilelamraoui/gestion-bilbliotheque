"use strict";
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/Label";
import { Input } from "@/components/ui/Input";
import { cn } from "@/lib/utils";
import { blob } from "stream/consumers";
import { Blob } from "buffer";

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
  image_couverture: string,
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
  const formData = new FormData();
  for (const key in data) {
    if (key === 'image_couverture') {
      formData.append(key, data[key] as File);
    } else {
      formData.append(key, data[key] as string);
    }
  }

  const res = await fetch(`http://127.0.0.1:8000/api/livre/${id}/`, {
    method: "PUT",
    body: formData,
  });

  if (!res.ok) {
    throw new Error("Failed to update livre");
  }
}
const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files[0];
  setFormData({ ...formData, image_couverture: file });
};
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
    image_couverture: "",
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
      router.replace("/available");
    } catch (error) {
      setError("An error occurred");
    } finally {
      setIsLoading(false);
    }
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image_couverture: file });
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
    <form onSubmit={onFinish} className="p-4 mx-auto border rounded-md text-lg w-4/6">
      <LabelInputContainer className="mb-5 w-full">
        <Label className="text-md dark:text-blue-400">Titre</Label>
        <Input type="text" className="h-full py-2 rounded text-md" value={formData.titre} onChange={(e) => setFormData({ ...formData, titre: e.target.value })} />
      </LabelInputContainer>
      <LabelInputContainer className="mb-5 w-full">
        <Label className="text-md dark:text-blue-400">Résumé</Label>
        <Input type="text" className="h-full py-2 rounded text-md" value={formData.resume} onChange={(e) => setFormData({ ...formData, resume: e.target.value })} />
      </LabelInputContainer>
      <div className="flex gap-5">
        <LabelInputContainer className="mb-5 w-full">
          <Label className="text-md dark:text-blue-400">Auteur</Label>
          <Input type="text" className="h-full py-2 rounded text-md" value={formData.auteurs} onChange={(e) => setFormData({ ...formData, auteurs: e.target.value })} />
        </LabelInputContainer>
        <LabelInputContainer className="mb-5 w-full">
          <Label className="text-md dark:text-blue-400">Editeur</Label>
          <Input type="text" className="h-full py-2 rounded text-md" value={formData.editeur} onChange={(e) => setFormData({ ...formData, editeur: e.target.value })} />
        </LabelInputContainer>
      </div>
      <div className="flex gap-5">
        <LabelInputContainer className="mb-5 w-full">
          <Label className="text-md dark:text-blue-400">ISBN</Label>
          <Input type="text" className="h-full py-2 rounded text-md" value={formData.isbn} onChange={(e) => setFormData({ ...formData, isbn: e.target.value })} />
        </LabelInputContainer>
        <LabelInputContainer className="mb-5 w-full">
          <Label className="text-md dark:text-blue-400">Date de publication</Label>
          <Input className="py-2 rounded text-md" type="date" value={formData.date_publication} onChange={(e) => setFormData({ ...formData, date_publication: e.target.value })} />
        </LabelInputContainer>
      </div>
      <div className="flex gap-5">
        <LabelInputContainer className="mb-5 w-full">
          <Label className="text-md dark:text-blue-400">Genre</Label>
          <Input type="text" className="h-full py-2 rounded text-md" value={formData.genre} onChange={(e) => setFormData({ ...formData, genre: e.target.value })} />
        </LabelInputContainer>
        <LabelInputContainer className="mb-5 w-full">
          <Label className="text-md dark:text-blue-400">Langue</Label>
          <Input type="text" className="h-full py-2 rounded text-md" value={formData.langue} onChange={(e) => setFormData({ ...formData, langue: e.target.value })} />
        </LabelInputContainer>
      </div>
      <div className="flex gap-5">
        <LabelInputContainer className="mb-5 w-full">
          <Label className="text-md dark:text-blue-400">Disponibilité</Label>
          <Input type="text" className="h-full py-2 rounded text-md" value={formData.disponibilite} onChange={(e) => setFormData({ ...formData, disponibilite: e.target.value })} />
        </LabelInputContainer>
        <LabelInputContainer className="mb-5 w-full">
          <Label className="text-md dark:text-blue-400">Image</Label>
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </LabelInputContainer>
      </div>
      {/* Error message */}
      {error && <p className="error-message">{error}</p>}

      {/* Submit button */}
      <button disabled={isLoading} type="submit" className="bg-blue-400 py-3 px-6 rounded">
        Submit
      </button>
    </form>
  );
};
const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      
      {children}
    </div>
  );
};

export default Page;