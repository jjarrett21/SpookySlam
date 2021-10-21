export const gradient = (startColor: string, endColor: string) => {
  return `background: ${startColor};
    background: -moz-linear-gradient(45deg,  ${startColor} 0%, ${endColor} 100%);
    background: -webkit-linear-gradient(45deg,  ${startColor} 0%, ${endColor} 100%);
    background: linear-gradient(45deg,  ${startColor} 0%, ${endColor} 100%);
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='${startColor}', endColorstr='${endColor}', GradientType=1 );`;
};
