import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

// src : https://mui.com/material-ui/react-avatar/
function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  const splitedName = name.split(' ');
  const children  = splitedName.length >= 2 ? `${splitedName[0][0]}${splitedName[1][0]}` : `${splitedName[0][0]}`

  return {
    sx: {
      bgcolor: stringToColor(name),
      color: 'white'
    },
    children,
  };
}

export default function LettersAvatar(props) {
  const {name} = props;
  return (
      <Avatar {...stringAvatar(name || 'John Doe')} />
  );
}