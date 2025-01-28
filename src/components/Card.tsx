import React from 'react';
import './Card.css';  // Import the external CSS file

function Card({ props }: any) {
  // Limit to a maximum of 5 images for display
  const imagesToDisplay = props.images.slice(0, 5);

  return (
    <div className="container mt-4">
      {/* Post Card */}
      <div className="card shadow-lg rounded-3 overflow-hidden">
        <div className="card-body">
          <div className="d-flex align-items-start mb-3"> {/* Increased margin here */}
            {/* Profile Picture */}
            <img
              src="https://random-image-pepebigotes.vercel.app/api/random-image"
              alt="Profile"
              className="rounded-circle me-3"
              style={{ width: '50px', height: '50px' }}
            />
            {/* Post Content */}
            <div>
              {/* Event Title and Description */}
              <h5 className="mb-1 fw-bold">{props.title}</h5>
              <p className="mb-2 text-muted">{props.description}</p>
            </div>
          </div>

          {/* Scrollable Image Grid */}
          <div className="image-grid-wrapper mb-4"> {/* Increased margin here */}
            {/* Horizontal Scrollable Row */}
            <div className="image-row">
              {imagesToDisplay.map((image: { imageUrl: string, caption: string }, index: number) => (
                <div
                  key={index}
                  className="image-item" // Each image item
                >
                  <div className="card h-100 shadow-sm rounded-3 overflow-hidden">
                    <img
                      src={image.imageUrl}
                      className="card-img-top img-fluid rounded-3"
                      alt={`Event Image ${index + 1}`}
                      style={{
                        height: '250px', // Slightly bigger images
                        objectFit: 'cover', // Ensure images cover the area without distortion
                      }}
                    />
                    <div className="card-body">
                      <div className="text-center">
                        <small className="text-muted">{image.caption}</small>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Optional: Show "No more images" if there are more than 5 images */}
          {props.images.length > 5 && (
            <div className="text-center mt-3">
              <span className="text-muted">+{props.images.length - 5} more</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Card;
