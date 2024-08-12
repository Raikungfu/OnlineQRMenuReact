import React from 'react';

interface TitleProps {
  text: string;
  fontSize?: string;
  textColor?: string;
}

const Title: React.FC<TitleProps> = ({ text, fontSize = 'text-xl', textColor = 'white' }) => (
  <div className={`w-[362px] h-[86px] text-center text-${textColor} ${fontSize}`}>
    {text}
  </div>
);

export default Title;
