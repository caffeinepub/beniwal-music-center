import { useState } from 'react';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallback?: string;
  hideOnError?: boolean;
}

export function SafeImage({ 
  src, 
  alt, 
  fallback, 
  hideOnError = false, 
  className,
  ...props 
}: SafeImageProps) {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleError = () => {
    setError(true);
    setLoading(false);
  };

  const handleLoad = () => {
    setLoading(false);
  };

  // If error and hideOnError is true, don't render anything
  if (error && hideOnError) {
    return null;
  }

  // If error and fallback exists, show fallback
  if (error && fallback) {
    return (
      <img 
        src={fallback} 
        alt={alt} 
        className={className}
        {...props}
      />
    );
  }

  // If error and no fallback, show placeholder
  if (error) {
    return (
      <div 
        className={`flex items-center justify-center bg-muted ${className}`}
        {...props}
      >
        <span className="text-muted-foreground text-sm">Image unavailable</span>
      </div>
    );
  }

  return (
    <img 
      src={src} 
      alt={alt} 
      className={className}
      onError={handleError}
      onLoad={handleLoad}
      {...props}
    />
  );
}
