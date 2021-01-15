import React from 'react';

const versions = [
  {
    label: 'v1.x',
    url: 'https://nature-ui.com',
  },
];

const v1Url = versions[0].url;

const VersionSwitcher = () => {
  return (
    <select
      value={v1Url}
      aria-label="Select the Chakra UI Docs version. You're currently viewing the version 1.0 docs"
      className='bg-transparent focus:outline-none border-none p-2 mr-3 text-gray-75 rounded focus:ring'
      onChange={(v) => console.log(v)}
    >
      {versions.map(({ label, url }) => (
        <option key={url} value={url}>
          {label}
        </option>
      ))}
    </select>
  );
};

export default VersionSwitcher;
