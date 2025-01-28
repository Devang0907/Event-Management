import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Button, Form, Col, Row } from 'react-bootstrap';
import axios from 'axios';

let idCount=6;

function EventForm() {
  // Use a single state to hold all parameters
  const [formData, setFormData] = useState({
    id: idCount++, 
    title: '',
    description: '',
    images: [] as File[], // Array to hold image files
    imageCaptions: [] as string[], // Array to hold captions for each image
  });

  // Handle title change
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 50 && /^[a-zA-Z0-9\s]*$/.test(value)) {
      setFormData({ ...formData, title: value });
    }
  };

  // Handle description change (from CKEditor)
  const handleDescriptionChange = (event: any, editor: any) => {
    setFormData({ ...formData, description: editor.getData() });
  };

  // Handle image selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const validImages = Array.from(files).filter(
        (file) => file.type === 'image/jpeg' || file.type === 'image/png'
      );
      if (validImages.length <= 5) {
        setFormData({ ...formData, images: validImages });
      } else {
        alert('You can upload a maximum of 5 images');
      }
    }
  };

  // Handle caption change
  const handleCaptionChange = (index: number, value: string) => {
    const newCaptions = [...formData.imageCaptions];
    newCaptions[index] = value;
    setFormData({ ...formData, imageCaptions: newCaptions });
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    axios.post("http://localhost:3000/events",formData);
  };



  return (
    <Form onSubmit={handleSubmit}>
      {/* Event Title */}
      <Form.Group controlId="eventTitle">
        <Form.Label>Event Title</Form.Label>
        <Form.Control
          type="text"
          value={formData.title}
          onChange={handleTitleChange}
          maxLength={50}
          required
          placeholder="Enter event title"
        />
        <Form.Text className="text-muted">
          Max 50 characters. Only alphanumeric and spaces allowed.
        </Form.Text>
      </Form.Group>

      {/* Event Description */}
      <Form.Group controlId="eventDescription" className="mt-3">
        <Form.Label>Event Description</Form.Label>
        <CKEditor
          editor={ClassicEditor}
          data={formData.description}
          onChange={handleDescriptionChange}
        />
        <Form.Text className="text-muted">Max 5000 characters.</Form.Text>
      </Form.Group>

      {/* Event Images */}
      <Form.Group controlId="eventImages" className="mt-3">
        <Form.Label>Event Images</Form.Label>
        <Form.Control
          type="file"
          accept="image/jpeg, image/png"
          multiple
          onChange={handleImageChange}
        />
        <Form.Text className="text-muted">Max 5 images. JPEG/PNG only.</Form.Text>
      </Form.Group>

      {/* Display Images and Captions */}
      {formData.images.length > 0 && (
        <div className="mt-3">
          <Row>
            {formData.images.map((image, index) => (
              <Col sm={12} md={6} lg={4} key={index}>
                <div>
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`Event Image ${index + 1}`}
                    style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                  />
                  <Form.Group controlId={`caption-${index}`} className="mt-2">
                    <Form.Label>Image Caption</Form.Label>
                    <Form.Control
                      type="text"
                      value={formData.imageCaptions[index] || ''}
                      onChange={(e) => handleCaptionChange(index, e.target.value)}
                      placeholder="Enter image caption"
                    />
                  </Form.Group>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      )}

      {/* Submit Button */}
      <Button variant="primary" type="submit" className="mt-3">
        Submit Event
      </Button>
    </Form>
  );
}

export default EventForm;
