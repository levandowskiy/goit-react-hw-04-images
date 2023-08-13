import React, { useState, useEffect } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal';
import fetchImg from '../service/pixabay-api';

const App = () => {
  const [searchValue, setSearchValue] = useState('');
  const [visibility, setVisibility] = useState(false);
  const [modalImg, setModalImg] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [totalResult, setTotalResult] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (searchValue === "") {
      return
    }

    fetchImageData(searchValue, page);
  }, [searchValue, page]);

  const handlerFormSubmit = (searchValue) => {
    setSearchValue(searchValue);
    setPage(1);               
    setSearchResult([])
  };

  const fetchImageData = (searchValue, page) => {
    setIsLoading(true);
    setErrorMessage('');

    fetchImg(searchValue, page)
      .then((searchResult) => {
        if (searchResult.hits.length === 0) {
          setSearchResult(null);
          setTotalResult(0);
          setErrorMessage('Запит не знайдено');
        } else {
          setSearchResult((prevResult) => ([...prevResult, ...searchResult.hits]));
          setTotalResult(searchResult.totalHits);
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);

        setSearchResult(null);
        setTotalResult(0);
        setErrorMessage('Помилка під час виконання запиту')
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handlerOpenModal = (largeImg) => {
    setVisibility(true);
    setModalImg(largeImg);
  };

  const handlerCloseModal = () => {
    setVisibility(false);
  };

  const handlerLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <>
      <Searchbar handlerFormSubmit={handlerFormSubmit} />
      <ImageGallery
        handlerOpenModal={handlerOpenModal}
        searchValue={searchValue}
        searchResult={searchResult}
        totalResult={totalResult}
        isLoading={isLoading}
        errorMessage={errorMessage}
        handlerLoadMore={handlerLoadMore}
      />
      {visibility && (
        <Modal
          largeImg={modalImg}
          handlerCloseModal={handlerCloseModal}
        />
      )}
    </>
  );
}


export default App;
