"use client" 

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

/**
 * Fetches a menu item by ID.
 * @param {number} id The ID of the menu item to retrieve.
 */
async function getBook(id: any) {
  const res = await fetch(`http://127.0.0.1:8000/api/book/${id}/`);
  if (!res.ok) {
    throw new Error("Failed to retrieve book");
  }
  return res.json();
}

/**
 * Updates a menu item by ID.
 * @param {number} id The ID of the menu item to update.
 * @param {Object} data The updated data for the menu item.
 */
async function updateBook(id, data) {
    const res = await fetch(`http://127.0.0.1:8000/api/book/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  
    if (!res.ok) {
      throw new Error("Failed to update book");
    }
    return res.json();
  }

  async function deleteBook(id: any) {
    const res = await fetch(`http://127.0.0.1:8000/api/book/${id}/`, {
      method: "DELETE",
    });
  
    if (!res.ok) {
      throw new Error("Failed to delete book");
    }
  }
  


const Page = ({ params }) => {
    const router = useRouter();
    const [formData, setFormData] = useState({ name: "", quantity: "" });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
  
    /**
     * Handles form submission.
     * @param {Event} event The form submission event.
     */
    const onFinish = (event: { preventDefault: () => void; }) => {
      event.preventDefault();
      setIsLoading(true);
      updateBook(params.bookId, formData)
        .then(() => {
          router.replace("/?action=update");
        })
        .catch(() => {
          setError("An error occurred");
          setIsLoading(false);
        });
    };
  
    // Cleanup effect for resetting loading state
    useEffect(() => {
      return () => setIsLoading(false);
    }, []);
  
    // Fetch menu item data on component mount
    useEffect(() => {
      const fetchData = async () => {
        try {
          const data = await getBook(params.bookId);
          setFormData({ name: data.name, quantity: data.quantity});
        } catch (error) {
          setError(error.message);
        }
      };
      fetchData();
    }, [params.bookId]);
  
    return (
      <form onSubmit={onFinish}>
        <div className="form-item">
          <label htmlFor="name">Name</label>
          <input
            required
            name="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <div className="form-item">
          <label htmlFor="quantity">Quantity</label>
          <input
            required
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <div>
          <button disabled={isLoading} className="add-button" type="submit">
            Submit
          </button>
        </div>
      </form>
    );
  };
  
  export default Page;