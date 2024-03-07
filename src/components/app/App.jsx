import React from "react"; 
import { Searchbar } from "../searchbar/Searchbar";
import { ImageGallery } from "../imageGallery/ImageGallery";
import s from "./App.module.css"
import Loader from "components/loader/Loader";
import Button from "components/buttom/Button";
import { fetchImages } from "../../services/api";
import Modal from "components/modal/Modal";

export class App extends React.Component {

state = {
images: [],
totalHits:0,
loading: false,
error: null,
q:'',
page:1,
isOpen: false,
largeImageURL: '',
}


async componentDidMount() {
  try {
    this.setState({ loading: true });
    const {hits, totalHits} = await fetchImages()
    this.setState({images: hits, totalHits: totalHits})
  } catch (error) {
    this.setState({error})
  }finally {
    this.setState({ loading: false });
  }
}

async componentDidUpdate(prevProps, prevState) {
const {q, page} = this.state;

if(prevState.q !== q || prevState.page !== page) {
  try {
    this.setState({ loading: true });
    const {hits, totalHits} = this.state.q 
    ? await fetchImages({
      page: this.state.page, 
      q: this.state.q}) 
      : await fetchImages({page: this.state.page});
    this.setState(prev => ({images: [...prev.images, ...hits], totalHits: totalHits}))
  } catch (error) {
    this.setState({error})
  } finally {
    this.setState({ loading: false });
  }
}
}

handleImg = largeImageURL => {
  console.log(largeImageURL)
  this.setState({ isOpen: true, largeImageURL });
};

handleToggleModal = () => {
  this.setState(prev => ({isOpen:!prev.isOpen}))
}
handleSetQuery = query => {

this.setState({q: query, images:[], page: 1})
}
handleLoadMore = () => {
  this.setState(prev => ({page: prev.page +1}))
}



    render() {
      const { images, loading, totalHits, isOpen, largeImageURL } = this.state;
      return (
        <div className={s.App}>
          <Searchbar handleSetQuery={this.handleSetQuery} />
          <ImageGallery images={images} openModal={this.handleImg}/>
          {loading && !images.length &&<Loader />}
          {images.length > 0 && images.length < totalHits ? (
            <Button onLoadMore={this.handleLoadMore} />
          ) : null}

{isOpen && (
          <Modal src={largeImageURL} closeModal={this.handleToggleModal} />
        )}
        </div>
      );
    }
  }
