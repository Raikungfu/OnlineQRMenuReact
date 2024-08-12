import React from 'react';

interface LogoProps {
  src: string;
  alt: string;
  width: string;
  height: string;
}

const Logo: React.FC<LogoProps> = ({ src, alt, width, height }) => (
    <img className={`${width} ${height} rounded-full`} src={src} alt={alt} />
);

export default Logo;
