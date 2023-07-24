import { useEffect } from 'react';
import PropTypes from 'prop-types';

export const Modal = ({onCloseModal,largeImageURL,}) => {
  
 
  useEffect(() => {
    const handleKeyDown = event => {
      if (event.code === 'Escape') {
        onCloseModal();
      }
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    }

  }, [onCloseModal])

 
 const handelOverlayClick = event => {
    if (event.target === event.currentTarget) {
      onCloseModal();
    }
  };
 
    
    return (
      <div className="Overlay" onClick={handelOverlayClick}>
        <div className="Modal">
          <img src={largeImageURL} alt="" />
        </div>
      </div>
    );
  
}
Modal.propTypes = {
  onCloseModal: PropTypes.func.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};
export default Modal;
