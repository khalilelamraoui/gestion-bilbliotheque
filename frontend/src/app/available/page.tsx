"use client";

import React from 'react'
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

/**
 * Fetches a book item by ID.
 * @param {number} id The ID of the book item to retrieve.
 */
async function deleteBook(id) {
  const res = await fetch(`http://127.0.0.1:8000/api/book/${id}/`, {
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error("Failed to retrieve book");
  }
  return Promise.resolve();
}

/**
 * Fetches book data from the server.
 */
async function getData() {
  const res = await fetch("http://127.0.0.1:8000/api/book/");
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}




/**
 * Represents a single book item.
 */
const BookItem = ({ id, name, quantity, onEdit, onDelete }) => {
  return (
    <div className="book-item" data-id={id}>
      <div className="book-item-info">
        <div className="book-item-name">{name}</div>
        <div className="book-item-price">{quantity}</div>
      </div>
      <div className="book-item-actions">
        <button className="edit-button" onClick={onEdit}>
          Edit
        </button>
        <button
          className="delete-button"
          onClick={() => {
            deleteBook(id).then(() => onDelete(id));
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};



/**
 * The main page component.
 */
export default function Page() {
  const [bookItems, setBookItems] = useState(null);
  const router = useRouter();
  const params = useSearchParams();

  // State for displaying a success message
  const [displaySuccessMessage, setDisplaySuccessMessage] = useState({
    show: false,
    type: "", // either 'add' or 'update'
  });

  // Fetch book items on component mount
  useEffect(() => {
    const fetchData = async () => {
      const data = await getData();
      setBookItems(data);
    };
    fetchData().catch(console.error);
  }, []);

  // Detect changes in URL parameters for success messages
  useEffect(() => {
    if (!!params.get("action")) {
      setDisplaySuccessMessage({
        type: params.get("action"),
        show: true,
      });
      router.replace("/");
    }
  }, [params, router]);

  // Automatically hide the success message after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      if (displaySuccessMessage.show) {
        setDisplaySuccessMessage({ show: false, type: "" });
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, [displaySuccessMessage.show]);

  // Handle deletion of a book item
  const handleDelete = (id) => {
    setBookItems((items) => items.filter((item) => item.id !== id));
  };

  return (
    <div>
      <button className="add-button" onClick={() => router.push("/add")}>
        Add
      </button>
      {displaySuccessMessage.show && (
        <p className="success-message">
          {displaySuccessMessage.type === "add" ? "Added a" : "Modified a"} book
          item.
        </p>
      )}
      {bookItems ? (
        bookItems.map((item) => (
          <BookItem
            key={item.id}
            id={item.id}
            name={item.name}
            quantity={item.quantity}
            onEdit={() => router.push(`/update/${item.id}`)}
            
            onDelete={handleDelete}
          />
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}