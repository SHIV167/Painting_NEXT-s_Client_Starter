export interface Painting {
  id: string;
  title: string;
  artist: string;
  year: number;
  medium: string;
  dimensions: string;
  description: string;
  imageUrl: string;
  category: string;
}

export const paintings: Painting[] = [
  {
    id: '1',
    title: 'Sunset over the Ganges',
    artist: 'Priya Sharma',
    year: 2024,
    medium: 'Oil on Canvas',
    dimensions: '36" x 48"',
    description: 'A vibrant depiction of the sacred river at golden hour, capturing the spiritual essence of Varanasi.',
    imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&h=600&fit=crop',
    category: 'Landscape'
  },
  {
    id: '2',
    title: 'Abstract Dreams',
    artist: 'Rahul Verma',
    year: 2023,
    medium: 'Acrylic on Canvas',
    dimensions: '30" x 40"',
    description: 'An exploration of subconscious thoughts through bold colors and dynamic forms.',
    imageUrl: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=600&fit=crop',
    category: 'Abstract'
  },
  {
    id: '3',
    title: 'Portrait of Silence',
    artist: 'Anita Desai',
    year: 2024,
    medium: 'Watercolor',
    dimensions: '24" x 30"',
    description: 'A contemplative portrait capturing the quiet strength within solitude.',
    imageUrl: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=800&h=600&fit=crop',
    category: 'Portrait'
  },
  {
    id: '4',
    title: 'Monsoon Memories',
    artist: 'Priya Sharma',
    year: 2023,
    medium: 'Mixed Media',
    dimensions: '40" x 50"',
    description: 'The nostalgic beauty of Indian monsoon rains through texture and color.',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop',
    category: 'Landscape'
  },
  {
    id: '5',
    title: 'Urban Rhythms',
    artist: 'Rahul Verma',
    year: 2024,
    medium: 'Oil on Canvas',
    dimensions: '48" x 36"',
    description: 'The chaotic beauty of Mumbai streets captured in expressive brushstrokes.',
    imageUrl: 'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=800&h=600&fit=crop',
    category: 'Abstract'
  },
  {
    id: '6',
    title: 'Floral Symphony',
    artist: 'Anita Desai',
    year: 2023,
    medium: 'Acrylic on Canvas',
    dimensions: '36" x 36"',
    description: 'A celebration of nature\'s delicate beauty through intricate floral patterns.',
    imageUrl: 'https://images.unsplash.com/photo-1578926288207-a90a5366759d?w=800&h=600&fit=crop',
    category: 'Still Life'
  }
];

export const exhibitions = [
  {
    id: '1',
    title: 'Colors of India',
    date: 'March 2024',
    venue: 'National Gallery of Modern Art, Mumbai',
    description: 'A collective exhibition featuring contemporary Indian artists exploring the diverse palette of Indian culture.',
    image: 'https://images.unsplash.com/photo-1577720580479-7d839d829c73?w=800&h=400&fit=crop'
  },
  {
    id: '2',
    title: 'Abstract Visions',
    date: 'January 2024',
    venue: 'Art India Gallery, Delhi',
    description: 'An exploration of abstract expressionism by emerging and established artists.',
    image: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=800&h=400&fit=crop'
  },
  {
    id: '3',
    title: 'Nature\'s Canvas',
    date: 'November 2023',
    venue: 'Jehangir Art Gallery, Mumbai',
    description: 'Landscapes and nature-inspired works celebrating the beauty of the natural world.',
    image: 'https://images.unsplash.com/photo-1544531586-fde5298cdd40?w=800&h=400&fit=crop'
  }
];

export const artistInfo = {
  name: 'Priya Sharma',
  bio: 'Priya Sharma is a contemporary Indian artist based in Mumbai. Her work explores the intersection of traditional Indian art forms and modern expressionism. With over 15 years of experience, she has exhibited her work in galleries across India and internationally.',
  education: [
    'Master of Fine Arts, Sir J.J. School of Art, Mumbai (2008)',
    'Bachelor of Fine Arts, College of Art, Delhi (2006)'
  ],
  achievements: [
    'National Art Award, Ministry of Culture (2022)',
    'Featured in Art India Magazine (2021)',
    'Solo exhibition at Tate Modern, London (2020)'
  ],
  image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop'
};
