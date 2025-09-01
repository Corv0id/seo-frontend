import React from 'react';
import { Drawer, List, ListItem, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();

  const menuItems = [
    { text: 'Dashboard', path: '/' },
    { text: 'Audits', path: '/audits' },
    { text: 'Create Audit', path: '/create-audit' },
  ];

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      className="mt-16 w-40"
      classes={{ paper: 'mt-16 w-40' }} // Ensure paper matches
    >
      <List className="pt-4">
        {menuItems.map((item, index) => (
          <ListItem
            key={index}
            onClick={() => navigate(item.path)}
            component="button"
            className="hover:bg-gray-200 rounded px-4 py-2"
          >
            <ListItemText primary={item.text} className="text-gray-700" />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;