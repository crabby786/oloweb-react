import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { NavLink } from 'react-router-dom';
import {HomeRoutes} from '../routes';
import clsx from "clsx";
import { Icon } from '@material-ui/core';

function activeRoute(routeName:any) {
  return window.location.hash.indexOf(routeName) > -1 ? true : false;
}

export const MainListItems = (props:any)=> {
  return (
    <div>
      {HomeRoutes.map((route, i)=> (
          <NavLink key={i} to={route.path} activeClassName="active" className={"navItem"} isActive={()=> activeRoute(route.path) } >
          <ListItem button>
            <ListItemIcon>
              <Icon> {route.icon} </Icon>
            </ListItemIcon>
            <ListItemText primary= {route.name} />
          </ListItem>
          </NavLink>
        ) )}
    </div>
  );
}


export const secondaryListItems = (
  <div>
    <ListSubheader inset>Saved reports</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItem>
  </div>
);