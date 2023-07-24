import Modal from 'components/Modal/Modal';
import { useState } from 'react';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ image: { webformatURL, tags, largeImageURL } }) => {
  const [visible, setVisible] = useState(false);

  const toggleModal = () => {
   setVisible(!visible);
  };

  return (
    <li className="ImageGalleryItem">
      <img
        className="ImageGalleryItem-image"
        src={webformatURL}
        alt=""
        onClick={toggleModal}
      />
      {visible && (
        <Modal
          tags={tags}
          largeImageURL={largeImageURL}
          onCloseModal={toggleModal}
        />
      )}
    </li>
  );
};
ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }).isRequired,
};
