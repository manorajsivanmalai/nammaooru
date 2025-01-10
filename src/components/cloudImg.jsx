import React, { useState } from 'react';
import { Cloudinary } from '@cloudinary/url-gen';
import { auto } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { AdvancedImage } from '@cloudinary/react';

const CloundImg = () => {
  const [publicId, setPublicId] = useState(''); // State to hold the image public ID

  const cld = new Cloudinary({ cloud: { cloudName: 'dw1ieh2ob' } });

  const uploadWidget = () => {
    window.cloudinary.createUploadWidget({
      cloudName: 'dw1ieh2ob',
      uploadPreset: 'your-upload-preset'
    }, (error, result) => {
      if (!error && result && result.event === "success") {
        setPublicId(result.info.public_id); // Save public ID of uploaded image
      }
    }).open();
  };

  const img = publicId
    ? cld.image(publicId).format('auto').quality('auto').resize(auto().gravity(autoGravity()).width(500).height(500))
    : null;

  return (
    <div>
      <button onClick={uploadWidget}>Upload Image</button>
      {img && <AdvancedImage cldImg={img} />}
    </div>
  );
};

export default CloundImg;
