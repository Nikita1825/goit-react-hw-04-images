import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import {  useState, useEffect } from 'react';
import { PixFetch } from './Api/Api';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const App = ()=> {



  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  // const [showModal, setShowModal] = useState(false);
  // const [largeImageURL, setSelectedImage] = useState('');
  const [total, setTotal] = useState(0);
  const [, setError] = useState(null);

useEffect(() => {
  if (query.trim() !== '') {
    fetchImages(page, query);
  }
}, [query, page]);




 const fetchImages = async (page, search) => {
    const toaster = {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    };

   setIsLoading(true);
    try {
      const { hits, totalHits } = await PixFetch(search, page);
      if (hits.length === 0) {
       Notify.failure('There are no images found. Please, enter a valid value');
      } 
      setImages(prevImages => [...prevImages, ...hits]);
      setTotal(totalHits);
      
    } catch (error) {
      setError(error.message)
      toast.error(error.message, toaster);
    } finally {
      setIsLoading(false)
   }
   
  };
  
 const handleSearch = search => {
   if (search.trim() === '') {
    return Notify.warning('You wrote nothing');
   } else if (search !== query) {
     setImages([]);
     setPage(1);
     setQuery(search);
   }
 };



 const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  
    const totalPage = Math.ceil(total / 12);
    return (
      <div>
        <Searchbar onSearch={handleSearch} />
        {isLoading && <Loader />}
        <ImageGallery images={images} />
        {images.length > 0 && totalPage > page && (
          <Button onLoadMore={handleLoadMore} />
        )}
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </div>
    );
  
}
