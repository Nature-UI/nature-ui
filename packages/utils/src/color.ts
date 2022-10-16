export const getButtonColor = (className?: string) => {
  if (!className?.length) {
    return {
      textColor: 'text-gray-700',
      backgroundColor: 'bg-gray-100',
      className: '',
    };
  }

  const textColor = className?.match(/text-\w+(-\d+)?/g)?.[0];

  if (textColor?.length) {
    return {
      textColor,
      backgroundColor: '',
      className: className.replace(textColor, ''),
    };
  }

  const backgroundColor = className?.match(/bg-\w+(-\d+)?/g)?.[0];
  if (!backgroundColor) {
    return {
      textColor: 'text-gray-600',
      backgroundColor: '',
      className,
    };
  }

  const split = backgroundColor.split('-');
  const amount = Number(split[split.length - 1]);
  if (amount >= 300) {
    return {
      textColor: 'text-white',
      backgroundColor,
      className: className.replace(backgroundColor, ''),
    };
  }
  if (!amount) {
    return {
      textColor: 'text-white',
      backgroundColor,
      className: className.replace(backgroundColor, ''),
    };
  }

  return {
    textColor: 'text-gray-600',
    backgroundColor,
    className: className.replace(backgroundColor, ''),
  };
};
