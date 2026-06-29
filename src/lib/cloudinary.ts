import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary with environment variables
if (typeof process.env.CLOUDINARY_CLOUD_NAME === 'string' &&
    typeof process.env.CLOUDINARY_API_KEY === 'string' &&
    typeof process.env.CLOUDINARY_API_SECRET === 'string') {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
}

export interface CloudinaryImageOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'webp' | 'jpg' | 'png' | 'auto';
  crop?: 'fill' | 'fit' | 'crop' | 'scale' | 'thumb';
}

export function getCloudinaryUrl(
  publicId: string,
  options: CloudinaryImageOptions = {}
): string {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || process.env.CLOUDINARY_CLOUD_NAME;
  
  if (!cloudName) {
    console.warn('Cloudinary cloud name not configured. Using fallback URL.');
    return publicId;
  }

  const {
    width = 800,
    height = 600,
    quality = 80,
    format = 'auto',
    crop = 'fill'
  } = options;

  const transformations = [
    `w_${width}`,
    `h_${height}`,
    `q_${quality}`,
    `f_${format}`,
    `c_${crop}`
  ].join(',');

  return `https://res.cloudinary.com/${cloudName}/image/upload/${transformations}/${publicId}`;
}

// Helper function to generate responsive image sets
export function getResponsiveImageUrls(
  publicId: string,
  baseOptions: CloudinaryImageOptions = {}
) {
  const sizes = [400, 800, 1200, 1600];
  
  return sizes.map(size => ({
    width: size,
    height: Math.round(size * (baseOptions.height || 600) / (baseOptions.width || 800)),
    url: getCloudinaryUrl(publicId, { ...baseOptions, width: size })
  }));
}

// Upload image to Cloudinary from base64 data URL
export async function uploadImage(file: File | string, options?: {
  folder?: string;
  public_id?: string;
  transformation?: string;
}) {
  try {
    let dataUrl: string;
    
    if (file instanceof File) {
      // Convert File to base64 data URL
      dataUrl = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    } else {
      dataUrl = file;
    }
    
    const result = await cloudinary.uploader.upload(dataUrl, {
      folder: options?.folder || 'art-gallery',
      public_id: options?.public_id,
      transformation: options?.transformation,
    });
    
    return {
      success: true,
      url: result.secure_url,
      publicId: result.public_id,
      width: result.width,
      height: result.height,
    };
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Upload failed',
    };
  }
}

// Upload image from base64
export async function uploadBase64Image(base64Data: string, options?: {
  folder?: string;
  public_id?: string;
}) {
  try {
    const result = await cloudinary.uploader.upload(base64Data, {
      folder: options?.folder || 'art-gallery',
      public_id: options?.public_id,
    });
    
    return {
      success: true,
      url: result.secure_url,
      publicId: result.public_id,
      width: result.width,
      height: result.height,
    };
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Upload failed',
    };
  }
}

// Delete image from Cloudinary
export async function deleteImage(publicId: string) {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return {
      success: result.result === 'ok',
      result: result.result,
    };
  } catch (error) {
    console.error('Cloudinary delete error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Delete failed',
    };
  }
}
