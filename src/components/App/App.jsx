import { getPhotos } from "../../apiService/photos";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";
import SearchBar from "../SearchBar/SearchBar";
import ImageGallery from "../ImageGallery/ImageGallery";
import ImageModal from "../ImageModal/ImageModal";
import Loader from "../Loader/Loader";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";

import { useEffect, useState } from "react";

import "./App.module.css";

export default function App() {
  const [query, setQuery] = useState("");

  const [page, setPage] = useState(1);

  const [images, setImages] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState(null);

  const [isEmpty, setIsEmpty] = useState(false);

  const [isVisible, setIsVisible] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (!query) {
      return;
    }
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const { results, total_pages } = await getPhotos(query, page);
        if (!results.length) {
          return setIsEmpty(true);
        }
        setImages((prevImages) => [...prevImages, ...results]);
        setIsVisible(page < total_pages);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [page, query]);

  const openModal = (imageData) => {
    if (isModalOpen) return;
    setSelectedImage(imageData);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  const onHandleSubmit = (searchQuery) => {
    setQuery(searchQuery);
    setImages([]);
    setPage(1);
    setIsEmpty(false);
    setIsVisible(false);
    setError(null);
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div>
      <SearchBar onSubmit={onHandleSubmit} />
      {images.length > 0 && (
        <ImageGallery images={images} onImageClick={openModal} />
      )}
      <ImageModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        imageData={selectedImage}
      />
      {!images.length && !isEmpty && (
        <ErrorMessage textAlign="center">Let`s begin search 🔎</ErrorMessage>
      )}
      {isLoading && <Loader />}
      {error && (
        <ErrorMessage textAlign="center">
          ❌ Something went wrong - {error}
        </ErrorMessage>
      )}
      {isEmpty && (
        <ErrorMessage textAlign="center">
          Sorry. There are no images ... 😭
        </ErrorMessage>
      )}
      {images.length > 0 && isVisible && !isLoading && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}
    </div>
  );
}
