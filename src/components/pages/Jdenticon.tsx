import React, { useRef, useEffect } from 'react';
import jdenticon from 'jdenticon/standalone';

interface JdenticonProps {
  name: string;
  width?: string;
  height?: string;
  className: string;
}

const Jdenticon: React.FC<JdenticonProps> = ({ name, width = '32px', height = '32px' }) => {
  const icon = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (icon.current) {
      jdenticon.update(icon.current, name);
    }
  }, [name]);

  return (
    <svg data-jdenticon-value={name || ""} ref={icon} height={height} width={width} />
  );
};

export default Jdenticon;