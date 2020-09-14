import React, { Component } from 'react';
import SearchBar from './PictFinder/searchbar';
import axios from 'axios';
import ImageGallery from './PictFinder/ImageGallery';
import Modal from './PictFinder/Modal';
import ImageGalleryItem from './PictFinder/ImageGalleryItem';
import Button from './PictFinder/button';

export class App extends Component {
  state = {
    images: [],
    apiKey: '18219611-d680c916f1df926335f357bd5',
    modalWindow: false,
    page: 1,
    AllData: '',
    isLoading: false,
    largeImage: '',
    Error: null,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.AllData !== this.state.AllData) {
      this.fetchNewPagePicturs();
    }
  }

  toGetInputValue = data => {
    this.setState({ AllData: data, page: 1, images: [], Error: null });
  };

  fetchNewPagePicturs = () => {
    this.setState({ isLoading: true });
    axios
      .get(
        `https://pixabay.com/api/?q=${this.state.AllData}&page=${this.state.page}&key=${this.state.apiKey}&image_type=photo&orientation=horizontal&per_page=12`,
      )
      .then(response => {
        this.setState(prevState => ({
          images: [...prevState.images, ...response.data.hits],
          page: prevState.page + 1,
        }));
      })
      .catch(Error => this.setState({ Error }))
      .finally(() => {
        if (this.state.page > 2) {
          this.scroll();
        }
        this.setState({ isLoading: false });
      });
  };

  scroll = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  toGetLargeImg = data => {
    this.setState({ largeImage: data });
    this.toOpenModal();
  };
  toOpenModal = () => {
    this.setState({ modalWindow: !this.state.modalWindow });
  };
  render() {
    const { images, modalWindow, isLoading, Error } = this.state;
    return (
      <div className="App">
        {Error && <h1>Error</h1>}
        <SearchBar getInputValue={this.toGetInputValue} />
        {images.length > 0 && (
          <ImageGallery>
            <ImageGalleryItem
              images={images}
              openModal={this.toOpenModal}
              toGet={this.toGetLargeImg}
            />
          </ImageGallery>
        )}
        {modalWindow && (
          <Modal large={this.state.largeImage} openModal={this.toOpenModal} />
        )}
        {images.length > 0 && !isLoading && (
          <Button fetchPictures={this.fetchNewPagePicturs} />
        )}
        {isLoading && <h1>Loading...</h1>}
      </div>
    );
  }
}

export default App;
