"use client";

import { useEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation";
import useSWR from "swr";
import { fetcher } from "../fetcher";
import axios from 'axios';
import Header from "@/components/Header";



const Page = () => {

  const { data: user } = useSWR("/auth/users/me", fetcher);
  const router = useRouter();
  console.log(user);
  console.log(user?.is_superuser);
  console.log(user?.is_admin);
  if (user?.type_utilisateur === "lecteur") {
    redirect("/");
  }
  else if (user?.type_utilisateur === "bibliothequaire") {
    router.push("/add");
  }
  
  const [formData, setFormData] = useState({
    titre: '',
    auteurs: '',
    editeur: '',
    date_publication: '',
    isbn: '',
    genre: '',
    langue: '',
    resume: '',
    disponibilite: '',
    emplacement: '',
    image_couverture: null, // File object
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image_couverture: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataForSubmission = new FormData();
      for (const key in formData) {
        formDataForSubmission.append(key, formData[key]);
      }

      await axios.post('http://127.0.0.1:8000/api/livre/', formDataForSubmission, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Clear form fields after successful submission if needed
      setFormData({
        titre: '',
        auteurs: '',
        editeur: '',
        date_publication: '',
        isbn: '',
        genre: '',
        langue: '',
        resume: '',
        disponibilite: '',
        emplacement: '',
        image_couverture: null,
      });

      // Handle success notification or redirect
    } catch (error) {
      console.error('Failed to create livre:', error);
      // Handle error notification
    }
  };

  return (
    <>
      <Header />
      <form onSubmit={handleSubmit}>
        <div className="form-item">
          <label htmlFor="titre">Titre</label>
          <input type="text" name="titre" value={formData.titre} onChange={handleChange} />
        </div>
        <div className="form-item">
          <label htmlFor="auteurs">Auteurs</label>
          <input type="text" name="auteurs" value={formData.auteurs} onChange={handleChange} />
        </div>
        <div className="form-item">
          <label htmlFor="editeur">Editeur</label>
          <input type="text" name="editeur" value={formData.editeur} onChange={handleChange} />
        </div>
        <div className="form-item">
          <label htmlFor="date_publication">Date de publication</label>
          <input type="date" name="date_publication" value={formData.date_publication} onChange={handleChange} />
        </div>
        <div className="form-item">
          <label htmlFor="isbn">ISBN</label>
          <input type="text" name="isbn" value={formData.isbn} onChange={handleChange} />
        </div>
        <div className="form-item">
          <label htmlFor="genre">Genre</label>
          <input type="text" name="genre" value={formData.genre} onChange={handleChange} />
        </div>
        <div className="form-item">
          <label htmlFor="langue">Langue</label>
          <input type="text" name="langue" value={formData.langue} onChange={handleChange} />
        </div>
        <div className="form-item">
          <label htmlFor="resume">Resume</label>
          <input type="text" name="resume" value={formData.resume} onChange={handleChange} />
        </div>
        <div className="form-item">
          <label htmlFor="disponibilite">Disponibilite</label>
          <input type="text" name="disponibilite" value={formData.disponibilite} onChange={handleChange} />
        </div>
        <div className="form-item">
          <label htmlFor="emplacement">Emplacement</label>
          <input type="text" name="emplacement" value={formData.emplacement} onChange={handleChange} />
        </div>
        <div className="form-item">
          <label htmlFor="image_couverture">Image de couverture</label>
          <input type="file" name="image_couverture" onChange={handleFileChange} className="h-full"/>
        </div>
  
        <div className="form-item">
          <button type="submit">Submit</button>
        </div>
      </form>
    </>
  );
    
  
    
};
  
export default Page;