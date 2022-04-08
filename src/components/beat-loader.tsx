import React from 'react';

export const BeatLoader = React.memo(() => {
  const circleCommonClasses =
    'h-2.5 w-2.5 bg-current rounded-full inline-block';

  return (
    <div className="bg-text-gray-900 dark:bg-text-gray-100 inline-block">
      <div
        className={`${circleCommonClasses} mr-1 animate-beat-fade ease-in-out`}
      ></div>
      <div
        className={`${circleCommonClasses} mr-1 animate-beat-fade-odd`}
      ></div>
      <div className={`${circleCommonClasses} animate-beat-fade`}></div>
    </div>
  );
});

export default BeatLoader;