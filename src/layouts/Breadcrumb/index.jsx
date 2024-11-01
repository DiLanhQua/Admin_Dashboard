/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ListGroup } from "react-bootstrap";
import navigation from "../data-menu/superadmin";
import { BASE_TITLE } from "../../config/constant";

const Breadcrumb = () => {
  const [main, setMain] = useState(null);
  const [item, setItem] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const findBreadcrumbs = () => {
      navigation.items.forEach((group) => {
        if (group.type === "group" && group.children) {
          group.children.forEach((child) => getCollapse(child, group));
        }
      });
    };

    const getCollapse = (child, group) => {
      if (child.type === "collapse" && child.children) {
        child.children.forEach((subChild) => getCollapse(subChild, group));
      } else if (
        child.type === "item" &&
        child.url ===
          location.pathname.replace(import.meta.env.VITE_APP_BASE_NAME, "")
      ) {
        setMain(group);
        setItem(child);
      }
    };

    findBreadcrumbs();
  }, [location.pathname]);

  useEffect(() => {
    if (item && item.title) {
      document.title = `${item.title} ${BASE_TITLE}`;
    }
  }, [item]);

  if (!item || item.breadcrumbs === false) return null;

  return (
    <div className="page-header">
      <div className="page-block">
        <div className="row align-items-center">
          <div className="col-md-12">
            <div className="page-header-title">
              <h5 className="m-b-10">{item.title}</h5>
            </div>
            <ListGroup as="ul" bsPrefix=" " className="breadcrumb">
              <ListGroup.Item as="li" bsPrefix=" " className="breadcrumb-item">
                <Link to="/dashboard">
                  <i className="feather icon-home" />
                </Link>
              </ListGroup.Item>
              {main && main.type === "collapse" && (
                <ListGroup.Item
                  as="li"
                  bsPrefix=" "
                  className="breadcrumb-item"
                >
                  <Link to={main.url}>{main.title}</Link>
                </ListGroup.Item>
              )}
              <ListGroup.Item as="li" bsPrefix=" " className="breadcrumb-item">
                <Link to={main.url}>{item.title}</Link>
              </ListGroup.Item>
            </ListGroup>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Breadcrumb;
