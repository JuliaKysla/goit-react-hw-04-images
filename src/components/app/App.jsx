import React, { useState, useEffect } from "react"; 
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Searchbar } from "../searchbar/Searchbar";
import { ImageGallery } from "../imageGallery/ImageGallery";
import s from "./App.module.css"
import Loader from "components/loader/Loader";
import Button from "components/buttom/Button";
import { fetchImages } from "../../services/api";
import Modal from "components/modal/Modal";

export const App = () => {

const [images,setImages] = useState([]);
const [totalHits, setTotalHits] = useState(0);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);
const [q, setQ] = useState('');
const [page, setPage] = useState(1);
const [isOpen, setIsOpen] = useState(false);
const [largeImageURL, setLargeImage] = useState('');

useEffect(() => {
  if(!q){
    return;
  }
  const getData = async () => {
    setLoading(true)
    setError(null)
    try {
     const {hits, totalHits} = await fetchImages(q, page)

     if (hits.length === 0) {
      toast.warn(
        `Sorry, there are no images matching your search query. Please try again.`
      );
      return;
    }

    if (page === Math.ceil(totalHits / 12)) {
      toast.info(
        `We're sorry, but you've reached the end of search results.`
      );
    }
    setImages(prevImages => [...prevImages, ...hits]);
    setLoading(false);
    setTotalHits(totalHits);
      
    if (page === 1) {
      toast.success(`Hooray! We found ${totalHits} images!`);
    }

    } catch (error) {
      setError(error)
      toast.error(error.message);
    } finally{
      setLoading(false)
    }
    
  }
  getData();
},[q, page])


const handleImg = largeImageURL => {
  console.log(largeImageURL)
setIsOpen(true)
setLargeImage(largeImageURL)

  // this.setState({ isOpen: true, largeImageURL });
};

const handleToggleModal = () => {
  setIsOpen(false)
  // this.setState(prev => ({isOpen:!prev.isOpen}))
}
const handleSetQuery = query => {
setImages([])
setQ(query)
setPage(1)
// this.setState({q: query, images:[], page: 1})
}
const handleLoadMore = () => {
  setPage(prevPage => prevPage + 1)
  // this.setState(prev => ({page: prev.page +1}))
};



//     render() {
//       const { images, loading, totalHits, isOpen, largeImageURL } = this.state;
      return (
        <div className={s.App}>
          <Searchbar handleSetQuery={handleSetQuery} />
          <ImageGallery images={images} openModal={handleImg}/>
          {loading && !images.length &&<Loader />}
          {images.length > 0 && images.length < totalHits ? (
            <Button onLoadMore={handleLoadMore} />
          ) : null}

{isOpen && (
          <Modal src={largeImageURL} closeModal={handleToggleModal} />
        )}
        </div>
      );
    }

